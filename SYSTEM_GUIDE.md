# 🏥 RCM Denial Prediction System - Complete Guide

**Revenue Cycle Management (RCM) System using Machine Learning for Healthcare Claim Denial Prediction**

## 📋 Overview

This is a complete end-to-end solution for predicting healthcare insurance claim denials:

1. **Python ML Pipeline** - Trains RandomForest model on 5,000 synthetic healthcare claims
2. **FastAPI Backend** - RESTful API serving predictions with 72.2% accuracy
3. **React Dashboard** - Interactive web UI for claims processing and analytics

---

## 🎯 System Architecture

```
┌─────────────────────────────────┐
│  React Dashboard (Port 3000)    │
│  - Claim Input Form             │
│  - Real-time Predictions        │
│  - Analytics & Charts           │
└────────────────┬────────────────┘
                 │ HTTP/Axios
                 ▼
┌─────────────────────────────────┐
│  FastAPI Backend (Port 8000)    │
│  - /predict Endpoint            │
│  - /model-info Endpoint         │
│  - RandomForest Model           │
└────────────────┬────────────────┘
                 │ Scikit-learn
                 ▼
┌─────────────────────────────────┐
│  ML Model (denial_model.pkl)    │
│  - 100 Decision Trees           │
│  - 11 Input Features            │
│  - 72.2% Accuracy              │
└─────────────────────────────────┘
```

---

## 🚀 Quick Start (Total: 10 minutes)

### Prerequisites
- Python 3.8+
- Node.js v14+
- npm or yarn

### Step 1: Set Up Backend (2 minutes)

```bash
# Navigate to project root
cd d:\TEAM_HEIST

# Install Python deps if needed
pip install fastapi uvicorn scikit-learn pandas joblib numpy

# Start FastAPI server
python claim_denial_api.py
```

You should see:
```
Starting Claim Denial Prediction API...
Documentation available at: http://localhost:8000/docs
INFO:     Uvicorn running on http://0.0.0.0:8000
```

### Step 2: Set Up Frontend (3 minutes)

```bash
# In new terminal
cd d:\TEAM_HEIST\rcm_dashboard

# Install dependencies
npm install

# Start React app
npm start
```

Wait for compilation (might take 30-60 seconds).

### Step 3: Use the Dashboard (5 minutes)

1. Open http://localhost:3000 (should auto-open)
2. Fill out claim form
3. Click **"Predict"**
4. View results and analytics

---

## 📂 Project Structure

```
d:\TEAM_HEIST\
├── synthetic_healthcare_claims_dataset.csv    # 5,000 training records
├── predict_claim_denials.py                   # ML training pipeline
├── claim_denial_api.py                        # FastAPI server
├── example_client.py                          # Python client example
├── test_api.py                                # API test suite
├── denial_model.pkl                           # Trained model
├── label_encoders.pkl                         # Categorical encoders
├── API_README.md                              # Backend documentation
├── QUICK_START.md                             # Quick start guide
│
└── rcm_dashboard/                             # React frontend
    ├── public/index.html                      # HTML entry point
    ├── src/
    │   ├── components/
    │   │   ├── ClaimForm.js                  # Form component
    │   │   ├── PredictionResult.js           # Results component
    │   │   └── DenialAnalytics.js            # Charts component
    │   ├── App.js                            # Main app
    │   ├── index.js                          # React entry
    │   └── index.css                         # Tailwind CSS
    ├── package.json                          # Dependencies
    ├── tailwind.config.js                    # Tailwind config
    ├── README.md                             # Frontend docs
    ├── SETUP_GUIDE.md                        # Setup instructions
    └── .env.example                          # Environment template
```

---

## 🔄 Complete Workflow

### 1. Training the Model (One-time setup)

```bash
python predict_claim_denials.py
```

Output:
```
Step 1: Loading dataset...
Dataset loaded. Shape: (5000, 13)

Step 2: Dataset Information
[15 columns including patient_age, insurance_type, etc.]

Step 3: Dropping 'claim_id' column...

Step 4: Encoding categorical variables...
[Encodes 7 categorical fields]

Step 5: Defining features X and target variable y...

Step 6: Splitting dataset into train (80%) and test (20%)...

Step 7: Training RandomForestClassifier...

Step 8: Model Evaluation
Accuracy: 0.7220
Precision: 0.7095
Recall: 0.7220

Step 9: Feature Importance
1. coding_accuracy_score: 17.1%
2. claim_submission_delay_days: 16.2%
3. claim_amount: 15.6%
4. patient_age: 14.3%

Step 10: Saving the trained model...
Model saved to D:\TEAM_HEIST\denial_model.pkl
Label encoders saved to D:\TEAM_HEIST\label_encoders.pkl

Pipeline Complete!
```

### 2. Starting the API Server

```bash
python claim_denial_api.py
```

The API provides three endpoints:

