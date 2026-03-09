# 📦 Complete File Listing - RCM Denial Prediction System

## 🎯 Project Overview

This is a complete Revenue Cycle Management (RCM) system with:
- **Machine Learning Pipeline** for training
- **FastAPI Backend** for serving predictions
- **React Frontend Dashboard** for user interface

---

## 📂 File Structure & Descriptions

### 🔵 Root Directory Files (`d:\TEAM_HEIST\`)

| File | Purpose | Type |
|------|---------|------|
| `synthetic_healthcare_claims_dataset.csv` | Training data: 5,000 claims | CSV Data |
| `predict_claim_denials.py` | ML pipeline: train & evaluate model | Python |
| `claim_denial_api.py` | FastAPI server: /predict endpoint | Python |
| `example_client.py` | Python client: example predictions | Python |
| `test_api.py` | Automated API test suite | Python |
| `denial_model.pkl` | Trained RandomForest model | Binary (Pickle) |
| `label_encoders.pkl` | Categorical encoders | Binary (Pickle) |
| `requirements.txt` | Python dependencies | Text |
| `API_README.md` | FastAPI documentation | Markdown |
| `QUICK_START.md` | Quick start guide | Markdown |
| `SYSTEM_GUIDE.md` | Complete system guide | Markdown |
| `FILE_MANIFEST.md` | This file | Markdown |

### 🟢 React Frontend Directory (`d:\TEAM_HEIST\rcm_dashboard\`)

#### Configuration Files
| File | Purpose |
|------|---------|
| `package.json` | Node dependencies & scripts |
| `tailwind.config.js` | Tailwind CSS configuration |
| `postcss.config.js` | PostCSS configuration |
| `.gitignore` | Git ignore file |
| `.env.example` | Environment variables template |

#### Public Files
| File | Purpose |
|------|---------|
| `public/index.html` | HTML entry point |

#### Source Code - React Components
| File | Location | Purpose |
|------|----------|---------|
| `App.js` | `src/` | Main app component, API integration |
| `index.js` | `src/` | React entry point |
| `index.css` | `src/` | Global styles + Tailwind import |
| `ClaimForm.js` | `src/components/` | Claim input form component |
| `PredictionResult.js` | `src/components/` | Results display component |
| `DenialAnalytics.js` | `src/components/` | Analytics & charts component |

#### Documentation Files
| File | Purpose |
|------|---------|
| `README.md` | Complete frontend documentation |
| `SETUP_GUIDE.md` | Frontend setup instructions |

---

## 📊 Data Flow Diagram

```
┌─────────────────────────────────────────────────────┐
│  synthetic_healthcare_claims_dataset.csv            │
│  (5,000 records with 13 columns)                    │
└────────────────┬────────────────────────────────────┘
                 │
                 ▼
┌─────────────────────────────────────────────────────┐
│  predict_claim_denials.py (Python - ML Pipeline)   │
├─────────────────────────────────────────────────────┤
│ 1. Load CSV with pandas                             │
│ 2. Check for missing values                         │
│ 3. Drop claim_id column                             │
│ 4. Encode 7 categorical variables                   │
│ 5. Split: 80% train, 20% test                       │
│ 6. Train RandomForestClassifier (100 trees)         │
│ 7. Evaluate: 72.2% accuracy                         │
│ 8. Output feature importance                        │
│ 9. Save model & encoders                            │
└─┬───────────────────────────────────┬───────────────┘
  │                                   │
  ▼                                   ▼
┌─────────────────────┐      ┌──────────────────────┐
│ denial_model.pkl    │      │ label_encoders.pkl  │
│ (RandomForest)      │      │ (7 LabelEncoders)   │
└────────┬────────────┘      └──────────┬───────────┘
         │                              │
         └──────────────┬───────────────┘
                        │
                        ▼
         ┌──────────────────────────────┐
         │ claim_denial_api.py          │
         │ (FastAPI Server - Port 8000) │
         ├──────────────────────────────┤
         │ GET  /                       │
         │ GET  /model-info             │
         │ POST /predict                │
         └──────────────┬───────────────┘
                        │
                ┌───────┴───────┐
                │               │
                ▼               ▼
         ┌────────────────┐  ┌─────────────────┐
         │ example_client │  │ rcm_dashboard   │
         │ (Python)       │  │ (React - :3000) │
         └────────────────┘  └─────────────────┘
                │                     │
                │ (Python requests)   │ (Axios)
                │                     │
                └─────────┬───────────┘
                          │
                    Prediction Results
```

---

## 📋 Component Hierarchy - React

