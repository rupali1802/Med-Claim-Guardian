# RCM Denial Prediction Dashboard

A modern React-based dashboard for Revenue Cycle Management (RCM) that predicts healthcare claim denials using machine learning.

## Features

- **Interactive Claim Input Form**: Submit claim details with real-time validation
- **Real-time Predictions**: ML model predictions with confidence scores
- **Risk Assessment**: Color-coded risk levels (Low, Medium, High)
- **Analytics Dashboard**: 
  - Denial trends by payer
  - Denial trends by procedure code
  - Risk distribution analysis
  - Recent predictions table
- **Key Metrics**: KPIs including average denial rate, high-risk claims, and approval rates
- **Responsive Design**: Works seamlessly on desktop, tablet, and mobile

## Tech Stack

- **Frontend**: React 18
- **Styling**: Tailwind CSS
- **HTTP Client**: Axios
- **Charts**: Chart.js with react-chartjs-2
- **Build Tool**: Create React App

## Prerequisites

- Node.js (v14 or higher)
- npm or yarn
- The FastAPI backend running on `http://localhost:8000`

## Installation

### 1. Install Dependencies

```bash
cd rcm_dashboard
npm install
```

Or with yarn:
```bash
yarn install
```

### 2. Ensure Backend is Running

Make sure the FastAPI backend is running:
```bash
# From the parent TEAM_HEIST directory
python claim_denial_api.py
```

The API should be available at `http://localhost:8000`

### 3. Start the Dashboard

```bash
npm start
```

The app will open at `http://localhost:3000`

## Usage

### Submitting a Claim

1. Fill out the claim information form on the left side:
   - Patient age
   - Insurance type
   - Procedure code
   - Diagnosis code
   - Provider type
   - Claim amount
   - Prior authorization status
   - Documentation completeness
   - Coding accuracy score
   - Submission delay (days)
   - Payer name

2. Click the **"Predict"** button

3. View the prediction results in the middle panel:
   - Denial probability percentage
   - Risk level (Low/Medium/High)
   - Model confidence score
   - Recommended actions
   - Processing recommendation (Process/Review/Escalate)

### Analyzing Trends

The Analytics section displays:

- **Denial Rate by Payer**: Bar chart showing denial rates for each insurance payer
- **Denial Trend by Procedure**: Line chart showing denial trends across procedure codes
- **Risk Distribution**: Doughnut chart showing the breakdown of claims by risk level
- **Recent Predictions**: Table of the latest predictions made
- **Key Metrics**: Cards showing average denial rate, high-risk claims count, total claims, and approval rate

## Form Fields & Valid Values

### Categorical Fields

| Field | Valid Options |
|-------|----------------|
| **Insurance Type** | Medicaid, Medicare, Private |
| **Procedure Code** | PROC_A, PROC_B, PROC_C, PROC_D, PROC_E |
| **Diagnosis Code** | DX1, DX2, DX3, DX4, DX5 |
| **Provider Type** | Hospital, Specialist, Clinic, Diagnostic Center |
| **Prior Authorization** | yes, no |
| **Documentation Complete** | yes, no |
| **Payer** | Star Health, HDFC ERGO, ICICI Lombard, Bajaj Allianz, New India Assurance |

### Numeric Fields

| Field | Type | Range |
|-------|------|-------|
| **Patient Age** | Number | 1-120 |
| **Claim Amount** | Decimal | 0+ |
| **Coding Accuracy Score** | Decimal (%) | 0-1 (slider) |
| **Submission Delay Days** | Number | 0-365 |

## Risk Level Interpretation

- **Low Risk** (< 33%): Claim is likely to be approved - Process normally
- **Medium Risk** (33-67%): Claim has moderate denial risk - Review before submission
- **High Risk** (> 67%): Claim is at significant denial risk - Escalate for investigation

## File Structure

```
rcm_dashboard/
├── public/
│   └── index.html
├── src/
│   ├── components/
│   │   ├── ClaimForm.js
│   │   ├── PredictionResult.js
│   │   └── DenialAnalytics.js
│   ├── App.js
│   ├── index.js
│   └── index.css
├── tailwind.config.js
├── postcss.config.js
├── package.json
├── .gitignore
└── README.md
```

