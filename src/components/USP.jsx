import React from 'react';
import { motion } from 'framer-motion';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../common/SafeIcon';

const { FiZap, FiShield, FiTrendingUp, FiHeart, FiGlobe, FiCpu, FiX, FiCheck, FiStar, FiTarget, FiAward, FiDollarSign, FiClock, FiUsers } = FiIcons;

const USP = () => {
  const benefits = [
    {
      icon: FiZap,
      title: "Instant Access",
      description: "Purchase and start using professional web applications immediately. No waiting, no setup.",
      stat: "Ready in seconds",
      color: "from-blue-500 to-purple-500"
    },
    {
      icon: FiShield,
      title: "Enterprise Quality",
      description: "All apps are professionally built, tested, and maintained by expert developers.",
      stat: "99.9% reliability",
      color: "from-green-500 to-blue-500"
    },
    {
      icon: FiTrendingUp,
      title: "Cost Effective",
      description: "Get professional applications for a fraction of custom development costs.",
      stat: "90% cost savings",
      color: "from-purple-500 to-pink-500"
    },
    {
      icon: FiHeart,
      title: "Beautiful Design",
      description: "Every application features modern, responsive design that works perfectly on all devices.",
      stat: "Premium UI/UX",
      color: "from-pink-500 to-red-500"
    },
    {
      icon: FiGlobe,
      title: "Wide Selection",
      description: "Choose from hundreds of applications across different categories and industries.",
      stat: "500+ apps available",
      color: "from-cyan-500 to-blue-500"
    },
    {
      icon: FiCpu,
      title: "Regular Updates",
      description: "All purchased applications receive regular updates, new features, and security patches.",
      stat: "Always current",
      color: "from-yellow-500 to-orange-500"
    }
  ];

  return (
    <section className="py-12 lg:py-16 xl:py-24 bg-gradient-to-br from-blue-50 to-purple-50">
      <div className="max-w-7xl mx-auto px-4 lg:px-6">
        {/* Enhanced Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12 lg:mb-16 xl:mb-24"
        >
          <div className="neu-button inline-flex items-center gap-2 lg:gap-3 px-4 py-2 lg:px-8 lg:py-4 mb-6 lg:mb-8 bg-gradient-to-r from-blue-100 to-purple-100">
            <SafeIcon icon={FiZap} className="w-4 h-4 lg:w-6 lg:h-6 text-blue-600" />
            <span className="text-neu-700 font-bold text-sm lg:text-lg">The Umbrella Advantage</span>
            <div className="w-2 h-2 lg:w-3 lg:h-3 bg-green-500 rounded-full animate-pulse"></div>
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-bold text-neu-900 mb-6 lg:mb-8">
            Why Choose Ready-Made
            <span className="gradient-text block" style={{ lineHeight: '1.2', paddingBottom: '0.1em' }}>
              Applications
            </span>
          </h2>
          <p className="text-base lg:text-lg xl:text-xl text-neu-600 max-w-4xl mx-auto leading-relaxed">
            Get professional, feature-complete web applications instantly. Skip months of development and thousands in costs with our curated marketplace of premium solutions.
          </p>
        </motion.div>

        {/* Enhanced Benefits Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 mb-12 lg:mb-16 xl:mb-20">
          {benefits.map((benefit, index) => (
            <motion.div
              key={benefit.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="neu-card p-6 lg:p-8 hover:scale-105 transition-all duration-300 group bg-gradient-to-br from-white to-blue-50"
            >
              <div className="space-y-4 lg:space-y-6">
                {/* Enhanced Icon */}
                <div className="relative">
                  <div className={`neu-button p-3 lg:p-4 inline-flex group-hover:scale-110 transition-transform bg-gradient-to-r ${benefit.color} text-white shadow-xl`}>
                    <SafeIcon icon={benefit.icon} className="w-6 h-6 lg:w-8 lg:h-8" />
                  </div>
                  <div className="absolute -top-1 -right-1 lg:-top-2 lg:-right-2 neu-button p-1 lg:p-2 bg-green-500 text-white">
                    <SafeIcon icon={FiCheck} className="w-2 h-2 lg:w-3 lg:h-3" />
                  </div>
                </div>

                {/* Enhanced Content */}
                <div className="space-y-3 lg:space-y-4">
                  <h3 className="text-lg lg:text-xl font-bold text-neu-900 group-hover:text-blue-600 transition-colors">
                    {benefit.title}
                  </h3>
                  <p className="text-neu-600 leading-relaxed text-sm lg:text-base">{benefit.description}</p>
                </div>

                {/* Enhanced Stat Badge */}
                <div className="neu-card-inset p-3 lg:p-4 bg-gradient-to-r from-blue-50 to-purple-50">
                  <div className="flex items-center justify-between">
                    <span className="text-blue-700 font-bold text-sm lg:text-base">{benefit.stat}</span>
                    <SafeIcon icon={FiStar} className="w-4 h-4 lg:w-5 lg:h-5 text-yellow-500" />
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Enhanced Comparison Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="neu-card p-6 lg:p-12 xl:p-16 max-w-7xl mx-auto bg-gradient-to-br from-white to-purple-50"
        >
          <div className="text-center mb-12 lg:mb-16">
            <div className="neu-button inline-flex items-center gap-2 lg:gap-3 px-4 py-2 lg:px-8 lg:py-4 mb-6 lg:mb-8 bg-gradient-to-r from-red-100 to-green-100">
              <SafeIcon icon={FiTarget} className="w-4 h-4 lg:w-6 lg:h-6 text-red-600" />
              <span className="text-neu-700 font-bold text-sm lg:text-lg">The Smart Choice</span>
              <SafeIcon icon={FiAward} className="w-4 h-4 lg:w-6 lg:h-6 text-green-600" />
            </div>
            <h3 className="text-2xl lg:text-3xl xl:text-4xl font-bold text-neu-900 mb-4 lg:mb-6">
              Custom Development vs
              <span className="gradient-text block" style={{ lineHeight: '1.2', paddingBottom: '0.1em' }}>
                Umbrella Marketplace
              </span>
            </h3>
            <p className="text-base lg:text-lg xl:text-xl text-neu-600 max-w-3xl mx-auto leading-relaxed">
              See the dramatic difference in time, cost, and quality between traditional development and our marketplace
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12">
            {/* Custom Development - Enhanced Left Side */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="neu-card-inset p-6 lg:p-8 xl:p-12 bg-gradient-to-br from-red-50 to-orange-50 hover:scale-105 transition-transform"
            >
              <div className="text-center mb-8 lg:mb-10">
                <div className="neu-button p-4 lg:p-6 inline-flex mx-auto bg-gradient-to-r from-red-500 to-orange-500 text-white shadow-2xl mb-4 lg:mb-6">
                  <SafeIcon icon={FiX} className="w-8 h-8 lg:w-10 lg:h-10" />
                </div>
                <h4 className="text-xl lg:text-2xl xl:text-3xl font-bold text-red-700 mb-3 lg:mb-4">Custom Development</h4>
                <p className="text-red-600 text-base lg:text-lg font-medium">The traditional, expensive way</p>
              </div>
              <div className="space-y-4 lg:space-y-6">
                {[
                  { text: "3-6 months development time", impact: "Slow", icon: FiClock },
                  { text: "$50,000+ development costs", impact: "Expensive", icon: FiDollarSign },
                  { text: "Ongoing maintenance burden", impact: "Time-consuming", icon: FiCpu },
                  { text: "Security vulnerabilities", impact: "Risky", icon: FiShield },
                  { text: "Limited features due to budget", impact: "Compromised", icon: FiTarget },
                  { text: "No guarantee of quality", impact: "Uncertain", icon: FiUsers }
                ].map((item, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    className="flex items-start gap-3 lg:gap-4 neu-card-inset p-4 lg:p-6 bg-white/70 hover:bg-white/90 transition-colors"
                  >
                    <div className="neu-button p-2 lg:p-3 bg-gradient-to-r from-red-500 to-orange-500 text-white flex-shrink-0 shadow-lg">
                      <SafeIcon icon={item.icon} className="w-4 h-4 lg:w-5 lg:h-5" />
                    </div>
                    <div className="flex-1">
                      <p className="text-neu-700 font-semibold text-sm lg:text-base xl:text-lg">{item.text}</p>
                      <span className="text-red-600 font-bold text-xs lg:text-sm uppercase tracking-wide">{item.impact}</span>
                    </div>
                  </motion.div>
                ))}
              </div>
              <div className="mt-8 lg:mt-10 text-center">
                <div className="neu-card-inset p-4 lg:p-6 bg-gradient-to-r from-red-100 to-orange-100">
                  <div className="text-red-700 font-bold text-xl lg:text-2xl mb-2">Total Cost: $50,000+</div>
                  <div className="text-red-600 font-medium text-sm lg:text-base">Plus 6+ months of your time</div>
                  <div className="text-red-500 text-xs lg:text-sm mt-2">⚠️ High risk, uncertain outcome</div>
                </div>
              </div>
            </motion.div>

            {/* Umbrella Marketplace - Enhanced Right Side */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="neu-card-inset p-6 lg:p-8 xl:p-12 bg-gradient-to-br from-green-50 to-blue-50 hover:scale-105 transition-transform"
            >
              <div className="text-center mb-8 lg:mb-10">
                <div className="neu-button p-4 lg:p-6 inline-flex mx-auto bg-gradient-to-r from-green-500 to-blue-500 text-white shadow-2xl mb-4 lg:mb-6">
                  <SafeIcon icon={FiZap} className="w-8 h-8 lg:w-10 lg:h-10" />
                </div>
                <h4 className="text-xl lg:text-2xl xl:text-3xl font-bold text-green-700 mb-3 lg:mb-4">Umbrella Marketplace</h4>
                <p className="text-green-600 text-base lg:text-lg font-medium">The smart, modern approach</p>
              </div>
              <div className="space-y-4 lg:space-y-6">
                {[
                  { text: "Instant access and setup", impact: "Immediate", icon: FiZap },
                  { text: "$29-$199 one-time purchase", impact: "Affordable", icon: FiDollarSign },
                  { text: "Automatic updates included", impact: "Hassle-free", icon: FiCpu },
                  { text: "Enterprise-grade security", impact: "Protected", icon: FiShield },
                  { text: "Full-featured applications", impact: "Complete", icon: FiTarget },
                  { text: "Proven quality and reliability", impact: "Guaranteed", icon: FiUsers }
                ].map((item, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    className="flex items-start gap-3 lg:gap-4 neu-card-inset p-4 lg:p-6 bg-white/70 hover:bg-white/90 transition-colors"
                  >
                    <div className="neu-button p-2 lg:p-3 bg-gradient-to-r from-green-500 to-blue-500 text-white flex-shrink-0 shadow-lg">
                      <SafeIcon icon={item.icon} className="w-4 h-4 lg:w-5 lg:h-5" />
                    </div>
                    <div className="flex-1">
                      <p className="text-neu-700 font-semibold text-sm lg:text-base xl:text-lg">{item.text}</p>
                      <span className="text-green-600 font-bold text-xs lg:text-sm uppercase tracking-wide">{item.impact}</span>
                    </div>
                  </motion.div>
                ))}
              </div>
              <div className="mt-8 lg:mt-10 text-center">
                <div className="neu-card-inset p-4 lg:p-6 bg-gradient-to-r from-green-100 to-blue-100">
                  <div className="text-green-700 font-bold text-xl lg:text-2xl mb-2">Total Cost: $29-$199</div>
                  <div className="text-green-600 font-medium text-sm lg:text-base">Ready to use in minutes</div>
                  <div className="text-green-500 text-xs lg:text-sm mt-2">✅ Guaranteed quality & success</div>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Enhanced Bottom Summary */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mt-12 lg:mt-16 text-center"
          >
            <div className="neu-card-inset p-6 lg:p-8 xl:p-12 bg-gradient-to-r from-blue-50 to-purple-50">
              <div className="space-y-6 lg:space-y-8">
                <div className="neu-button inline-flex items-center gap-2 lg:gap-3 px-6 py-3 lg:px-8 lg:py-4 bg-gradient-to-r from-green-500 to-blue-500 text-white shadow-xl">
                  <SafeIcon icon={FiAward} className="w-5 h-5 lg:w-6 lg:h-6" />
                  <span className="font-bold text-base lg:text-lg">The Choice is Clear</span>
                </div>
                <h4 className="text-2xl lg:text-3xl xl:text-4xl font-bold text-neu-900 mb-4 lg:mb-6">
                  Smart Investment Decision
                </h4>
                <p className="text-base lg:text-lg xl:text-xl text-neu-600 mb-6 lg:mb-8 max-w-3xl mx-auto leading-relaxed">
                  Save <span className="font-bold text-green-600 text-lg lg:text-xl xl:text-2xl">90%+ in costs</span> and{' '}
                  <span className="font-bold text-blue-600 text-lg lg:text-xl xl:text-2xl">6+ months of time</span> with our premium marketplace
                </p>
                <div className="grid md:grid-cols-3 gap-4 lg:gap-6 mb-6 lg:mb-8">
                  {[
                    { label: "Cost Savings", value: "90%+", color: "text-green-600" },
                    { label: "Time Savings", value: "6+ months", color: "text-blue-600" },
                    { label: "Success Rate", value: "99.9%", color: "text-purple-600" }
                  ].map((stat, index) => (
                    <div key={index} className="neu-card-inset p-4 lg:p-6">
                      <div className={`text-2xl lg:text-3xl font-bold ${stat.color} mb-2`}>{stat.value}</div>
                      <div className="text-neu-600 font-medium text-sm lg:text-base">{stat.label}</div>
                    </div>
                  ))}
                </div>
                <div className="flex flex-col sm:flex-row gap-4 lg:gap-6 justify-center">
                  <button className="neu-button px-8 py-4 lg:px-10 lg:py-5 bg-gradient-to-r from-green-500 to-blue-500 text-white hover:scale-105 transition-transform shadow-2xl">
                    <div className="flex items-center gap-2 lg:gap-3">
                      <SafeIcon icon={FiZap} className="w-5 h-5 lg:w-6 lg:h-6" />
                      <span className="font-bold text-base lg:text-lg">Browse Applications</span>
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
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default USP;