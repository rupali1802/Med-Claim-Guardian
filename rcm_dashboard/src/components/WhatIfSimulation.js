import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Zap, TrendingDown, TrendingUp, AlertCircle, CheckCircle } from 'lucide-react';
import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:8000';

// Coding accuracy map - procedure-diagnosis compatibility
const CODING_ACCURACY_MAP = {
  'PROC_A': { 'DX1': 0.97, 'DX2': 0.91, 'DX3': 0.55, 'DX4': 0.42, 'DX5': 0.38 },
  'PROC_B': { 'DX1': 0.48, 'DX2': 0.95, 'DX3': 0.93, 'DX4': 0.50, 'DX5': 0.41 },
  'PROC_C': { 'DX1': 0.45, 'DX2': 0.52, 'DX3': 0.96, 'DX4': 0.92, 'DX5': 0.44 },
  'PROC_D': { 'DX1': 0.40, 'DX2': 0.47, 'DX3': 0.53, 'DX4': 0.94, 'DX5': 0.90 },
  'PROC_E': { 'DX1': 0.93, 'DX2': 0.44, 'DX3': 0.46, 'DX4': 0.51, 'DX5': 0.95 },
};

const calculateCodingAccuracy = (procedureCode, diagnosisCode, documentationComplete) => {
  const base = (CODING_ACCURACY_MAP[procedureCode] || {})[diagnosisCode] ?? 0.70;
  const docPenalty = documentationComplete === 'no' ? 0.15 : 0;
  return Math.max(0.10, parseFloat((base - docPenalty).toFixed(2)));
};

