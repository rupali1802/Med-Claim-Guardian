import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Zap, Search, BarChart3, Target, MessageSquare, TrendingUp, ArrowRight, Menu } from 'lucide-react';
import TermsModal from './TermsModal';
import FeatureModal from './FeatureModal';

const FEATURES = [
  {
    key: 'AI-Powered Predictions',
    title: 'AI-Powered Predictions',
    description: 'Get instant predictions on claim denial probability with 94% accuracy',
    icon: Zap,
    color: 'from-blue-600 to-blue-400'
  },
  {
    key: 'SHAP Explainability',
    title: 'SHAP Explainability',
    description: 'Understand why claims are denied with transparent feature analysis',
    icon: Search,
    color: 'from-cyan-600 to-cyan-400'
  },
  {
    key: 'Real-time Analytics',
    title: 'Real-time Analytics',
    description: 'Monitor denial trends across payers and procedures in real-time',
    icon: BarChart3,
    color: 'from-green-600 to-green-400'
  },
  {
    key: 'What-If Simulation',
    title: 'What-If Simulation',
    description: 'Test scenarios and optimize claims before submission',
    icon: Target,
    color: 'from-purple-600 to-purple-400'
  },
  {
    key: 'AI Assistant',
    title: 'AI Assistant',
    description: 'Get intelligent recommendations from healthcare billing expert AI',
    icon: MessageSquare,
    color: 'from-orange-600 to-orange-400'
  },
  {
    key: 'ROI Calculator',
    title: 'ROI Calculator',
    description: 'Calculate your return on investment and business impact metrics',
    icon: TrendingUp,
    color: 'from-indigo-600 to-indigo-400'
  }
];

