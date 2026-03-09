#!/usr/bin/env python3
"""
🔍 SYSTEM VALIDATION SCRIPT
Comprehensive check of all RCM system components
"""

import os
import sys
import json
from pathlib import Path

def check_file(path, name):
    """Check if file exists"""
    exists = os.path.exists(path)
    status = "✅" if exists else "❌"
    print(f"{status} {name}: {path}")
    return exists

def check_directory(path, name):
    """Check if directory exists"""
    exists = os.path.isdir(path)
    status = "✅" if exists else "❌"
    print(f"{status} {name}: {path}")
    return exists

def main():
    print("\n" + "="*70)
    print("🏥 RCM SYSTEM VALIDATION")
    print("="*70)
    
    results = {
        "files": {},
        "directories": {},
        "imports": {},
        "data": {}
    }
    
    # 1. CHECK FILES
    print("\n📁 CHECKING FILES:")
    print("-" * 70)
    
    files_to_check = {
        "Python - Training": "predict_claim_denials.py",
        "Python - API": "claim_denial_api.py",
        "Python - Analytics": "claims_analytics.py",
        "Data - Dataset": "synthetic_healthcare_claims_dataset.csv",
        "Model - Trained": "denial_model.pkl",
        "Model - Encoders": "label_encoders.pkl",
        "Analytics - Output": "claims_analytics.json",
        "Config - Requirements": "requirements.txt",
    }
    
    for desc, fname in files_to_check.items():
        results["files"][desc] = check_file(fname, desc)
    
    # 2. CHECK DIRECTORIES
    print("\n📂 CHECKING DIRECTORIES:")
    print("-" * 70)
    
    dirs_to_check = {
        "React - Dashboard": "rcm_dashboard",
        "Documentation": "documentation",
    }
    
    for desc, dname in dirs_to_check.items():
        results["directories"][desc] = check_directory(dname, desc)
    
    # 3. CHECK IMPORTS
    print("\n📦 CHECKING PYTHON IMPORTS:")
    print("-" * 70)
    
    imports_to_check = {
        "pandas": "pandas",
        "numpy": "numpy",
        "joblib": "joblib",
        "fastapi": "fastapi",
        "uvicorn": "uvicorn",
        "scikit-learn": "sklearn",
    }
    
    for name, module in imports_to_check.items():
        try:
            __import__(module)
            print(f"✅ {name}")
            results["imports"][name] = True
        except ImportError as e:
            print(f"⚠️  {name}: {str(e)}")
            results["imports"][name] = False
    
    # 4. CHECK DATA FILES
    print("\n📊 CHECKING DATA FILES:")
    print("-" * 70)
    
    # Check dataset
    if os.path.exists("synthetic_healthcare_claims_dataset.csv"):
        try:
            import pandas as pd
            df = pd.read_csv("synthetic_healthcare_claims_dataset.csv")
            print(f"✅ Dataset: {len(df)} rows, {len(df.columns)} columns")
            results["data"]["dataset_rows"] = len(df)
            results["data"]["dataset_cols"] = len(df.columns)
        except Exception as e:
            print(f"❌ Dataset error: {e}")
    
    # Check model files
    if os.path.exists("denial_model.pkl"):
        try:
            import joblib
            model = joblib.load("denial_model.pkl")
            print(f"✅ Model loaded successfully")
            results["data"]["model_loaded"] = True
        except Exception as e:
            print(f"❌ Model error: {e}")
            results["data"]["model_loaded"] = False
    
    if os.path.exists("label_encoders.pkl"):
        try:
            import joblib
            encoders = joblib.load("label_encoders.pkl")
            print(f"✅ Encoders loaded successfully ({len(encoders)} encoders)")
            results["data"]["encoders_count"] = len(encoders)
        except Exception as e:
            print(f"❌ Encoders error: {e}")
    
    # Check analytics JSON
    if os.path.exists("claims_analytics.json"):
        try:
            with open("claims_analytics.json", "r") as f:
                data = json.load(f)
            print(f"✅ Analytics JSON valid")
            results["data"]["analytics_valid"] = True
        except Exception as e:
            print(f"❌ Analytics JSON error: {e}")
            results["data"]["analytics_valid"] = False
    
    # 5. CHECK REACT SETUP
    print("\n⚛️  CHECKING REACT SETUP:")
    print("-" * 70)
    
    react_files = {
        "App.js": "rcm_dashboard/src/App.js",
        "ClaimForm": "rcm_dashboard/src/components/ClaimForm.js",
        "PredictionResult": "rcm_dashboard/src/components/PredictionResult.js",
        "DenialAnalytics": "rcm_dashboard/src/components/DenialAnalytics.js",
        "AnalyticsIntegration": "rcm_dashboard/src/components/AnalyticsIntegration.js",
        "package.json": "rcm_dashboard/package.json",
        "tailwind.config.js": "rcm_dashboard/tailwind.config.js",
    }
    
    for name, path in react_files.items():
        results["files"][f"React - {name}"] = check_file(path, name)
    
    # 6. SYSTEM SUMMARY
    print("\n" + "="*70)
    print("📊 SYSTEM SUMMARY")
    print("="*70)
    
    files_ok = sum(1 for v in results["files"].values() if v)
    files_total = len(results["files"])
    
    imports_ok = sum(1 for v in results["imports"].values() if v)
    imports_total = len(results["imports"])
    
    print(f"\n📁 Files: {files_ok}/{files_total} present")
    print(f"📦 Dependencies: {imports_ok}/{imports_total} installed")
    print(f"📂 Directories: {sum(1 for v in results['directories'].values() if v)}/{len(results['directories'])} present")
    
    # Final verdict
    print("\n" + "="*70)
    if imports_ok >= 5 and files_ok >= 8:
        print("✅ SYSTEM STATUS: MOSTLY READY ✅")
        print("\n🚀 Next Steps:")
        print("   1. python predict_claim_denials.py  (if model needs retraining)")
        print("   2. python claim_denial_api.py       (start backend on port 8000)")
        print("   3. cd rcm_dashboard && npm start    (start frontend on port 3000)")
        print("   4. Open http://localhost:3000 in browser")
        exit_code = 0
    else:
        print("⚠️  SYSTEM STATUS: ISSUES DETECTED ⚠️")
        print("\nMissing components:")
        if imports_ok < 5:
            print(f"   - {imports_total - imports_ok} Python dependencies missing")
        if files_ok < 8:
            print(f"   - {files_total - files_ok} files missing")
        exit_code = 1
    
    print("="*70 + "\n")
    return exit_code

if __name__ == "__main__":
    sys.exit(main())
