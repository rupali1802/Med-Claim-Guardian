import json
from pathlib import Path

import pandas as pd


DATA_PATH = Path(__file__).with_name("synthetic_healthcare_claims_dataset.csv")


def load_claims_dataframe() -> pd.DataFrame:
    """
    Load the synthetic claims dataset.

    Raises:
        FileNotFoundError: If the dataset is not found next to this script.
    """
    if not DATA_PATH.exists():
        raise FileNotFoundError(f"Claims dataset not found at {DATA_PATH}")

    df = pd.read_csv(DATA_PATH)
    if "denial" not in df.columns:
        raise ValueError("Expected 'denial' column indicating 1=denied, 0=approved.")
    return df


def compute_insights(df: pd.DataFrame) -> dict:
    """
    Compute aggregated denial insights required by the dashboard.

    Metrics:
        - Top 10 procedures with highest denial rate
        - Denial rate by payer
        - Denial rate by provider type
        - Average claim amount for denied vs approved claims
    """
    # Use defensive copies for groupbys
    work_df = df.copy()

    # Ensure denial is numeric 0/1
    work_df["denial"] = work_df["denial"].astype(int)

    # Top 10 procedures by denial rate
    proc_group = (
        work_df.groupby("procedure_code")["denial"]
        .agg(["mean", "count"])
        .rename(columns={"mean": "denial_rate", "count": "total_claims"})
        .reset_index()
    )
    top_procedures = (
        proc_group.sort_values("denial_rate", ascending=False)
        .head(10)
        .to_dict(orient="records")
    )

    # Denial rate by payer
    payer_group = (
        work_df.groupby("payer")["denial"]
        .agg(["mean", "count"])
        .rename(columns={"mean": "denial_rate", "count": "total_claims"})
        .reset_index()
    )
    denial_by_payer = payer_group.to_dict(orient="records")

    # Denial rate by provider type
    provider_group = (
        work_df.groupby("provider_type")["denial"]
        .agg(["mean", "count"])
        .rename(columns={"mean": "denial_rate", "count": "total_claims"})
        .reset_index()
    )
    denial_by_provider_type = provider_group.to_dict(orient="records")

    # Average claim amount for denied vs approved
    amount_group = (
        work_df.groupby("denial")["claim_amount"]
        .mean()
        .rename("avg_claim_amount")
        .reset_index()
    )
    # Map 0/1 to labels for frontend clarity
    status_mapping = {0: "approved", 1: "denied"}
    avg_claim_amount_by_status = [
        {
            "status": status_mapping.get(int(row["denial"]), str(row["denial"])),
            "avg_claim_amount": float(row["avg_claim_amount"]),
        }
        for _, row in amount_group.iterrows()
    ]

    return {
        "top_procedures_by_denial_rate": top_procedures,
        "denial_rate_by_payer": denial_by_payer,
        "denial_rate_by_provider_type": denial_by_provider_type,
        "avg_claim_amount_by_status": avg_claim_amount_by_status,
    }


def generate_insights_json() -> str:
    """Convenience function: load data, compute insights, and dump as JSON string."""
    df = load_claims_dataframe()
    insights = compute_insights(df)
    return json.dumps(insights, indent=2)


if __name__ == "__main__":
    # Print insights JSON to stdout so it can be captured or tested easily.
    print(generate_insights_json())

