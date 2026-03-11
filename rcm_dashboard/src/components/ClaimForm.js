import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Zap, AlertCircle, CheckCircle } from 'lucide-react';

const CATEGORICAL_OPTIONS = {
  insurance_type: ['Private', 'Medicaid', 'Medicare'],
  procedure_code: ['PROC_A', 'PROC_B', 'PROC_C', 'PROC_D', 'PROC_E'],
  diagnosis_code: ['DX1', 'DX2', 'DX3', 'DX4', 'DX5'],
  provider_type: ['Hospital', 'Specialist', 'Clinic', 'Diagnostic Center'],
  prior_authorization: ['yes', 'no'],
  documentation_complete: ['yes', 'no'],
  payer: [
    'UnitedHealth Group',
    'Anthem Blue Cross',
    'Aetna',
    'Cigna',
    'Humana',
    'Blue Shield',
    'Tricare',
    'Medicare',
    'Medicaid',
    'GEICO',
    'State Farm',
    'Allstate',
    'AARP Medicare',
    'Marketplace Plans',
  ],
};

const FIELD_ICONS = {
  patient_age: '👤',
  insurance_type: '🏥',
  procedure_code: '🔬',
  diagnosis_code: '📋',
  provider_type: '🏢',
  claim_amount: '💰',
  prior_authorization: '✅',
  documentation_complete: '📄',
  coding_accuracy_score: '🎯',
  claim_submission_delay_days: '⏱️',
  payer: '🏦',
};

const FIELD_DESCRIPTIONS = {
  patient_age: 'Patient age at time of claim',
  insurance_type: 'Type of insurance coverage',
  procedure_code: 'Medical procedure code',
  diagnosis_code: 'Primary diagnosis code',
  provider_type: 'Healthcare provider category',
  claim_amount: 'Total claim amount in dollars',
  prior_authorization: 'Prior authorization obtained',
  documentation_complete: 'All documentation provided',
  coding_accuracy_score: 'Medical coding accuracy (0-100%)',
  claim_submission_delay_days: 'Days delayed from service date',
  payer: 'Insurance payer company',
};

// Real-world coding accuracy: based on procedure-diagnosis compatibility
// Matches how hospital billing software validates ICD/CPT code pairs
const CODING_ACCURACY_MAP = {
  'PROC_A': { 'DX1': 0.97, 'DX2': 0.91, 'DX3': 0.55, 'DX4': 0.42, 'DX5': 0.38 },
  'PROC_B': { 'DX1': 0.48, 'DX2': 0.95, 'DX3': 0.93, 'DX4': 0.50, 'DX5': 0.41 },
  'PROC_C': { 'DX1': 0.45, 'DX2': 0.52, 'DX3': 0.96, 'DX4': 0.92, 'DX5': 0.44 },
  'PROC_D': { 'DX1': 0.40, 'DX2': 0.47, 'DX3': 0.53, 'DX4': 0.94, 'DX5': 0.90 },
  'PROC_E': { 'DX1': 0.93, 'DX2': 0.44, 'DX3': 0.46, 'DX4': 0.51, 'DX5': 0.95 },
};

const calculateCodingAccuracy = (procedureCode, diagnosisCode, documentationComplete) => {
  const base = (CODING_ACCURACY_MAP[procedureCode] || {})[ diagnosisCode] ?? 0.70;
  const docPenalty = documentationComplete === 'no' ? 0.15 : 0;
  return Math.max(0.10, parseFloat((base - docPenalty).toFixed(2)));
};

const FormSection = ({ icon, title, subtitle, children, delay = 0, color = 'blue' }) => {
  const colors = {
    blue: 'from-blue-50 to-blue-50/50 border-blue-200 bg-gradient-to-br from-blue-50/80 to-blue-50/30',
    teal: 'from-teal-50 to-teal-50/50 border-teal-200 bg-gradient-to-br from-teal-50/80 to-teal-50/30',
    green: 'from-green-50 to-green-50/50 border-green-200 bg-gradient-to-br from-green-50/80 to-green-50/30',
    amber: 'from-amber-50 to-amber-50/50 border-amber-200 bg-gradient-to-br from-amber-50/80 to-amber-50/30',
  };

  const titleColors = {
    blue: 'text-blue-900 from-blue-600 to-blue-500',
    teal: 'text-teal-900 from-teal-600 to-teal-500',
    green: 'text-green-900 from-green-600 to-green-500',
    amber: 'text-amber-900 from-amber-600 to-amber-500',
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
      className={`backdrop-blur-sm p-6 rounded-2xl border-2 ${colors[color]} shadow-lg hover:shadow-xl transition-shadow duration-300`}
    >
      <div className="mb-6">
        <div className="flex items-center gap-3 mb-2">
          <span className="text-2xl">{icon}</span>
          <h3 className={`text-lg font-bold bg-gradient-to-r ${titleColors[color]} bg-clip-text text-transparent`}>
            {title}
          </h3>
        </div>
        {subtitle && <p className="text-sm text-gray-700 ml-9 font-medium">{subtitle}</p>}
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {children}
      </div>
    </motion.div>
  );
};

