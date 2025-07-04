import React from 'react';
import { motion } from 'framer-motion';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../common/SafeIcon';

const { FiZap, FiShield, FiTrendingUp, FiHeart, FiGlobe, FiCpu, FiX } = FiIcons;

const USP = () => {
  const benefits = [
    {
      icon: FiZap,
      title: "Instant Access",
      description: "Purchase and start using professional web applications immediately. No waiting, no setup.",
      stat: "Ready in seconds"
    },
    {
      icon: FiShield,
      title: "Enterprise Quality",
      description: "All apps are professionally built, tested, and maintained by expert developers.",
      stat: "99.9% reliability"
    },
    {
      icon: FiTrendingUp,
      title: "Cost Effective",
      description: "Get professional applications for a fraction of custom development costs.",
      stat: "90% cost savings"
    },
    {
      icon: FiHeart,
      title: "Beautiful Design",
      description: "Every application features modern, responsive design that works perfectly on all devices.",
      stat: "Premium UI/UX"
    },
    {
      icon: FiGlobe,
      title: "Wide Selection",
      description: "Choose from hundreds of applications across different categories and industries.",
      stat: "500+ apps available"
    },
    {
      icon: FiCpu,
      title: "Regular Updates",
      description: "All purchased applications receive regular updates, new features, and security patches.",
      stat: "Always current"
    }
  ];

  return (
    <section className="py-20 bg-gradient-to-br from-blue-50 to-purple-50">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <div className="neu-button inline-flex items-center gap-2 px-6 py-3 mb-6">
            <SafeIcon icon={FiZap} className="w-5 h-5 text-blue-600" />
            <span className="text-neu-700 font-medium">The Umbrella Advantage</span>
          </div>
          <h2 className="text-3xl lg:text-5xl font-bold text-neu-900 mb-6">
            Why Choose Ready-Made
            <span className="gradient-text block">Applications</span>
          </h2>
          <p className="text-xl text-neu-600 max-w-3xl mx-auto">
            Get professional, feature-complete web applications instantly. Skip months of development 
            and thousands in costs with our curated marketplace of premium solutions.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {benefits.map((benefit, index) => (
            <motion.div
              key={benefit.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="neu-card p-8 hover:scale-105 transition-transform group"
            >
              <div className="text-center space-y-4">
                <div className="neu-button p-4 inline-flex mx-auto group-hover:animate-glow">
                  <SafeIcon icon={benefit.icon} className="w-8 h-8 text-blue-600" />
                </div>
                <h3 className="text-xl font-semibold text-neu-900">{benefit.title}</h3>
                <p className="text-neu-600">{benefit.description}</p>
                <div className="neu-card-inset px-4 py-2 inline-block">
                  <span className="text-blue-700 font-bold text-sm">{benefit.stat}</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Comparison */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="neu-card p-8 max-w-4xl mx-auto"
        >
          <h3 className="text-2xl font-bold text-neu-900 mb-8 text-center">
            Custom Development vs Umbrella Marketplace
          </h3>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="space-y-4">
              <h4 className="text-lg font-semibold text-red-700 flex items-center gap-2">
                <SafeIcon icon={FiX} className="w-5 h-5" />
                Custom Development
              </h4>
              <ul className="space-y-2 text-neu-600">
                <li>• 3-6 months development time</li>
                <li>• $50,000+ development costs</li>
                <li>• Ongoing maintenance burden</li>
                <li>• Security vulnerabilities</li>
                <li>• Limited features due to budget</li>
                <li>• No guarantee of quality</li>
              </ul>
            </div>
            <div className="space-y-4">
              <h4 className="text-lg font-semibold text-green-700 flex items-center gap-2">
                <SafeIcon icon={FiZap} className="w-5 h-5" />
                Umbrella Marketplace
              </h4>
              <ul className="space-y-2 text-neu-600">
                <li>• Instant access and setup</li>
                <li>• $29-$199 one-time purchase</li>
                <li>• Automatic updates included</li>
                <li>• Enterprise-grade security</li>
                <li>• Full-featured applications</li>
                <li>• Proven quality and reliability</li>
              </ul>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default USP;