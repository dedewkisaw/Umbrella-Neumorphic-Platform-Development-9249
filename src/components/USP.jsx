import React from 'react';
import { motion } from 'framer-motion';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../common/SafeIcon';

const { FiZap, FiShield, FiTrendingUp, FiHeart, FiGlobe, FiCpu, FiX, FiCheck } = FiIcons;

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
            <span className="gradient-text block" style={{ lineHeight: '1.2', paddingBottom: '0.1em' }}>
              Applications
            </span>
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

        {/* Enhanced Comparison Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="neu-card p-8 lg:p-12 max-w-6xl mx-auto"
        >
          <div className="text-center mb-12">
            <h3 className="text-3xl lg:text-4xl font-bold text-neu-900 mb-4">
              Custom Development vs 
              <span className="gradient-text block" style={{ lineHeight: '1.2', paddingBottom: '0.1em' }}>
                Umbrella Marketplace
              </span>
            </h3>
            <p className="text-lg text-neu-600 max-w-2xl mx-auto">
              See the dramatic difference in time, cost, and quality between traditional development and our marketplace
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8">
            {/* Custom Development - Left Side */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="neu-card-inset p-8 bg-gradient-to-br from-red-50 to-orange-50 hover:scale-105 transition-transform"
            >
              <div className="text-center mb-8">
                <div className="neu-button p-4 inline-flex mx-auto bg-red-100 mb-4">
                  <SafeIcon icon={FiX} className="w-8 h-8 text-red-600" />
                </div>
                <h4 className="text-2xl font-bold text-red-700 mb-2">Custom Development</h4>
                <p className="text-red-600 text-sm">The traditional, expensive way</p>
              </div>

              <div className="space-y-4">
                {[
                  { text: "3-6 months development time", impact: "Slow" },
                  { text: "$50,000+ development costs", impact: "Expensive" },
                  { text: "Ongoing maintenance burden", impact: "Time-consuming" },
                  { text: "Security vulnerabilities", impact: "Risky" },
                  { text: "Limited features due to budget", impact: "Compromised" },
                  { text: "No guarantee of quality", impact: "Uncertain" }
                ].map((item, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    className="flex items-start gap-4 neu-card-inset p-4 bg-white/50"
                  >
                    <div className="neu-button p-2 bg-red-100 flex-shrink-0">
                      <SafeIcon icon={FiX} className="w-4 h-4 text-red-600" />
                    </div>
                    <div className="flex-1">
                      <p className="text-neu-700 font-medium">{item.text}</p>
                      <span className="text-red-600 text-sm font-semibold">{item.impact}</span>
                    </div>
                  </motion.div>
                ))}
              </div>

              <div className="mt-8 text-center">
                <div className="neu-card-inset p-4 bg-red-100">
                  <div className="text-red-700 font-bold text-lg">Total Cost: $50,000+</div>
                  <div className="text-red-600 text-sm">Plus 6+ months of your time</div>
                </div>
              </div>
            </motion.div>

            {/* Umbrella Marketplace - Right Side */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="neu-card-inset p-8 bg-gradient-to-br from-green-50 to-blue-50 hover:scale-105 transition-transform"
            >
              <div className="text-center mb-8">
                <div className="neu-button p-4 inline-flex mx-auto bg-green-100 mb-4">
                  <SafeIcon icon={FiZap} className="w-8 h-8 text-green-600" />
                </div>
                <h4 className="text-2xl font-bold text-green-700 mb-2">Umbrella Marketplace</h4>
                <p className="text-green-600 text-sm">The smart, modern approach</p>
              </div>

              <div className="space-y-4">
                {[
                  { text: "Instant access and setup", impact: "Immediate" },
                  { text: "$29-$199 one-time purchase", impact: "Affordable" },
                  { text: "Automatic updates included", impact: "Hassle-free" },
                  { text: "Enterprise-grade security", impact: "Protected" },
                  { text: "Full-featured applications", impact: "Complete" },
                  { text: "Proven quality and reliability", impact: "Guaranteed" }
                ].map((item, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    className="flex items-start gap-4 neu-card-inset p-4 bg-white/50"
                  >
                    <div className="neu-button p-2 bg-green-100 flex-shrink-0">
                      <SafeIcon icon={FiCheck} className="w-4 h-4 text-green-600" />
                    </div>
                    <div className="flex-1">
                      <p className="text-neu-700 font-medium">{item.text}</p>
                      <span className="text-green-600 text-sm font-semibold">{item.impact}</span>
                    </div>
                  </motion.div>
                ))}
              </div>

              <div className="mt-8 text-center">
                <div className="neu-card-inset p-4 bg-green-100">
                  <div className="text-green-700 font-bold text-lg">Total Cost: $29-$199</div>
                  <div className="text-green-600 text-sm">Ready to use in minutes</div>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Bottom Summary */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mt-12 text-center"
          >
            <div className="neu-card-inset p-8 bg-gradient-to-r from-blue-50 to-purple-50">
              <h4 className="text-2xl font-bold text-neu-900 mb-4">
                The Choice is Clear
              </h4>
              <p className="text-lg text-neu-600 mb-6">
                Save <span className="font-bold text-green-600">90%+ in costs</span> and 
                <span className="font-bold text-blue-600"> 6+ months of time</span> with our premium marketplace
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <div className="neu-button px-6 py-3 bg-green-500 text-white hover:scale-105 transition-transform">
                  <span className="font-semibold">Browse Applications</span>
                </div>
                <div className="neu-button px-6 py-3 hover:scale-105 transition-transform">
                  <span className="text-neu-700 font-medium">Learn More</span>
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