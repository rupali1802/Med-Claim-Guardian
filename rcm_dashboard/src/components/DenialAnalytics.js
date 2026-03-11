import React from 'react';
import { motion } from 'framer-motion';
import { TrendingDown, TrendingUp, BarChart3, LineChart, PieChart, AlertTriangle } from 'lucide-react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Line, Bar, Doughnut } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
);

const DenialAnalytics = ({ data, analytics }) => {
  const chartData = data || analytics;
  if (!chartData || !chartData.denialsByPayer) {
    return (
      <div className="flex items-center justify-center min-h-64">
        <div className="text-cyan-400 text-xl">Loading analytics...</div>
      </div>
    );
  }
  const resolvedData = chartData;

  // Denial trends by payer
  // Generate unique colours for any number of payers
  const PALETTE_BG = [
    'rgba(15, 76, 129, 0.6)',   'rgba(0, 107, 146, 0.6)',  'rgba(16, 185, 129, 0.6)',
    'rgba(245, 158, 11, 0.6)',   'rgba(239, 68, 68, 0.6)',   'rgba(59, 130, 246, 0.6)',
    'rgba(168, 85, 247, 0.6)',   'rgba(217, 70, 239, 0.6)',  'rgba(251, 191, 36, 0.6)',
    'rgba(14, 165, 233, 0.6)',   'rgba(236, 72, 153, 0.6)',  'rgba(100, 116, 139, 0.6)',
    'rgba(249, 115, 22, 0.6)',   'rgba(20, 184, 166, 0.6)',
  ];
  const PALETTE_BORDER = PALETTE_BG.map((c) => c.replace('0.6', '1'));
  const payerCount = Object.keys(resolvedData.denialsByPayer).length;
  const bgColors     = Array.from({ length: payerCount }, (_, i) => PALETTE_BG[i % PALETTE_BG.length]);
  const borderColors = Array.from({ length: payerCount }, (_, i) => PALETTE_BORDER[i % PALETTE_BORDER.length]);

  const payerChartData = {
    labels: Object.keys(resolvedData.denialsByPayer),
    datasets: [
      {
        label: 'Denial Rate',
        data: Object.values(resolvedData.denialsByPayer).map((v) => v * 100),
        backgroundColor: bgColors,
        borderColor: borderColors,
        borderWidth: 2,
      },
    ],
  };

  // Denial trends by procedure
  const procedureChartData = {
    labels: Object.keys(resolvedData.denialsByProcedure),
    datasets: [
      {
        label: 'Denial Rate (%)',
        data: Object.values(resolvedData.denialsByProcedure).map((v) => v * 100),
        borderColor: 'rgba(15, 76, 129, 1)',
        backgroundColor: 'rgba(15, 76, 129, 0.08)',
        borderWidth: 3,
        fill: true,
        tension: 0.4,
        pointRadius: 6,
        pointBackgroundColor: 'rgba(15, 76, 129, 1)',
        pointBorderColor: '#fff',
        pointBorderWidth: 2,
      },
    ],
  };

  // Denial by provider
  const providerChartData = {
    labels: Object.keys(resolvedData.denialsByProvider || {
      'Hospital': 0.21, 'Specialist': 0.34, 'Clinic': 0.27, 'Diagnostic Center': 0.41,
    }),
    datasets: [
      {
        label: 'Denial Rate (%)',
        data: Object.values(resolvedData.denialsByProvider || {
          'Hospital': 0.21, 'Specialist': 0.34, 'Clinic': 0.27, 'Diagnostic Center': 0.41,
        }).map((v) => v * 100),
        backgroundColor: [
          'rgba(16, 185, 129, 0.6)',
          'rgba(245, 158, 11, 0.6)',
          'rgba(15, 76, 129, 0.6)',
          'rgba(239, 68, 68, 0.6)',
        ],
        borderColor: [
          'rgba(16, 185, 129, 1)',
          'rgba(245, 158, 11, 1)',
          'rgba(15, 76, 129, 1)',
          'rgba(239, 68, 68, 1)',
        ],
        borderWidth: 2,
        borderRadius: 6,
      },
    ],
  };

  // Risk distribution
  const riskDistributionData = {
    labels: Object.keys(resolvedData.riskDistribution),
    datasets: [
      {
        label: 'Number of Claims',
        data: Object.values(resolvedData.riskDistribution),
        backgroundColor: [
          'rgba(16, 185, 129, 0.7)',
          'rgba(245, 158, 11, 0.7)',
          'rgba(239, 68, 68, 0.7)',
        ],
        borderColor: [
          'rgba(16, 185, 129, 1)',
          'rgba(245, 158, 11, 1)',
          'rgba(239, 68, 68, 1)',
        ],
        borderWidth: 2,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: true,
    plugins: {
      legend: {
        position: 'top',
        labels: {
          color: '#0F4C81',
          font: { size: 12, weight: 'bold' },
          padding: 15,
        },
      },
      tooltip: {
        backgroundColor: 'rgba(30, 41, 59, 0.95)',
        titleColor: '#fff',
        bodyColor: '#f1f5f9',
        borderColor: 'rgba(15, 76, 129, 0.5)',
        borderWidth: 1,
      },
    },
    scales: {
      y: {
        ticks: {
          color: '#6b7280',
          font: { size: 11 },
        },
        grid: {
          color: 'rgba(156, 163, 175, 0.1)',
        },
      },
      x: {
        ticks: {
          color: '#6b7280',
          font: { size: 11 },
        },
        grid: {
          display: false,
        },
      },
    },
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="space-y-6"
    >
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6 }}
        className="flex items-center gap-4 mb-8"
      >
        <motion.div
          whileHover={{ scale: 1.05, rotate: 5 }}
          className="p-4 bg-gradient-to-br from-cyan-500/20 to-blue-500/20 rounded-xl border border-cyan-400/30"
        >
          <BarChart3 className="w-8 h-8 text-cyan-400" />
        </motion.div>
        <div>
          <h2 className="text-4xl font-bold bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
            Analytics & Insights
          </h2>
          <p className="text-gray-600 text-sm font-medium mt-1">Real-time denial trends and claim analytics across all providers</p>
        </div>
      </motion.div>

      {/* Top Metrics */}
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
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4"
      >
        {[
          {
            title: 'Average Denial Rate',
            value: (
              Object.values(resolvedData.denialsByPayer).reduce((a, b) => a + b, 0) / 
              Object.values(resolvedData.denialsByPayer).length * 100
            ).toFixed(1),
            unit: '%',
            icon: TrendingDown,
            color: 'from-emerald-500/20 to-green-500/20',
            iconColor: 'text-emerald-400',
            borderColor: 'border-emerald-400/30',
            accentColor: 'text-emerald-300',
            subtext: 'Across all payers',
          },
          {
            title: 'High Risk Claims',
            value: resolvedData.riskDistribution.High,
            unit: '',
            icon: AlertTriangle,
            color: 'from-red-500/20 to-orange-500/20',
            iconColor: 'text-red-400',
            borderColor: 'border-red-400/30',
            accentColor: 'text-red-300',
            subtext: 'Requires attention',
          },
          {
            title: 'Total Claims',
            value: Object.values(resolvedData.riskDistribution).reduce((a, b) => a + b, 0).toLocaleString(),
            unit: '',
            icon: BarChart3,
            color: 'from-blue-500/20 to-cyan-500/20',
            iconColor: 'text-blue-400',
            borderColor: 'border-blue-400/30',
            accentColor: 'text-blue-300',
            subtext: 'In database',
          },
          {
            title: 'Approval Rate',
            value: (
              100 - (
                Object.values(resolvedData.denialsByPayer).reduce((a, b) => a + b, 0) / 
                Object.values(resolvedData.denialsByPayer).length * 100
              )
            ).toFixed(1),
            unit: '%',
            icon: TrendingUp,
            color: 'from-teal-500/20 to-emerald-500/20',
            iconColor: 'text-teal-400',
            borderColor: 'border-teal-400/30',
            accentColor: 'text-teal-300',
            subtext: 'Expected success',
          },
        ].map((metric, idx) => (
          <motion.div
            key={metric.title}
            variants={{
              hidden: { opacity: 0, y: 20 },
              visible: { opacity: 1, y: 0 },
            }}
            whileHover={{ y: -5, boxShadow: '0 20px 40px rgba(0, 0, 0, 0.3)' }}
            className={`group bg-gradient-to-br ${metric.color} border ${metric.borderColor} rounded-xl p-6 transition-all cursor-default backdrop-blur-xl`}
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-bold text-gray-800">{metric.title}</h3>
              <motion.div
                whileHover={{ scale: 1.1 }}
                className={`p-2 rounded-lg bg-white/5 ${metric.iconColor}`}
              >
                <metric.icon className="w-5 h-5" />
              </motion.div>
            </div>
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: idx * 0.1 + 0.2, duration: 0.4 }}
              className={`text-4xl font-bold ${metric.accentColor}`}
            >
              {metric.value}{metric.unit}
            </motion.div>
            <p className="text-xs text-gray-700 font-medium mt-2">{metric.subtext}</p>
          </motion.div>
        ))}
      </motion.div>

      {/* Charts Grid */}
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
        className="grid grid-cols-1 lg:grid-cols-3 gap-6"
      >
        {/* Denial by Payer */}
        <motion.div
          variants={{
            hidden: { opacity: 0, y: 20 },
            visible: { opacity: 1, y: 0 },
          }}
          whileHover={{ boxShadow: '0 25px 50px rgba(0, 0, 0, 0.3)' }}
          className="bg-white/10 backdrop-blur-2xl border border-white/20 rounded-xl p-6 transition-all"
        >
          <div className="flex items-center gap-2 mb-4">
            <BarChart3 className="w-5 h-5 text-cyan-400" />
            <h3 className="font-bold text-gray-800">Denial by Payer</h3>
          </div>
          <Bar data={payerChartData} options={chartOptions} height={300} />
        </motion.div>

        {/* Denial by Procedure */}
        <motion.div
          variants={{
            hidden: { opacity: 0, y: 20 },
            visible: { opacity: 1, y: 0 },
          }}
          whileHover={{ boxShadow: '0 25px 50px rgba(0, 0, 0, 0.3)' }}
          className="bg-white/10 backdrop-blur-2xl border border-white/20 rounded-xl p-6 transition-all"
        >
          <div className="flex items-center gap-2 mb-4">
            <LineChart className="w-5 h-5 text-cyan-400" />
            <h3 className="font-bold text-gray-800">Procedure Trends</h3>
          </div>
          <Line data={procedureChartData} options={chartOptions} height={300} />
        </motion.div>

        {/* Risk Distribution */}
        <motion.div
          variants={{
            hidden: { opacity: 0, y: 20 },
            visible: { opacity: 1, y: 0 },
          }}
          whileHover={{ boxShadow: '0 25px 50px rgba(0, 0, 0, 0.3)' }}
          className="bg-white/10 backdrop-blur-2xl border border-white/20 rounded-xl p-6 transition-all"
        >
          <div className="flex items-center gap-2 mb-4">
            <PieChart className="w-5 h-5 text-cyan-400" />
            <h3 className="font-bold text-gray-800">Risk Distribution</h3>
          </div>
          <Doughnut data={riskDistributionData} options={chartOptions} height={300} />
        </motion.div>
      </motion.div>

      {/* Provider Chart & Insights */}
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
        className="grid grid-cols-1 lg:grid-cols-2 gap-6"
      >
        {/* Provider Chart */}
        <motion.div
          variants={{
            hidden: { opacity: 0, y: 20 },
            visible: { opacity: 1, y: 0 },
          }}
          whileHover={{ boxShadow: '0 25px 50px rgba(0, 0, 0, 0.3)' }}
          className="bg-white/10 backdrop-blur-2xl border border-white/20 rounded-xl p-6 transition-all"
        >
          <div className="flex items-center gap-2 mb-4">
            <BarChart3 className="w-5 h-5 text-cyan-400" />
            <h3 className="font-bold text-gray-800">Denial by Provider Type</h3>
          </div>
          <p className="text-xs text-gray-700 font-medium mb-4">Denial rate breakdown across healthcare provider categories</p>
          <Bar data={providerChartData} options={{
            ...chartOptions,
            plugins: {
              ...chartOptions.plugins,
              legend: { display: false },
            },
            scales: {
              ...chartOptions.scales,
              y: {
                ...chartOptions.scales.y,
                max: 60,
                ticks: {
                  ...chartOptions.scales.y.ticks,
                  callback: (v) => v + '%',
                },
              },
            },
          }} height={220} />
          <motion.div
            initial="hidden"
            animate="visible"
            variants={{
              visible: {
                transition: {
                  staggerChildren: 0.05,
                },
              },
            }}
            className="mt-4 grid grid-cols-2 gap-3"
          >
            {Object.entries(resolvedData.denialsByProvider || { 'Hospital': 0.21, 'Specialist': 0.34, 'Clinic': 0.27, 'Diagnostic Center': 0.41 }).map(([provider, rate], idx) => (
              <motion.div
                key={provider}
                variants={{
                  hidden: { opacity: 0, x: -10 },
                  visible: { opacity: 1, x: 0 },
                }}
                whileHover={{ scale: 1.05 }}
                className="flex items-center justify-between px-3 py-2 rounded-lg bg-white/5 border border-white/10 hover:border-white/20 transition-all"
              >
                <span className="text-xs text-gray-800 font-semibold">{provider}</span>
                <span className={`text-xs font-bold ${
                  rate < 0.25 ? 'text-emerald-700' : rate < 0.35 ? 'text-amber-700' : 'text-red-700'
                }`}>{(rate * 100).toFixed(0)}%</span>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>

        {/* Provider Insights */}
        <motion.div
          variants={{
            hidden: { opacity: 0, y: 20 },
            visible: { opacity: 1, y: 0 },
          }}
          whileHover={{ boxShadow: '0 25px 50px rgba(0, 0, 0, 0.3)' }}
          className="bg-white/10 backdrop-blur-2xl border border-white/20 rounded-xl p-6 transition-all"
        >
          <div className="flex items-center gap-2 mb-4">
            <AlertTriangle className="w-5 h-5 text-cyan-400" />
            <h3 className="font-bold text-gray-800">Provider Insights</h3>
          </div>
          <p className="text-xs text-gray-700 font-medium mb-5">Key observations from provider-level denial analysis</p>
          <motion.div
            className="space-y-3"
            initial="hidden"
            animate="visible"
            variants={{
              visible: {
                transition: {
                  staggerChildren: 0.08,
                },
              },
            }}
          >
            {[
              { label: 'Hospitals', rate: 0.21, note: 'Lowest denial rate — strong documentation compliance' },
              { label: 'Specialists', rate: 0.34, note: 'Higher denials due to complex procedure coding' },
              { label: 'Clinics', rate: 0.27, note: 'Moderate — often missing prior authorization' },
              { label: 'Diagnostic Centers', rate: 0.41, note: 'Highest risk — frequent diagnosis-procedure mismatches' },
            ].map(({ label, rate, note }, idx) => (
              <motion.div
                key={label}
                variants={{
                  hidden: { opacity: 0, x: -10 },
                  visible: { opacity: 1, x: 0 },
                }}
                whileHover={{ backgroundColor: 'rgba(255, 255, 255, 0.08)' }}
                className="p-3 rounded-lg bg-white/5 border border-white/10 transition-all"
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-semibold text-gray-800">{label}</span>
                  <motion.span
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: idx * 0.08 + 0.3 }}
                    className={`text-sm font-bold ${
                      rate < 0.25 ? 'text-emerald-700' : rate < 0.35 ? 'text-amber-700' : 'text-red-700'
                    }`}
                  >
                    {(rate * 100).toFixed(0)}% denial
                  </motion.span>
                </div>
                <div className="w-full h-1.5 bg-white/10 rounded-full mb-2 overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${rate * 100}%` }}
                    transition={{ duration: 0.6, delay: idx * 0.08 + 0.2, ease: 'easeOut' }}
                    className="h-full rounded-full transition-all duration-500"
                    style={{
                      background: rate < 0.25 ? '#06b6d4' : rate < 0.35 ? '#f59e0b' : '#ef4444',
                    }}
                  />
                </div>
                <p className="text-xs text-gray-700 font-medium">{note}</p>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </motion.div>

      {/* Recent Predictions Table */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 0.5 }}
        whileHover={{ boxShadow: '0 25px 50px rgba(0, 0, 0, 0.3)' }}
        className="bg-white/10 backdrop-blur-2xl border border-white/20 rounded-xl p-6 transition-all"
      >
        <div className="flex items-center gap-2 mb-6">
          <BarChart3 className="w-5 h-5 text-cyan-400" />
          <h3 className="font-bold text-gray-800">Recent Predictions</h3>
        </div>
        <div className="overflow-x-auto">
          <motion.table
            className="w-full"
            initial="hidden"
            animate="visible"
            variants={{
              visible: {
                transition: {
                  staggerChildren: 0.03,
                },
              },
            }}
          >
            <thead>
              <tr className="border-b border-white/10">
                <motion.th
                  variants={{ hidden: { opacity: 0 }, visible: { opacity: 1 } }}
                  className="text-left py-4 px-5 text-xs font-bold text-gray-800 uppercase tracking-wider"
                >
                  ID
                </motion.th>
                <motion.th
                  variants={{ hidden: { opacity: 0 }, visible: { opacity: 1 } }}
                  className="text-left py-4 px-5 text-xs font-bold text-gray-800 uppercase tracking-wider"
                >
                  Payer
                </motion.th>
                <motion.th
                  variants={{ hidden: { opacity: 0 }, visible: { opacity: 1 } }}
                  className="text-left py-4 px-5 text-xs font-bold text-gray-800 uppercase tracking-wider"
                >
                  Claim Amount
                </motion.th>
                <motion.th
                  variants={{ hidden: { opacity: 0 }, visible: { opacity: 1 } }}
                  className="text-left py-4 px-5 text-xs font-bold text-gray-800 uppercase tracking-wider"
                >
                  Risk Level
                </motion.th>
                <motion.th
                  variants={{ hidden: { opacity: 0 }, visible: { opacity: 1 } }}
                  className="text-left py-4 px-5 text-xs font-bold text-gray-800 uppercase tracking-wider"
                >
                  Probability
                </motion.th>
              </tr>
            </thead>
            <tbody>
              {resolvedData.recentPredictions.map((pred, idx) => (
                <motion.tr
                  key={pred.id}
                  variants={{
                    hidden: { opacity: 0, x: -20 },
                    visible: { opacity: 1, x: 0 },
                  }}
                  whileHover={{ backgroundColor: 'rgba(255, 255, 255, 0.05)' }}
                  className="border-b border-white/5 transition-colors duration-200 group/row"
                >
                  <td className="py-4 px-5 text-sm text-gray-800 font-medium group-hover/row:text-cyan-600">
                    #{pred.id}
                  </td>
                  <td className="py-4 px-5 text-sm text-gray-800 group-hover/row:text-cyan-600">
                    {pred.payer}
                  </td>
                  <td className="py-4 px-5 text-sm font-semibold text-emerald-700 group-hover/row:text-emerald-600">
                    ${pred.amount.toLocaleString('en-US')}
                  </td>
                  <td className="py-4 px-5 text-sm">
                    <motion.span
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: idx * 0.03 }}
                      className={`px-3 py-1.5 rounded-full text-xs font-bold backdrop-blur-xl transition-all inline-block ${
                        pred.risk === 'Low' ? 'bg-emerald-500/30 text-emerald-300 border border-emerald-400/50' :
                        pred.risk === 'Medium' ? 'bg-amber-500/30 text-amber-300 border border-amber-400/50' :
                        'bg-red-500/30 text-red-300 border border-red-400/50'
                      }`}
                    >
                      {pred.risk === 'Low' ? '✓' : pred.risk === 'Medium' ? '⚠' : '✕'} {pred.risk}
                    </motion.span>
                  </td>
                  <td className="py-4 px-5 text-sm font-bold text-cyan-700">
                    {(pred.probability * 100).toFixed(1)}%
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </motion.table>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default DenialAnalytics;