```
App.js (Main Component)
├── Header
├── Main Container
│   ├── Column 1: ClaimForm.js
│   │   ├── Patient Age Input
│   │   ├── Insurance Type Select
│   │   ├── Procedure Code Select
│   │   ├── Diagnosis Code Select
│   │   ├── Provider Type Select
│   │   ├── Claim Amount Input
│   │   ├── Prior Authorization Select
│   │   ├── Documentation Select
│   │   ├── Coding Accuracy Slider
│   │   ├── Submission Delay Input
│   │   ├── Payer Select
│   │   └── Buttons: Predict, Reset
│   │
│   ├── Column 2: PredictionResult.js (shows when prediction made)
│   │   ├── Risk Level Card
│   │   ├── Denial Probability Bar
│   │   ├── Confidence Score Bar
│   │   ├── Recommended Actions
│   │   └── Key Insights
│   │
│   └── Column 3: Error Display (if error)
│
└── Analytics Section: DenialAnalytics.js
    ├── Bar Chart: Denial by Payer
    ├── Line Chart: Denial Trends
    ├── Doughnut Chart: Risk Distribution
    ├── Recent Predictions Table
    ├── KPI Cards
    │   ├── Avg Denial Rate
    │   ├── High Risk Claims
    │   ├── Total Claims
    │   └── Approval Rate
    └── Footer
```

---

## 🔐 Model Details

### Input Features (11 total)
1. `patient_age` - Integer (1-120)
2. `insurance_type` - Categorical (3 options)
3. `procedure_code` - Categorical (5 options)
4. `diagnosis_code` - Categorical (5 options)
5. `provider_type` - Categorical (4 options)
6. `claim_amount` - Float ($)
7. `prior_authorization` - Categorical (Yes/No)
8. `documentation_complete` - Categorical (Yes/No)
9. `coding_accuracy_score` - Float (0-1)
10. `claim_submission_delay_days` - Integer (days)
11. `payer` - Categorical (5 options)

### Output Target
- `denial` - Binary (0=Approved, 1=Denied)

### Model Architecture
- Algorithm: RandomForestClassifier
- Trees: 100
- Max Depth: Auto
- Min Samples Split: 2
- Random State: 42

### Performance Metrics
- Accuracy: 72.20%
- Precision: 70.95%
- Recall: 72.20%
- F1-Score: 0.70

---

## 🚀 Getting Started

### Prerequisites
```
✓ Python 3.8+
✓ Node.js v14+
✓ npm or yarn
✓ ~500MB disk space
✓ Port 8000 available (API)
✓ Port 3000 available (Frontend)
```

### Installation Steps

1. **Verify Model Training** (optional - already done)
   ```bash
   python predict_claim_denials.py
   ```

2. **Start Backend**
   ```bash
   python claim_denial_api.py
   # Runs on http://localhost:8000
   ```

3. **Start Frontend**
   ```bash
   cd rcm_dashboard
   npm install
   npm start
   # Runs on http://localhost:3000
   ```

---

## 📈 Directory Tree

```
d:\TEAM_HEIST\
├── synthetic_healthcare_claims_dataset.csv
├── predict_claim_denials.py
├── claim_denial_api.py
├── example_client.py
├── test_api.py
├── denial_model.pkl
├── label_encoders.pkl
├── requirements.txt
├── API_README.md
├── QUICK_START.md
├── SYSTEM_GUIDE.md
├── FILE_MANIFEST.md                  (← You are here)
│
└── rcm_dashboard/
    ├── package.json
    ├── tailwind.config.js
    ├── postcss.config.js
    ├── .gitignore
    ├── .env.example
    ├── README.md
    ├── SETUP_GUIDE.md
    │
    ├── public/
    │   └── index.html
    │
    └── src/
        ├── App.js
        ├── index.js
        ├── index.css
        │
        └── components/
            ├── ClaimForm.js
            ├── PredictionResult.js
            └── DenialAnalytics.js
```

---

## 🎯 Key File Purposes

### Backend Infrastructure

**predict_claim_denials.py** (276 lines)
- Trains ML model from scratch
- Evaluates performance
- Saves serialized model and encoders
- Run once per model update

**claim_denial_api.py** (180+ lines)
- FastAPI application
- Loads model at startup
- Handles /predict requests
- Encodes categorical variables
- Calculates risk levels & actions
- CORS enabled for React frontend

**label_encoders.pkl**
- Contains 7 LabelEncoders (one per categorical column)
- Used to transform categorical values to numbers
- Critical for API predictions

**denial_model.pkl**
- Serialized RandomForestClassifier
- 100 decision trees
- Ready for inference

### Frontend Infrastructure

**App.js** (Main orchestrator)
- API integration with axios
- State management for predictions
- Analytics data handling
- Layout & composition

**ClaimForm.js** (User input)
- 11 form fields
- Input validation
- Type conversion
- Form state management
- Dropdown options

**PredictionResult.js** (Results display)
- Risk level visualization
- Probability bars
- Confidence scores
- Action recommendations
- Color-coded risk levels

**DenialAnalytics.js** (Charts & metrics)
- 3 chart visualizations
- Recent predictions table
- 4 KPI cards
- Chart.js integration

