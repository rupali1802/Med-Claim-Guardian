import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, BarChart3, AlertCircle, CheckCircle, TrendingDown, Activity } from 'lucide-react';
import axios from 'axios';

/**
 * AnalyticsIntegration.js
 * 
 * Example component showing how to integrate analytics data into the React dashboard
 * This demonstrates fetching analytics from the API and displaying them in various ways
 */

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:8000';

// CSS Styles for KPI Cards
const kpiStyles = `
  .kpi-analytics-card {
    position: relative;
    border-radius: 16px;
    padding: 22px 24px 20px;
    overflow: hidden;
    transition: transform 0.22s cubic-bezier(0.34,1.56,0.64,1),
                box-shadow 0.22s ease,
                border-color 0.22s ease;
    cursor: default;
    backdrop-filter: blur(12px);
  }
  .kpi-analytics-card::before {
    content: '';
    position: absolute;
    inset: 0;
    border-radius: 16px;
    padding: 1px;
    background: linear-gradient(
      135deg,
      var(--kpi-accent) 0%,
      transparent 55%
    );
    -webkit-mask: linear-gradient(#fff 0 0) content-box,
                  linear-gradient(#fff 0 0);
    -webkit-mask-composite: xor;
    mask-composite: exclude;
    opacity: 0.55;
    pointer-events: none;
  }
  .kpi-icon-ring {
    width: 40px;
    height: 40px;
    border-radius: 11px;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
    transition: transform 0.2s ease;
  }
  .kpi-value-text {
    font-size: 30px;
    font-weight: 800;
    line-height: 1.1;
    letter-spacing: -0.02em;
    font-variant-numeric: tabular-nums;
  }
  .kpi-label-text {
    font-size: 11px;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.09em;
    color: #94A3B8;
  }
  .kpi-sub-text {
    font-size: 11.5px;
    color: #64748B;
    margin-top: 6px;
    line-height: 1.4;
  }
  .kpi-divider {
    width: 100%;
    height: 1px;
    background: linear-gradient(90deg, var(--kpi-accent), transparent);
    opacity: 0.2;
    margin: 14px 0 12px;
  }
`;

// Inject styles
if (typeof document !== 'undefined') {
  const styleSheet = document.createElement('style');
  styleSheet.textContent = kpiStyles;
  document.head.appendChild(styleSheet);
}

// Hook to fetch analytics data
export const useAnalytics = () => {
  const [analytics, setAnalytics] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchAnalytics = async (endpoint = 'summary') => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get(`${API_URL}/analytics/${endpoint}`);
      setAnalytics(response.data);
    } catch (err) {
      setError(err.message);
      console.error('Error fetching analytics:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAnalytics('summary');
  }, []);

  return { analytics, loading, error, fetchAnalytics };
};

// KPI card accent configs — purely visual, no logic changes
const KPI_CARD_META = [
  {
    key: 'total',
    label: 'Total Claims',
    accent: '#22D3EE',
    glow: 'rgba(34,211,238,0.18)',
    bgFrom: 'rgba(34,211,238,0.10)',
    bgTo:   'rgba(34,211,238,0.02)',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
        <polyline points="14 2 14 8 20 8"/>
        <line x1="16" y1="13" x2="8" y2="13"/>
        <line x1="16" y1="17" x2="8" y2="17"/>
        <line x1="10" y1="9" x2="8" y2="9"/>
      </svg>
    ),
  },
  {
    key: 'denial',
    label: 'Denial Rate',
    accent: '#F87171',
    glow: 'rgba(248,113,113,0.18)',
    bgFrom: 'rgba(248,113,113,0.10)',
    bgTo:   'rgba(248,113,113,0.02)',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10"/>
        <line x1="4.93" y1="4.93" x2="19.07" y2="19.07"/>
      </svg>
    ),
  },
  {
    key: 'approval',
    label: 'Approval Rate',
    accent: '#34D399',
    glow: 'rgba(52,211,153,0.18)',
    bgFrom: 'rgba(52,211,153,0.10)',
    bgTo:   'rgba(52,211,153,0.02)',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/>
        <polyline points="22 4 12 14.01 9 11.01"/>
      </svg>
    ),
  },
  {
    key: 'amount',
    label: 'Avg Claim Amount',
    accent: '#A78BFA',
    glow: 'rgba(167,139,250,0.18)',
    bgFrom: 'rgba(124,58,237,0.12)',
    bgTo:   'rgba(124,58,237,0.02)',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <line x1="12" y1="1" x2="12" y2="23"/>
        <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/>
      </svg>
    ),
  },
];

