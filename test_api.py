#!/usr/bin/env python3
"""
Test script to validate the Claim Denial API
"""

import sys
import json

# Test 1: Check if required modules can be imported
print("Test 1: Checking required modules...")
try:
    from claim_denial_api import app, ClaimPredictionRequest, model, label_encoders
    print("[OK] FastAPI app loaded successfully")
    print("[OK] Model loaded successfully")
    print("[OK] Label encoders loaded successfully")
except Exception as e:
    print(f"[ERROR] Error loading API: {e}")
    sys.exit(1)

# Test 2: Check if the model has expected attributes
print("\nTest 2: Checking model attributes...")
try:
    assert hasattr(model, 'predict'), "Model missing predict method"
    assert hasattr(model, 'predict_proba'), "Model missing predict_proba method"
    assert hasattr(model, 'n_estimators'), "Model missing n_estimators"
    print(f"[OK] Model type: {type(model).__name__}")
    print(f"[OK] Number of estimators: {model.n_estimators}")
except AssertionError as e:
    print(f"[ERROR] {e}")
    sys.exit(1)

# Test 3: Check if label encoders are loaded for all categorical columns
print("\nTest 3: Checking label encoders...")
required_encoders = [
    'insurance_type', 'procedure_code', 'diagnosis_code',
    'provider_type', 'prior_authorization', 'documentation_complete', 'payer'
]
for encoder_name in required_encoders:
    if encoder_name in label_encoders:
        print(f"[OK] Encoder {encoder_name} loaded")
    else:
        print(f"[ERROR] Missing encoder: {encoder_name}")
        sys.exit(1)

# Test 4: Test the FastAPI endpoints
print("\nTest 4: Testing API endpoints...")
from fastapi.testclient import TestClient

client = TestClient(app)

# Test health check
response = client.get("/")
assert response.status_code == 200, f"Health check failed: {response.status_code}"
print("[OK] GET / endpoint working")

# Test model info endpoint
response = client.get("/model-info")
assert response.status_code == 200, f"Model info endpoint failed: {response.status_code}"
print("[OK] GET /model-info endpoint working")

# Test 5: Test prediction endpoint with valid data
print("\nTest 5: Testing prediction endpoint...")
test_data = {
    "patient_age": 45,
    "insurance_type": "Private",
    "procedure_code": "PROC_A",
    "diagnosis_code": "DX1",
    "provider_type": "Specialist",
    "claim_amount": 5000.00,
    "prior_authorization": "yes",
    "documentation_complete": "yes",
    "coding_accuracy_score": 0.95,
    "claim_submission_delay_days": 5,
    "payer": "Star Health"
}

response = client.post("/predict", json=test_data)
assert response.status_code == 200, f"Prediction failed: {response.status_code} - {response.text}"
print("[OK] POST /predict endpoint working")

prediction = response.json()
print(f"\nPrediction Result:")
print(f"  - Denial Probability: {prediction['denial_probability']}")
print(f"  - Risk Level: {prediction['risk_level']}")
print(f"  - Suggested Action: {prediction['suggested_action']}")
print(f"  - Confidence Score: {prediction['confidence_score']}")

# Validate response structure
assert 'denial_probability' in prediction, "Missing denial_probability in response"
assert 'risk_level' in prediction, "Missing risk_level in response"
assert 'suggested_action' in prediction, "Missing suggested_action in response"
assert 'confidence_score' in prediction, "Missing confidence_score in response"
assert prediction['risk_level'] in ['Low', 'Medium', 'High'], "Invalid risk_level"
print("[OK] Response structure valid")

print("\n" + "="*50)
print("All tests passed! [OK]")
print("="*50)
print("\nTo start the API server, run:")
print("  python claim_denial_api.py")
print("\nAPI will be available at: http://localhost:8000")
print("Interactive docs at: http://localhost:8000/docs")