const ModernFormField = ({ name, label, type = 'text', options, description, icon, isReadOnly = false, isDropdown = false, value, onChange, index = 0 }) => (
  <motion.div
    initial={{ opacity: 0, y: 10 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.3, delay: index * 0.05 }}
    className="group"
  >
    <label className="flex items-center gap-2 text-sm font-semibold text-gray-800 mb-2 group-hover:text-blue-700 transition-colors">
      <span className="text-lg">{icon}</span>
      {label}
      <span className="text-red-500 ml-0.5">*</span>
    </label>
    <p className="text-xs text-gray-700 mb-2.5 font-medium">{description}</p>
    {isDropdown ? (
      <motion.select
        whileFocus={{ scale: 1.01 }}
        name={name}
        value={value}
        onChange={onChange}
        className="w-full px-4 py-3 bg-white/80 backdrop-blur border-2 border-gray-200 rounded-xl text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 hover:border-blue-300 hover:bg-white/90"
        required
      >
        {options.map((opt) => (
          <option key={opt} value={opt} className="bg-white text-gray-900">
            {typeof opt === 'string' ? (opt === 'yes' ? 'Yes' : opt === 'no' ? 'No' : opt) : opt}
          </option>
        ))}
      </motion.select>
    ) : (
      <motion.input
        whileFocus={{ scale: 1.01 }}
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        className={`w-full px-4 py-3 bg-white/80 backdrop-blur border-2 border-gray-200 rounded-xl text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 hover:border-blue-300 hover:bg-white/90 ${isReadOnly ? 'cursor-not-allowed bg-gray-50/80 opacity-60' : ''}`}
        {...(type === 'number' && name === 'patient_age' ? { min: '1', max: '120' } : {})}
        {...(type === 'number' && name === 'claim_amount' ? { min: '0', step: '0.01' } : {})}
        {...(type === 'number' && name === 'claim_submission_delay_days' ? { min: '0', max: '365' } : {})}
        required={!isReadOnly}
        disabled={isReadOnly}
      />
    )}
  </motion.div>
);