// Example 1: KPI Cards Component
export const KPICards = ({ analytics }) => {
  if (!analytics?.overall) return null;

  const overall = analytics.overall;

  const cardData = [
    {
      ...KPI_CARD_META[0],
      value: overall.total_claims.toLocaleString(),
      sub: 'Across all payers',
    },
    {
      ...KPI_CARD_META[1],
      value: overall.denial_rate_percent,
      sub: `${overall.denied_claims.toLocaleString()} claims denied`,
    },
    {
      ...KPI_CARD_META[2],
      value: overall.approval_rate_percent,
      sub: `${overall.approved_claims.toLocaleString()} claims approved`,
    },
    {
      ...KPI_CARD_META[3],
      value: `$${(overall.avg_claim_amount / 1000).toFixed(1)}K`,
      sub: `Total: $${(overall.total_claim_amount / 1000000).toFixed(1)}M`,
    },
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
        gap: '16px',
      }}
    >
      {cardData.map((card, idx) => (
        <motion.div
          key={card.label}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: idx * 0.05, duration: 0.4 }}
          whileHover={{ y: -5, boxShadow: `0 25px 50px ${card.glow}` }}
          className="kpi-analytics-card"
          style={{
            '--kpi-accent': card.accent,
            '--kpi-glow': card.glow,
            background: `linear-gradient(145deg, ${card.bgFrom}, ${card.bgTo})`,
            border: `1px solid ${card.accent}2E`,
            boxShadow: `0 4px 24px rgba(0,0,0,0.25), inset 0 1px 0 ${card.accent}18`,
            position: 'relative',
            borderRadius: '16px',
            padding: '22px 24px 20px',
            overflow: 'hidden',
            transition: 'all 0.22s cubic-bezier(0.34,1.56,0.64,1)',
            cursor: 'default',
            backdropFilter: 'blur(12px)',
          }}
        >
          {/* Animated gradient border */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.55 }}
            transition={{ delay: idx * 0.05 + 0.2 }}
            style={{
              position: 'absolute',
              inset: 0,
              borderRadius: '16px',
              padding: '1px',
              background: `linear-gradient(135deg, ${card.accent} 0%, transparent 55%)`,
              WebkitMaskImage: `linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)`,
              WebkitMaskComposite: 'xor',
              maskComposite: 'exclude',
              pointerEvents: 'none',
            }}
          />

          {/* Glow orb */}
          <motion.div
            animate={{ opacity: [0.5, 0.8, 0.5] }}
            transition={{ duration: 4, repeat: Infinity }}
            style={{
              position: 'absolute',
              top: '-30%',
              right: '-10%',
              width: '120px',
              height: '120px',
              borderRadius: '50%',
              background: `radial-gradient(circle, ${card.glow} 0%, transparent 70%)`,
              pointerEvents: 'none',
            }}
          />

          {/* Content */}
          <div style={{ position: 'relative', zIndex: 1 }}>
            {/* Header row: label + icon */}
            <motion.div
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: idx * 0.05 + 0.1 }}
              style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '14px' }}
            >
              <span className="kpi-label-text">{card.label}</span>
              <motion.div
                whileHover={{ scale: 1.12 }}
                className="kpi-icon-ring"
                style={{
                  background: `${card.accent}18`,
                  border: `1px solid ${card.accent}30`,
                  color: card.accent,
                }}
              >
                {card.icon}
              </motion.div>
            </motion.div>

            {/* Primary value */}
            <motion.p
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: idx * 0.05 + 0.2, duration: 0.4 }}
              className="kpi-value-text"
              style={{ color: card.accent }}
            >
              {card.value}
            </motion.p>

            <motion.div
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ delay: idx * 0.05 + 0.3, duration: 0.4 }}
              className="kpi-divider"
              style={{ originX: 0 }}
            />

            {/* Sub label */}
            <motion.p
              initial={{ opacity: 0, y: 5 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.05 + 0.35 }}
              className="kpi-sub-text"
            >
              {card.sub}
            </motion.p>
          </div>
        </motion.div>
      ))}
    </motion.div>
  );
};

