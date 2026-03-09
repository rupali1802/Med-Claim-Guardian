"""
Claim Denial Prediction - Generalized Training Pipeline

Works with the bundled synthetic dataset OR any CSV from open sources.
Auto-detects target column, ID columns, categorical/numerical columns.
Unknown categories at inference time (new payer, new code, etc.) are
automatically handled — they map to -1 via OrdinalEncoder, which the
RandomForest model handles gracefully without crashing or wrong fallbacks.

Usage:
  python predict_claim_denials.py                            # default synthetic dataset
  python predict_claim_denials.py --dataset path/to/file.csv # any CSV
"""

import pandas as pd
import numpy as np
from sklearn.preprocessing import OrdinalEncoder
from sklearn.model_selection import train_test_split
from sklearn.ensemble import RandomForestClassifier
from sklearn.metrics import (accuracy_score, precision_score, recall_score,
                             confusion_matrix, classification_report)
import joblib
import os
import argparse
import warnings
warnings.filterwarnings('ignore')

# Optional: SHAP for model explainability
try:
    import shap
    SHAP_AVAILABLE = True
except ImportError:
    print("Warning: SHAP not installed. Install with: pip install shap")
    SHAP_AVAILABLE = False

BASE_DIR = os.path.dirname(os.path.abspath(__file__))

# ── Column detection helpers ──────────────────────────────────────────────────
_TARGET_SYNONYMS = ['denial', 'denied', 'claim_status', 'status',
                    'outcome', 'label', 'target', 'result', 'decision']
_ID_SYNONYMS     = ['claim_id', 'id', 'patient_id', 'record_id',
                    'case_id', 'encounter_id', 'claim_number']
_POSITIVE_LABELS = {'1', 'yes', 'true', 'denied', 'denial', 'reject', 'rejected', '1.0'}
_NEGATIVE_LABELS = {'0', 'no', 'false', 'approved', 'accepted', 'paid', 'accept', '0.0'}


def load_dataset(path):
    """Load a CSV, trying common encodings to handle any locale/source."""
    for enc in ['utf-8', 'utf-8-sig', 'latin1', 'cp1252']:
        try:
            return pd.read_csv(path, encoding=enc)
        except UnicodeDecodeError:
            continue
    raise ValueError(f"Cannot read file with common encodings: {path}")


def detect_target_column(df):
    """Auto-detect the binary denial/outcome column."""
    cols_lower = {c.lower(): c for c in df.columns}
    for name in _TARGET_SYNONYMS:
        if name in cols_lower:
            return cols_lower[name]
    # Fallback: any column whose unique values are all known positive/negative labels
    for col in df.columns:
        unique_vals = set(df[col].astype(str).str.strip().str.lower().unique())
        if unique_vals <= (_POSITIVE_LABELS | _NEGATIVE_LABELS):
            return col
    raise ValueError(
        "Could not auto-detect target column.\n"
        f"Expected one of: {_TARGET_SYNONYMS}\n"
        f"Found columns: {list(df.columns)}\n"
        "Rename your target column to 'denial' (0=approved, 1=denied)."
    )


def detect_id_columns(df):
    """Detect ID / free-text identifier columns to drop before training."""
    id_cols = []
    cols_lower = {c.lower(): c for c in df.columns}
    for name in _ID_SYNONYMS:
        if name in cols_lower:
            id_cols.append(cols_lower[name])
    # High-cardinality string columns are likely free-text IDs
    for col in df.columns:
        if col in id_cols:
            continue
        if df[col].dtype == object and df[col].nunique() / max(len(df), 1) > 0.9:
            id_cols.append(col)
    return list(set(id_cols))


def detect_column_types(df, target_col):
    """Return (categorical_cols, numerical_cols) excluding the target column."""
    categorical, numerical = [], []
    for col in df.columns:
        if col == target_col:
            continue
        if df[col].dtype == object or (df[col].dtype != float and df[col].nunique() <= 20):
            categorical.append(col)
        else:
            numerical.append(col)
    return categorical, numerical


def normalize_target(series):
    """Map target values to 0/1 regardless of original representation."""
    s = series.astype(str).str.strip().str.lower()
    if s.isin(_POSITIVE_LABELS | _NEGATIVE_LABELS).all():
        return s.map(lambda v: 1 if v in _POSITIVE_LABELS else 0).astype(int)
    return pd.to_numeric(series, errors='coerce').fillna(0).astype(int)