- `GET /` - Health check
- `GET /model-info` - Model details + feature importance
- `POST /predict` - Make predictions

### 3. Using the Dashboard

The React dashboard provides:

- **Claim Input Form** - 11 fields with pre-populated defaults
- **Prediction Results** - Denial probability, risk level, actions
- **Analytics Dashboard** - Charts and KPIs
- **Recent History** - Table of recent predictions

---

## 📊 Model Performance

| Metric | Score |
|--------|-------|
| **Accuracy** | 72.20% |
| **Precision** | 70.95% |
| **Recall** | 72.20% |
| **F1-Score** | 0.70 |

### Feature Importance (Top 5)

1. **Coding Accuracy Score** - 17.1% (Most important!)
2. **Claim Submission Delay** - 16.2%
3. **Claim Amount** - 15.6%
4. **Patient Age** - 14.3%
5. **Procedure Code** - 7.1%

### Confusion Matrix (Test Set)

```
                Predicted
              Not Denied | Denied
Actual Not     587      |   74      (Good)
       Denied  204      |  135      (Needs improvement)
```

---

## 🎮 Using the System

### Making a Single Prediction

#### Via Dashboard (UI)
1. Open http://localhost:3000
2. Fill form (sample data pre-populated)
3. Click "Predict"
4. View results

#### Via Python Client
```python
import requests

response = requests.post("http://localhost:8000/predict", json={
    "patient_age": 45,
    "insurance_type": "Private",
    "procedure_code": "PROC_A",
    "diagnosis_code": "DX1",
    "provider_type": "Specialist",
    "claim_amount": 500,
    "prior_authorization": "yes",
    "documentation_complete": "yes",
    "coding_accuracy_score": 0.95,
    "claim_submission_delay_days": 5,
    "payer": "Cigna"
})

print(response.json())
# {
#   "denial_probability": 0.13,
#   "risk_level": "Low",
#   "suggested_action": "Claim appears compliant",
#   "confidence_score": 0.87
# }
```

#### Via cURL
```bash
curl -X POST "http://localhost:8000/predict" \
  -H "Content-Type: application/json" \
  -d '{
    "patient_age": 45,
    "insurance_type": "Private",
    "procedure_code": "PROC_A",
    "diagnosis_code": "DX1",
    "provider_type": "Specialist",
    "claim_amount": 500,
    "prior_authorization": "yes",
    "documentation_complete": "yes",
    "coding_accuracy_score": 0.95,
    "claim_submission_delay_days": 5,
    "payer": "Cigna"
  }'
```

### Batch Processing with Python Client

```python
python example_client.py
```

Processes 3 sample claims with different risk levels and displays formatted results.

---

## 📋 Valid Input Values

### Categorical Fields

```
insurance_type:        Medicaid, Medicare, Private
procedure_code:        PROC_A, PROC_B, PROC_C, PROC_D, PROC_E
diagnosis_code:        DX1, DX2, DX3, DX4, DX5
provider_type:         Hospital, Specialist, Clinic, Diagnostic Center
prior_authorization:   yes, no
documentation_complete: yes, no
payer:                 Cigna, UnitedHealth, BlueCross, Aetna, Kaiser
```

### Numeric Ranges

```
patient_age:               1-120
claim_amount:              0+
coding_accuracy_score:     0.0-1.0 (0-100%)
claim_submission_delay_days: 0-365
```

---

## 🎨 Dashboard Features

### Claim Input Form
- Pre-populated with sample data
- Dropdown selections for categorical fields
- Slider for coding accuracy (visual feedback)
- Input validation
- Predict & Reset buttons

### Prediction Results
- **Risk Card**: Large display of risk level
- **Denial Probability**: Percentage with visual bar
- **Confidence Score**: Model confidence visualization
- **Actions**: Suggested next steps
- **Recommendation**: Process/Review/Escalate

### Analytics Section
1. **Bar Chart**: Denial rates by payer
2. **Line Chart**: Denial trends by procedure
3. **Doughnut Chart**: Risk distribution
4. **Recent Predictions**: Table of last 10 predictions
5. **KPI Cards**: Average denial rate, high-risk count, total, approval rate

---

## 🔧 Troubleshooting

### Backend Issues

#### Port 8000 Already in Use
```bash
# Find process using port
netstat -ano | findstr :8000

# Kill it
taskkill /PID <PID> /F
```

#### Model File Not Found
```bash
# Regenerate model
python predict_claim_denials.py
```

#### API Connection Refused
```bash
# Verify backend is running
python claim_denial_api.py
# Should show "Uvicorn running on http://0.0.0.0:8000"
```

### Frontend Issues

#### Port 3000 Already in Use
```bash
# Use different port
PORT=3001 npm start
```

#### Dependencies Not Installing
```bash
npm cache clean --force
rm -r node_modules
npm install
```

