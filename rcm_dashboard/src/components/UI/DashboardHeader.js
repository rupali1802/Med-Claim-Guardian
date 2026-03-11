import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Menu, X, Bell, Settings, LogOut } from 'lucide-react';

const DashboardHeader = ({ userName, userRole = 'Healthcare Provider', onLogout }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);

  const notifications = [
    { id: 1, text: 'New claim prediction available', time: '5m ago', unread: true },
    { id: 2, text: 'Analytics updated successfully', time: '1h ago', unread: true },
    { id: 3, text: 'Monthly report ready', time: '2h ago', unread: false },
  ];

  return (
    <motion.header
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-white/80 backdrop-blur-xl border-b border-gray-200 sticky top-0 z-40 shadow-sm"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo and Title */}
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="flex items-center gap-3 cursor-pointer"
          >
            <img src="/logo.png" alt="Med-Claim Guardian" className="w-10 h-10 object-contain" />
            <div>
              <h1 className="text-xl font-bold bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">
                Med-Claim Guardian
              </h1>
              <p className="text-xs text-gray-600">AI-Powered Claims Dashboard</p>
            </div>
          </motion.div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            <nav className="flex gap-8">
              <motion.a
                whileHover={{ color: '#0ea5e9' }}
                href="#"
                className="text-gray-700 font-semibold hover:text-cyan-600 transition-colors"
              >
                Dashboard
              </motion.a>
              <motion.a
                whileHover={{ color: '#0ea5e9' }}
                href="#"
                className="text-gray-700 font-semibold hover:text-cyan-600 transition-colors"
              >
                Analytics
              </motion.a>
              <motion.a
                whileHover={{ color: '#0ea5e9' }}
                href="#"
                className="text-gray-700 font-semibold hover:text-cyan-600 transition-colors"
              >
                Documentation
              </motion.a>
            </nav>

            {/* Right Icons */}
            <div className="flex items-center gap-4 pl-8 border-l border-gray-200">
              {/* Notifications */}
              <motion.div className="relative">
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setNotificationsOpen(!notificationsOpen)}
                  className="relative p-2 text-gray-600 hover:text-cyan-600 transition-colors"
                >
                  <Bell className="w-5 h-5" />
                  <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full animate-pulse" />
                </motion.button>

                {/* Notifications Dropdown */}
                {notificationsOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="absolute right-0 mt-2 w-80 bg-white rounded-2xl shadow-2xl border border-gray-200 overflow-hidden"
                  >
                    <div className="p-4 border-b border-gray-200 bg-gray-50">
                      <h3 className="font-bold text-gray-900">Notifications</h3>
                    </div>
                    <div className="max-h-80 overflow-y-auto">
                      {notifications.map((notif) => (
                        <motion.div
                          key={notif.id}
                          whileHover={{ backgroundColor: '#f3f4f6' }}
                          className={`p-4 border-b border-gray-100 cursor-pointer transition-colors ${
                            notif.unread ? 'bg-blue-50' : ''
                          }`}
                        >
                          <div className="flex items-start gap-3">
                            {notif.unread && <div className="w-2 h-2 bg-blue-600 rounded-full mt-2" />}
                            <div>
                              <p className="text-sm font-semibold text-gray-900">{notif.text}</p>
                              <p className="text-xs text-gray-500 mt-1">{notif.time}</p>
                            </div>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </motion.div>
                )}
              </motion.div>

              {/* User Menu */}
              <motion.div
                whileHover={{ scale: 1.1 }}
                className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-600 to-cyan-600 flex items-center justify-center text-white font-bold cursor-pointer hover:shadow-lg transition-shadow"
              >
                {userName?.charAt(0) || 'U'}
              </motion.div>

              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                onClick={onLogout}
                className="p-2 text-gray-600 hover:text-red-600 transition-colors"
              >
                <LogOut className="w-5 h-5" />
              </motion.button>
            </div>
          </div>

          {/* Mobile Menu Button */}
          <motion.button
            whileTap={{ scale: 0.95 }}
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 text-gray-600 hover:text-cyan-600 transition-colors"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </motion.button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden border-t border-gray-200 py-4 space-y-4"
          >
            <motion.a href="#" className="block px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors">
              Dashboard
            </motion.a>
            <motion.a href="#" className="block px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors">
              Analytics
            </motion.a>
            <motion.a href="#" className="block px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors">
              Documentation
            </motion.a>
            <div className="px-4 py-4 border-t border-gray-200">
              <p className="text-sm text-gray-600 mb-3">Logged in as: <span className="font-semibold">{userName}</span></p>
              <button
                onClick={onLogout}
                className="w-full px-4 py-2 bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition-colors font-semibold"
              >
                Logout
              </button>
            </div>
          </motion.div>
        )}
      </div>
    </motion.header>
  );
};

export default DashboardHeader;
