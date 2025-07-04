import React from 'react';
import { motion } from 'framer-motion';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../common/SafeIcon';

const { FiCode, FiGlobe, FiShield, FiZap, FiBarChart, FiUsers, FiCloud, FiSmartphone } = FiIcons;

const Features = () => {
  const features = [
    {
      icon: FiCode,
      title: "Ready-to-Use Apps",
      description: "Professional applications that work out of the box. No coding or setup required.",
      demo: "Instant deployment"
    },
    {
      icon: FiGlobe,
      title: "Multiple Categories",
      description: "E-commerce, portfolios, blogs, SaaS tools, and more across various industries.",
      demo: "500+ applications"
    },
    {
      icon: FiShield,
      title: "Quality Assured",
      description: "Every app is thoroughly tested, secure, and follows modern development standards.",
      demo: "Enterprise grade"
    },
    {
      icon: FiZap,
      title: "Flexible Licensing",
      description: "Choose individual purchases or unlimited access subscriptions that fit your needs.",
      demo: "Own forever"
    },
    {
      icon: FiBarChart,
      title: "Usage Analytics",
      description: "Track your purchased applications and monitor usage with detailed analytics.",
      demo: "Detailed insights"
    },
    {
      icon: FiUsers,
      title: "Developer Support",
      description: "Get direct support from the original developers for customizations and help.",
      demo: "Expert assistance"
    },
    {
      icon: FiCloud,
      title: "Cloud Integration",
      description: "Seamlessly integrate with popular cloud services and APIs for enhanced functionality.",
      demo: "Easy integration"
    },
    {
      icon: FiSmartphone,
      title: "Mobile Responsive",
      description: "All applications are optimized for mobile devices and provide excellent user experience.",
      demo: "Perfect on mobile"
    }
  ];

  return (
    <section id="features" className="py-20 bg-neu-100">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl lg:text-5xl font-bold text-neu-900 mb-6">
            Everything You Need
            <span className="gradient-text block" style={{ lineHeight: '1.2', paddingBottom: '0.1em' }}>
              In One Marketplace
            </span>
          </h2>
          <p className="text-xl text-neu-600 max-w-3xl mx-auto">
            Discover, purchase, and use professional web applications instantly. 
            Our marketplace offers the largest collection of premium, ready-to-use solutions.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="neu-card p-6 hover:scale-105 transition-transform group"
            >
              <div className="space-y-4">
                <div className="neu-button p-3 inline-flex group-hover:animate-pulse">
                  <SafeIcon icon={feature.icon} className="w-6 h-6 text-blue-600" />
                </div>
                <h3 className="text-lg font-semibold text-neu-900">{feature.title}</h3>
                <p className="text-neu-600 text-sm">{feature.description}</p>
                <div className="neu-card-inset px-3 py-2">
                  <span className="text-blue-700 font-medium text-xs">{feature.demo}</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Feature Showcase */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-20"
        >
          <div className="neu-card p-8 lg:p-12">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div className="space-y-6">
                <h3 className="text-2xl lg:text-3xl font-bold text-neu-900">
                  How It Works
                </h3>
                <p className="text-neu-600 text-lg">
                  Getting started with professional web applications has never been easier. 
                  Browse, purchase, and start using premium apps in minutes.
                </p>
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                      <span className="text-blue-600 font-bold text-sm">1</span>
                    </div>
                    <span className="text-neu-700">Browse our curated marketplace</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                      <span className="text-blue-600 font-bold text-sm">2</span>
                    </div>
                    <span className="text-neu-700">Purchase or subscribe to applications</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                      <span className="text-blue-600 font-bold text-sm">3</span>
                    </div>
                    <span className="text-neu-700">Download and start using immediately</span>
                  </div>
                </div>
              </div>
              <div className="neu-card-inset p-8">
                <div className="space-y-4">
                  <div className="flex items-center gap-2 text-xs text-neu-500">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span>Premium marketplace ready...</span>
                  </div>
                  <div className="space-y-2">
                    <div className="w-full bg-neu-200 rounded-full h-2">
                      <div className="bg-green-500 h-2 rounded-full w-full"></div>
                    </div>
                    <div className="text-xs text-neu-600">500+ apps available</div>
                  </div>
                  <div className="text-green-700 font-semibold">
                    🎉 Ready to explore!
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Features;