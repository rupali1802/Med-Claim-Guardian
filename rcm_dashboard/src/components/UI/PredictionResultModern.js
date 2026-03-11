import React from 'react';
import { motion } from 'framer-motion';
import { AlertCircle, CheckCircle, Zap } from 'lucide-react';

const PredictionResultModern = ({ prediction, loading }) => {
  if (loading) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="space-y-6"
      >
        {/* Loading Skeleton */}
        <motion.div
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 h-32 rounded-2xl"
        />
      </motion.div>
    );
  }

  if (!prediction) return null;

  const { risk_level, denial_probability, recommendations, top_features } = prediction;
  const denialPercent = Math.round(denial_probability * 100);

  const getRiskColor = (level) => {
    switch (level?.toLowerCase()) {
      case 'low':
        return 'from-green-600 to-emerald-600';
      case 'medium':
        return 'from-amber-600 to-orange-600';
      case 'high':
        return 'from-red-600 to-rose-600';
      default:
        return 'from-gray-600 to-gray-700';
    }
  };

  const getRiskBgColor = (level) => {
    switch (level?.toLowerCase()) {
      case 'low':
        return 'bg-green-50 border-green-200';
      case 'medium':
        return 'bg-amber-50 border-amber-200';
      case 'high':
        return 'bg-red-50 border-red-200';
      default:
        return 'bg-gray-50 border-gray-200';
    }
  };

  const getRiskIcon = (level) => {
    switch (level?.toLowerCase()) {
      case 'low':
        return <CheckCircle className="w-8 h-8 text-green-600" />;
      case 'medium':
        return <AlertCircle className="w-8 h-8 text-amber-600" />;
      case 'high':
        return <AlertCircle className="w-8 h-8 text-red-600" />;
      default:
        return <Zap className="w-8 h-8 text-gray-600" />;
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 },
    },
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="space-y-6"
    >
      {/* Main Risk Card */}
      <motion.div variants={itemVariants} className={`p-8 rounded-3xl border-2 backdrop-blur-sm ${getRiskBgColor(risk_level)}`}>
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-4">
            {getRiskIcon(risk_level)}
            <div>
              <p className="text-sm text-gray-600 font-semibold">Denial Risk Level</p>
              <h2 className={`text-4xl font-bold bg-gradient-to-r ${getRiskColor(risk_level)} bg-clip-text text-transparent uppercase tracking-wide`}>
                {risk_level}
              </h2>
            </div>
          </div>
        </div>

        {/* Circular Progress */}
        <div className="flex items-center gap-8">
          <div className="relative w-32 h-32">
            <svg viewBox="0 0 100 100" className="w-full h-full transform -rotate-90">
              <circle
                cx="50"
                cy="50"
                r="45"
                fill="none"
                stroke="currentColor"
                strokeWidth="8"
                className="text-gray-200"
              />
              <motion.circle
                cx="50"
                cy="50"
                r="45"
                fill="none"
                strokeWidth="8"
                className={`text-gradient bg-gradient-to-r ${getRiskColor(risk_level)}`}
                strokeDasharray={`${(denialPercent / 100) * 282.7} 282.7`}
                initial={{ strokeDasharray: '0 282.7' }}
                animate={{ strokeDasharray: `${(denialPercent / 100) * 282.7} 282.7` }}
                transition={{ duration: 1.5, ease: 'easeOut' }}
              />
            </svg>
            <div className="absolute inset-0 flex items-center justify-center">
              <dv className="text-center">
                <p className="text-3xl font-bold text-gray-900">{denialPercent}%</p>
                <p className="text-xs text-gray-600">Probability</p>
              </dv>
            </div>
          </div>

          <div className="flex-1">
            <div className="space-y-4">
              <div>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm font-semibold text-gray-700">Denial Probability</span>
                  <span className="text-sm font-bold text-gray-900">{denialPercent}%</span>
                </div>
                <div className="h-3 rounded-full bg-gray-200 overflow-hidden">
                  <motion.div
                    className={`h-full rounded-full bg-gradient-to-r ${getRiskColor(risk_level)}`}
                    initial={{ width: 0 }}
                    animate={{ width: `${denialPercent}%` }}
                    transition={{ duration: 1.5, ease: 'easeOut' }}
                  />
                </div>
              </div>

              <div className="pt-4 border-t border-gray-300">
                <p className="text-xs text-gray-600 font-semibold mb-2">Risk Assessment</p>
                <p className="text-sm text-gray-700">
                  {denialPercent < 33
                    ? 'This claim appears to have strong fundamentals and a high likelihood of approval.'
                    : denialPercent < 67
                    ? 'This claim has some risk factors that should be addressed before submission.'
                    : 'This claim has significant risk factors that require immediate attention.'}
                </p>
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Recommendations Card */}
      {recommendations && recommendations.length > 0 && (
        <motion.div variants={itemVariants} className="bg-white/90 backdrop-blur-xl p-8 rounded-2xl border-2 border-cyan-200 shadow-lg">
          <div className="flex items-center gap-3 mb-6">
            <Zap className="w-6 h-6 text-cyan-600" />
            <h3 className="text-xl font-bold text-gray-900">Recommendations</h3>
          </div>
          <div className="space-y-3">
            {recommendations.slice(0, 5).map((rec, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: idx * 0.1 }}
                className="flex items-start gap-3 p-3 bg-cyan-50 rounded-lg border border-cyan-200"
              >
                <div className="w-6 h-6 rounded-full bg-cyan-600 text-white flex items-center justify-center flex-shrink-0 text-sm font-bold">
                  {idx + 1}
                </div>
                <p className="text-sm text-gray-700 leading-relaxed">{rec}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      )}

      {/* Top Features */}
      {top_features && top_features.length > 0 && (
        <motion.div variants={itemVariants} className="bg-white/90 backdrop-blur-xl p-8 rounded-2xl border-2 border-blue-200 shadow-lg">
          <h3 className="text-xl font-bold text-gray-900 mb-6">Key Factors</h3>
          <div className="space-y-3">
            {top_features.slice(0, 5).map((feature, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: idx * 0.1 }}
                className="flex items-center justify-between p-3 bg-gray-50 rounded-lg border border-gray-200"
              >
                <span className="text-sm font-semibold text-gray-700">{feature.name}</span>
                <motion.div
                  className="h-2 rounded-full bg-gradient-to-r from-blue-400 to-cyan-400"
                  animate={{ width: `${Math.min(feature.importance * 100, 100)}px` }}
                  transition={{ duration: 0.8 }}
                />
              </motion.div>
            ))}
          </div>
        </motion.div>
      )}
    </motion.div>
  );
};

export default PredictionResultModern;
