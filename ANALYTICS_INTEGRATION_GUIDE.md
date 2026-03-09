# 📊 Analytics Integration Guide

Complete guide for integrating claims analytics into your RCM dashboard application.

## 🎯 Overview

The analytics system consists of three layers:

1. **Data Layer** (`claims_analytics.py`) - Processes raw claims data
2. **API Layer** (`claim_denial_api.py`) - Serves analytics via REST endpoints
3. **UI Layer** (`AnalyticsIntegration.js`) - Displays analytics in React

## 🔄 Architecture

```
Claims Dataset (CSV)
       ↓
claims_analytics.py
       ↓
JSON Analytics Data
       ↓
FastAPI Endpoints
   /analytics
   /analytics/summary
   /analytics/procedures
   /analytics/payers
       ↓
React Components
       ↓
Visual Dashboard
```

## 📊 Available Data

### 1. Overall Statistics
- Total claims processed
- Denial vs approval counts
- Denial/approval rates
- Average claim amounts
- Total claim amounts

### 2. Procedure Analysis
- Top 10 procedures by denial rate
- Claims per procedure
- Denied claims per procedure

### 3. Payer Analysis
- Denial rate by insurance payer
- Claims breakdown by payer
- Approval/denial counts

### 4. Provider Analysis
- Denial rate by provider type
- Performance comparison

### 5. Claim Amount Analysis
- Average amount for denied claims
- Average amount for approved claims
- Statistical comparison

### 6. Impact Factors
- Prior authorization effect
- Documentation completeness effect

## 🚀 Quick Start

### Step 1: Generate Base Analytics

```bash
python claims_analytics.py
```

This creates `claims_analytics.json` with all analytics data.

### Step 2: Start API Server

```bash
python claim_denial_api.py
```

Server runs on `http://localhost:8000`

### Step 3: Use Analytics in React

```javascript
import { useAnalytics, KPICards, TopProceduresTable } from './components/AnalyticsIntegration';

function MyComponent() {
  const { analytics, loading } = useAnalytics();
  
  if (loading) return <div>Loading...</div>;
  
  return (
    <>
      <KPICards analytics={analytics} />
      <TopProceduresTable procedures={analytics.top_procedures} />
    </>
  );
}
```

## 📡 API Endpoints

### Full Analytics
```
GET /analytics
```
Returns complete analytics object with all data.

**Use when:** Initial dashboard load, export functionality
**Caution:** Large payload (~100KB)

### Summary Analytics  
```
GET /analytics/summary
```
Returns: overall stats, top procedures, payer data, claim amounts

**Use when:** Main dashboard display
**Benefit:** Optimized payload size

### Procedure Analytics
```
GET /analytics/procedures
```
Returns: top 20 procedures sorted by denial rate

**Use when:** Procedure-specific page or drill-down
**Contains:** Detailed procedure metrics

### Payer & Provider Analytics
```
GET /analytics/payers
```
Returns: denial by payer and provider type

**Use when:** Payer performance page

## 🎨 React Component Usage

### Setup Hook

```javascript
import { useAnalytics } from './components/AnalyticsIntegration';

function Dashboard() {
  const { analytics, loading, error, fetchAnalytics } = useAnalytics();
  
  // Refetch specific analytics
  const refreshProcedures = () => fetchAnalytics('procedures');
  
  // Use analytics in render
  return <div>{analytics?.overall?.total_claims}</div>;
}
```

### KPI Cards Component

```javascript
import { KPICards } from './components/AnalyticsIntegration';

<KPICards analytics={analytics} />
```

Displays 4 key metrics:
- Total claims
- Denial rate
- Approval rate
- Average claim amount

### Top Procedures Table

```javascript
import { TopProceduresTable } from './components/AnalyticsIntegration';

<TopProceduresTable procedures={analytics.top_procedures} />
```

Features:
- Ranked procedures
- Color-coded denial rates
- Sortable columns (extend as needed)

### Claim Amount Insights

```javascript
import { ClaimAmountInsights } from './components/AnalyticsIntegration';

<ClaimAmountInsights comparison={analytics.claim_amount_comparison} />
```

Shows:
- Denied vs approved comparisons
- Statistical analysis
- Key insights