# ── Main training function ────────────────────────────────────────────────────
def train(dataset_path=None):
    if dataset_path is None:
        dataset_path = os.path.join(BASE_DIR, 'synthetic_healthcare_claims_dataset.csv')

    # Step 1: Load dataset
    print(f"\nStep 1: Loading dataset from: {dataset_path}")
    df = load_dataset(dataset_path)
    print(f"  Shape  : {df.shape}")
    print(f"  Columns: {list(df.columns)}")

    # Step 2: Auto-detect columns
    print("\nStep 2: Detecting columns...")
    target_col = detect_target_column(df)
    print(f"  Target column   : '{target_col}'")

    id_cols = detect_id_columns(df)
    if id_cols:
        print(f"  Dropping ID cols: {id_cols}")
        df = df.drop(columns=id_cols, errors='ignore')

    initial_rows = len(df)
    df = df.dropna()
    if len(df) < initial_rows:
        print(f"  Dropped {initial_rows - len(df)} rows with missing values")

    df[target_col] = normalize_target(df[target_col])
    print(f"  Target distribution: {df[target_col].value_counts().to_dict()}")

    categorical_cols, numerical_cols = detect_column_types(df, target_col)
    print(f"  Categorical cols: {categorical_cols}")
    print(f"  Numerical cols  : {numerical_cols}")

    # Step 3: Encode categoricals
    # OrdinalEncoder with handle_unknown='use_encoded_value' maps any unseen
    # category (new payer, new insurer, new procedure code from a different
    # open-source dataset) to -1 at inference time — RandomForest handles
    # this cleanly without fallback hacks or wrong class mapping.
    print("\nStep 3: Encoding categorical features with OrdinalEncoder...")
    encoder = OrdinalEncoder(
        handle_unknown='use_encoded_value',
        unknown_value=-1,
        dtype=np.float64
    )
    if categorical_cols:
        df[categorical_cols] = encoder.fit_transform(df[categorical_cols])
        print(f"  Encoded {len(categorical_cols)} categorical columns")

    encoder_categories = {}
    if categorical_cols:
        for i, col in enumerate(categorical_cols):
            encoder_categories[col] = list(encoder.categories_[i])

    # Step 4: Prepare features and target
    print("\nStep 4: Preparing features and target...")
    feature_cols = [c for c in df.columns if c != target_col]
    X = df[feature_cols].astype(np.float64)
    y = df[target_col]
    print(f"  Features shape: {X.shape}")
    print(f"  Target shape  : {y.shape}")
    print(f"  Target distribution:\n{y.value_counts()}")

    # Step 5: Split 80/20
    print("\nStep 5: Splitting dataset into train (80%) and test (20%)...")
    X_train, X_test, y_train, y_test = train_test_split(
        X, y, test_size=0.2, random_state=42, stratify=y
    )
    print(f"  Training set: {X_train.shape[0]}")
    print(f"  Testing set : {X_test.shape[0]}")

    # Step 6: Train RandomForestClassifier
    print("\nStep 6: Training RandomForestClassifier...")
    model = RandomForestClassifier(
        n_estimators=200, random_state=42, n_jobs=-1, class_weight='balanced'
    )
    model.fit(X_train, y_train)
    print("  Training complete!")

    # Step 7: Evaluate
    print("\nStep 7: Model Evaluation")
    y_pred = model.predict(X_test)
    print(f"  Accuracy:  {accuracy_score(y_test, y_pred):.4f}")
    print(f"  Precision: {precision_score(y_test, y_pred, average='weighted', zero_division=0):.4f}")
    print(f"  Recall:    {recall_score(y_test, y_pred, average='weighted', zero_division=0):.4f}")
    print(f"\n  Confusion Matrix:\n{confusion_matrix(y_test, y_pred)}")
    print(f"\n  Classification Report:\n{classification_report(y_test, y_pred, zero_division=0)}")

    # Step 8: Feature importance
    print("\nStep 8: Feature Importance")
    fi = pd.DataFrame({'feature': feature_cols, 'importance': model.feature_importances_})
    fi = fi.sort_values('importance', ascending=False)
    print(fi.to_string(index=False))

    # Step 9: SHAP explainer
    print("\nStep 9: Initializing SHAP Explainer...")
    explainer = None
    if SHAP_AVAILABLE:
        try:
            explainer = shap.TreeExplainer(model)
            print("  [OK] SHAP TreeExplainer initialized")
            print("  - Provides per-feature contributions for each prediction")
        except Exception as e:
            print(f"  Warning: SHAP failed: {e}")
    else:
        print("  SHAP not available (install with: pip install shap)")

    # Step 10: Save artifacts
    print("\nStep 10: Saving model artifacts...")
    schema = {
        'feature_names':       feature_cols,
        'categorical_columns': categorical_cols,
        'numerical_columns':   numerical_cols,
        'target_column':       target_col,
        'encoder_categories':  encoder_categories,
    }
    joblib.dump(model,   os.path.join(BASE_DIR, 'denial_model.pkl'))
    joblib.dump(encoder, os.path.join(BASE_DIR, 'label_encoders.pkl'))  # same filename for API compat
    joblib.dump(schema,  os.path.join(BASE_DIR, 'feature_names.pkl'))
    print("  [OK] denial_model.pkl   saved")
    print("  [OK] label_encoders.pkl saved  (OrdinalEncoder — handles any new/unknown category)")
    print("  [OK] feature_names.pkl  saved  (schema: column order, types, categories)")

    if explainer is not None:
        try:
            joblib.dump(explainer, os.path.join(BASE_DIR, 'shap_explainer.pkl'))
            print("  [OK] shap_explainer.pkl saved")
        except Exception as e:
            print(f"  Warning: Could not save SHAP explainer: {e}")

    print("\n" + "=" * 50)
    print("Training Pipeline Complete!")
    print("=" * 50)
    return model, encoder, schema


if __name__ == '__main__':
    parser = argparse.ArgumentParser(
        description='Train claim denial prediction model on any CSV dataset'
    )
    parser.add_argument(
        '--dataset', type=str, default=None,
        help='Path to a CSV dataset (default: synthetic_healthcare_claims_dataset.csv)'
    )
    args = parser.parse_args()
    train(dataset_path=args.dataset)
