import React from 'react';
import { motion } from 'framer-motion';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../common/SafeIcon';

const { FiAlertTriangle, FiClock, FiDollarSign, FiSettings, FiTrendingDown, FiX, FiZap, FiTarget, FiShield, FiUsers, FiHeart } = FiIcons;

const PainPoints = () => {
  const painPoints = [
    {
      icon: FiClock,
      title: "Building from Scratch",
      description: "Months wasted developing common features instead of focusing on core business logic.",
      impact: "6+ months per project",
      color: "from-red-500 to-orange-500",
      stats: "Average development time"
    },
    {
      icon: FiDollarSign,
      title: "High Development Costs",
      description: "Hiring developers and building custom solutions costs thousands for basic functionality.",
      impact: "$50K+ development costs",
      color: "from-purple-500 to-red-500",
      stats: "Typical project budget"
    },
    {
      icon: FiSettings,
      title: "Maintenance Burden",
      description: "Constant updates, bug fixes, and feature additions drain resources and time.",
      impact: "40% of development time",
      color: "from-blue-500 to-purple-500",
      stats: "Ongoing maintenance effort"
    },
    {
      icon: FiTrendingDown,
      title: "Poor Quality Results",
      description: "Rushed development leads to buggy, unreliable applications that hurt user experience.",
      impact: "High user churn",
      color: "from-orange-500 to-red-500",
      stats: "Quality compromises"
    },
    {
      icon: FiAlertTriangle,
      title: "Security Vulnerabilities",
      description: "Custom-built solutions often lack proper security measures, exposing sensitive data.",
      impact: "Data breach risks",
      color: "from-red-500 to-pink-500",
      stats: "Security concerns"
    },
    {
      icon: FiX,
      title: "Limited Functionality",
      description: "Budget constraints force compromises on features, resulting in incomplete solutions.",
      impact: "Competitive disadvantage",
      color: "from-gray-500 to-red-500",
      stats: "Feature limitations"
    }
  ];

  return (
    <section className="py-12 lg:py-16 xl:py-24 bg-gradient-to-br from-neu-100 to-neu-200">
      <div className="max-w-7xl mx-auto px-4 lg:px-6">
        {/* Enhanced Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12 lg:mb-16 xl:mb-24"
        >
          <div className="neu-button inline-flex items-center gap-2 lg:gap-3 px-6 py-3 lg:px-8 lg:py-4 mb-6 lg:mb-8 bg-gradient-to-r from-red-100 to-orange-100">
            <SafeIcon icon={FiAlertTriangle} className="w-5 h-5 lg:w-6 lg:h-6 text-red-600" />
            <span className="text-neu-700 font-bold text-base lg:text-lg">The Problem</span>
            <div className="w-2 h-2 lg:w-3 lg:h-3 bg-red-500 rounded-full animate-pulse"></div>
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-bold text-neu-900 mb-6 lg:mb-8">
            Stop Wasting Time on
            <span className="gradient-text block" style={{ lineHeight: '1.2', paddingBottom: '0.1em' }}>
              Custom Development
            </span>
          </h2>
          <p className="text-base lg:text-lg xl:text-xl text-neu-600 max-w-4xl mx-auto leading-relaxed">
            Why reinvent the wheel? Businesses waste months and thousands of dollars building common web applications that already exist as proven, professional solutions.
          </p>
        </motion.div>

        {/* Enhanced Pain Points Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 mb-12 lg:mb-16 xl:mb-20">
          {painPoints.map((point, index) => (
            <motion.div
              key={point.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="neu-card p-6 lg:p-8 hover:scale-105 transition-all duration-300 bg-gradient-to-br from-white to-red-50"
            >
              <div className="space-y-4 lg:space-y-6">
                {/* Enhanced Icon */}
                <div className="relative">
                  <div className={`neu-button p-3 lg:p-4 inline-flex bg-gradient-to-r ${point.color} text-white shadow-xl`}>
                    <SafeIcon icon={point.icon} className="w-6 h-6 lg:w-8 lg:h-8" />
                  </div>
                  <div className="absolute -top-1 -right-1 lg:-top-2 lg:-right-2 neu-button p-1 lg:p-2 bg-red-500 text-white">
                    <SafeIcon icon={FiAlertTriangle} className="w-2 h-2 lg:w-3 lg:h-3" />
                  </div>
                </div>

                {/* Enhanced Content */}
                <div className="space-y-3 lg:space-y-4">
                  <h3 className="text-lg lg:text-xl font-bold text-neu-900">{point.title}</h3>
                  <p className="text-neu-600 leading-relaxed text-sm lg:text-base">{point.description}</p>
                  <div className="text-xs lg:text-sm text-neu-500 font-medium">{point.stats}</div>
                </div>

                {/* Enhanced Impact Badge */}
                <div className="neu-card-inset p-3 lg:p-4 bg-gradient-to-r from-red-50 to-orange-50">
                  <div className="flex items-center justify-between">
                    <span className="text-red-700 font-bold text-sm lg:text-base">{point.impact}</span>
                    <SafeIcon icon={FiTrendingDown} className="w-4 h-4 lg:w-5 lg:h-5 text-red-600" />
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Enhanced Solution Teaser */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="neu-card p-6 lg:p-12 xl:p-16 max-w-4xl mx-auto bg-gradient-to-br from-white to-green-50"
        >
          <div className="text-center space-y-6 lg:space-y-8">
            <div className="neu-button inline-flex items-center gap-2 lg:gap-3 px-6 py-3 lg:px-8 lg:py-4 bg-gradient-to-r from-green-500 to-blue-500 text-white shadow-xl">
              <SafeIcon icon={FiZap} className="w-5 h-5 lg:w-6 lg:h-6" />
              <span className="font-bold text-base lg:text-lg">The Solution</span>
            </div>
            <h3 className="text-2xl lg:text-3xl xl:text-4xl font-bold text-neu-900 mb-4 lg:mb-6">
              There's a Better Way
              <span className="gradient-text block" style={{ lineHeight: '1.2', paddingBottom: '0.1em' }}>
                Ready-Made Excellence
              </span>
            </h3>
            <p className="text-base lg:text-lg xl:text-xl text-neu-600 leading-relaxed mb-6 lg:mb-8">
              Skip the development headaches. Get professional, ready-to-use web applications that are tested, secure, and feature-complete from day one.
            </p>
            <div className="grid md:grid-cols-3 gap-4 lg:gap-6 mb-6 lg:mb-8">
              {[
                { icon: FiTarget, label: "Instant Access", value: "Minutes not months", color: "text-green-600" },
                { icon: FiShield, label: "Enterprise Quality", value: "Tested & secure", color: "text-blue-600" },
                { icon: FiUsers, label: "Cost Effective", value: "90% savings", color: "text-purple-600" }
              ].map((benefit, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.2 }}
                  className="neu-card-inset p-4 lg:p-6 hover:scale-105 transition-transform"
                >
                  <div className="space-y-3 lg:space-y-4">
                    <div className="neu-button p-2 lg:p-3 inline-flex mx-auto bg-gradient-to-r from-green-500 to-blue-500 text-white">
                      <SafeIcon icon={benefit.icon} className="w-5 h-5 lg:w-6 lg:h-6" />
                    </div>
                    <div className="space-y-1 lg:space-y-2">
                      <div className="font-bold text-neu-900 text-sm lg:text-base">{benefit.label}</div>
                      <div className={`font-semibold text-sm lg:text-base ${benefit.color}`}>{benefit.value}</div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
            <div className="flex flex-col sm:flex-row gap-4 lg:gap-6 justify-center">
              <button className="neu-button px-8 py-4 lg:px-10 lg:py-5 bg-gradient-to-r from-green-500 to-blue-500 text-white hover:scale-105 transition-transform shadow-2xl">
                <div className="flex items-center gap-2 lg:gap-3">
                  <SafeIcon icon={FiZap} className="w-5 h-5 lg:w-6 lg:h-6" />
                  <span className="font-bold text-base lg:text-lg">Explore Solutions</span>
                </div>
              </button>
              <button className="neu-button px-8 py-4 lg:px-10 lg:py-5 hover:scale-105 transition-transform bg-gradient-to-r from-blue-100 to-purple-100">
                <div className="flex items-center gap-2 lg:gap-3">
                  <SafeIcon icon={FiHeart} className="w-5 h-5 lg:w-6 lg:h-6 text-neu-600" />
                  <span className="text-neu-700 font-bold text-base lg:text-lg">Learn More</span>
                </div>
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default PainPoints;