### Payer Performance

```javascript
import { PayerPerformanceData } from './components/AnalyticsIntegration';

const chartData = PayerPerformanceData({ payers: analytics.denial_by_payer });
```

Returns chart-ready data for Charts.js.

## 📈 Example Implementations

### Simple: Add Analytics Summary to Existing Dashboard

```javascript
// Add to App.js
import { useAnalytics, KPICards } from './components/AnalyticsIntegration';

function App() {
  const { analytics } = useAnalytics();
  
  return (
    <>
      {/* Existing content */}
      <ClaimForm />
      <PredictionResult />
      
      {/* Add analytics section */}
      {analytics && <KPICards analytics={analytics} />}
    </>
  );
}
```

### Advanced: Dedicated Analytics Page

```javascript
// pages/AnalyticsDashboard.js
import {
  useAnalytics,
  KPICards,
  TopProceduresTable,
  ClaimAmountInsights,
  PayerPerformanceData
} from '../components/AnalyticsIntegration';
import { Line } from 'react-chartjs-2';

export default function AnalyticsDashboard() {
  const { analytics, loading } = useAnalytics();

  if (loading) return <Spinner />;

  return (
    <div className="p-8">
      <h1>Analytics Dashboard</h1>
      
      <section className="mb-8">
        <KPICards analytics={analytics} />
      </section>

      <section className="mb-8">
        <TopProceduresTable procedures={analytics.top_procedures} />
      </section>

      <section className="mb-8">
        <ClaimAmountInsights comparison={analytics.claim_amount_comparison} />
      </section>

      <section className="mb-8">
        <div className="bg-white p-6 rounded shadow">
          <h2>Denial Rate by Payer</h2>
          <Line data={PayerPerformanceData({ payers: analytics.denial_by_payer })} />
        </div>
      </section>
    </div>
  );
}
```

## 🔗 Integration with Prediction Form

### Scenario: User makes prediction → Update analytics

```javascript
function App() {
  const { analytics, fetchAnalytics } = useAnalytics();
  
  const handlePrediction = async (result) => {
    // Show prediction result
    setPrediction(result);
    
    // Refresh analytics to see updated stats
    setTimeout(() => fetchAnalytics('summary'), 500);
  };
  
  return (
    <>
      <ClaimForm onPrediction={handlePrediction} />
      <KPICards analytics={analytics} />
    </>
  );
}
```

## 📊 Data Display Best Practices

### Performance Tips

1. **Lazy Load Analytics**
   ```javascript
   const [showAnalytics, setShowAnalytics] = useState(false);
   
   return (
     <>
       <button onClick={() => setShowAnalytics(true)}>
         Show Analytics
       </button>
       {showAnalytics && <KPICards analytics={analytics} />}
     </>
   );
   ```

2. **Cache API Responses**
   ```javascript
   const cache = useRef({});
   
   const fetchAnalytics = async (endpoint) => {
     if (cache.current[endpoint]) {
       return cache.current[endpoint];
     }
     // Fetch and cache
   };
   ```

3. **Debounce Refresh**
   ```javascript
   const debounceRefresh = useCallback(
     debounce(() => fetchAnalytics('summary'), 1000),
     []
   );
   ```

### Visual Enhancements

```javascript
// Color-code by severity
const getColorClass = (denialRate) => {
  if (denialRate > 0.35) return 'text-red-600 bg-red-50';
  if (denialRate > 0.30) return 'text-yellow-600 bg-yellow-50';
  return 'text-green-600 bg-green-50';
};

// Animated progress bars
<div className="bg-gray-200 rounded-full h-2 overflow-hidden">
  <motion.div
    initial={{ width: 0 }}
    animate={{ width: `${rate * 100}%` }}
    transition={{ duration: 1 }}
    className="bg-blue-500 h-full"
  />
</div>
```

## 🔄 Real-time Updates

### Polling Strategy

```javascript
useEffect(() => {
  const interval = setInterval(() => {
    fetchAnalytics('summary'); // Refetch every 5 minutes
  }, 5 * 60 * 1000);
  
  return () => clearInterval(interval);
}, []);
```

### WebSocket Alternative (Future)

