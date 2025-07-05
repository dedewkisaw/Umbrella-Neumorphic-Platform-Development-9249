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
    <section className="relative overflow-hidden py-8 lg:py-12 bg-gradient-to-br from-neu-100 to-neu-200">
      {/* Background Elements */}
      <div className="absolute inset-0 opacity-20 lg:opacity-30">
        <div className="absolute top-10 left-10 w-32 h-32 lg:w-96 lg:h-96 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-10 right-10 w-24 h-24 lg:w-80 lg:h-80 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-20 h-20 lg:w-64 lg:h-64 bg-gradient-to-r from-green-400 to-blue-400 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '4s' }}></div>
      </div>

      {/* Neumorphic Container */}
      <div className="max-w-7xl mx-auto px-4 lg:px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="neu-card p-6 sm:p-8 lg:p-12 xl:p-16 bg-gradient-to-br from-neu-100/90 to-white/80 backdrop-blur-sm border border-white/50 shadow-2xl"
        >
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 xl:gap-16 items-center">
            {/* Left Column - Content */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="space-y-6 lg:space-y-8 xl:space-y-10"
            >
              {/* Badge */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="inline-flex items-center gap-2 lg:gap-3 px-3 py-2 lg:px-4 lg:py-3 neu-button bg-gradient-to-r from-blue-50 to-purple-50 hover:scale-105 transition-transform border border-blue-200/30"
              >
                <div className="p-1.5 lg:p-2 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full">
                  <SafeIcon icon={FiZap} className="w-3 h-3 lg:w-4 lg:h-4 text-white" />
                </div>
                <span className="text-neu-700 font-semibold text-xs lg:text-sm xl:text-base">Premium Web App Marketplace</span>
                <div className="w-2 h-2 lg:w-3 lg:h-3 bg-gradient-to-r from-green-400 to-green-500 rounded-full animate-pulse shadow-lg"></div>
              </motion.div>

              {/* Heading */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="space-y-3 lg:space-y-4 xl:space-y-6"
              >
                <h1 className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl 2xl:text-6xl font-bold text-neu-900 leading-tight">
                  Discover Premium
                  <span className="gradient-text block mt-1 lg:mt-2" style={{ lineHeight: '1.1', paddingBottom: '0.1em' }}>
                    Web Applications
                  </span>
                </h1>
                <p className="text-sm sm:text-base lg:text-lg xl:text-xl 2xl:text-2xl text-neu-600 leading-relaxed max-w-xl">
                  Access a curated collection of professional web applications. Purchase individual apps or subscribe for unlimited access to our premium library.
                </p>
              </motion.div>

              {/* Action Buttons */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
                className="flex flex-col sm:flex-row gap-3 lg:gap-4"
              >
                <button
                  onClick={() => navigate('/marketplace')}
                  className="group neu-button px-6 py-3 lg:px-8 lg:py-4 xl:px-10 xl:py-5 bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300"
                >
                  <div className="flex items-center justify-center gap-2 lg:gap-3">
                    <span className="font-bold text-sm lg:text-base xl:text-lg">Browse Apps</span>
                    <SafeIcon icon={FiArrowRight} className="w-4 h-4 lg:w-5 lg:h-5 xl:w-6 xl:h-6 group-hover:translate-x-1 transition-transform" />
                  </div>
                </button>
                
                <button className="group neu-button px-6 py-3 lg:px-8 lg:py-4 xl:px-10 xl:py-5 bg-gradient-to-r from-white to-blue-50 border border-blue-200/50 hover:scale-105 transition-all duration-300 hover:shadow-lg">
                  <div className="flex items-center justify-center gap-2 lg:gap-3">
                    <SafeIcon icon={FiPlay} className="w-4 h-4 lg:w-5 lg:h-5 xl:w-6 xl:h-6 text-neu-600 group-hover:scale-110 transition-transform" />
                    <span className="text-neu-700 font-bold text-sm lg:text-base xl:text-lg">Watch Demo</span>
                  </div>
                </button>
              </motion.div>

              {/* Trust Indicators */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7 }}
                className="grid grid-cols-2 gap-3 lg:gap-4 pt-4 lg:pt-6"
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
                    transition={{ delay: 0.8 + index * 0.1 }}
                    className={`neu-card-inset p-3 lg:p-4 xl:p-5 text-center hover:scale-105 transition-all duration-300 bg-gradient-to-br ${item.bg} border border-white/50`}
                  >
                    <div className={`p-1.5 lg:p-2 xl:p-2.5 inline-flex mb-2 lg:mb-3 rounded-lg bg-gradient-to-r ${item.color} shadow-lg`}>
                      <SafeIcon icon={item.icon} className="w-3 h-3 lg:w-4 lg:h-4 xl:w-5 xl:h-5 text-white" />
                    </div>
                    <span className={`${item.textColor} text-xs lg:text-sm xl:text-base font-bold block`}>{item.label}</span>
                  </motion.div>
                ))}
              </motion.div>
            </motion.div>

            {/* Right Column - Visual Showcase */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="relative"
            >
              <div className="relative">
                {/* Main App Showcase */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.6 }}
                  className="neu-card p-4 lg:p-6 xl:p-8 animate-float bg-gradient-to-br from-white via-blue-50/30 to-purple-50/30 border border-white/50 shadow-lg backdrop-blur-sm"
                >
                  <div className="space-y-4 lg:space-y-6 xl:space-y-8">
                    {/* Browser Header */}
                    <div className="flex items-center justify-between p-3 lg:p-4 xl:p-6 neu-card-inset bg-gradient-to-r from-gray-50 to-blue-50 rounded-lg">
                      <div className="flex items-center gap-2 lg:gap-3 xl:gap-4">
                        <div className="flex gap-1.5 lg:gap-2 xl:gap-3">
                          <div className="w-2 h-2 lg:w-3 lg:h-3 xl:w-4 xl:h-4 bg-red-500 rounded-full animate-pulse shadow-sm"></div>
                          <div className="w-2 h-2 lg:w-3 lg:h-3 xl:w-4 xl:h-4 bg-yellow-500 rounded-full animate-pulse shadow-sm" style={{ animationDelay: '0.5s' }}></div>
                          <div className="w-2 h-2 lg:w-3 lg:h-3 xl:w-4 xl:h-4 bg-green-500 rounded-full animate-pulse shadow-sm" style={{ animationDelay: '1s' }}></div>
                        </div>
                        <div className="w-0.5 h-4 lg:h-6 xl:h-8 bg-gray-300 rounded-full mx-1 lg:mx-2 xl:mx-3"></div>
                        <SafeIcon icon={FiGlobe} className="w-3 h-3 lg:w-4 lg:h-4 xl:w-5 xl:h-5 text-gray-500" />
                      </div>
                      <div className="neu-button px-2 py-1 lg:px-3 lg:py-2 xl:px-4 xl:py-3 bg-gradient-to-r from-blue-100 to-purple-100 border border-blue-200/50">
                        <span className="text-neu-700 font-semibold text-xs lg:text-sm xl:text-base">umbrella.app</span>
                      </div>
                    </div>

                    {/* App Grid */}
                    <div className="grid grid-cols-2 gap-3 lg:gap-4 xl:gap-6">
                      {[
                        { name: 'E-commerce Pro', price: '$49', category: 'Business', rating: 4.8, color: 'from-blue-500 to-purple-600', icon: FiShoppingBag },
                        { name: 'Portfolio Studio', price: '$29', category: 'Creative', rating: 4.9, color: 'from-green-500 to-teal-600', icon: FiLayout },
                        { name: 'SaaS Dashboard', price: '$79', category: 'Analytics', rating: 4.7, color: 'from-purple-500 to-pink-600', icon: FiDatabase },
                        { name: 'Blog Master', price: '$39', category: 'Content', rating: 4.6, color: 'from-orange-500 to-red-600', icon: FiCode }
                      ].map((app, i) => (
                        <motion.div
                          key={i}
                          initial={{ opacity: 0, y: 15 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.7 + i * 0.1 }}
                          className="neu-card-inset p-3 lg:p-4 xl:p-5 space-y-2 lg:space-y-3 xl:space-y-4 hover:scale-105 transition-all duration-300 bg-gradient-to-br from-white to-blue-50/50 border border-white/50"
                        >
                          {/* App Icon Header */}
                          <div className={`w-full h-6 lg:h-8 xl:h-12 bg-gradient-to-r ${app.color} rounded-lg flex items-center justify-center shadow-lg relative overflow-hidden`}>
                            <div className="absolute inset-0 bg-white/10 backdrop-blur-sm"></div>
                            <SafeIcon icon={app.icon} className="w-3 h-3 lg:w-4 lg:h-4 xl:w-6 xl:h-6 text-white relative z-10" />
                          </div>
                          
                          {/* App Details */}
                          <div className="space-y-1 lg:space-y-2 xl:space-y-3">
                            <div className="text-xs lg:text-sm xl:text-base font-bold text-neu-900 truncate">{app.name}</div>
                            <div className="text-xs lg:text-xs xl:text-sm text-neu-600 font-medium">{app.category}</div>
                            
                            {/* Rating and Price */}
                            <div className="flex items-center justify-between pt-1 lg:pt-2 xl:pt-3">
                              <div className="flex items-center gap-1 neu-button px-1.5 py-0.5 lg:px-2 lg:py-1 xl:px-3 xl:py-2 bg-yellow-50 border border-yellow-200/50">
                                <SafeIcon icon={FiStar} className="w-2 h-2 lg:w-3 lg:h-3 xl:w-4 xl:h-4 text-yellow-500" />
                                <span className="text-xs lg:text-xs xl:text-sm text-yellow-700 font-bold">{app.rating}</span>
                              </div>
                              <div className="text-xs lg:text-sm xl:text-base font-bold text-blue-600">{app.price}</div>
                            </div>
                          </div>
                        </motion.div>
                      ))}
                    </div>

                    {/* Stats Bar */}
                    <motion.div
                      initial={{ opacity: 0, y: 15 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 1.0 }}
                      className="neu-card-inset p-3 lg:p-4 xl:p-6 bg-gradient-to-r from-green-50 to-blue-50 border border-green-200/50"
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2 lg:gap-3 xl:gap-4">
                          <div className="p-1.5 lg:p-2 xl:p-3 bg-gradient-to-r from-green-500 to-blue-500 rounded-lg shadow-lg">
                            <SafeIcon icon={FiTrendingUp} className="w-3 h-3 lg:w-4 lg:h-4 xl:w-5 xl:h-5 text-white" />
                          </div>
                          <span className="text-neu-700 font-bold text-xs lg:text-sm xl:text-base">Live Stats</span>
                        </div>
                        <div className="flex items-center gap-2 lg:gap-4 xl:gap-6">
                          <div className="flex items-center gap-1 lg:gap-2 xl:gap-3">
                            <div className="w-2 h-2 lg:w-3 lg:h-3 xl:w-4 xl:h-4 bg-gradient-to-r from-green-400 to-green-500 rounded-full animate-pulse shadow-sm"></div>
                            <span className="text-neu-700 font-semibold text-xs lg:text-sm xl:text-base">127 Apps</span>
                          </div>
                          <div className="flex items-center gap-1 lg:gap-2 xl:gap-3">
                            <div className="w-2 h-2 lg:w-3 lg:h-3 xl:w-4 xl:h-4 bg-gradient-to-r from-blue-400 to-blue-500 rounded-full animate-pulse shadow-sm"></div>
                            <span className="text-neu-700 font-semibold text-xs lg:text-sm xl:text-base">50K+ Users</span>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  </div>
                </motion.div>

                {/* Floating Elements - Hidden on mobile and small tablets */}
                <motion.div
                  animate={{ y: [0, -15, 0], rotate: [0, 5, 0] }}
                  transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                  className="absolute -top-4 -right-4 lg:-top-6 lg:-right-6 p-2 lg:p-3 xl:p-4 bg-gradient-to-r from-blue-500 to-purple-500 rounded-xl shadow-lg border border-white/20 hidden xl:block"
                >
                  <SafeIcon icon={FiZap} className="w-4 h-4 lg:w-5 lg:h-5 xl:w-6 xl:h-6 text-white" />
                </motion.div>

                <motion.div
                  animate={{ y: [0, 15, 0], rotate: [0, -5, 0] }}
                  transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
                  className="absolute -bottom-4 -left-4 lg:-bottom-6 lg:-left-6 p-2 lg:p-3 xl:p-4 bg-gradient-to-r from-green-500 to-teal-500 rounded-xl shadow-lg border border-white/20 hidden xl:block"
                >
                  <SafeIcon icon={FiShoppingBag} className="w-4 h-4 lg:w-5 lg:h-5 xl:w-6 xl:h-6 text-white" />
                </motion.div>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;