const ClaimForm = ({ onSubmit, onReset, isLoading }) => {
  const [formData, setFormData] = useState(() => {
    const defaults = {
      patient_age: 45,
      insurance_type: 'Private',
      procedure_code: 'PROC_A',
      diagnosis_code: 'DX1',
      provider_type: 'Specialist',
      claim_amount: 5000,
      prior_authorization: 'yes',
      documentation_complete: 'yes',
      claim_submission_delay_days: 5,
      payer: 'UnitedHealth Group',
    };
    return {
      ...defaults,
      coding_accuracy_score: calculateCodingAccuracy(defaults.procedure_code, defaults.diagnosis_code, defaults.documentation_complete),
    };
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    const numericFields = ['patient_age', 'claim_amount', 'claim_submission_delay_days'];
    const updated = {
      ...formData,
      [name]: numericFields.includes(name) ? parseFloat(value) || value : value,
    };
    // Auto-recalculate coding accuracy when relevant fields change
    if (['procedure_code', 'diagnosis_code', 'documentation_complete'].includes(name)) {
      updated.coding_accuracy_score = calculateCodingAccuracy(
        updated.procedure_code,
        updated.diagnosis_code,
        updated.documentation_complete
      );
    }
    setFormData(updated);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  const resetForm = (e) => {
    if (e) e.preventDefault();
    const defaults = {
      patient_age: 45,
      insurance_type: 'Private',
      procedure_code: 'PROC_A',
      diagnosis_code: 'DX1',
      provider_type: 'Specialist',
      claim_amount: 5000,
      prior_authorization: 'yes',
      documentation_complete: 'yes',
      claim_submission_delay_days: 5,
      payer: 'UnitedHealth Group',
    };
    setFormData({
      ...defaults,
      coding_accuracy_score: calculateCodingAccuracy(defaults.procedure_code, defaults.diagnosis_code, defaults.documentation_complete),
    });
    if (onReset) onReset();
  };

  const codingAccuracyPercent = formData.coding_accuracy_score * 100;
  const accuracyStatus = codingAccuracyPercent >= 85 ? 'excellent' : codingAccuracyPercent >= 60 ? 'good' : 'warning';
  const aceColorClass = accuracyStatus === 'excellent' ? 'from-green-500 to-emerald-600' : accuracyStatus === 'good' ? 'from-amber-500 to-orange-600' : 'from-red-500 to-rose-600';

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* 1. PATIENT & INSURANCE INFORMATION */}
      <FormSection
        icon="👤"
        title="Patient & Insurance Information"
        subtitle="Core claim details"
        color="blue"
        delay={0}
      >
        <ModernFormField
          name="patient_age"
          label="Patient Age"
          type="number"
          value={formData.patient_age}
          onChange={handleChange}
          description={FIELD_DESCRIPTIONS.patient_age}
          icon={FIELD_ICONS.patient_age}
          index={0}
        />
        <ModernFormField
          name="insurance_type"
          label="Insurance Type"
          options={CATEGORICAL_OPTIONS.insurance_type}
          value={formData.insurance_type}
          onChange={handleChange}
          description={FIELD_DESCRIPTIONS.insurance_type}
          icon={FIELD_ICONS.insurance_type}
          isDropdown={true}
          index={1}
        />
        <ModernFormField
          name="payer"
          label="Insurance Payer (US)"
          options={CATEGORICAL_OPTIONS.payer}
          value={formData.payer}
          onChange={handleChange}
          description={FIELD_DESCRIPTIONS.payer}
          icon={FIELD_ICONS.payer}
          isDropdown={true}
          index={2}
        />
      </FormSection>

      {/* 2. CLINICAL & CODING INFORMATION */}
      <FormSection
        icon="🔬"
        title="Clinical & Coding Information"
        subtitle="Medical procedure and diagnosis"
        color="teal"
        delay={0.1}
      >
        <ModernFormField
          name="procedure_code"
          label="Procedure Code"
          options={CATEGORICAL_OPTIONS.procedure_code}
          value={formData.procedure_code}
          onChange={handleChange}
          description={FIELD_DESCRIPTIONS.procedure_code}
          icon={FIELD_ICONS.procedure_code}
          isDropdown={true}
          index={0}
        />
        <ModernFormField
          name="diagnosis_code"
          label="Diagnosis Code"
          options={CATEGORICAL_OPTIONS.diagnosis_code}
          value={formData.diagnosis_code}
          onChange={handleChange}
          description={FIELD_DESCRIPTIONS.diagnosis_code}
          icon={FIELD_ICONS.diagnosis_code}
          isDropdown={true}
          index={1}
        />
        {/* Coding Accuracy Display */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.1 }}
          className="group"
        >
          <label className="flex items-center gap-2 text-sm font-semibold text-gray-800 mb-2">
            <span className="text-lg">{FIELD_ICONS.coding_accuracy_score}</span>
            Coding Accuracy
            <motion.span
              whileHover={{ scale: 1.05 }}
              className="ml-auto text-xs font-bold px-3 py-1 rounded-full bg-gradient-to-r from-blue-500 to-cyan-500 text-white border border-blue-300"
            >
              Auto
            </motion.span>
          </label>
          <p className="text-xs text-gray-700 mb-3 font-medium">Procedure–diagnosis compatibility</p>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="space-y-2"
          >
            {/* Progress Bar */}
            <div className="flex items-center gap-3">
              <div className="flex-1 h-3 rounded-full bg-gray-200 overflow-hidden">
                <motion.div
                  animate={{ width: `${codingAccuracyPercent}%` }}
                  transition={{ duration: 0.6, ease: 'easeOut' }}
                  className={`h-full rounded-full bg-gradient-to-r ${aceColorClass} shadow-lg`}
                />
              </div>
              <motion.div
                animate={{ scale: codingAccuracyPercent > 50 ? 1 : 0.95 }}
                className={`px-3 py-1.5 rounded-lg font-bold text-sm w-16 text-center border-2 ${
                  accuracyStatus === 'excellent'
                    ? 'bg-green-100 border-green-400 text-green-700'
                    : accuracyStatus === 'good'
                    ? 'bg-amber-100 border-amber-400 text-amber-700'
                    : 'bg-red-100 border-red-400 text-red-700'
                }`}
              >
                {codingAccuracyPercent.toFixed(0)}%
              </motion.div>
            </div>
            {/* Status Indicator */}
            <motion.div
              animate={{ opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 2, repeat: Infinity }}
              className={`flex items-center gap-2 text-xs font-semibold ${
                accuracyStatus === 'excellent'
                  ? 'text-green-700'
                  : accuracyStatus === 'good'
                  ? 'text-amber-700'
                  : 'text-red-700'
              }`}
            >
              {accuracyStatus === 'excellent' ? (
                <CheckCircle className="w-4 h-4" />
              ) : accuracyStatus === 'good' ? (
                <AlertCircle className="w-4 h-4" />
              ) : (
                <AlertCircle className="w-4 h-4" />
              )}
              {accuracyStatus === 'excellent'
                ? 'Excellent compatibility'
                : accuracyStatus === 'good'
                ? 'Good match'
                : 'Low compatibility'}
            </motion.div>
          </motion.div>
        </motion.div>
      </FormSection>

      {/* 3. PROVIDER & CLAIM INFORMATION */}
      <FormSection
        icon="🏥"
        title="Provider & Claim Information"
        subtitle="Provider type and claim details"
        color="green"
        delay={0.2}
      >
        <ModernFormField
          name="provider_type"
          label="Provider Type"
          options={CATEGORICAL_OPTIONS.provider_type}
          value={formData.provider_type}
          onChange={handleChange}
          description={FIELD_DESCRIPTIONS.provider_type}
          icon={FIELD_ICONS.provider_type}
          isDropdown={true}
          index={0}
        />
        <ModernFormField
          name="claim_amount"
          label="Claim Amount ($)"
          type="number"
          value={formData.claim_amount}
          onChange={handleChange}
          description={FIELD_DESCRIPTIONS.claim_amount}
          icon={FIELD_ICONS.claim_amount}
          index={1}
        />
        <ModernFormField
          name="claim_submission_delay_days"
          label="Submission Delay (days)"
          type="number"
          value={formData.claim_submission_delay_days}
          onChange={handleChange}
          description={FIELD_DESCRIPTIONS.claim_submission_delay_days}
          icon={FIELD_ICONS.claim_submission_delay_days}
          index={2}
        />
      </FormSection>

      {/* 4. DOCUMENTATION & AUTHORIZATION */}
      <FormSection
        icon="📋"
        title="Documentation & Authorization"
        subtitle="Completeness and authorization status"
        color="amber"
        delay={0.3}
      >
        <ModernFormField
          name="documentation_complete"
          label="Documentation Complete"
          options={CATEGORICAL_OPTIONS.documentation_complete}
          value={formData.documentation_complete}
          onChange={handleChange}
          description={FIELD_DESCRIPTIONS.documentation_complete}
          icon={FIELD_ICONS.documentation_complete}
          isDropdown={true}
          index={0}
        />
        <ModernFormField
          name="prior_authorization"
          label="Prior Authorization"
          options={CATEGORICAL_OPTIONS.prior_authorization}
          value={formData.prior_authorization}
          onChange={handleChange}
          description={FIELD_DESCRIPTIONS.prior_authorization}
          icon={FIELD_ICONS.prior_authorization}
          isDropdown={true}
          index={1}
        />
      </FormSection>

      {/* Action Buttons */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
        className="flex gap-4 pt-6 border-t-2 border-gray-200"
      >
        {/* Predict Button */}
        <motion.button
          type="submit"
          disabled={isLoading}
          whileHover={{ scale: isLoading ? 1 : 1.02 }}
          whileTap={{ scale: 0.98 }}
          className={`flex-1 px-6 py-4 rounded-xl font-bold text-base flex items-center justify-center gap-3 transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-blue-300 ${
            isLoading
              ? 'bg-gradient-to-r from-blue-400 to-cyan-400 text-white opacity-70 cursor-not-allowed'
              : 'bg-gradient-to-r from-blue-600 to-cyan-600 text-white hover:shadow-xl hover:shadow-blue-500/40 active:scale-95'
          }`}
        >
          {isLoading ? (
            <>
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                className="w-5 h-5 border-3 border-white border-t-transparent rounded-full"
              />
              <span>Processing...</span>
            </>
          ) : (
            <>
              <Zap className="w-5 h-5" />
              <span>Predict Claim</span>
            </>
          )}
        </motion.button>

        {/* Reset Button */}
        <motion.button
          type="button"
          onClick={resetForm}
          disabled={isLoading}
          whileHover={{ scale: isLoading ? 1 : 1.02 }}
          whileTap={{ scale: 0.98 }}
          className={`flex-1 px-6 py-4 rounded-xl font-bold text-base flex items-center justify-center gap-3 border-2 transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-gray-300 ${
            isLoading
              ? 'bg-gray-100 border-gray-300 text-gray-400 cursor-not-allowed'
              : 'bg-white border-gray-300 text-gray-700 hover:bg-gray-50 hover:shadow-lg active:scale-95'
          }`}
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
          </svg>
          <span>Reset</span>
        </motion.button>
      </motion.div>
    </form>
  );
};

export default ClaimForm;