```javascript
useEffect(() => {
  const ws = new WebSocket('ws://localhost:8000/analytics/stream');
  ws.onmessage = (event) => {
    const data = JSON.parse(event.data);
    setAnalytics(data);
  };
  
  return () => ws.close();
}, []);
```

## 🧪 Testing

### Test Analytics Fetching

```javascript
import { render, screen } from '@testing-library/react';
import { useAnalytics } from './components/AnalyticsIntegration';

jest.mock('axios');

test('loads analytics on mount', async () => {
  axios.get.mockResolvedValue({ data: mockAnalytics });
  
  render(<AnalyticsDashboard />);
  
  expect(await screen.findByText('5000')).toBeInTheDocument();
});
```

### Test Components Independently

```javascript
test('KPICards displays total claims', () => {
  const analytics = {
    overall: {
      total_claims: 5000,
      denied_claims: 1693,
      approved_claims: 3307,
      denial_rate_percent: '33.9%',
      approval_rate_percent: '66.1%',
      avg_claim_amount: 10017.35
    }
  };
  
  render(<KPICards analytics={analytics} />);
  
  expect(screen.getByText('5,000')).toBeInTheDocument();
});
```

## 🚀 Production Deployment

### API Caching

```python
# In claim_denial_api.py
from functools import lru_cache
import time

CACHE_DURATION = 3600  # 1 hour

@app.get("/analytics/summary")
@lru_cache(maxsize=1)
def get_analytics_summary():
    """Cached analytics endpoint"""
    return analytics_data
```

### Frontend Caching

```javascript
// Single source of truth for analytics
const analyticsContext = React.createContext();

export function AnalyticsProvider({ children }) {
  const [cache, setCache] = useState({});
  
  const fetchWithCache = async (endpoint) => {
    if (cache[endpoint]) return cache[endpoint];
    const data = await axios.get(`${API}/analytics/${endpoint}`);
    setCache({ ...cache, [endpoint]: data.data });
    return data.data;
  };
  
  return (
    <analyticsContext.Provider value={{ cache, fetchWithCache }}>
      {children}
    </analyticsContext.Provider>
  );
}
```

## 📝 Common Use Cases

### Use Case 1: Welcome Dashboard
Show key metrics for new users
```javascript
<KPICards analytics={analytics} />
```

### Use Case 2: Procedure Review
Find problematic procedures
```javascript
<TopProceduresTable procedures={analytics.top_procedures} />
```

### Use Case 3: Payer Investigation
Identify worst-performing payers
```javascript
{analytics.denial_by_payer.map(payer => (
  <PayerRow key={payer.payer} {...payer} />
))}
```

### Use Case 4: Amount Analysis
Check if claim size affects denials
```javascript
<ClaimAmountInsights comparison={analytics.claim_amount_comparison} />
```

## 🐛 Debugging

### Check API Endpoint
```bash
curl http://localhost:8000/analytics/summary | jq .
```

### Check Browser Console
```javascript
// In browser console
fetch('http://localhost:8000/analytics/summary')
  .then(r => r.json())
  .then(d => console.log(d))
```

### Common Issues

**Issue:** 404 on /analytics endpoint
**Solution:** Ensure `claims_analytics.py` is in same directory as `claim_denial_api.py`

**Issue:** Slow analytics loading
**Solution:** Use `/analytics/summary` instead of `/analytics`

**Issue:** CORS error
**Solution:** Backend already has CORS enabled, check browser console for actual error

## 📚 Resources

- `ANALYTICS_README.md` - Detailed analytics documentation
- `claims_analytics.py` - Analytics source code
- `AnalyticsIntegration.js` - React component examples
- `claim_denial_api.py` - API endpoint implementations

## 🎯 Next Steps

1. ✅ Run analytics: `python claims_analytics.py`
2. ✅ Start API: `python claim_denial_api.py`
3. ✅ Import components: `import { KPICards } from './AnalyticsIntegration'`
4. ✅ Add to dashboard: `<KPICards analytics={analytics} />`
5. ✅ Test in browser: Visit dashboard and confirm data displays
6. ✅ Customize styles to match your design system

---

**Enjoy your enhanced analytics dashboard! 📊**
