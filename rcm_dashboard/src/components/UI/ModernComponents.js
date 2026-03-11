import React from 'react';
import { motion } from 'framer-motion';

export function ModernCard({ children, className = '', hoverable = true, gradient = false, ...props }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      whileHover={hoverable ? { y: -4, boxShadow: '0 20px 40px rgba(0,0,0,0.2)' } : {}}
      className={`
        bg-white/80 backdrop-blur-xl rounded-2xl border border-white/20
        shadow-lg hover:shadow-2xl transition-all duration-300
        ${gradient ? 'bg-gradient-to-br from-white/90 to-gray-50/80' : ''}
        ${className}
      `}
      {...props}
    >
      {children}
    </motion.div>
  );
}

export function AnimatedButton({ children, onClick, className = '', variant = 'primary', disabled = false, ...props }) {
  const variants = {
    primary: 'bg-gradient-to-r from-blue-600 to-cyan-600 text-white hover:shadow-lg hover:shadow-blue-500/50',
    secondary: 'bg-gray-200 text-gray-900 hover:bg-gray-300',
    outline: 'border-2 border-blue-600 text-blue-600 hover:bg-blue-50',
  };

  return (
    <motion.button
      onClick={onClick}
      disabled={disabled}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      transition={{ type: 'spring', stiffness: 200, damping: 20 }}
      className={`
        px-6 py-3 rounded-lg font-semibold transition-all duration-200
        ${variants[variant]}
        ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}
        ${className}
      `}
      {...props}
    >
      {children}
    </motion.button>
  );
}

export function GradientBackground({ children, className = '' }) {
  return (
    <div className={`
      bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900
      relative overflow-hidden ${className}
    `}>
      {/* Animated gradient blobs */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob" />
      <div className="absolute -bottom-8 left-20 w-96 h-96 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000" />
      <div className="absolute top-1/2 left-1/2 w-96 h-96 bg-cyan-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000" />
      
      <div className="relative z-10">
        {children}
      </div>
    </div>
  );
}

export function SectionHeader({ title, subtitle, icon: Icon }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="mb-8"
    >
      <div className="flex items-center gap-3 mb-3">
        {Icon && <Icon className="w-8 h-8 text-cyan-600" />}
        <h2 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">
          {title}
        </h2>
      </div>
      {subtitle && <p className="text-gray-600 text-lg">{subtitle}</p>}
    </motion.div>
  );
}

export function LoadingSpinner() {
  return (
    <motion.div
      animate={{ rotate: 360 }}
      transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
      className="w-8 h-8 border-3 border-cyan-300 border-t-cyan-600 rounded-full"
    />
  );
}

export function StatsCard({ label, value, icon: Icon, trend, className = '' }) {
  return (
    <ModernCard className={`p-6 ${className}`}>
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-gray-600 font-semibold">{label}</h3>
        {Icon && <Icon className="w-6 h-6 text-cyan-600" />}
      </div>
      <div className="flex items-baseline gap-2">
        <p className="text-3xl font-bold text-gray-900">{value}</p>
        {trend && (
          <motion.span
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            className={`text-sm font-semibold ${trend > 0 ? 'text-green-600' : 'text-red-600'}`}
          >
            {trend > 0 ? '+' : ''}{trend}%
          </motion.span>
        )}
      </div>
    </ModernCard>
  );
}
