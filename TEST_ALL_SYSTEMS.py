#!/usr/bin/env python3
"""Final system test and validation"""
import sys
import os

print("="*80)
print("FINAL SYSTEM VALIDATION")
print("="*80)
print()

try:
    print("[1/7] Testing Model Load...")
    import joblib
    model = joblib.load('denial_model.pkl')
    print(f"      OK - Model: {type(model).__name__} ({model.n_estimators} trees)")
    
    print("[2/7] Testing Encoders...")
    encoders = joblib.load('label_encoders.pkl')
    print(f"      OK - Encoders: {len(encoders)} loaded")
    
    print("[3/7] Testing Analytics JSON...")
    import json
    with open('claims_analytics.json') as f:
        data = json.load(f)
    stats = data['overall_statistics']
    print(f"      OK - Claims: {stats['total_claims']:,}, Denial: {stats['denial_rate_percent']}")
    
    print("[4/7] Testing Dataset...")
    import pandas as pd
    df = pd.read_csv('synthetic_healthcare_claims_dataset.csv')
    print(f"      OK - Dataset: {len(df):,} rows, {len(df.columns)} columns")
    
    print("[5/7] Testing API Module...")
    import sys
    sys.path.insert(0, '.')
    from claim_denial_api import app
    print(f"      OK - FastAPI app loaded")
    
    print("[6/7] Testing Frontend Files...")
    frontend_files = [
        'rcm_dashboard/src/App.js',
        'rcm_dashboard/package.json',
    ]
    for f in frontend_files:
        if not os.path.exists(f):
            raise Exception(f"Missing: {f}")
    print(f"      OK - React files present")
    
    print("[7/7] Testing Dependencies...")
    import fastapi, uvicorn, sklearn, pandas, numpy, joblib
    print(f"      OK - All dependencies installed")
    
    print()
    print("="*80)
    print("SUCCESS! ALL SYSTEMS OPERATIONAL")
    print("="*80)
    print()
    print("START COMMANDS:")
    print("  Terminal 1: python claim_denial_api.py")
    print("  Terminal 2: cd rcm_dashboard && npm start")
    print("  Browser:    http://localhost:3000")
    print()
    exit(0)
    
except Exception as e:
    print(f"      FAILED: {e}")
    import traceback
    traceback.print_exc()
    exit(1)
