import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../common/SafeIcon';

const { FiArrowLeft, FiHome, FiMail, FiPhone } = FiIcons;

const DocumentLayout = ({ title, subtitle, icon, children, lastUpdated }) => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50">
      {/* Header */}
      <motion.header
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-neu-100/80 backdrop-blur-xl border-b border-neu-200/50 shadow-lg sticky top-0 z-50"
      >
        <div className="max-w-7xl mx-auto px-4 lg:px-6 py-4 lg:py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4 lg:gap-6">
              <button
                onClick={() => navigate(-1)}
                className="neu-button p-3 lg:p-4 hover:scale-105 transition-transform group"
              >
                <SafeIcon icon={FiArrowLeft} className="w-5 h-5 lg:w-6 lg:h-6 text-neu-600 group-hover:-translate-x-1 transition-transform" />
              </button>
              <div className="flex items-center gap-3 lg:gap-4">
                <div className="neu-button p-3 lg:p-4 bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-xl">
                  <SafeIcon icon={icon} className="w-5 h-5 lg:w-6 lg:h-6" />
                </div>
                <div>
                  <h1 className="text-xl lg:text-2xl xl:text-3xl font-bold text-neu-900">{title}</h1>
                  <p className="text-neu-600 text-sm lg:text-base">{subtitle}</p>
                </div>
              </div>
            </div>
            <button
              onClick={() => navigate('/')}
              className="neu-button px-4 py-2 lg:px-6 lg:py-3 hover:scale-105 transition-transform group"
            >
              <div className="flex items-center gap-2 lg:gap-3">
                <SafeIcon icon={FiHome} className="w-4 h-4 lg:w-5 lg:h-5 text-neu-600 group-hover:scale-110 transition-transform" />
                <span className="text-neu-700 font-medium text-sm lg:text-base">Home</span>
              </div>
            </button>
          </div>
        </div>
      </motion.header>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-4 lg:px-6 py-8 lg:py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="neu-card p-6 lg:p-12 xl:p-16 bg-gradient-to-br from-white to-blue-50"
        >
          {/* Document Header */}
          <div className="text-center mb-8 lg:mb-12">
            <div className="neu-button inline-flex items-center gap-2 lg:gap-3 px-4 py-2 lg:px-6 lg:py-3 mb-6 lg:mb-8 bg-gradient-to-r from-blue-100 to-purple-100">
              <SafeIcon icon={icon} className="w-4 h-4 lg:w-5 lg:h-5 text-blue-600" />
              <span className="text-neu-700 font-bold text-sm lg:text-base">Official Document</span>
            </div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-bold text-neu-900 mb-4 lg:mb-6">
              {title}
            </h2>
            <p className="text-base lg:text-lg xl:text-xl text-neu-600 max-w-3xl mx-auto leading-relaxed">
              {subtitle}
            </p>
            {lastUpdated && (
              <div className="mt-6 lg:mt-8">
                <div className="neu-card-inset p-3 lg:p-4 bg-gradient-to-r from-green-50 to-blue-50 inline-block">
                  <span className="text-neu-600 text-sm lg:text-base">
                    Last updated: <span className="font-semibold text-neu-800">{lastUpdated}</span>
                  </span>
                </div>
              </div>
            )}
          </div>

          {/* Document Content */}
          <div className="prose prose-lg max-w-none">
            {children}
          </div>

          {/* Contact Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-12 lg:mt-16 pt-8 lg:pt-12 border-t border-neu-200"
          >
            <div className="neu-card-inset p-6 lg:p-8 bg-gradient-to-r from-blue-50 to-purple-50">
              <div className="text-center mb-6 lg:mb-8">
                <h3 className="text-xl lg:text-2xl font-bold text-neu-900 mb-4">
                  Questions or Concerns?
                </h3>
                <p className="text-neu-600 text-base lg:text-lg">
                  We're here to help. Contact us if you have any questions about this document.
                </p>
              </div>
              <div className="grid md:grid-cols-2 gap-4 lg:gap-6">
                <button
                  onClick={() => window.location.href = 'mailto:legal@umbrella.app'}
                  className="neu-button p-4 lg:p-6 hover:scale-105 transition-transform group"
                >
                  <div className="flex items-center gap-3 lg:gap-4">
                    <div className="neu-button p-2 lg:p-3 bg-gradient-to-r from-blue-500 to-purple-500 text-white">
                      <SafeIcon icon={FiMail} className="w-4 h-4 lg:w-5 lg:h-5" />
                    </div>
                    <div className="text-left">
                      <div className="font-semibold text-neu-900 text-sm lg:text-base">Email Legal Team</div>
                      <div className="text-neu-600 text-xs lg:text-sm">legal@umbrella.app</div>
                    </div>
                  </div>
                </button>
                <button
                  onClick={() => window.location.href = 'tel:+15551234567'}
                  className="neu-button p-4 lg:p-6 hover:scale-105 transition-transform group"
                >
                  <div className="flex items-center gap-3 lg:gap-4">
                    <div className="neu-button p-2 lg:p-3 bg-gradient-to-r from-green-500 to-blue-500 text-white">
                      <SafeIcon icon={FiPhone} className="w-4 h-4 lg:w-5 lg:h-5" />
                    </div>
                    <div className="text-left">
                      <div className="font-semibold text-neu-900 text-sm lg:text-base">Call Support</div>
                      <div className="text-neu-600 text-xs lg:text-sm">+1 (555) 123-4567</div>
                    </div>
                  </div>
                </button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </main>
    </div>
  );
};

export default DocumentLayout;