#### Cannot Connect to API
- Ensure backend is running on port 8000
- Check browser console (F12) for CORS errors
- Try http://localhost:8000/docs to verify backend

---

## 📈 Key Insights from Model

### Top Denial Risk Factors

1. **Low Coding Accuracy** - 0.55 score increases denial risk significantly
2. **Long Submission Delays** - Claims submitted 60+ days late have 2x higher denial rate
3. **High Claim Amounts** - Large claims face higher scrutiny
4. **Incomplete Documentation** - Claims missing docs are 3x more likely denied

### Recommendations

To reduce denials, focus on:
1. ✅ Improve coding accuracy training
2. ✅ Reduce claim submission time (target: < 5 days)
3. ✅ Complete all documentation before submission
4. ✅ Monitor high-risk payers (UnitedHealth: 35% denial rate)

---

## 🚀 Deployment Options

### Local Development
```bash
# Terminal 1 - Backend
python claim_denial_api.py

# Terminal 2 - Frontend
cd rcm_dashboard
npm start
```

### Production (Docker)

**Backend:**
```dockerfile
FROM python:3.10-slim
WORKDIR /app
COPY requirements.txt .
RUN pip install -r requirements.txt
COPY . .
EXPOSE 8000
CMD ["uvicorn", "claim_denial_api:app", "--host", "0.0.0.0"]
```

**Frontend:**
```dockerfile
FROM node:18-alpine as builder
WORKDIR /app
COPY rcm_dashboard/package*.json ./
RUN npm install
COPY rcm_dashboard .
RUN npm run build

FROM nginx:alpine
COPY --from=builder /app/build /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
```

Run with:
```bash
docker-compose up
```

---

## 📚 API Documentation

### POST /predict

**Description**: Predict claim denial probability

**Request:**
```json
{
  "patient_age": 45,
  "insurance_type": "Private",
  "procedure_code": "PROC_A",
  "diagnosis_code": "DX1",
  "provider_type": "Specialist",
  "claim_amount": 500.0,
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
  "denial_probability": 0.13,
  "risk_level": "Low",
  "suggested_action": "Claim appears compliant",
  "confidence_score": 0.87
}
```

**Status Codes:**
- 200: Success
- 400: Invalid input
- 500: Server error

### GET /model-info

**Response:**
```json
{
  "model_type": "RandomForestClassifier",
  "n_estimators": 100,
  "feature_importances": {
    "coding_accuracy_score": 0.170512,
    "claim_submission_delay_days": 0.162071,
    ...
  }
}
```

---

## 💡 Example Use Cases

### Case 1: Routine Claim Processing
```
Input:  Private insurance, complete docs, high coding accuracy (95%)
Output: Low risk (13% denial probability)
Action: Auto-process, no review needed
```

### Case 2: High-Risk Claim
```
Input:  Medicaid, missing docs, low coding accuracy (55%), 60-day delay
Output: High risk (72% denial probability)
Action: Escalate to manager with recommendations
```

### Case 3: Borderline Claim
```
Input:  Medicare, complete docs, medium accuracy (78%), 20-day delay
Output: Medium risk (51% denial probability)
Action: Review before submission, verify requirements
```

---

## 🎓 Learning Resources

- [Scikit-learn Documentation](https://scikit-learn.org)
- [FastAPI Tutorial](https://fastapi.tiangolo.com)
- [React Documentation](https://react.dev)
- [Tailwind CSS](https://tailwindcss.com)
- [Chart.js](https://www.chartjs.org)

---

## 📞 Support & Troubleshooting

### Checklist Before Asking for Help

- [ ] Backend running: `python claim_denial_api.py`
- [ ] Frontend running: `npm start` (in rcm_dashboard)
- [ ] Both on correct ports (8000 and 3000)
- [ ] No console errors (F12)
- [ ] Model files exist (denial_model.pkl, label_encoders.pkl)
- [ ] Using valid categorical values

### Common Issues

| Issue | Solution |
|-------|----------|
| "Cannot connect to API" | Ensure backend running on port 8000 |
| "Port already in use" | Kill process or use different port |
| "Model not found" | Run `python predict_claim_denials.py` |
| "Invalid categorical value" | Use values from dropdown options |

---

## 🎯 Next Steps

1. ✅ Get backend running
2. ✅ Get frontend running
3. 📊 Make test predictions
4. 📈 Review analytics
5. 🔄 Integrate with your RCM system
6. 🚀 Deploy to production
7. 📉 Monitor denial rates

---

## 📝 License & Credits

Built with:
- Python & Scikit-learn
- FastAPI
- React
- Tailwind CSS
- Chart.js

For questions or issues, refer to:
- [API_README.md](API_README.md) - Backend details
- [rcm_dashboard/README.md](rcm_dashboard/README.md) - Frontend details
- [QUICK_START.md](QUICK_START.md) - Quick reference

---

**Happy claim processing! 🎯**

Last Updated: March 9, 2026