// Example 2: Top Procedures Table
export const TopProceduresTable = ({ procedures }) => {
  if (!procedures) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.1 }}
      whileHover={{ boxShadow: '0 25px 50px rgba(0, 0, 0, 0.3)' }}
      className="bg-white/10 backdrop-blur-2xl rounded-2xl shadow-2xl p-6 border border-white/20 transition-all duration-300 overflow-hidden"
    >
      <motion.h3
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.15 }}
        className="text-xl font-bold text-cyan-300 mb-6 flex items-center gap-2"
      >
        <BarChart3 className="w-5 h-5" />
        Top Procedures with Highest Denial Rate
      </motion.h3>
      <div className="overflow-x-auto">
        <motion.table
          className="w-full text-sm"
          initial="hidden"
          animate="visible"
          variants={{
            visible: {
              transition: {
                staggerChildren: 0.05,
              },
            },
          }}
        >
          <thead>
            <tr className="border-b border-white/10">
              <motion.th
                variants={{ hidden: { opacity: 0 }, visible: { opacity: 1 } }}
                className="text-left py-3 px-4 text-gray-300 font-semibold"
              >
                Rank
              </motion.th>
              <motion.th
                variants={{ hidden: { opacity: 0 }, visible: { opacity: 1 } }}
                className="text-left py-3 px-4 text-gray-300 font-semibold"
              >
                Procedure
              </motion.th>
              <motion.th
                variants={{ hidden: { opacity: 0 }, visible: { opacity: 1 } }}
                className="text-left py-3 px-4 text-gray-300 font-semibold"
              >
                Total Claims
              </motion.th>
              <motion.th
                variants={{ hidden: { opacity: 0 }, visible: { opacity: 1 } }}
                className="text-left py-3 px-4 text-gray-300 font-semibold"
              >
                Denied
              </motion.th>
              <motion.th
                variants={{ hidden: { opacity: 0 }, visible: { opacity: 1 } }}
                className="text-left py-3 px-4 text-gray-300 font-semibold"
              >
                Denial Rate
              </motion.th>
            </tr>
          </thead>
          <tbody>
            {procedures.map((proc, idx) => (
              <motion.tr
                key={proc.procedure_code}
                variants={{
                  hidden: { opacity: 0, x: -20 },
                  visible: { opacity: 1, x: 0 },
                }}
                whileHover={{ backgroundColor: 'rgba(255, 255, 255, 0.05)' }}
                className="border-b border-white/10 transition-colors"
              >
                <td className="py-3 px-4 text-gray-300 font-semibold">{proc.rank}</td>
                <td className="py-3 px-4 text-gray-200">{proc.procedure_code}</td>
                <td className="py-3 px-4 text-gray-200">{proc.total_claims}</td>
                <td className="py-3 px-4 text-gray-200">{proc.denied_claims}</td>
                <td className="py-3 px-4">
                  <motion.span
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: idx * 0.05 }}
                    className={`font-semibold px-3 py-1 rounded-lg ${
                      proc.denial_rate > 0.35 ? 'text-red-300 bg-red-500/20' :
                      proc.denial_rate > 0.30 ? 'text-amber-300 bg-amber-500/20' :
                      'text-emerald-300 bg-emerald-500/20'
                    }`}
                  >
                    {proc.denial_rate_percent}
                  </motion.span>
                </td>
              </motion.tr>
            ))}
          </tbody>
        </motion.table>
      </div>
    </motion.div>
  );
};

// Example 3: Payer Performance Chart Data
export const PayerPerformanceData = ({ payers }) => {
  if (!payers) return null;

  return {
    labels: payers.map(p => p.payer),
    datasets: [
      {
        label: 'Denial Rate (%)',
        data: payers.map(p => p.denial_rate * 100),
        backgroundColor: payers.map(p => 
          p.denial_rate > 0.35 ? 'rgba(239, 68, 68, 0.6)' :
          p.denial_rate > 0.33 ? 'rgba(249, 115, 22, 0.6)' :
          'rgba(34, 197, 94, 0.6)'
        ),
        borderColor: payers.map(p =>
          p.denial_rate > 0.35 ? 'rgba(239, 68, 68, 1)' :
          p.denial_rate > 0.33 ? 'rgba(249, 115, 22, 1)' :
          'rgba(34, 197, 94, 1)'
        ),
        borderWidth: 2
      }
    ]
  };
};

