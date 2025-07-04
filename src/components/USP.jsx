import React from 'react';
import { motion } from 'framer-motion';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../common/SafeIcon';

const { FiZap, FiShield, FiTrendingUp, FiHeart, FiGlobe, FiCpu, FiX } = FiIcons;

const USP = () => {
  const benefits = [
    {
      icon: FiZap,
      title: "Deploy in Seconds",
      description: "One-click deployment with zero configuration. From code to live app in under 30 seconds.",
      stat: "30s deployment"
    },
    {
      icon: FiShield,
      title: "Enterprise Security",
      description: "Built-in SSL, DDoS protection, and automated security updates. Sleep peacefully.",
      stat: "99.9% secure"
    },
    {
      icon: FiTrendingUp,
      title: "Auto-Scaling",
      description: "Handle traffic spikes effortlessly. From 10 to 10 million users without breaking a sweat.",
      stat: "Infinite scale"
    },
    {
      icon: FiHeart,
      title: "Beautiful by Default",
      description: "Neumorphic design system ensures your apps look stunning on every device.",
      stat: "Premium UI"
    },
    {
      icon: FiGlobe,
      title: "Global Performance",
      description: "Lightning-fast CDN with 200+ edge locations worldwide. Your users will love the speed.",
      stat: "< 100ms load"
    },
    {
      icon: FiCpu,
      title: "Smart Optimization",
      description: "AI-powered performance optimization automatically tunes your app for peak performance.",
      stat: "3x faster"
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
            Why Umbrella Changes
            <span className="gradient-text block">Everything</span>
          </h2>
          <p className="text-xl text-neu-600 max-w-3xl mx-auto">
            We've reimagined web app hosting from the ground up. No more complexity, 
            no more headaches, just beautiful apps that work perfectly.
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
            Traditional Hosting vs Umbrella
          </h3>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="space-y-4">
              <h4 className="text-lg font-semibold text-red-700 flex items-center gap-2">
                <SafeIcon icon={FiX} className="w-5 h-5" />
                Traditional Hosting
              </h4>
              <ul className="space-y-2 text-neu-600">
                <li>• Hours of setup and configuration</li>
                <li>• Complex server management</li>
                <li>• Multiple bills and hidden costs</li>
                <li>• Security vulnerabilities</li>
                <li>• Poor performance and downtime</li>
                <li>• Manual scaling and maintenance</li>
              </ul>
            </div>
            <div className="space-y-4">
              <h4 className="text-lg font-semibold text-green-700 flex items-center gap-2">
                <SafeIcon icon={FiZap} className="w-5 h-5" />
                Umbrella Platform
              </h4>
              <ul className="space-y-2 text-neu-600">
                <li>• Deploy in 30 seconds</li>
                <li>• Zero server management</li>
                <li>• Simple, transparent pricing</li>
                <li>• Enterprise-grade security</li>
                <li>• Lightning-fast global CDN</li>
                <li>• Automatic scaling and updates</li>
              </ul>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default USP;