export default function Landing({ onClickLogin, onClickRegister }) {
  const [showTerms, setShowTerms] = useState(false);
  const [selectedFeature, setSelectedFeature] = useState(null);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900"
    >
      {/* Navigation Bar */}
      <motion.nav
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="fixed top-0 left-0 right-0 bg-slate-900/80 backdrop-blur-xl z-50 border-b border-white/10"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          {/* Logo */}
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="flex items-center gap-3 cursor-pointer"
          >
            <img src="/logo.png" alt="Med-Claim Guardian Logo" className="w-12 h-12 object-contain" />
            <div>
              <h1 className="text-lg font-bold text-cyan-400">Med-Claim Guardian</h1>
              <p className="text-xs text-cyan-300/70">AI-Powered RCM</p>
            </div>
          </motion.div>

          {/* Auth Buttons */}
          <div className="flex items-center gap-3">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={onClickLogin}
              className="px-6 py-2 text-cyan-300 font-semibold hover:text-cyan-200 hover:bg-cyan-500/10 rounded-lg transition duration-200"
            >
              Log In
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={onClickRegister}
              className="px-6 py-2 bg-gradient-to-r from-cyan-500 to-blue-500 text-white font-semibold rounded-lg hover:shadow-lg hover:shadow-cyan-500/40 transition duration-200"
            >
              Sign Up
            </motion.button>
          </div>
        </div>
      </motion.nav>

      {/* Hero Section */}
      <motion.div
        className="pt-32 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto"
      >
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="space-y-8"
          >
            <div>
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.1 }}
                className="inline-block mb-6"
              >
                <span className="inline-block px-4 py-2 bg-cyan-500/20 border border-cyan-400/30 text-cyan-300 rounded-full text-sm font-semibold backdrop-blur">
                  🚀 Transforming Healthcare RCM
                </span>
              </motion.div>
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="text-5xl sm:text-6xl font-bold text-white leading-tight mb-6"
              >
                Predict Denials,
                <br/>
                <motion.span
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.4, duration: 1 }}
                  className="bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-500 bg-clip-text text-transparent"
                >
                  Optimize Revenue
                </motion.span>
              </motion.h1>
              <motion.p
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="text-xl text-cyan-100 leading-relaxed max-w-lg"
              >
                AI-powered claim denial prediction with transparent explainability. Reduce denials by up to 42%, recover lost revenue, and streamline your revenue cycle.
              </motion.p>
            </div>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="flex flex-col sm:flex-row gap-4 pt-4"
            >
              <motion.button
                whileHover={{ scale: 1.05, boxShadow: '0 20px 40px rgba(6, 182, 212, 0.3)' }}
                whileTap={{ scale: 0.95 }}
                onClick={onClickRegister}
                className="px-8 py-4 bg-gradient-to-r from-cyan-500 to-blue-500 text-white font-bold rounded-xl hover:shadow-xl transition duration-200 text-lg flex items-center justify-center gap-2"
              >
                Start Free Trial <ArrowRight className="w-5 h-5" />
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05, backgroundColor: 'rgba(6, 182, 212, 0.2)' }}
                whileTap={{ scale: 0.95 }}
                onClick={onClickLogin}
                className="px-8 py-4 border-2 border-cyan-400/50 text-cyan-300 font-bold rounded-xl hover:border-cyan-400 transition duration-200 text-lg"
              >
                Schedule Demo
              </motion.button>
            </motion.div>

            {/* Trust Indicators */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="flex gap-12 pt-8 border-t border-cyan-400/20"
            >
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="cursor-pointer"
              >
                <p className="text-3xl font-bold text-cyan-300">350+</p>
                <p className="text-cyan-200/70 text-sm mt-1">Healthcare Providers</p>
              </motion.div>
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="cursor-pointer"
              >
                <p className="text-3xl font-bold text-cyan-300">$2B+</p>
                <p className="text-cyan-200/70 text-sm mt-1">Claims Analyzed</p>
              </motion.div>
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="cursor-pointer"
              >
                <p className="text-3xl font-bold text-cyan-300">94%</p>
                <p className="text-cyan-200/70 text-sm mt-1">Prediction Accuracy</p>
              </motion.div>
            </motion.div>
          </motion.div>

          {/* Right Visual - Dashboard Preview */}
          <motion.div
            initial={{ opacity: 0, x: 20, scale: 0.95 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative hidden lg:block"
          >
            <div className="absolute -inset-4 bg-gradient-to-r from-cyan-500/20 via-blue-500/20 to-purple-500/20 rounded-3xl blur-2xl opacity-40"></div>
            <div className="relative bg-gradient-to-br from-slate-800 via-slate-800 to-slate-900 rounded-3xl p-8 border border-cyan-400/20 shadow-2xl backdrop-blur">
              {/* Dashboard Header */}
              <motion.div
                whileHover={{ y: -5 }}
                className="bg-slate-900/50 rounded-2xl p-6 mb-6 border border-cyan-400/20 backdrop-blur"
              >
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-sm font-bold text-cyan-300">Claim Analysis</h3>
                  <div className="flex gap-2">
                    <motion.div animate={{ scale: [1, 1.2, 1] }} transition={{ duration: 1.5, repeat: Infinity }} className="w-2 h-2 rounded-full bg-emerald-500"></motion.div>
                    <div className="w-2 h-2 rounded-full bg-yellow-500"></div>
                    <div className="w-2 h-2 rounded-full bg-red-500"></div>
                  </div>
                </div>

                {/* Prediction Card */}
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-xs font-semibold text-cyan-300">Denial Probability</span>
                      <motion.span
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.8 }}
                        className="text-sm font-bold text-red-400"
                      >
                        68%
                      </motion.span>
                    </div>
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: '100%' }}
                      transition={{ delay: 0.8, duration: 0.6 }}
                      className="w-full bg-gray-700 rounded-full h-3 overflow-hidden"
                    >
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: '68%' }}
                        transition={{ delay: 1, duration: 0.6 }}
                        className="bg-gradient-to-r from-red-500 to-orange-500 h-3 rounded-full"
                      ></motion.div>
                    </motion.div>
                  </div>

                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-xs font-semibold text-cyan-300">Confidence Score</span>
                      <motion.span
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.9 }}
                        className="text-sm font-bold text-cyan-400"
                      >
                        92%
                      </motion.span>
                    </div>
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: '100%' }}
                      transition={{ delay: 0.9, duration: 0.6 }}
                      className="w-full bg-gray-700 rounded-full h-3 overflow-hidden"
                    >
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: '92%' }}
                        transition={{ delay: 1.1, duration: 0.6 }}
                        className="bg-gradient-to-r from-cyan-500 to-blue-500 h-3 rounded-full"
                      ></motion.div>
                    </motion.div>
                  </div>
                </div>

                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1.2 }}
                  className="mt-6 p-4 bg-red-900/20 border border-red-400/30 rounded-xl"
                >
                  <p className="text-xs text-red-300 font-semibold">⚠️ High Risk Claim</p>
                  <p className="text-xs text-red-200 mt-1">Patient age mismatch with procedure code detected</p>
                </motion.div>
              </motion.div>

              {/* Feature Items */}
              <motion.div
                whileHover={{ y: -5 }}
                className="bg-slate-900/50 rounded-2xl p-6 border border-cyan-400/20 backdrop-blur"
              >
                <h3 className="text-sm font-bold text-cyan-300 mb-4">SHAP Feature Impact</h3>
                <div className="space-y-3">
                  {[
                    { name: 'Patient Age', impact: 75 },
                    { name: 'Procedure Code', impact: 65 },
                    { name: 'Payer Type', impact: 55 }
                  ].map((item, idx) => (
                    <motion.div
                      key={idx}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 1 + idx * 0.1 }}
                      className="flex items-center gap-3"
                    >
                      <span className="text-xs font-medium text-cyan-300 flex-shrink-0 w-24">{item.name}</span>
                      <div className="flex-1 bg-gray-700 rounded-full h-2 overflow-hidden">
                        <motion.div 
                          initial={{ width: 0 }}
                          animate={{ width: `${item.impact}%` }}
                          transition={{ delay: 1.2 + idx * 0.1, duration: 0.6 }}
                          className="bg-gradient-to-r from-cyan-500 to-blue-500 h-2 rounded-full"
                        ></motion.div>
                      </div>
                      <span className="text-xs font-bold text-cyan-300 w-8">{item.impact}%</span>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </motion.div>

      {/* Features Section */}
      <motion.div
        className="py-24 bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900 px-4 sm:px-6 lg:px-8"
      >
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl sm:text-5xl font-bold text-white mb-6">Powerful Features Built for You</h2>
            <p className="text-xl text-cyan-200 max-w-3xl mx-auto">Click any feature to explore key insights and metrics</p>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={{
              visible: {
                transition: {
                  staggerChildren: 0.1,
                },
              },
            }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {FEATURES.map((feature) => {
              const IconComponent = feature.icon;
              return (
                <motion.button
                  key={feature.key}
                  variants={{
                    hidden: { opacity: 0, y: 20, scale: 0.9 },
                    visible: { opacity: 1, y: 0, scale: 1 },
                  }}
                  whileHover={{ y: -8, boxShadow: '0 30px 60px rgba(6, 182, 212, 0.2)' }}
                  onClick={() => setSelectedFeature(feature.key)}
                  className="group bg-gradient-to-br from-slate-800/50 to-slate-900/50 border border-cyan-400/20 rounded-2xl p-8 backdrop-blur hover:border-cyan-400/40 transition duration-300 text-left overflow-hidden relative"
                >
                  {/* Gradient Background */}
                  <div className={`absolute -top-20 -right-20 w-40 h-40 bg-gradient-to-br ${feature.color} rounded-full opacity-0 group-hover:opacity-20 transition duration-300`}></div>

                  {/* Content */}
                  <div className="relative z-10">
                    <motion.div
                      whileHover={{ scale: 1.2, rotate: 10 }}
                      className="w-14 h-14 rounded-xl bg-cyan-500/20 border border-cyan-400/30 flex items-center justify-center mb-4 group-hover:border-cyan-400/50 transition-all"
                    >
                      <IconComponent className="w-7 h-7 text-cyan-400" />
                    </motion.div>
                    <h3 className="text-xl font-bold text-white mb-3">{feature.title}</h3>
                    <p className="text-cyan-200/70 mb-4">{feature.description}</p>
                    
                    <div className="flex items-center gap-2 text-cyan-400 font-semibold group-hover:gap-3 transition duration-300">
                      <span>Learn More</span>
                      <ArrowRight className="w-5 h-5" />
                    </div>
                  </div>
                </motion.button>
              );
            })}
          </motion.div>
        </div>
      </motion.div>

      {/* Stats Section */}
      <motion.div
        className="py-24 bg-gradient-to-r from-cyan-600 via-blue-600 to-purple-600 px-4 sm:px-6 lg:px-8 relative overflow-hidden"
      >
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-96 h-96 bg-white rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-white rounded-full blur-3xl"></div>
        </div>
        <div className="max-w-7xl mx-auto relative z-10">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.5 }}
            variants={{
              visible: {
                transition: {
                  staggerChildren: 0.2,
                },
              },
            }}
            className="grid grid-cols-1 md:grid-cols-4 gap-8"
          >
            <motion.div
              variants={{
                hidden: { opacity: 0, scale: 0.8 },
                visible: { opacity: 1, scale: 1 },
              }}
              className="text-center"
            >
              <motion.p
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
                className="text-5xl font-bold text-white mb-2"
              >
                42%
              </motion.p>
              <p className="text-blue-100">Denial Rate Reduction</p>
            </motion.div>
            <motion.div
              variants={{
                hidden: { opacity: 0, scale: 0.8 },
                visible: { opacity: 1, scale: 1 },
              }}
              className="text-center"
            >
              <motion.p
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
                className="text-5xl font-bold text-white mb-2"
              >
                $250K
              </motion.p>
              <p className="text-blue-100">Avg Annual Savings</p>
            </motion.div>
            <motion.div
              variants={{
                hidden: { opacity: 0, scale: 0.8 },
                visible: { opacity: 1, scale: 1 },
              }}
              className="text-center"
            >
              <motion.p
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
                className="text-5xl font-bold text-white mb-2"
              >
                3-4 mos
              </motion.p>
              <p className="text-blue-100">ROI Payback Period</p>
            </motion.div>
            <motion.div
              variants={{
                hidden: { opacity: 0, scale: 0.8 },
                visible: { opacity: 1, scale: 1 },
              }}
              className="text-center"
            >
              <motion.p
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
                className="text-5xl font-bold text-white mb-2"
              >
                24/7
              </motion.p>
              <p className="text-blue-100">AI Support Available</p>
            </motion.div>
          </motion.div>
        </div>
      </motion.div>

      {/* CTA Section */}
      <motion.div
        className="py-24 px-4 sm:px-6 lg:px-8 bg-slate-900"
      >
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-4xl mx-auto"
        >
          <motion.div
            whileHover={{ boxShadow: '0 40px 80px rgba(6, 182, 212, 0.3)' }}
            className="bg-gradient-to-r from-cyan-600 via-blue-600 to-purple-600 rounded-3xl p-12 text-center text-white relative overflow-hidden"
          >
            <div className="absolute inset-0 opacity-10">
              <div className="absolute top-0 right-0 w-96 h-96 bg-white rounded-full blur-3xl"></div>
            </div>
            <div className="relative z-10">
              <h2 className="text-4xl font-bold mb-6">Ready to Transform Your Revenue Cycle?</h2>
              <p className="text-lg text-blue-100 mb-10 max-w-2xl mx-auto">Join 350+ healthcare providers using Med-Claim Guardian to reduce denials, recover lost revenue, and streamline operations.</p>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={onClickRegister}
                className="px-10 py-4 bg-white text-blue-600 font-bold rounded-xl hover:shadow-2xl transition duration-200 text-lg flex items-center justify-center gap-2 mx-auto"
              >
                Start Your Free Trial Today <ArrowRight className="w-5 h-5" />
              </motion.button>
            </div>
          </motion.div>
        </motion.div>
      </motion.div>

      {/* Footer */}
      <motion.footer
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        className="bg-slate-950 text-slate-400 py-16 px-4 sm:px-6 lg:px-8 border-t border-cyan-400/10"
      >
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
            <div>
              <h4 className="text-white font-bold mb-4">Product</h4>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="hover:text-cyan-300 transition">Features</a></li>
                <li><a href="#" className="hover:text-cyan-300 transition">Pricing</a></li>
                <li><a href="#" className="hover:text-cyan-300 transition">Security</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-bold mb-4">Company</h4>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="hover:text-cyan-300 transition">About</a></li>
                <li><a href="#" className="hover:text-cyan-300 transition">Blog</a></li>
                <li><a href="#" className="hover:text-cyan-300 transition">Careers</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-bold mb-4">Legal</h4>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="hover:text-cyan-300 transition">Privacy</a></li>
                <li><button onClick={() => setShowTerms(true)} className="hover:text-cyan-300 transition">Terms & Conditions</button></li>
                <li><a href="#" className="hover:text-cyan-300 transition">Compliance</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-bold mb-4">Social</h4>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="hover:text-cyan-300 transition">LinkedIn</a></li>
                <li><a href="#" className="hover:text-cyan-300 transition">Twitter</a></li>
                <li><a href="#" className="hover:text-cyan-300 transition">GitHub</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-slate-800 pt-8 text-sm text-center">
            <p>© 2026 Med-Claim Guardian. All rights reserved.</p>
          </div>
        </div>
      </motion.footer>

      {/* Modals */}
      <TermsModal isOpen={showTerms} onClose={() => setShowTerms(false)} />
      <FeatureModal
        isOpen={selectedFeature !== null}
        featureKey={selectedFeature}
        onClose={() => setSelectedFeature(null)}
      />
    </motion.div>
  );
}
