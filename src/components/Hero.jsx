import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../common/SafeIcon';

const { FiArrowRight, FiPlay, FiShoppingBag, FiZap, FiShield } = FiIcons;

const Hero = () => {
  const navigate = useNavigate();

  return (
    <section className="relative overflow-hidden py-20 lg:py-32">
      {/* Background Elements */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-20 left-20 w-64 h-64 bg-blue-500 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-purple-500 rounded-full blur-3xl"></div>
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Column - Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-8"
          >
            <div className="space-y-4">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="neu-button inline-flex items-center gap-2 px-4 py-2"
              >
                <SafeIcon icon={FiZap} className="w-4 h-4 text-blue-600" />
                <span className="text-neu-700 text-sm font-medium">Premium Web App Marketplace</span>
              </motion.div>

              <h1 className="text-4xl lg:text-6xl font-bold text-neu-900 leading-tight">
                Discover Premium
                <span className="gradient-text block" style={{ lineHeight: '1.2', paddingBottom: '0.1em' }}>
                  Web Applications
                </span>
                Built by Experts
              </h1>

              <p className="text-xl text-neu-600 leading-relaxed">
                Access a curated collection of professional web applications. 
                Purchase individual apps or subscribe for unlimited access to our 
                entire premium library of tools and solutions.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <button
                onClick={() => navigate('/marketplace')}
                className="neu-button px-8 py-4 hover:scale-105 transition-transform group"
              >
                <div className="flex items-center gap-3">
                  <span className="text-neu-700 font-semibold">Browse Apps</span>
                  <SafeIcon 
                    icon={FiArrowRight} 
                    className="w-5 h-5 text-neu-600 group-hover:translate-x-1 transition-transform" 
                  />
                </div>
              </button>

              <button className="neu-button px-8 py-4 hover:scale-105 transition-transform group">
                <div className="flex items-center gap-3">
                  <SafeIcon icon={FiPlay} className="w-5 h-5 text-neu-600" />
                  <span className="text-neu-700 font-semibold">Watch Demo</span>
                </div>
              </button>
            </div>

            {/* Trust Indicators */}
            <div className="flex items-center gap-8 pt-8">
              <div className="flex items-center gap-2">
                <SafeIcon icon={FiShield} className="w-5 h-5 text-green-600" />
                <span className="text-neu-600 text-sm">Secure Payments</span>
              </div>
              <div className="flex items-center gap-2">
                <SafeIcon icon={FiShoppingBag} className="w-5 h-5 text-blue-600" />
                <span className="text-neu-600 text-sm">500+ Premium Apps</span>
              </div>
              <div className="text-neu-600 text-sm">
                <span className="font-semibold">50K+</span> Happy Customers
              </div>
            </div>
          </motion.div>

          {/* Right Column - Visual */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative"
          >
            <div className="relative">
              {/* Main App Showcase */}
              <div className="neu-card p-8 animate-float">
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                      <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                      <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                    </div>
                    <div className="text-xs text-neu-500">umbrella.app</div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    {[
                      { name: 'E-commerce', price: '$49' },
                      { name: 'Portfolio', price: '$29' },
                      { name: 'SaaS Tool', price: '$79' },
                      { name: 'Blog CMS', price: '$39' }
                    ].map((app, i) => (
                      <div key={i} className="neu-card-inset p-4 space-y-2">
                        <div className="w-full h-8 bg-gradient-to-r from-blue-200 to-purple-200 rounded"></div>
                        <div className="text-xs font-medium text-neu-700">{app.name}</div>
                        <div className="text-xs text-blue-600 font-bold">{app.price}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Floating Elements */}
              <motion.div
                animate={{ y: [0, -20, 0] }}
                transition={{ duration: 4, repeat: Infinity }}
                className="absolute -top-4 -right-4 neu-button p-4"
              >
                <SafeIcon icon={FiZap} className="w-6 h-6 text-blue-600" />
              </motion.div>

              <motion.div
                animate={{ y: [0, 20, 0] }}
                transition={{ duration: 5, repeat: Infinity }}
                className="absolute -bottom-4 -left-4 neu-button p-4"
              >
                <SafeIcon icon={FiShoppingBag} className="w-6 h-6 text-purple-600" />
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Hero;