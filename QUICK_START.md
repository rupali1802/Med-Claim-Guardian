# ⚡ QUICK START - RUN THE SYSTEM IN 3 STEPS

## ✅ STEP 1: Install Dependencies (Run Once)
```bash
cd D:\TEAM_HEIST
pip install -r requirements.txt
```
⏱️ **Takes 1-2 minutes**  
✅ **Output**: Shows "Successfully installed..." messages

---

## ✅ STEP 2: Train the Model (Run Once)
```bash
python predict_claim_denials.py
```
⏱️ **Takes 10-15 seconds**  
✅ **Output**: Shows "Pipeline Complete!" at the end

---

## ✅ STEP 3: Start the System (Opens Everything)

**Open 2 separate terminals:**

### Terminal 1: Start API Server
```bash
cd D:\TEAM_HEIST
python claim_denial_api.py
```

✅ **Look for**: `Application startup complete`  
✅ **API URL**: http://localhost:8000  
✅ **API Docs**: http://localhost:8000/docs

---

### Terminal 2: Start React Dashboard
```bash
cd D:\TEAM_HEIST\rcm_dashboard
npm start
```

✅ **Look for**: `Compiled successfully!`  
✅ **Dashboard URL**: http://localhost:3000  
✅ **Browser**: Opens automatically

---

## 🎉 DONE! System is Running!

| Component | URL | Status |
|-----------|-----|--------|
| React Dashboard | http://localhost:3000 | ✅ Running |
| API Server | http://localhost:8000 | ✅ Running |
| API Documentation | http://localhost:8000/docs | ✅ Available |
| SHAP Status | http://localhost:8000/shap/status | ✅ Available |

---

## 🧪 Test It Works

### Test 1: API Health Check
```bash
curl http://localhost:8000/
```
Should return: `{"message": "Claim Denial Prediction API", "version": "1.0.0", "status": "running"}`

### Test 2: Check SHAP
```bash
curl http://localhost:8000/shap/status
```
Should return: `{"shap_available": true, "explainer_loaded": true}`

### Test 3: Visit Dashboard
Open: **http://localhost:3000**  
Should see: Beautiful dark-themed form on left, results area on right

---

## 🚀 How to Use

1. **Fill the form** on the left with patient/claim details
2. **Click "Predict"** button
3. **See results** including:
   - Risk level indicator
   - Denial probability %
   - Model confidence score
   - 🧠 **SHAP Feature Impact** (which factors matter most)
   - Recommended actions

---

## ⚠️ Common Issues & Quick Fixes

| Problem | Solution |
|---------|----------|
| "Port 8000 in use" | Kill process: `Get-Process -ID <PID> \| Stop-Process -Force` |
| "Port 3000 in use" | Kill process: `taskkill /PID <PID> /F` |
| "Module not found" | Run: `pip install -r requirements.txt` again |
| "Model not found" | Run: `python predict_claim_denials.py` |
| Dashboard won't load | Check Terminal 2 for errors, refresh browser (Ctrl+R) |
| Form won't submit | Check Terminal 1 for API errors, try different values |

---

## 📊 What's Running

### API Server (Terminal 1)
- Runs ML model predictions
- Provides SHAP feature analysis
- Handles 100+ requests/second
- REST API with automatic documentation

### React Dashboard (Terminal 2)
- Beautiful user interface
- Real-time prediction display
- SHAP visualization cards
- Analytics and insights
- Professional dark theme

### ML Model (Background)
- 72.2% accurate denial prediction
- RandomForest classifier
- SHAP explainability engine
- Runs <150ms per prediction

---

## 💡 Tips

✅ Keep both terminals open while using the system  
✅ If something breaks, restart both terminals  
✅ API automatically reloads on code changes (watch mode)  
✅ Dashboard development server watches for changes  
✅ Use Ctrl+C to stop either service  

---

## 📱 Access from Other Computers

**Same network?**
1. Get your IP: `ipconfig` → Look for IPv4 Address
2. On other computer, use: `http://<YOUR_IP>:3000`
3. Access API docs: `http://<YOUR_IP>:8000/docs`

---

## 🎯 Next Steps

After running:
- [ ] Visit http://localhost:3000
- [ ] Fill in the form with test data
- [ ] Click "Predict"
- [ ] See the SHAP analysis showing feature impact
- [ ] Try different inputs to see how predictions change
- [ ] Check API docs at http://localhost:8000/docs

---

**Status**: ✅ Ready to go! Run the 3 steps above to launch.

### Step 3: Start the API Server
```bash
python claim_denial_api.py
```
This will start the server at `http://localhost:8000`

### Step 4: Test the API
In another terminal, run:
```bash
python example_client.py
```

### Step 5: Access Interactive Documentation
Open in your browser:
- **Swagger UI**: http://localhost:8000/docs
- **ReDoc**: http://localhost:8000/redoc

---

## API Usage

### Simple Python Example
```python
import requests

response = requests.post("http://localhost:8000/predict", json={
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
})

result = response.json()
print(f"Denial Probability: {result['denial_probability']}")
print(f"Risk Level: {result['risk_level']}")
print(f"Action: {result['suggested_action']}")
```

### Output
```json
{
  "denial_probability": 0.13,
  "risk_level": "Low",
  "suggested_action": "Claim appears compliant",
  "confidence_score": 0.87
}
```

---

## Model Performance

- **Accuracy**: 72.20%
- **Precision**: 70.95%
- **Recall**: 72.20%

### Most Important Features for Denial Prediction
1. Coding Accuracy Score (17.1%)
2. Claim Submission Delay Days (16.2%)
3. Claim Amount (15.6%)
4. Patient Age (14.3%)

---

## Valid Categorical Values

When making API requests, use these exact values:

| Field | Valid Values |
|-------|--------------|
| **insurance_type** | `Medicaid`, `Medicare`, `Private` |
| **procedure_code** | `PROC_A`, `PROC_B`, `PROC_C`, `PROC_D`, `PROC_E` |
| **diagnosis_code** | `DX1`, `DX2`, `DX3`, `DX4`, `DX5` |
| **provider_type** | `Hospital`, `Specialist`, `Clinic`, `Diagnostic Center` |
| **prior_authorization** | `yes`, `no` |
| **documentation_complete** | `yes`, `no` |
| **payer** | `Cigna`, `UnitedHealth`, `BlueCross`, `Aetna`, `Kaiser` |

---

## Risk Levels

- **Low** (< 0.33 probability): Claim is likely to be approved
- **Medium** (0.33-0.67 probability): Claim has moderate denial risk
- **High** (> 0.67 probability): Claim is at high risk of denial

---

## Troubleshooting

### API won't start
- Ensure FastAPI and uvicorn are installed: `pip install fastapi uvicorn`
- Check that port 8000 is available
- Try a different port: `uvicorn claim_denial_api:app --port 8001`

### "Model not found" error
- Run the training script first: `python predict_claim_denials.py`
- Ensure `denial_model.pkl` and `label_encoders.pkl` exist in the same directory

### "Invalid value" errors
- Check that categorical values match the list above (case-sensitive)
- For prior_authorization and documentation_complete, use lowercase: `yes`, `no`

---

## Architecture

```
synthetic_healthcare_claims_dataset.csv
    ↓
    python predict_claim_denials.py
    ↓
[denial_model.pkl + label_encoders.pkl]
    ↓
    python claim_denial_api.py
    ↓
FastAPI Server (port 8000)
    ↓
/predict endpoint
```

The pipeline provides a complete solution for:
1. Training ML models on healthcare claims data
2. Serving predictions via REST API
3. Making data-driven decisions about claim processing
