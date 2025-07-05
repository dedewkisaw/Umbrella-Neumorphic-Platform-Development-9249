import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../common/SafeIcon';

const { FiX, FiStar, FiDownload, FiEye, FiShoppingCart, FiCalendar, FiUser, FiCode, FiGlobe, FiCheck, FiExternalLink, FiHeart, FiShare, FiTag, FiTrendingUp, FiDollarSign, FiClock, FiShield } = FiIcons;

const AppDetailsModal = ({ app, isOpen, onClose }) => {
  if (!app || !isOpen) return null;

  const getAppIcon = (category) => {
    const iconMap = {
      'E-commerce': FiShoppingCart,
      'Portfolio': FiUser,
      'Blog': FiCode,
      'Landing': FiGlobe,
      'SaaS': FiTrendingUp,
      'ecommerce': FiShoppingCart,
      'portfolio': FiUser,
      'blog': FiCode,
      'landing': FiGlobe,
      'saas': FiTrendingUp
    };
    return iconMap[category] || FiGlobe;
  };

  const getAppGradient = (category) => {
    const gradientMap = {
      'E-commerce': 'from-green-500 to-emerald-500',
      'Portfolio': 'from-blue-500 to-cyan-500',
      'Blog': 'from-purple-500 to-pink-500',
      'Landing': 'from-yellow-500 to-orange-500',
      'SaaS': 'from-indigo-500 to-purple-500',
      'ecommerce': 'from-green-500 to-emerald-500',
      'portfolio': 'from-blue-500 to-cyan-500',
      'blog': 'from-purple-500 to-pink-500',
      'landing': 'from-yellow-500 to-orange-500',
      'saas': 'from-indigo-500 to-purple-500'
    };
    return gradientMap[category] || 'from-gray-500 to-gray-600';
  };

  const IconComponent = getAppIcon(app.category);
  const gradientClass = getAppGradient(app.category);

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          className="neu-card p-8 max-w-4xl w-full max-h-[90vh] overflow-y-auto bg-white"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-4">
              <div className={`w-16 h-16 bg-gradient-to-r ${gradientClass} rounded-xl flex items-center justify-center text-white shadow-lg`}>
                <SafeIcon icon={IconComponent} className="w-8 h-8" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-neu-900">{app.name}</h2>
                <p className="text-neu-600">by {app.developer}</p>
                <div className="flex items-center gap-2 mt-1">
                  <span className="px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                    {app.category}
                  </span>
                  <span className="text-green-600 font-bold">${app.price}</span>
                </div>
              </div>
            </div>
            <button
              onClick={onClose}
              className="neu-button p-3 hover:scale-105 transition-transform"
            >
              <SafeIcon icon={FiX} className="w-6 h-6 text-neu-600" />
            </button>
          </div>

          {/* Statistics */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            {[
              { label: 'Rating', value: app.rating, icon: FiStar, color: 'text-yellow-500' },
              { label: 'Downloads', value: app.downloads?.toLocaleString() || '0', icon: FiDownload, color: 'text-blue-500' },
              { label: 'Revenue', value: `$${app.revenue?.toLocaleString() || '0'}`, icon: FiDollarSign, color: 'text-green-500' },
              { label: 'Reviews', value: app.reviews || '0', icon: FiUser, color: 'text-purple-500' }
            ].map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="neu-card-inset p-4 text-center hover:scale-105 transition-transform"
              >
                <div className={`neu-button p-2 inline-flex mx-auto mb-2 ${stat.color}`}>
                  <SafeIcon icon={stat.icon} className="w-5 h-5" />
                </div>
                <div className="text-xl font-bold text-neu-900">{stat.value}</div>
                <div className="text-sm text-neu-600">{stat.label}</div>
              </motion.div>
            ))}
          </div>

          {/* Description */}
          <div className="neu-card-inset p-6 mb-6">
            <h3 className="text-lg font-semibold text-neu-900 mb-3">Description</h3>
            <p className="text-neu-700 leading-relaxed">
              {app.description || 'A professional web application designed to meet your business needs with modern features and excellent user experience.'}
            </p>
          </div>

          {/* Features & Details */}
          <div className="grid md:grid-cols-2 gap-6 mb-6">
            {/* Features */}
            <div className="neu-card-inset p-6">
              <h3 className="text-lg font-semibold text-neu-900 mb-4 flex items-center gap-2">
                <SafeIcon icon={FiCheck} className="w-5 h-5 text-green-500" />
                Key Features
              </h3>
              <div className="space-y-3">
                {app.tags?.map((feature, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <SafeIcon icon={FiCheck} className="w-4 h-4 text-green-500" />
                    <span className="text-neu-700 capitalize">{feature}</span>
                  </div>
                )) || [
                  'Modern responsive design',
                  'Cross-platform compatibility',
                  'SEO optimized',
                  'Easy customization'
                ].map((feature, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <SafeIcon icon={FiCheck} className="w-4 h-4 text-green-500" />
                    <span className="text-neu-700">{feature}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Technical Details */}
            <div className="neu-card-inset p-6">
              <h3 className="text-lg font-semibold text-neu-900 mb-4 flex items-center gap-2">
                <SafeIcon icon={FiCode} className="w-5 h-5 text-blue-500" />
                Technical Details
              </h3>
              <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-neu-600">Version:</span>
                  <span className="text-neu-800 font-medium">{app.version || '1.0.0'}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-neu-600">Size:</span>
                  <span className="text-neu-800 font-medium">{app.size || '12.5 MB'}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-neu-600">Published:</span>
                  <span className="text-neu-800 font-medium">
                    {app.publishDate ? new Date(app.publishDate).toLocaleDateString() : 'Recently'}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-neu-600">Updated:</span>
                  <span className="text-neu-800 font-medium">
                    {app.lastUpdate ? new Date(app.lastUpdate).toLocaleDateString() : 'Recently'}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-neu-600">License:</span>
                  <span className="text-neu-800 font-medium">Commercial Use</span>
                </div>
              </div>
            </div>
          </div>

          {/* Performance Metrics */}
          <div className="neu-card-inset p-6 mb-6">
            <h3 className="text-lg font-semibold text-neu-900 mb-4 flex items-center gap-2">
              <SafeIcon icon={FiTrendingUp} className="w-5 h-5 text-purple-500" />
              Performance Metrics
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
              <div>
                <div className="text-2xl font-bold text-green-600">98%</div>
                <div className="text-xs text-neu-600">Uptime</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-blue-600">1.2s</div>
                <div className="text-xs text-neu-600">Load Time</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-purple-600">95</div>
                <div className="text-xs text-neu-600">Performance Score</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-yellow-600">A+</div>
                <div className="text-xs text-neu-600">Security Grade</div>
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="flex gap-4 justify-center">
            <button className="neu-button px-8 py-4 bg-gradient-to-r from-blue-500 to-purple-500 text-white hover:scale-105 transition-transform">
              <div className="flex items-center gap-3">
                <SafeIcon icon={FiEye} className="w-5 h-5" />
                <span className="font-semibold">View Live Demo</span>
              </div>
            </button>
            <button className="neu-button px-8 py-4 bg-gradient-to-r from-green-500 to-blue-500 text-white hover:scale-105 transition-transform">
              <div className="flex items-center gap-3">
                <SafeIcon icon={FiShoppingCart} className="w-5 h-5" />
                <span className="font-semibold">Purchase App</span>
              </div>
            </button>
            <button className="neu-button px-4 py-4 hover:scale-105 transition-transform">
              <SafeIcon icon={FiHeart} className="w-5 h-5 text-neu-600" />
            </button>
            <button className="neu-button px-4 py-4 hover:scale-105 transition-transform">
              <SafeIcon icon={FiShare} className="w-5 h-5 text-neu-600" />
            </button>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default AppDetailsModal;