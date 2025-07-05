import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../common/SafeIcon';

const { 
  FiArrowRight, FiPlay, FiShoppingBag, FiZap, FiShield, FiStar, FiUsers, 
  FiGlobe, FiTrendingUp, FiCheck, FiHeart, FiAward, FiCode, FiMonitor,
  FiDatabase, FiLayout
} = FiIcons;

const Hero = () => {
  const navigate = useNavigate();

  return (
    <section className="relative overflow-hidden py-12 lg:py-20">
      {/* Enhanced Background Elements */}
      <div className="absolute inset-0 opacity-3">
        <div className="absolute top-20 left-20 w-96 h-96 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-20 w-80 h-80 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-gradient-to-r from-green-400 to-blue-400 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '4s' }}></div>
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Enhanced Left Column - Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-10"
          >
            {/* Enhanced Badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="inline-flex items-center gap-3 px-6 py-3 neu-button bg-gradient-to-r from-blue-50 to-purple-50 hover:scale-105 transition-transform border border-blue-200/30"
            >
              <div className="p-1 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full">
                <SafeIcon icon={FiZap} className="w-4 h-4 text-white" />
              </div>
              <span className="text-neu-700 font-semibold text-sm">Premium Web App Marketplace</span>
              <div className="w-3 h-3 bg-gradient-to-r from-green-400 to-green-500 rounded-full animate-pulse shadow-lg"></div>
            </motion.div>

            {/* Enhanced Heading */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="space-y-4"
            >
              <h1 className="text-4xl lg:text-5xl xl:text-6xl font-bold text-neu-900 leading-tight">
                Discover Premium
                <span className="gradient-text block mt-2" style={{ lineHeight: '1.1', paddingBottom: '0.1em' }}>
                  Web Applications
                </span>
              </h1>
              <p className="text-lg lg:text-xl text-neu-600 leading-relaxed max-w-2xl">
                Access a curated collection of professional web applications. Purchase individual apps or subscribe for unlimited access to our premium library.
              </p>
            </motion.div>

            {/* Enhanced Action Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="flex flex-col sm:flex-row gap-4"
            >
              <button
                onClick={() => navigate('/marketplace')}
                className="group neu-button px-8 py-4 bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-xl hover:shadow-2xl hover:scale-105 transition-all duration-300"
              >
                <div className="flex items-center justify-center gap-3">
                  <span className="font-bold text-lg">Browse Apps</span>
                  <SafeIcon icon={FiArrowRight} className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </div>
              </button>
              
              <button className="group neu-button px-8 py-4 bg-gradient-to-r from-white to-blue-50 border border-blue-200/50 hover:scale-105 transition-all duration-300 hover:shadow-lg">
                <div className="flex items-center justify-center gap-3">
                  <SafeIcon icon={FiPlay} className="w-5 h-5 text-neu-600 group-hover:scale-110 transition-transform" />
                  <span className="text-neu-700 font-bold text-lg">Watch Demo</span>
                </div>
              </button>
            </motion.div>

            {/* Trust Indicators - Icons Reduced by Additional 3% and Moved Left */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="grid grid-cols-2 gap-5 pt-8"
            >
              {[
                { icon: FiShield, label: 'Secure Payments', color: 'from-green-500 to-emerald-500', bg: 'from-green-50 to-emerald-50', textColor: 'text-green-700' },
                { icon: FiShoppingBag, label: '500+ Apps', color: 'from-blue-500 to-cyan-500', bg: 'from-blue-50 to-cyan-50', textColor: 'text-blue-700' },
                { icon: FiUsers, label: '50K+ Customers', color: 'from-purple-500 to-violet-500', bg: 'from-purple-50 to-violet-50', textColor: 'text-purple-700' },
                { icon: FiStar, label: '4.9 Rating', color: 'from-yellow-500 to-orange-500', bg: 'from-yellow-50 to-orange-50', textColor: 'text-yellow-700' }
              ].map((item, index) => (
                <motion.div
                  key={item.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.7 + index * 0.1 }}
                  className={`neu-card-inset p-4 text-center hover:scale-105 transition-all duration-300 bg-gradient-to-br ${item.bg} border border-white/50`}
                >
                  <div className={`p-2 inline-flex mb-4 -ml-1 rounded-lg bg-gradient-to-r ${item.color} shadow-lg`}>
                    <SafeIcon icon={item.icon} className="w-3.5 h-3.5 text-white" />
                  </div>
                  <span className={`${item.textColor} text-sm font-bold`}>{item.label}</span>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>

          {/* Enhanced Right Column - Visual Showcase */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative"
          >
            <div className="relative">
              {/* Enhanced Main App Showcase */}
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.4 }}
                className="neu-card p-8 lg:p-10 animate-float bg-gradient-to-br from-white via-blue-50/30 to-purple-50/30 border border-white/50 shadow-2xl backdrop-blur-sm"
              >
                <div className="space-y-8">
                  {/* Enhanced Browser Header */}
                  <div className="flex items-center justify-between p-4 neu-card-inset bg-gradient-to-r from-gray-50 to-blue-50 rounded-xl">
                    <div className="flex items-center gap-3">
                      <div className="flex gap-2">
                        <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse shadow-sm"></div>
                        <div className="w-3 h-3 bg-yellow-500 rounded-full animate-pulse shadow-sm" style={{ animationDelay: '0.5s' }}></div>
                        <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse shadow-sm" style={{ animationDelay: '1s' }}></div>
                      </div>
                      <div className="w-1 h-6 bg-gray-300 rounded-full mx-2"></div>
                      <SafeIcon icon={FiGlobe} className="w-4 h-4 text-gray-500" />
                    </div>
                    <div className="neu-button px-4 py-2 bg-gradient-to-r from-blue-100 to-purple-100 border border-blue-200/50">
                      <span className="text-neu-700 font-semibold text-sm">umbrella.app</span>
                    </div>
                  </div>

                  {/* Enhanced App Grid */}
                  <div className="grid grid-cols-2 gap-6">
                    {[
                      { name: 'E-commerce Pro', price: '$49', category: 'Business', rating: 4.8, color: 'from-blue-500 to-purple-600', icon: FiShoppingBag },
                      { name: 'Portfolio Studio', price: '$29', category: 'Creative', rating: 4.9, color: 'from-green-500 to-teal-600', icon: FiLayout },
                      { name: 'SaaS Dashboard', price: '$79', category: 'Analytics', rating: 4.7, color: 'from-purple-500 to-pink-600', icon: FiDatabase },
                      { name: 'Blog Master', price: '$39', category: 'Content', rating: 4.6, color: 'from-orange-500 to-red-600', icon: FiCode }
                    ].map((app, i) => (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.6 + i * 0.1 }}
                        className="neu-card-inset p-4 space-y-4 hover:scale-105 transition-all duration-300 bg-gradient-to-br from-white to-blue-50/50 border border-white/50"
                      >
                        {/* App Icon Header */}
                        <div className={`w-full h-12 bg-gradient-to-r ${app.color} rounded-lg flex items-center justify-center shadow-lg relative overflow-hidden`}>
                          <div className="absolute inset-0 bg-white/10 backdrop-blur-sm"></div>
                          <SafeIcon icon={app.icon} className="w-6 h-6 text-white relative z-10" />
                        </div>
                        
                        {/* App Details */}
                        <div className="space-y-2">
                          <div className="text-sm font-bold text-neu-900">{app.name}</div>
                          <div className="text-xs text-neu-600 font-medium">{app.category}</div>
                          
                          {/* Rating and Price */}
                          <div className="flex items-center justify-between pt-2">
                            <div className="flex items-center gap-1 neu-button px-2 py-1 bg-yellow-50 border border-yellow-200/50">
                              <SafeIcon icon={FiStar} className="w-3 h-3 text-yellow-500" />
                              <span className="text-xs text-yellow-700 font-bold">{app.rating}</span>
                            </div>
                            <div className="text-sm font-bold text-blue-600">{app.price}</div>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>

                  {/* Enhanced Stats Bar */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1.0 }}
                    className="neu-card-inset p-6 bg-gradient-to-r from-green-50 to-blue-50 border border-green-200/50"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="p-2 bg-gradient-to-r from-green-500 to-blue-500 rounded-lg shadow-lg">
                          <SafeIcon icon={FiTrendingUp} className="w-5 h-5 text-white" />
                        </div>
                        <span className="text-neu-700 font-bold">Live Marketplace Stats</span>
                      </div>
                      <div className="flex items-center gap-6">
                        <div className="flex items-center gap-2">
                          <div className="w-3 h-3 bg-gradient-to-r from-green-400 to-green-500 rounded-full animate-pulse shadow-sm"></div>
                          <span className="text-neu-700 font-semibold text-sm">127 Apps</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <div className="w-3 h-3 bg-gradient-to-r from-blue-400 to-blue-500 rounded-full animate-pulse shadow-sm"></div>
                          <span className="text-neu-700 font-semibold text-sm">50K+ Users</span>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                </div>
              </motion.div>

              {/* Enhanced Floating Elements */}
              <motion.div
                animate={{ y: [0, -20, 0], rotate: [0, 5, 0] }}
                transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                className="absolute -top-6 -right-6 p-4 bg-gradient-to-r from-blue-500 to-purple-500 rounded-2xl shadow-2xl border border-white/20"
              >
                <SafeIcon icon={FiZap} className="w-6 h-6 text-white" />
              </motion.div>

              <motion.div
                animate={{ y: [0, 20, 0], rotate: [0, -5, 0] }}
                transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
                className="absolute -bottom-6 -left-6 p-4 bg-gradient-to-r from-green-500 to-teal-500 rounded-2xl shadow-2xl border border-white/20"
              >
                <SafeIcon icon={FiShoppingBag} className="w-6 h-6 text-white" />
              </motion.div>

              <motion.div
                animate={{ scale: [1, 1.1, 1], rotate: [0, 180, 360] }}
                transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
                className="absolute top-1/2 -right-8 p-3 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl shadow-2xl border border-white/20"
              >
                <SafeIcon icon={FiHeart} className="w-5 h-5 text-white" />
              </motion.div>

              <motion.div
                animate={{ x: [0, 10, 0], y: [0, -10, 0] }}
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                className="absolute top-1/4 -left-8 p-3 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-xl shadow-2xl border border-white/20"
              >
                <SafeIcon icon={FiAward} className="w-5 h-5 text-white" />
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Hero;