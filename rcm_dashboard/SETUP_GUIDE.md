# RCM Dashboard - Setup & Run Guide

## 🚀 Quick Start (5 minutes)

### Prerequisites
- Node.js installed (v14+)
- FastAPI backend running on port 8000
- npm or yarn

### Step 1: Install Dependencies
```bash
cd rcm_dashboard
npm install
```

### Step 2: Start Frontend
```bash
npm start
```

The dashboard opens automatically at `http://localhost:3000`

---

## 📋 Complete Setup Instructions

### 1. Verify Backend is Running

```bash
# From parent TEAM_HEIST directory
python claim_denial_api.py
```

You should see:
```
Starting Claim Denial Prediction API...
Documentation available at: http://localhost:8000/docs
INFO:     Uvicorn running on http://0.0.0.0:8000
```

### 2. Navigate to Dashboard Directory

```bash
cd rcm_dashboard
```

### 3. Install Node Dependencies

```bash
npm install
```

This installs:
- react@18.2.0
- react-dom@18.2.0
- axios@1.6.0
- chart.js@4.4.0
- react-chartjs-2@5.2.0
- tailwindcss@3.3.0

### 4. Start Development Server

```bash
npm start
```

Wait for compilation to complete. The app will automatically open in your default browser.

---

## 🎨 Dashboard Features

### Form Section (Left)
- **Claim Input Form** with 11 fields
- Pre-populated with sample data
- Real-time validation
- Predict and Reset buttons

### Results Section (Middle/Right)
- **Risk Assessment Card**: Shows denial probability & risk level
- **Probability Bars**: Visual representation of denial risk
- **Recommended Actions**: AI-suggested next steps
- **Key Metrics**: Processing status and recommendation

### Analytics Section (Bottom)
- **Denial by Payer**: Bar chart comparing payers
- **Denial Trends**: Line chart by procedure code
- **Risk Distribution**: Doughnut chart
- **Recent Predictions**: Table of latest predictions
- **KPIs**: Average denial rate, high-risk claims, etc.

---

## 📊 Making a Prediction

1. **Fill the Form**
   ```
   Patient Age: 45
   Insurance Type: Private
   Procedure Code: PROC_A
   Diagnosis Code: DX1
   Provider Type: Specialist
   Claim Amount: $5,000
   Prior Authorization: yes
   Documentation: yes
   Coding Accuracy: 95%
   Submission Delay: 5 days
   Payer: Star Health
   ```

2. **Click "Predict"**

3. **View Results**
   - Denial probability: 13%
   - Risk level: Low
   - Recommendation: Process

---

## 🛠️ Troubleshooting

### Port 3000 Already in Use
```bash
# Try a different port
PORT=3001 npm start

# Or kill the process (Windows)
netstat -ano | findstr :3000
taskkill /PID <PID> /F
```

### Backend Connection Error
```
Error: "Failed to get prediction. Make sure the API is running at http://localhost:8000"
```

**Solution:**
```bash
# In another terminal, start the backend
cd ..
python claim_denial_api.py
```

### Dependencies Installation Issues
```bash
# Clear npm cache
npm cache clean --force

# Delete node_modules and reinstall
rm -r node_modules
npm install
```

### CORS Error
If you see CORS errors, the backend needs to allow the frontend origin.

Backend already has CORS enabled, but if needed, restart it.

---

## 📁 Project Structure

```
rcm_dashboard/
├── public/
│   └── index.html              # HTML entry point
├── src/
│   ├── components/
│   │   ├── ClaimForm.js        # Form input component
│   │   ├── PredictionResult.js # Results display
│   │   └── DenialAnalytics.js  # Charts & analytics
│   ├── App.js                  # Main app component
│   ├── index.js                # React entry point
│   └── index.css               # Global styles + Tailwind
├── package.json                # Dependencies
├── tailwind.config.js          # Tailwind configuration
├── postcss.config.js           # PostCSS configuration
└── README.md                   # Full documentation
```

---

## 🔧 Configuration

### Change API URL

Edit `src/App.js`:
```javascript
const API_URL = 'http://localhost:8000'; // Change this line
```

### Customize Colors

Edit `tailwind.config.js`:
```javascript
colors: {
  "risk-low": "#10b981",     // Green
  "risk-medium": "#f59e0b",  // Yellow
  "risk-high": "#ef4444",    // Red
}
```

---

## 📦 Building for Production

```bash
npm run build
```

Creates optimized build in `build/` folder.

### Test Production Build Locally
```bash
npm install -g serve
serve -s build
```

Opens at `http://localhost:3000`

---

## 🚀 Deployment

### Vercel (Recommended for React)
```bash
npm install -g vercel
vercel
```

### Netlify
```bash
npm run build
# Drag 'build' folder to Netlify
```

### Docker
Create `Dockerfile`:
```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build
EXPOSE 3000
CMD ["npm", "start"]
```

Build and run:
```bash
docker build -t rcm-dashboard .
docker run -p 3000:3000 rcm-dashboard
```

---

## 🔍 Development Tips

### Debug Mode
Open browser DevTools (F12) to see console logs and errors.

### React DevTools
Chrome extension for debugging React components:
```
chrome://extensions -> React Developer Tools
```

### Hot Reload
Changes to files automatically reload without losing state.

### View API Docs
While backend is running, visit:
```
http://localhost:8000/docs
```

---

## 📝 Adding New Features

### Add a New Chart
1. Create new chart component in `src/components/`
2. Import Chart components from `react-chartjs-2`
3. Add to `DenialAnalytics.js`

### Add a New Form Field
1. Add to form state in `ClaimForm.js`
2. Create input field JSX
3. Add field to API request

### Add New Analytics
Modify mock data in `App.js` `useEffect` hook.

---

## ⚡ Performance Tips

1. **Memoize Heavy Components**
   ```javascript
   export default React.memo(MyComponent);
   ```

2. **Lazy Load Charts**
   ```javascript
   const DenialAnalytics = React.lazy(() => import('./components/DenialAnalytics'));
   ```

3. **Optimize Re-renders**
   Use `useCallback` for event handlers

---

## 🎓 Learning Resources

- [React Documentation](https://react.dev)
- [Tailwind CSS Docs](https://tailwindcss.com/docs)
- [Chart.js Docs](https://www.chartjs.org)
- [Axios Documentation](https://axios-http.com)

---

## 📞 Support Checklist

- [ ] Node.js v14+ installed
- [ ] npm install completed without errors
- [ ] FastAPI backend running on port 8000
- [ ] Frontend starts without errors
- [ ] Can submit a claim and get predictions
- [ ] Charts render properly
- [ ] No console errors (F12)

---

## Next Steps

1. ✅ Dashboard running
2. 📊 Make test predictions
3. 🎨 Customize colors/styling
4. 🚀 Deploy to production
5. 📈 Monitor denial predictions
6. 🔄 Integrate with your RCM system

---

Happy predicting! 🎯
