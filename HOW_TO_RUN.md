# HOW TO RUN - Complete Step-by-Step Guide

## 🚀 Quick Start (3 Steps)

### Step 1: Install Dependencies
```bash
cd D:\TEAM_HEIST
pip install -r requirements.txt
```

### Step 2: Train the Model (Creates SHAP Explainer)
```bash
python predict_claim_denials.py
```
⏱️ Takes about 10-15 seconds

### Step 3: Start Everything
Open 3 separate terminals:

**Terminal 1 - Start API Server:**
```bash
cd D:\TEAM_HEIST
python claim_denial_api.py
```
✅ Should show: "Application startup complete"
📍 API available at: http://localhost:8000

**Terminal 2 - Start React Dashboard:**
```bash
cd D:\TEAM_HEIST\rcm_dashboard
npm start
```
✅ Dashboard opens automatically
📍 Dashboard available at: http://localhost:3000

**Terminal 3 - (Optional) Test API:**
```bash
# Check if API is running
curl http://localhost:8000/

# Try making a prediction
curl -X POST http://localhost:8000/predict \
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

---

## 📋 Detailed Instructions

### Prerequisites Check
```bash
# Verify Python 3.8+
python --version

# Verify Node.js installed
node --version
npm --version
```

### Full Setup Process

#### 1️⃣ Navigate to Project
```bash
cd D:\TEAM_HEIST
```

#### 2️⃣ Install Python Dependencies
```bash
pip install -r requirements.txt
```

**What gets installed:**
- fastapi (API framework)
- uvicorn (API server)
- scikit-learn (ML model)
- pandas (Data processing)
- shap (Model explainability) ✨
- numpy, matplotlib, etc.

#### 3️⃣ Train ML Model with SHAP
```bash
python predict_claim_denials.py
```

**Output should show:**
```
Step 1: Loading dataset...
Dataset loaded. Shape: (5000, 13)
...
Step 9b: Initializing SHAP Explainer...
✓ SHAP TreeExplainer initialized successfully!
...
✓ SHAP explainer saved to D:\TEAM_HEIST\shap_explainer.pkl
Feature metadata saved to D:\TEAM_HEIST\feature_names.pkl

==================================================
Pipeline Complete!
==================================================
```

**Files Created:**
- ✅ `denial_model.pkl` - Trained AI model
- ✅ `label_encoders.pkl` - Data encoders
- ✅ `shap_explainer.pkl` - SHAP analysis engine
- ✅ `feature_names.pkl` - Feature metadata

#### 4️⃣ Start API Server
**Open Terminal 1:**
```bash
cd D:\TEAM_HEIST
python claim_denial_api.py
```

**Expected Output:**
```
✓ Model and encoders loaded successfully!
✓ SHAP explainer loaded successfully!
✓ Feature metadata loaded successfully!
Starting Claim Denial Prediction API...
Documentation available at: http://localhost:8000/docs
INFO:     Started server process [XXXX]
INFO:     Application startup complete.
```

#### 5️⃣ Start React Dashboard
**Open Terminal 2:**
```bash
cd D:\TEAM_HEIST\rcm_dashboard
npm start
```

**Expected Output:**
```
Starting the development server...
Compiled successfully!

You can now view rcm_dashboard in the browser.

  Local:            http://localhost:3000
  On Your Network:  http://192.168.x.x:3000
```

**Browser will open automatically to dashboard!**

---

## 🌐 Access Points

Once everything is running:

| What | URL | Description |
|------|-----|-------------|
| **React Dashboard** | http://localhost:3000 | Main user interface |
| **API Docs** | http://localhost:8000/docs | Interactive API tester |
| **API Root** | http://localhost:8000/ | API health check |
| **Predictions** | POST http://localhost:8000/predict | Make predictions |
| **SHAP Status** | http://localhost:8000/shap/status | Check SHAP availability |

---

## 🧪 Testing It Works

### Test 1: Check if API is Running
```bash
curl http://localhost:8000/
```

Should return:
```json
{
  "message": "Claim Denial Prediction API",
  "version": "1.0.0",
  "status": "running"
}
```

### Test 2: Make a Prediction
```bash
curl -X POST http://localhost:8000/predict \
  -H "Content-Type: application/json" \
  -d '{
    "patient_age": 50,
    "insurance_type": "Medicare",
    "procedure_code": "PROC_B",
    "diagnosis_code": "DX2",
    "provider_type": "Hospital",
    "claim_amount": 1000,
    "prior_authorization": "no",
    "documentation_complete": "yes",
    "coding_accuracy_score": 0.85,
    "claim_submission_delay_days": 3,
    "payer": "BlueCross"
  }'
```

Should return prediction with SHAP data!

### Test 3: Check SHAP Status
```bash
curl http://localhost:8000/shap/status
```

Should return:
```json
{
  "shap_available": true,
  "explainer_loaded": true,
  "message": "SHAP feature importance analysis is available"
}
```

### Test 4: Visit Dashboard
Open browser: **http://localhost:3000**

Should show:
- RCM Denial Predictor dashboard
- Beautiful dark theme
- Claim form on the left
- Results area on the right

---

## ⚠️ Common Issues & Fixes

### Issue 1: "Port Already in Use"
**Error:**
```
[Errno 10048] error while attempting to bind on address... only one usage of each socket address
```

**Solution:**
```bash
# Kill the process on port 8000
netstat -ano | findstr :8000
taskkill /PID <PID> /F

