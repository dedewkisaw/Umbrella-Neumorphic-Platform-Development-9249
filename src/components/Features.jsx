import React from 'react';
import { motion } from 'framer-motion';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../common/SafeIcon';

const {
  FiCode, FiGlobe, FiShield, FiZap, FiBarChart, FiUsers, FiCloud, FiSmartphone,
  FiStar, FiTrendingUp, FiCheck, FiArrowRight, FiHeart, FiTarget, FiAward, FiShoppingBag
} = FiIcons;

const Features = () => {
  const features = [
    {
      icon: FiCode,
      title: "Ready-to-Use Apps",
      description: "Professional applications that work out of the box. No coding or setup required.",
      stat: "Instant deployment",
      color: "from-blue-500 to-purple-500",
      benefits: ["Zero setup time", "Production ready", "Fully tested"]
    },
    {
      icon: FiGlobe,
      title: "Multiple Categories",
      description: "E-commerce, portfolios, blogs, SaaS tools, and more across various industries.",
      stat: "500+ applications",
      color: "from-green-500 to-blue-500",
      benefits: ["All industries", "Diverse solutions", "Regular updates"]
    },
    {
      icon: FiShield,
      title: "Quality Assured",
      description: "Every app is thoroughly tested, secure, and follows modern development standards.",
      stat: "Enterprise grade",
      color: "from-purple-500 to-pink-500",
      benefits: ["Security tested", "Code reviewed", "Best practices"]
    },
    {
      icon: FiZap,
      title: "Flexible Licensing",
      description: "Choose individual purchases or unlimited access subscriptions that fit your needs.",
      stat: "Own forever",
      color: "from-yellow-500 to-red-500",
      benefits: ["Lifetime access", "Commercial use", "No restrictions"]
    },
    {
      icon: FiBarChart,
      title: "Usage Analytics",
      description: "Track your purchased applications and monitor usage with detailed analytics.",
      stat: "Detailed insights",
      color: "from-indigo-500 to-purple-500",
      benefits: ["Real-time data", "Performance metrics", "User insights"]
    },
    {
      icon: FiUsers,
      title: "Developer Support",
      description: "Get direct support from the original developers for customizations and help.",
      stat: "Expert assistance",
      color: "from-pink-500 to-red-500",
      benefits: ["Direct access", "Quick responses", "Custom solutions"]
    },
    {
      icon: FiCloud,
      title: "Cloud Integration",
      description: "Seamlessly integrate with popular cloud services and APIs for enhanced functionality.",
      stat: "Easy integration",
      color: "from-cyan-500 to-blue-500",
      benefits: ["API ready", "Cloud native", "Scalable"]
    },
    {
      icon: FiSmartphone,
      title: "Mobile Responsive",
      description: "All applications are optimized for mobile devices and provide excellent user experience.",
      stat: "Perfect on mobile",
      color: "from-green-500 to-teal-500",
      benefits: ["Mobile first", "Touch optimized", "Cross-platform"]
    }
  ];

  return (
    <section id="features" className="py-12 lg:py-20 bg-gradient-to-br from-neu-100 to-neu-200">
      <div className="max-w-7xl mx-auto px-4 lg:px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12 lg:mb-16"
        >
          <div className="neu-button inline-flex items-center gap-2 lg:gap-3 px-4 py-2 lg:px-6 lg:py-3 mb-6 lg:mb-8 bg-gradient-to-r from-blue-100 to-purple-100">
            <SafeIcon icon={FiStar} className="w-4 h-4 lg:w-5 lg:h-5 text-blue-600" />
            <span className="text-neu-700 font-bold text-sm lg:text-base">Premium Features</span>
            <div className="w-2 h-2 lg:w-3 lg:h-3 bg-green-500 rounded-full animate-pulse"></div>
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-bold text-neu-900 mb-6 lg:mb-8">
            Everything You Need
            <span className="gradient-text block" style={{ lineHeight: '1.2', paddingBottom: '0.1em' }}>
              In One Marketplace
            </span>
          </h2>
          <p className="text-base lg:text-lg xl:text-xl text-neu-600 max-w-4xl mx-auto leading-relaxed">
            Discover, purchase, and use professional web applications instantly. Our marketplace offers the largest collection of premium, ready-to-use solutions.
          </p>
        </motion.div>

        {/* Features Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8 mb-12 lg:mb-16">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="neu-card p-4 lg:p-6 hover:scale-105 transition-all duration-300 group bg-gradient-to-br from-white to-blue-50"
            >
              <div className="space-y-4 lg:space-y-6">
                {/* Icon */}
                <div className="relative">
                  <div className={`neu-button p-3 lg:p-4 inline-flex group-hover:scale-110 transition-transform bg-gradient-to-r ${feature.color} text-white shadow-xl`}>
                    <SafeIcon icon={feature.icon} className="w-5 h-5 lg:w-6 lg:h-6" />
                  </div>
                  <div className="absolute -top-1 -right-1 neu-button p-1 lg:p-1.5 bg-green-500 text-white">
                    <SafeIcon icon={FiCheck} className="w-2.5 h-2.5 lg:w-3 lg:h-3" />
                  </div>
                </div>

                {/* Content */}
                <div className="space-y-3 lg:space-y-4">
                  <h3 className="text-lg lg:text-xl font-bold text-neu-900 group-hover:text-blue-600 transition-colors">
                    {feature.title}
                  </h3>
                  <p className="text-neu-600 leading-relaxed text-sm lg:text-base">{feature.description}</p>
                  
                  {/* Benefits List */}
                  <div className="space-y-1 lg:space-y-2">
                    {feature.benefits.map((benefit, i) => (
                      <div key={i} className="flex items-center gap-2">
                        <SafeIcon icon={FiCheck} className="w-3 h-3 lg:w-4 lg:h-4 text-green-600" />
                        <span className="text-neu-600 text-xs lg:text-sm">{benefit}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Stat Badge */}
                <div className="neu-card-inset p-3 lg:p-4 bg-gradient-to-r from-blue-50 to-purple-50">
                  <div className="flex items-center justify-between">
                    <span className="text-blue-700 font-bold text-xs lg:text-sm">{feature.stat}</span>
                    <SafeIcon icon={FiArrowRight} className="w-3 h-3 lg:w-4 lg:h-4 text-blue-600 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* How It Works Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="neu-card p-6 lg:p-12 bg-gradient-to-br from-white to-purple-50"
        >
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            {/* Left Content */}
            <div className="space-y-6 lg:space-y-8">
              <div className="space-y-4 lg:space-y-6">
                <div className="neu-button inline-flex items-center gap-2 lg:gap-3 px-4 py-2 lg:px-5 lg:py-3 bg-gradient-to-r from-green-100 to-blue-100">
                  <SafeIcon icon={FiTarget} className="w-4 h-4 lg:w-5 lg:h-5 text-green-600" />
                  <span className="text-neu-700 font-medium text-sm lg:text-base">Simple Process</span>
                </div>
                <h3 className="text-2xl lg:text-3xl xl:text-4xl font-bold text-neu-900">
                  How It Works
                  <span className="gradient-text block" style={{ lineHeight: '1.2', paddingBottom: '0.1em' }}>
                    In 3 Easy Steps
                  </span>
                </h3>
                <p className="text-sm lg:text-base text-neu-600 leading-relaxed">
                  Getting started with professional web applications has never been easier. Browse, purchase, and start using premium apps in minutes.
                </p>
              </div>

              {/* Steps */}
              <div className="space-y-4 lg:space-y-6">
                {[
                  { step: "1", title: "Browse our curated marketplace", desc: "Explore 500+ premium applications across all categories", icon: FiGlobe },
                  { step: "2", title: "Purchase or subscribe to applications", desc: "Choose individual apps or unlimited access plans", icon: FiShoppingBag },
                  { step: "3", title: "Download and start using immediately", desc: "Get instant access with lifetime updates included", icon: FiZap }
                ].map((item, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.2 }}
                    className="flex items-start gap-4 lg:gap-6 group"
                  >
                    <div className="neu-button p-3 lg:p-4 bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-xl group-hover:scale-110 transition-transform">
                      <span className="font-bold text-lg lg:text-xl">{item.step}</span>
                    </div>
                    <div className="flex-1 space-y-1 lg:space-y-2">
                      <div className="flex items-center gap-2 lg:gap-3">
                        <SafeIcon icon={item.icon} className="w-4 h-4 lg:w-5 lg:h-5 text-blue-600" />
                        <h4 className="font-bold text-neu-800 text-sm lg:text-base">{item.title}</h4>
                      </div>
                      <p className="text-neu-600 text-sm lg:text-base">{item.desc}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Right Visual */}
            <div className="relative">
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                className="neu-card-inset p-6 lg:p-8 bg-gradient-to-br from-green-50 to-blue-50"
              >
                <div className="space-y-4 lg:space-y-6">
                  <div className="flex items-center gap-2 lg:gap-3 text-xs lg:text-sm text-neu-600">
                    <div className="w-2 h-2 lg:w-3 lg:h-3 bg-green-500 rounded-full animate-pulse"></div>
                    <span className="font-medium">Premium marketplace ready...</span>
                  </div>
                  <div className="space-y-3 lg:space-y-4">
                    <div className="w-full bg-neu-200 rounded-full h-2 lg:h-3">
                      <motion.div
                        initial={{ width: 0 }}
                        whileInView={{ width: "100%" }}
                        viewport={{ once: true }}
                        transition={{ duration: 2, delay: 0.5 }}
                        className="bg-gradient-to-r from-green-500 to-blue-500 h-2 lg:h-3 rounded-full"
                      ></motion.div>
                    </div>
                    <div className="grid grid-cols-2 gap-3 lg:gap-4 text-xs lg:text-sm">
                      <div className="neu-card-inset p-2 lg:p-3 text-center">
                        <div className="font-bold text-neu-800 text-sm lg:text-base">500+</div>
                        <div className="text-neu-600">Apps Available</div>
                      </div>
                      <div className="neu-card-inset p-2 lg:p-3 text-center">
                        <div className="font-bold text-neu-800 text-sm lg:text-base">50K+</div>
                        <div className="text-neu-600">Happy Users</div>
                      </div>
                    </div>
                  </div>
                  <div className="neu-card-inset p-3 lg:p-4 bg-gradient-to-r from-green-100 to-blue-100 text-center">
                    <div className="flex items-center justify-center gap-2 mb-2">
                      <SafeIcon icon={FiAward} className="w-4 h-4 lg:w-5 lg:h-5 text-green-600" />
                      <span className="text-green-700 font-bold text-sm lg:text-base">Ready to explore!</span>
                    </div>
                    <div className="text-xs lg:text-sm text-neu-600">Start your journey today</div>
                  </div>
                </div>
              </motion.div>

              {/* Floating Element */}
              <motion.div
                animate={{ y: [0, -15, 0] }}
                transition={{ duration: 3, repeat: Infinity }}
                className="absolute -top-3 -right-3 neu-button p-2 lg:p-3 bg-gradient-to-r from-yellow-500 to-red-500 text-white shadow-lg hidden lg:block"
              >
                <SafeIcon icon={FiHeart} className="w-4 h-4 lg:w-5 lg:h-5" />
              </motion.div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Features;