// Example 4: Insights from Claim Amount Comparison
export const ClaimAmountInsights = ({ comparison }) => {
  if (!comparison?.denied_claims) return null;

  const denied = comparison.denied_claims;
  const approved = comparison.approved_claims;
  const comp = comparison.comparison;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
      whileHover={{ boxShadow: '0 25px 50px rgba(0, 0, 0, 0.3)' }}
      className="bg-white/10 backdrop-blur-2xl rounded-2xl shadow-2xl p-6 border border-white/20 transition-all duration-300"
    >
      <motion.h3
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.25 }}
        className="text-xl font-bold text-cyan-300 mb-6 flex items-center gap-2"
      >
        <Activity className="w-5 h-5" />
        Claim Amount Analysis
      </motion.h3>
      
      <motion.div
        initial="hidden"
        animate="visible"
        variants={{
          visible: {
            transition: {
              staggerChildren: 0.1,
            },
          },
        }}
        className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6"
      >
        {/* Denied Claims */}
        <motion.div
          variants={{
            hidden: { opacity: 0, x: -20 },
            visible: { opacity: 1, x: 0 },
          }}
          whileHover={{ y: -5 }}
          className="bg-red-900/20 border border-red-400/30 rounded-xl p-4 transition-all"
        >
          <motion.h4
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="font-bold text-red-300 mb-4 flex items-center gap-2"
          >
            <TrendingDown className="w-4 h-4" />
            Denied Claims
          </motion.h4>
          <motion.div
            className="space-y-2 text-sm"
            initial="hidden"
            animate="visible"
            variants={{
              visible: {
                transition: {
                  staggerChildren: 0.05,
                },
              },
            }}
          >
            {[
              { label: 'Count:', value: denied.count.toLocaleString() },
              { label: 'Average:', value: `$${denied.avg_amount.toFixed(2)}` },
              { label: 'Median:', value: `$${denied.median_amount.toFixed(2)}` },
              { label: 'Range:', value: `$${denied.min_amount.toFixed(0)} - $${denied.max_amount.toFixed(0)}` },
            ].map((item, idx) => (
              <motion.div
                key={idx}
                variants={{
                  hidden: { opacity: 0, x: -10 },
                  visible: { opacity: 1, x: 0 },
                }}
                className="flex justify-between"
              >
                <span className="text-gray-300">{item.label}</span>
                <span className="font-semibold text-red-300">{item.value}</span>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>

        {/* Approved Claims */}
        <motion.div
          variants={{
            hidden: { opacity: 0, x: 20 },
            visible: { opacity: 1, x: 0 },
          }}
          whileHover={{ y: -5 }}
          className="bg-emerald-900/20 border border-emerald-400/30 rounded-xl p-4 transition-all"
        >
          <motion.h4
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.35 }}
            className="font-bold text-emerald-300 mb-4 flex items-center gap-2"
          >
            <TrendingUp className="w-4 h-4" />
            Approved Claims
          </motion.h4>
          <motion.div
            className="space-y-2 text-sm"
            initial="hidden"
            animate="visible"
            variants={{
              visible: {
                transition: {
                  staggerChildren: 0.05,
                },
              },
            }}
          >
            {[
              { label: 'Count:', value: approved.count.toLocaleString() },
              { label: 'Average:', value: `$${approved.avg_amount.toFixed(2)}` },
              { label: 'Median:', value: `$${approved.median_amount.toFixed(2)}` },
              { label: 'Range:', value: `$${approved.min_amount.toFixed(0)} - $${approved.max_amount.toFixed(0)}` },
            ].map((item, idx) => (
              <motion.div
                key={idx}
                variants={{
                  hidden: { opacity: 0, x: 10 },
                  visible: { opacity: 1, x: 0 },
                }}
                className="flex justify-between"
              >
                <span className="text-gray-300">{item.label}</span>
                <span className="font-semibold text-emerald-300">{item.value}</span>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </motion.div>

      {/* Key Insight */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        whileHover={{ y: -3 }}
        className="bg-amber-900/20 border border-amber-400/30 rounded-xl p-4 transition-all"
      >
        <p className="text-sm text-amber-200 flex items-start gap-3">
          <AlertCircle className="w-5 h-5 flex-shrink-0 mt-0.5" />
          <span>
            <strong>Insight:</strong> Denied claims are on average{' '}
            <span className="font-semibold text-amber-300">{comp.avg_amount_difference_percent}</span> higher
            (${comp.avg_amount_difference.toFixed(2)}) than approved claims, suggesting claim
            amount may be a denial factor.
          </span>
        </p>
      </motion.div>
    </motion.div>
  );
};

// Example 5: Main Analytics Dashboard Component
export const AnalyticsDashboardPage = () => {
  const { analytics, loading, error } = useAnalytics();

  if (loading) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="p-8 text-center bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 min-h-screen flex items-center justify-center"
      >
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
          className="w-12 h-12 border-3 border-cyan-400 border-t-transparent rounded-full"
        />
        <span className="ml-4 text-cyan-300 text-lg">Loading analytics...</span>
      </motion.div>
    );
  }

  if (error) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="p-8 bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 min-h-screen flex items-center justify-center"
      >
        <div className="bg-red-500/20 border border-red-400/50 backdrop-blur p-6 rounded-xl text-red-200">
          <p className="font-semibold">Error loading analytics:</p>
          <p className="text-sm mt-1">{error}</p>
        </div>
      </motion.div>
    );
  }

  if (!analytics) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="p-8 text-center bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 min-h-screen flex items-center justify-center"
      >
        <span className="text-gray-300">No analytics data available</span>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="p-8 bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 min-h-screen"
    >
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="mb-12"
      >
        <h1 className="text-4xl font-bold bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent mb-2">
          Claims Analytics Dashboard
        </h1>
        <p className="text-gray-400">Real-time insights into claim patterns and denial trends</p>
      </motion.div>

      <div className="space-y-8">
        {/* KPI Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.5 }}
        >
          <KPICards analytics={analytics} />
        </motion.div>

        {/* Top Procedures Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          <TopProceduresTable procedures={analytics.top_procedures} />
        </motion.div>

        {/* Claim Amount Analysis */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.5 }}
        >
          <ClaimAmountInsights comparison={analytics.claim_amount_comparison} />
        </motion.div>

        {/* Payer Performance Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.5 }}
          whileHover={{ boxShadow: '0 25px 50px rgba(0, 0, 0, 0.3)' }}
          className="bg-white/10 backdrop-blur-2xl rounded-2xl shadow-2xl p-6 border border-white/20 transition-all duration-300"
        >
          <motion.h3
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.45 }}
            className="text-xl font-bold text-cyan-300 mb-6 flex items-center gap-2"
          >
            <TrendingUp className="w-5 h-5" />
            Denial Rate by Payer
          </motion.h3>
          <motion.div
            className="space-y-3"
            initial="hidden"
            animate="visible"
            variants={{
              visible: {
                transition: {
                  staggerChildren: 0.05,
                },
              },
            }}
          >
            {analytics.denial_by_payer?.map((payer, idx) => (
              <motion.div
                key={payer.payer}
                variants={{
                  hidden: { opacity: 0, x: -20 },
                  visible: { opacity: 1, x: 0 },
                }}
                whileHover={{ backgroundColor: 'rgba(255, 255, 255, 0.05)' }}
                className="flex items-center justify-between p-4 border border-white/10 rounded-lg transition-all"
              >
                <span className="font-medium text-gray-200">{payer.payer}</span>
                <div className="flex items-center gap-4">
                  <div className="w-48 bg-white/10 rounded-full h-2 overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${payer.denial_rate * 100}%` }}
                      transition={{ duration: 0.8, delay: idx * 0.05 + 0.5, ease: 'easeOut' }}
                      className={`h-2 rounded-full ${
                        payer.denial_rate > 0.35 ? 'bg-gradient-to-r from-red-500 to-red-600' :
                        payer.denial_rate > 0.33 ? 'bg-gradient-to-r from-amber-500 to-amber-600' :
                        'bg-gradient-to-r from-emerald-500 to-emerald-600'
                      }`}
                    />
                  </div>
                  <motion.span
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: idx * 0.05 + 0.3 }}
                    className={`text-sm font-semibold w-16 text-right ${
                      payer.denial_rate > 0.35 ? 'text-red-300' :
                      payer.denial_rate > 0.33 ? 'text-amber-300' :
                      'text-emerald-300'
                    }`}
                  >
                    {payer.denial_rate_percent}
                  </motion.span>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default AnalyticsDashboardPage;