## Component Details

### ClaimForm.js
Handles all user input for claim information:
- Form validation
- Type conversion for numeric fields
- Dropdown selections for categorical fields
- Slider for coding accuracy score
- Submit and reset functionality

### PredictionResult.js
Displays prediction results:
- Risk level with color coding
- Denial probability percentage
- Confidence score visualization
- Recommended actions
- Processing recommendations

### DenialAnalytics.js
Shows analytics and trends:
- Bar chart: Denial rates by payer
- Line chart: Denial trends by procedure
- Doughnut chart: Risk distribution
- Recent predictions table
- Key performance indicators (KPIs)

## API Integration

The dashboard communicates with the FastAPI backend via:

```javascript
POST /predict
```

**Request Format:**
```json
{
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
```

**Response Format:**
```json
{
  "denial_probability": 0.13,
  "risk_level": "Low",
  "suggested_action": "Claim appears compliant",
  "confidence_score": 0.87
}
```

## Customization

### Changing the API URL

Edit `src/App.js`:
```javascript
const API_URL = 'http://localhost:8000'; // Change this
```

### Styling Customization

Modify `tailwind.config.js` to change colors, breakpoints, and other Tailwind settings:
```javascript
theme: {
  extend: {
    colors: {
      "risk-low": "#10b981",    // Green
      "risk-medium": "#f59e0b", // Amber
      "risk-high": "#ef4444",   // Red
    },
  },
}
```

### Adding New Fields

1. Update `CATEGORICAL_OPTIONS` in `ClaimForm.js`
2. Add form input in `ClaimForm.js`
3. Update form state initialization
4. Update backend `/predict` endpoint to accept new fields

## Troubleshooting

### "Failed to get prediction" Error

**Issue**: API connection fails
- Ensure FastAPI backend is running: `python claim_denial_api.py`
- Check that backend is accessible at `http://localhost:8000`
- Verify CORS is enabled in the backend

**Fix**: 
```bash
# Backend should show: "Uvicorn running on http://0.0.0.0:8000"
```

### Invalid categorical value error

**Issue**: Selected values don't match dataset options

**Fix**: Always select from the provided dropdown options

### Port 3000 already in use

**Issue**: Port 3000 is occupied by another process

**Fix**:
```bash
# Change port
PORT=3001 npm start
```

Or kill the process using port 3000:
```bash
# Windows
netstat -ano | findstr :3000
taskkill /PID <PID> /F

# Mac/Linux
lsof -i :3000
kill -9 <PID>
```

## Performance Tips

1. **Reduce Analytics Data**: Limit `recentPredictions` array if dashboard slows down
2. **Memoize Components**: Use `React.memo()` for heavy components
3. **Lazy Load Charts**: Import Chart.js components only when needed
4. **Optimize Images**: Minimize bundle size for production

## Building for Production

```bash
npm run build
```

This creates an optimized production build in the `build/` directory.

## Deployment Options

- **Vercel**: `vercel deploy`
- **Netlify**: `netlify deploy --prod --dir=build`
- **GitHub Pages**: Configure for React app deployment
- **Docker**: Create a Dockerfile for containerization

## Future Enhancements

- [ ] Export predictions to CSV
- [ ] Historical trend analysis
- [ ] Batch claim processing
- [ ] User authentication
- [ ] Dark mode
- [ ] Real-time notifications
- [ ] Machine learning model retraining dashboard
- [ ] Custom date range filtering

## License

This project is proprietary software for RCM Denial Prediction System.

## Support

For issues or questions:
1. Check the Troubleshooting section
2. Review the FastAPI README
3. Verify data format matches examples
4. Check browser console for errors

## Related Documentation

- [FastAPI Backend README](../API_README.md)
- [Quick Start Guide](../QUICK_START.md)
- [ML Pipeline Documentation](../README.md)

---

Built with React, Tailwind CSS, and Chart.js ♥️
