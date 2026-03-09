# Claim Denial Prediction API - Usage Guide

## Setup

### 1. Install Dependencies
```bash
pip install -r requirements.txt
```

### 2. Run the API
```bash
python claim_denial_api.py
```

The API will start on `http://localhost:8000`

## API Documentation

### Interactive Documentation
- **Swagger UI**: http://localhost:8000/docs
- **ReDoc**: http://localhost:8000/redoc

### Endpoints

#### 1. Health Check
```
GET /
```
Returns API status and version information.

#### 2. Predict Claim Denial
```
POST /predict
```

**Request Body:**
```json
{
  "patient_age": 45,
  "insurance_type": "Private",
  "procedure_code": "PROC_A",
  "diagnosis_code": "DX1",
  "provider_type": "Specialist",
  "claim_amount": 500.00,
  "prior_authorization": "yes",
  "documentation_complete": "yes",
  "coding_accuracy_score": 0.95,
  "claim_submission_delay_days": 5,
  "payer": "Cigna"
}
```

**Response:**
```json
{
  "denial_probability": 0.2345,
  "risk_level": "Low",
  "suggested_action": "Claim appears compliant",
  "confidence_score": 0.8934
}
```

**Response Fields:**
- `denial_probability`: Probability of claim denial (0-1)
- `risk_level`: Risk classification - "Low", "Medium", or "High"
- `suggested_action`: Recommended actions to reduce denial risk
- `confidence_score`: How confident the model is in its prediction

#### 3. Model Information
```
GET /model-info
```
Returns feature importances and model details.

## Risk Level Interpretation

- **Low Risk** (< 0.33): Claim is likely to be approved
- **Medium Risk** (0.33 - 0.67): Claim has moderate denial risk
- **High Risk** (> 0.67): Claim is at high risk of denial

## Suggested Actions

The API provides actionable recommendations such as:
- "Improve coding accuracy" - If coding score < 0.7
- "Reduce submission delays" - If delays > 30 days
- "Complete documentation" - If documentation is incomplete
- "Review with prior authorization team" - If high denial risk
- "Verify all requirements met" - If medium to high risk

## Example Usage with Python

```python
import requests

url = "http://localhost:8000/predict"

payload = {
    "patient_age": 45,
    "insurance_type": "Private",
    "procedure_code": "PROC_A",
    "diagnosis_code": "DX1",
    "provider_type": "Specialist",
    "claim_amount": 500.00,
    "prior_authorization": "yes",
    "documentation_complete": "yes",
    "coding_accuracy_score": 0.95,
    "claim_submission_delay_days": 5,
    "payer": "Cigna"
}

response = requests.post(url, json=payload)
print(response.json())
```

## Example Usage with cURL

```bash
curl -X POST "http://localhost:8000/predict" \
  -H "Content-Type: application/json" \
  -d '{
    "patient_age": 45,
    "insurance_type": "Private",
    "procedure_code": "PROC_A",
    "diagnosis_code": "DX1",
    "provider_type": "Specialist",
    "claim_amount": 500.00,
    "prior_authorization": "yes",
    "documentation_complete": "yes",
    "coding_accuracy_score": 0.95,
    "claim_submission_delay_days": 5,
    "payer": "Cigna"
  }'
```

## Categorical Values Reference

Based on the training data, valid values are:

- **insurance_type**: `Medicaid`, `Medicare`, `Private`
- **procedure_code**: `PROC_A`, `PROC_B`, `PROC_C`, `PROC_D`, `PROC_E`
- **diagnosis_code**: `DX1`, `DX2`, `DX3`, `DX4`, `DX5`
- **provider_type**: `Hospital`, `Specialist`, `Clinic`, `Diagnostic Center`
- **prior_authorization**: `yes`, `no`
- **documentation_complete**: `yes`, `no`
- **payer**: `Cigna`, `UnitedHealth`, `BlueCross`, `Aetna`, `Kaiser`

## Model Performance

- **Accuracy**: 72.20%
- **Precision**: 70.95%
- **Recall**: 72.20%

### Top Feature Importances
1. Coding Accuracy Score (17.1%)
2. Claim Submission Delay Days (16.2%)
3. Claim Amount (15.6%)
4. Patient Age (14.3%)