# Or use a different port
# Edit claim_denial_api.py last line:
# uvicorn.run(app, host="0.0.0.0", port=8001)
```

### Issue 2: Module Not Found (shap, matplotlib, etc.)
**Error:**
```
ModuleNotFoundError: No module named 'shap'
```

**Solution:**
```bash
pip install --upgrade shap matplotlib imbalanced-learn
```

### Issue 3: Dependencies Conflict
**Error:**
```
ERROR: pip's dependency resolver does not take into account...
```

**Solution:**
```bash
pip uninstall numpy pandas scikit-learn -y
pip install -r requirements.txt
```

### Issue 4: React Dashboard Won't Start
**Error:**
```
npm ERR! 404 Not Found
```

**Solution:**
```bash
cd D:\TEAM_HEIST\rcm_dashboard
rm -r node_modules
npm install
npm start
```

### Issue 5: Model Files Missing
**Error:**
```
FileNotFoundError: denial_model.pkl not found
```

**Solution:**
```bash
# Re-run the training script
cd D:\TEAM_HEIST
python predict_claim_denials.py
```

---

## 🎯 What Each Component Does

### 1. `predict_claim_denials.py`
- Loads healthcare claims dataset
- Trains RandomForest model
- Initializes SHAP explainer
- Saves all models to .pkl files
- **Run once** before starting API

### 2. `claim_denial_api.py`
- FastAPI server with REST endpoints
- Loads trained model and SHAP explainer
- Handles prediction requests
- Returns SHAP feature contributions
- **Run continuously** in background

### 3. React Dashboard (`npm start`)
- Beautiful UI for making predictions
- Displays SHAP feature analysis
- Shows analytics and charts
- **Run continuously** in background

---

## 📊 Expected Behavior

### Dashboard Flow:
1. **Fill Form** - Enter patient/claim details
2. **Click Predict** - Send to API
3. **Get Results** - See:
   - Risk level (Low/Medium/High)
   - Denial probability
   - Model confidence
   - **SHAP Feature Impact** ✨
   - Recommended actions

### SHAP Feature Impact Card Shows:
- Top 6 features affecting prediction
- Red bars = increases denial risk
- Green bars = decreases denial risk
- Feature values and contribution %

---

## 🚀 Running in Production

### With Gunicorn (Production API):
```bash
pip install gunicorn
gunicorn -w 4 -b 0.0.0.0:8000 claim_denial_api:app
```

### With PM2 (Process Management):
```bash
npm install -g pm2
pm2 start claim_denial_api.py --name "RCM-API"
pm2 start "npm start" --cwd rcm_dashboard --name "RCM-Dashboard"
pm2 list
```

### Docker (Optional):
```bash
docker build -t rcm-predictor .
docker run -p 8000:8000 rcm-predictor
```

---

## 💻 System Requirements

- **Python**: 3.8 or higher
- **Node.js**: 14+
- **npm**: 6+
- **RAM**: 2GB minimum (4GB recommended)
- **Disk**: 500MB free space
- **Port 3000**: For React dashboard
- **Port 8000**: For API server

---

## 📱 Using from Another Machine

### If on Same Network:
```bash
# Get your machine IP
ipconfig

# Access from other machine:
# Dashboard: http://<YOUR_IP>:3000
# API Docs: http://<YOUR_IP>:8000/docs
```

### From Python Script:
```python
import requests

response = requests.post('http://localhost:8000/predict', json={
    'patient_age': 45,
    'insurance_type': 'Private',
    'procedure_code': 'PROC_A',
    'diagnosis_code': 'DX1',
    'provider_type': 'Specialist',
    'claim_amount': 500,
    'prior_authorization': 'yes',
    'documentation_complete': 'yes',
    'coding_accuracy_score': 0.95,
    'claim_submission_delay_days': 5,
    'payer': 'Cigna'
})

result = response.json()
print(f"Denial Probability: {result['denial_probability']}")
print(f"Risk Level: {result['risk_level']}")
```

---

## 📖 Quick Commands Reference

| Task | Command |
|------|---------|
| Install dependencies | `pip install -r requirements.txt` |
| Train model | `python predict_claim_denials.py` |
| Start API | `python claim_denial_api.py` |
| Start Dashboard | `cd rcm_dashboard && npm start` |
| API Docs | Open http://localhost:8000/docs |
| Test API | `curl http://localhost:8000/` |
| Stop API | Ctrl+C in terminal |
| Stop Dashboard | Ctrl+C in terminal |
| Check Python version | `python --version` |
| Check npm version | `npm --version` |

---

## ✅ Verification Checklist

After running everything:

- [ ] Terminal 1 shows "Application startup complete"
- [ ] Terminal 2 shows "Compiled successfully!"
- [ ] Browser opens to http://localhost:3000
- [ ] Dashboard loads with form visible
- [ ] Can fill form and click "Predict"
- [ ] Results show with SHAP visualization
- [ ] API Docs visible at http://localhost:8000/docs

If all checkboxes pass: **✅ SYSTEM WORKING PERFECTLY!**

---

## 🆘 Need Help?

Check these files for clues:
- API errors → Look in Terminal 1 output
- Dashboard errors → Look in Terminal 2 output
- Model errors → Check Terminal where you ran python
- See logs in browser console → Open DevTools (F12)

Ask questions starting with:
- "Why is..." 
- "How do I..."
- "Can I..."
- "Error says..."

---

**Status**: Ready to run! Follow the 3-step Quick Start above. 🚀