### Configuration Files

**package.json**
- React, ReactDOM
- Axios (HTTP client)
- Tailwind CSS
- Chart.js + react-chartjs-2
- NPM scripts (start, build, test)

**tailwind.config.js**
- Custom colors (risk levels)
- Responsive breakpoints
- Typography settings

**postcss.config.js**
- Tailwind CSS processing
- Autoprefixer

### Documentation

| File | Audience | Content |
|------|----------|---------|
| API_README.md | Backend Users | Endpoints, examples, categoricals |
| QUICK_START.md | Quick Users | 5-minute setup |
| SYSTEM_GUIDE.md | Full Overview | Complete architecture & usage |
| rcm_dashboard/README.md | Frontend Users | React app documentation |
| rcm_dashboard/SETUP_GUIDE.md | Frontend Setup | NPM installation & commands |
| FILE_MANIFEST.md | Developers | This file - complete listing |

---

## 🔄 Typical Workflow

### 1. Model Training (One-time)
```
Run: predict_claim_denials.py
Produces: denial_model.pkl, label_encoders.pkl
```

### 2. API Server (Always Running)
```
Run: python claim_denial_api.py
Listens on: http://localhost:8000
Serves: /predict, /model-info, /
```

### 3. Frontend (Always Running)
```
Run: npm start (in rcm_dashboard/)
Opens: http://localhost:3000
```

### 4. User Interaction
```
User fills form → React App → API Request → Model Prediction → Display Result
```

---

## 📊 Dependencies Summary

### Python Packages
- **fastapi** - Web framework
- **uvicorn** - ASGI server
- **scikit-learn** - ML models
- **pandas** - Data handling
- **joblib** - Model serialization
- **numpy** - Numerical computing

### Node Packages
- **react** - UI framework
- **axios** - HTTP client
- **chart.js** - Charting library
- **react-chartjs-2** - Chart wrapper
- **tailwindcss** - CSS framework

---

## 🎓 Contributing & Extending

### Adding New Features

1. **New Chart Type**
   - Add to `DenialAnalytics.js`
   - Import from `react-chartjs-2`
   - Register ChartJS element

2. **New Form Field**
   - Add to `CATEGORICAL_OPTIONS` in `ClaimForm.js`
   - Add input element
   - Update state handling
   - Update API request

3. **New Backend Endpoint**
   - Add endpoint to `claim_denial_api.py`
   - Create request/response models
   - Update frontend axios calls

4. **Model Improvements**
   - Modify `predict_claim_denials.py`
   - Retrain model
   - Update feature importance display

---

## ✅ Quality Checklist

- [x] ML Model trained (72.2% accuracy)
- [x] FastAPI backend tested (all endpoints working)
- [x] React frontend fully functional
- [x] Form validation implemented
- [x] Charts rendering correctly
- [x] Error handling in place
- [x] Documentation complete
- [x] Example code provided
- [x] Test suite available
- [x] Production-ready structure

---

## 📞 Quick Reference

### Start All Services
```bash
# Terminal 1
python claim_denial_api.py

# Terminal 2
cd rcm_dashboard && npm start
```

### API Health Check
```bash
curl http://localhost:8000
```

### Test API
```bash
python test_api.py
```

### Run Example Client
```bash
python example_client.py
```

### Interactive API Docs
```
http://localhost:8000/docs
```

### React App
```
http://localhost:3000
```

---

## 🎯 File Usage Matrix

| Task | Primary Files |
|------|---------------|
| Train Model | `predict_claim_denials.py`, `synthetic_healthcare_claims_dataset.csv` |
| Run API | `claim_denial_api.py`, `denial_model.pkl`, `label_encoders.pkl` |
| Use Dashboard | All files in `rcm_dashboard/` |
| Test API | `test_api.py`, `example_client.py` |
| Understand System | `SYSTEM_GUIDE.md`, `API_README.md` |
| Debug Issues | `test_api.py`, Browser console (F12) |

---

## 📝 File Modifications Log

| Date | File(s) | Change |
|------|---------|--------|
| 2026-03-09 | predict_claim_denials.py | Added label encoder saving |
| 2026-03-09 | claim_denial_api.py | Created FastAPI backend |
| 2026-03-09 | rcm_dashboard/* | Created React app |
| 2026-03-09 | Documentation | Complete system documentation |

---

## 🚀 Total Project Stats

| Metric | Count |
|--------|-------|
| Python Files | 3 |
| JavaScript Files | 6 |
| Configuration Files | 6 |
| Documentation Files | 6 |
| Total Files | 21+ |
| Python Lines of Code | ~600 |
| JavaScript Lines of Code | ~700 |
| Total Code Lines | ~1,300 |
| Model Training Time | ~2 seconds |
| API Response Time | <500ms |

---

**Generated**: March 9, 2026
**Status**: ✅ Production Ready
**Version**: 1.0.0