function WhatIfSimulation() {
  const [formData, setFormData] = useState({
    patient_age: 45,
    insurance_type: 'Private',
    procedure_code: 'PROC_A',
    diagnosis_code: 'DX1',
    provider_type: 'Specialist',
    claim_amount: 5000,
    prior_authorization: 'yes',
    documentation_complete: 'yes',
    coding_accuracy_score: 0.95,
    claim_submission_delay_days: 5,
    payer: 'UnitedHealth Group',
  });

  const [results, setResults] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [scenarios, setScenarios] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const response = await axios.post(`${API_URL}/predict`, formData);
      setResults(response.data);
      
      // Add to scenarios
      setScenarios([
        ...scenarios,
        {
          id: scenarios.length + 1,
          name: `Scenario ${scenarios.length + 1}`,
          data: formData,
          result: response.data.denial_probability
        }
      ]);
    } catch (err) {
      setError(err.response?.data?.detail || 'Error making prediction');
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    const updated = {
      ...formData,
      [name]: isNaN(value) ? value : parseFloat(value) || value
    };
    // Auto-recalculate coding accuracy when procedure, diagnosis, or documentation changes
    if (['procedure_code', 'diagnosis_code', 'documentation_complete'].includes(name)) {
      updated.coding_accuracy_score = calculateCodingAccuracy(
        updated.procedure_code,
        updated.diagnosis_code,
        updated.documentation_complete
      );
    }
    setFormData(updated);
  };

  const compareScenarios = () => {
    if (scenarios.length < 2) {
      setError('Create at least 2 scenarios to compare');
      return;
    }
    
    const scenario1 = scenarios[0];
    const scenario2 = scenarios[scenarios.length - 1];
    const diff = scenario2.result - scenario1.result;
    const percentChange = ((diff / scenario1.result) * 100).toFixed(2);

    return { scenario1, scenario2, diff, percentChange };
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="space-y-6"
    >
      {/* Main Control Panel */}
      <motion.div
        whileHover={{ boxShadow: '0 25px 50px rgba(0, 0, 0, 0.2)' }}
        className="bg-white/10 backdrop-blur-2xl border border-white/20 p-8 rounded-2xl transition-all duration-300"
      >
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.1 }}
          className="mb-6"
        >
          <div className="flex items-center gap-3">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
              className="text-cyan-400"
            >
              <Zap className="w-8 h-8" />
            </motion.div>
            <div>
              <h2 className="text-3xl font-bold bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
                What-If Simulation Engine
              </h2>
              <p className="text-gray-600 text-sm font-medium mt-1">
                Adjust parameters and see how changes affect denial probability in real-time
              </p>
            </div>
          </div>
        </motion.div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Input Fields Grid */}
          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            initial="hidden"
            animate="visible"
            variants={{
              visible: {
                transition: {
                  staggerChildren: 0.1,
                },
              },
            }}
          >
            {/* Age Slider */}
            <motion.div
              variants={{
                hidden: { opacity: 0, y: 10 },
                visible: { opacity: 1, y: 0 },
              }}
              className="bg-blue-50 p-4 rounded-xl border-2 border-blue-200"
            >
              <label className="block text-gray-800 text-sm font-bold mb-3 flex items-center gap-2">
                👤 Patient Age
              </label>
              <input
                type="range"
                name="patient_age"
                min="18"
                max="100"
                value={formData.patient_age}
                onChange={handleInputChange}
                className="w-full h-2 bg-gradient-to-r from-blue-600 to-cyan-600 rounded-lg appearance-none cursor-pointer accent-cyan-500"
              />
              <div className="flex justify-between items-center mt-3">
                <span className="text-blue-700 font-bold text-lg">{formData.patient_age}</span>
                <span className="text-blue-600 font-semibold text-sm">years</span>
              </div>
            </motion.div>

            {/* Insurance Type */}
            <motion.div
              variants={{
                hidden: { opacity: 0, y: 10 },
                visible: { opacity: 1, y: 0 },
              }}
              className="bg-teal-50 p-4 rounded-xl border-2 border-teal-200"
            >
              <label className="block text-gray-800 text-sm font-bold mb-3">🏥 Insurance Type</label>
              <select
                name="insurance_type"
                value={formData.insurance_type}
                onChange={handleInputChange}
                className="w-full bg-white text-gray-900 px-4 py-3 rounded-lg border-2 border-gray-300 focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:border-cyan-400 text-sm font-semibold hover:border-cyan-300 transition-all"
              >
                <option className="bg-white text-gray-900">Private</option>
                <option className="bg-white text-gray-900">Medicaid</option>
                <option className="bg-white text-gray-900">Medicare</option>
              </select>
            </motion.div>

            {/* Procedure Code */}
            <motion.div
              variants={{
                hidden: { opacity: 0, y: 10 },
                visible: { opacity: 1, y: 0 },
              }}
              className="bg-purple-50 p-4 rounded-xl border-2 border-purple-200"
            >
              <label className="block text-gray-800 text-sm font-bold mb-3">📋 Procedure Code</label>
              <select
                name="procedure_code"
                value={formData.procedure_code}
                onChange={handleInputChange}
                className="w-full bg-white text-gray-900 px-4 py-3 rounded-lg border-2 border-gray-300 focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:border-cyan-400 text-sm font-semibold hover:border-cyan-300 transition-all"
              >
                <option className="bg-white text-gray-900">PROC_A</option>
                <option className="bg-white text-gray-900">PROC_B</option>
                <option className="bg-white text-gray-900">PROC_C</option>
                <option className="bg-white text-gray-900">PROC_D</option>
                <option className="bg-white text-gray-900">PROC_E</option>
              </select>
            </motion.div>

            {/* Payer */}
            <motion.div
              variants={{
                hidden: { opacity: 0, y: 10 },
                visible: { opacity: 1, y: 0 },
              }}
              className="bg-indigo-50 p-4 rounded-xl border-2 border-indigo-200"
            >
              <label className="block text-gray-800 text-sm font-bold mb-3">🏢 Payer</label>
              <select
                name="payer"
                value={formData.payer}
                onChange={handleInputChange}
                className="w-full bg-white text-gray-900 px-4 py-3 rounded-lg border-2 border-gray-300 focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:border-cyan-400 text-sm font-semibold hover:border-cyan-300 transition-all"
              >
                <option className="bg-white text-gray-900">UnitedHealth Group</option>
                <option className="bg-white text-gray-900">Anthem Blue Cross</option>
                <option className="bg-white text-gray-900">Aetna</option>
                <option className="bg-white text-gray-900">Cigna</option>
                <option className="bg-white text-gray-900">Humana</option>
                <option className="bg-white text-gray-900">Blue Shield</option>
                <option className="bg-white text-gray-900">Tricare</option>
                <option className="bg-white text-gray-900">Medicare</option>
                <option className="bg-white text-gray-900">Medicaid</option>
                <option className="bg-white text-gray-900">GEICO</option>
                <option className="bg-white text-gray-900">State Farm</option>
                <option className="bg-white text-gray-900">Allstate</option>
                <option className="bg-white text-gray-900">AARP Medicare</option>
                <option className="bg-white text-gray-900">Marketplace Plans</option>
              </select>
            </motion.div>

            {/* Claim Amount Slider */}
            <motion.div
              variants={{
                hidden: { opacity: 0, y: 10 },
                visible: { opacity: 1, y: 0 },
              }}
              className="bg-green-50 p-4 rounded-xl border-2 border-green-200"
            >
              <label className="block text-gray-800 text-sm font-bold mb-3 flex items-center gap-2">
                💰 Claim Amount
              </label>
              <input
                type="range"
                name="claim_amount"
                min="1000"
                max="500000"
                value={formData.claim_amount}
                onChange={handleInputChange}
                className="w-full h-2 bg-gradient-to-r from-green-600 to-emerald-600 rounded-lg appearance-none cursor-pointer accent-emerald-500"
              />
              <div className="mt-3 text-center">
                <span className="text-green-700 font-bold text-xl">
                  ${formData.claim_amount.toLocaleString('en-US')}
                </span>
              </div>
            </motion.div>

            {/* Coding Accuracy - Auto-Calculated */}
            <motion.div
              variants={{
                hidden: { opacity: 0, y: 10 },
                visible: { opacity: 1, y: 0 },
              }}
              className="bg-gradient-to-br from-purple-50 to-pink-50 p-4 rounded-xl border-2 border-purple-200"
            >
              <label className="block text-gray-800 text-sm font-bold mb-3 flex items-center gap-2">
                ✓ Coding Accuracy
                <span className="ml-auto text-xs font-semibold text-purple-600 bg-purple-100 px-2 py-1 rounded-full">Auto</span>
              </label>
              <div className="mb-2">
                <div className="w-full h-3 bg-gray-300 rounded-full overflow-hidden border border-gray-400">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${formData.coding_accuracy_score * 100}%` }}
                    transition={{ duration: 0.5, ease: 'easeOut' }}
                    className="h-full bg-gradient-to-r from-purple-500 to-pink-500"
                  />
                </div>
              </div>
              <div className="text-right">
                <span className="text-gray-800 font-bold text-lg">
                  {(formData.coding_accuracy_score * 100).toFixed(0)}%
                </span>
                <p className="text-xs text-gray-600 mt-1">Based on procedure & diagnosis compatibility</p>
              </div>
            </motion.div>

            {/* Documentation */}
            <motion.div
              variants={{
                hidden: { opacity: 0, y: 10 },
                visible: { opacity: 1, y: 0 },
              }}
              className="bg-yellow-50 p-4 rounded-xl border-2 border-yellow-200"
            >
              <label className="block text-gray-800 text-sm font-bold mb-3">📄 Documentation</label>
              <select
                name="documentation_complete"
                value={formData.documentation_complete}
                onChange={handleInputChange}
                className="w-full bg-white text-gray-900 px-4 py-3 rounded-lg border-2 border-gray-300 focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:border-cyan-400 text-sm font-semibold hover:border-cyan-300 transition-all"
              >
                <option value="yes" className="bg-white text-gray-900">Complete</option>
                <option value="no" className="bg-white text-gray-900">Incomplete</option>
              </select>
            </motion.div>

            {/* Prior Authorization */}
            <motion.div
              variants={{
                hidden: { opacity: 0, y: 10 },
                visible: { opacity: 1, y: 0 },
              }}
              className="bg-rose-50 p-4 rounded-xl border-2 border-rose-200"
            >
              <label className="block text-gray-800 text-sm font-bold mb-3">✅ Prior Auth</label>
              <select
                name="prior_authorization"
                value={formData.prior_authorization}
                onChange={handleInputChange}
                className="w-full bg-white text-gray-900 px-4 py-3 rounded-lg border-2 border-gray-300 focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:border-cyan-400 text-sm font-semibold hover:border-cyan-300 transition-all"
              >
                <option value="yes" className="bg-white text-gray-900">Yes</option>
                <option value="no" className="bg-white text-gray-900">No</option>
              </select>
            </motion.div>

            {/* Submission Delay */}
            <motion.div
              variants={{
                hidden: { opacity: 0, y: 10 },
                visible: { opacity: 1, y: 0 },
              }}
              className="bg-orange-50 p-4 rounded-xl border-2 border-orange-200"
            >
              <label className="block text-gray-800 text-sm font-bold mb-3 flex items-center gap-2">
                ⏱️ Submission Delay
              </label>
              <input
                type="range"
                name="claim_submission_delay_days"
                min="0"
                max="60"
                value={formData.claim_submission_delay_days}
                onChange={handleInputChange}
                className="w-full h-2 bg-gradient-to-r from-orange-600 to-red-600 rounded-lg appearance-none cursor-pointer accent-red-500"
              />
              <div className="flex justify-between items-center mt-3">
                <span className="text-orange-700 font-bold text-lg">{formData.claim_submission_delay_days}</span>
                <span className="text-orange-600 font-semibold text-sm">days</span>
              </div>
            </motion.div>
          </motion.div>

          {/* Error Message */}
          {error && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-red-500/20 border border-red-400/50 backdrop-blur p-4 rounded-xl flex gap-3"
            >
              <AlertCircle className="w-5 h-5 text-red-400 flex-shrink-0" />
              <span className="text-red-200 text-sm">{error}</span>
            </motion.div>
          )}

          {/* Simulate Button */}
          <motion.button
            type="submit"
            disabled={loading}
            whileHover={{ scale: loading ? 1 : 1.02 }}
            whileTap={{ scale: 0.98 }}
            className={`w-full bg-gradient-to-r from-blue-600 via-cyan-600 to-green-600 text-white font-bold py-4 px-6 rounded-xl transition-all duration-300 flex items-center justify-center gap-2 ${
              loading ? 'opacity-75 cursor-not-allowed' : 'hover:shadow-2xl hover:shadow-cyan-500/40'
            }`}
          >
            {loading ? (
              <>
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
                  className="w-5 h-5"
                >
                  <Zap className="w-5 h-5" />
                </motion.div>
                <span>Analyzing...</span>
              </>
            ) : (
              <>
                <Zap className="w-5 h-5" />
                <span>Simulate Scenario</span>
              </>
            )}
          </motion.button>
        </form>
      </motion.div>

      {/* Results Section */}
      {results && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
        >
          {/* Current Scenario Result */}
          <motion.div
            whileHover={{ boxShadow: '0 25px 50px rgba(0, 0, 0, 0.3)' }}
            className="bg-white/10 backdrop-blur-2xl border border-white/20 p-6 rounded-2xl transition-all duration-300"
          >
            <motion.h3
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.1 }}
              className="text-2xl font-bold text-cyan-300 mb-6 flex items-center gap-2"
            >
              <CheckCircle className="w-6 h-6" />
              Current Scenario
            </motion.h3>
            <motion.div
              className="space-y-4"
              initial="hidden"
              animate="visible"
              variants={{
                visible: {
                  transition: {
                    staggerChildren: 0.1,
                  },
                },
              }}
            >
              {/* Denial Probability */}
              <motion.div
                variants={{
                  hidden: { opacity: 0, x: -10 },
                  visible: { opacity: 1, x: 0 },
                }}
                className="bg-white/5 p-4 rounded-xl border border-white/10"
              >
                <div className="text-gray-800 text-sm font-semibold mb-2">Denial Probability</div>
                <div className="text-4xl font-bold bg-gradient-to-r from-red-400 to-orange-400 bg-clip-text text-transparent">
                  {(results.denial_probability * 100).toFixed(1)}%
                </div>
              </motion.div>

              {/* Risk Level */}
              <motion.div
                variants={{
                  hidden: { opacity: 0, x: -10 },
                  visible: { opacity: 1, x: 0 },
                }}
                className="bg-white/5 p-4 rounded-xl border border-white/10"
              >
                <div className="text-gray-800 text-sm font-semibold mb-2">Risk Level</div>
                <div className={`text-2xl font-bold ${
                  results.risk_level === 'Low' ? 'text-emerald-400' :
                  results.risk_level === 'Medium' ? 'text-amber-400' : 'text-red-400'
                }`}>
                  {results.risk_level}
                </div>
              </motion.div>

              {/* Confidence Score */}
              <motion.div
                variants={{
                  hidden: { opacity: 0, x: -10 },
                  visible: { opacity: 1, x: 0 },
                }}
                className="bg-white/5 p-4 rounded-xl border border-white/10"
              >
                <div className="text-gray-800 text-sm font-semibold mb-2">Confidence Score</div>
                <div className="flex items-center gap-2">
                  <div className="text-xl font-bold text-blue-400">
                    {(results.confidence_score * 100).toFixed(1)}%
                  </div>
                  <div className="flex-1 bg-white/10 rounded-full h-2 overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${results.confidence_score * 100}%` }}
                      transition={{ duration: 1, ease: 'easeOut' }}
                      className="h-full bg-gradient-to-r from-blue-500 to-cyan-500"
                    />
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </motion.div>

          {/* Comparison Section */}
          {scenarios.length > 1 && compareScenarios() && (
            <motion.div
              whileHover={{ boxShadow: '0 25px 50px rgba(0, 0, 0, 0.3)' }}
              className="bg-white/10 backdrop-blur-2xl border border-white/20 p-6 rounded-2xl transition-all duration-300"
            >
              <motion.h3
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.1 }}
                className="text-2xl font-bold text-cyan-300 mb-6 flex items-center gap-2"
              >
                <TrendingUp className="w-6 h-6" />
                Scenario Comparison
              </motion.h3>
              <motion.div
                className="space-y-4"
                initial="hidden"
                animate="visible"
                variants={{
                  visible: {
                    transition: {
                      staggerChildren: 0.1,
                    },
                  },
                }}
              >
                <motion.div
                  variants={{
                    hidden: { opacity: 0, x: -10 },
                    visible: { opacity: 1, x: 0 },
                  }}
                  className="bg-white/5 p-4 rounded-xl border border-white/10"
                >
                  <div className="text-gray-800 text-sm font-semibold mb-2">Baseline Scenario</div>
                  <div className="text-2xl font-bold text-blue-400">
                    {(compareScenarios().scenario1.result * 100).toFixed(1)}%
                  </div>
                </motion.div>

                <motion.div
                  variants={{
                    hidden: { opacity: 0, x: -10 },
                    visible: { opacity: 1, x: 0 },
                  }}
                  className="bg-white/5 p-4 rounded-xl border border-white/10"
                >
                  <div className="text-gray-800 text-sm font-semibold mb-2">Latest Scenario</div>
                  <div className="text-2xl font-bold text-cyan-400">
                    {(compareScenarios().scenario2.result * 100).toFixed(1)}%
                  </div>
                </motion.div>

                <motion.div
                  variants={{
                    hidden: { opacity: 0, x: -10 },
                    visible: { opacity: 1, x: 0 },
                  }}
                  className={`bg-white/5 p-4 rounded-xl border ${
                    compareScenarios().diff < 0 ? 'border-emerald-400/30' : 'border-red-400/30'
                  }`}
                >
                  <div className="text-gray-800 text-sm font-semibold mb-2">Change</div>
                  <div className="flex items-center gap-2">
                    {compareScenarios().diff < 0 ? (
                      <TrendingDown className="w-5 h-5 text-emerald-400" />
                    ) : (
                      <TrendingUp className="w-5 h-5 text-red-400" />
                    )}
                    <div className={`text-2xl font-bold ${
                      compareScenarios().diff < 0 ? 'text-emerald-400' : 'text-red-400'
                    }`}>
                      {compareScenarios().diff > 0 ? '+' : ''}{(compareScenarios().diff * 100).toFixed(1)}%
                    </div>
                  </div>
                  <div className="text-gray-700 text-xs mt-2 font-medium">
                    {compareScenarios().percentChange}% change
                  </div>
                </motion.div>
              </motion.div>
            </motion.div>
          )}
        </motion.div>
      )}

      {/* Scenarios History */}
      {scenarios.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          whileHover={{ boxShadow: '0 25px 50px rgba(0, 0, 0, 0.2)' }}
          className="bg-white/10 backdrop-blur-2xl border border-white/20 p-6 rounded-2xl transition-all duration-300"
        >
          <motion.h3
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.15 }}
            className="text-2xl font-bold text-cyan-300 mb-4 flex items-center gap-2"
          >
            <Zap className="w-6 h-6" />
            Scenarios History ({scenarios.length})
          </motion.h3>
          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 max-h-64 overflow-y-auto"
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
            {scenarios.map((scenario, idx) => (
              <motion.div
                key={idx}
                variants={{
                  hidden: { opacity: 0, scale: 0.9 },
                  visible: { opacity: 1, scale: 1 },
                }}
                whileHover={{ scale: 1.05 }}
                className={`p-4 rounded-xl border transition-all cursor-pointer ${
                  scenario.result < 0.33
                    ? 'bg-emerald-900/20 border-emerald-400/30 hover:border-emerald-400/60'
                    : scenario.result < 0.67
                    ? 'bg-amber-900/20 border-amber-400/30 hover:border-amber-400/60'
                    : 'bg-red-900/20 border-red-400/30 hover:border-red-400/60'
                }`}
              >
                <div className="text-gray-800 text-sm font-semibold">Scenario {idx + 1}</div>
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: '100%' }}
                  transition={{ duration: 0.5, delay: idx * 0.05 }}
                  className="text-2xl font-bold mt-2"
                >
                  <span className={
                    scenario.result < 0.33
                      ? 'text-emerald-400'
                      : scenario.result < 0.67
                      ? 'text-amber-400'
                      : 'text-red-400'
                  }>
                    {(scenario.result * 100).toFixed(1)}%
                  </span>
                </motion.div>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      )}
    </motion.div>
  );
}

export default WhatIfSimulation;
