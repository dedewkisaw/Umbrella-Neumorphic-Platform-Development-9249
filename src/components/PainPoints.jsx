import React from 'react';
import { motion } from 'framer-motion';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../common/SafeIcon';

const { FiAlertTriangle, FiClock, FiDollarSign, FiSettings, FiTrendingDown, FiX } = FiIcons;

const PainPoints = () => {
  const painPoints = [
    {
      icon: FiClock,
      title: "Building from Scratch",
      description: "Months wasted developing common features instead of focusing on core business logic.",
      impact: "6+ months per project"
    },
    {
      icon: FiDollarSign,
      title: "High Development Costs",
      description: "Hiring developers and building custom solutions costs thousands for basic functionality.",
      impact: "$50K+ development costs"
    },
    {
      icon: FiSettings,
      title: "Maintenance Burden",
      description: "Constant updates, bug fixes, and feature additions drain resources and time.",
      impact: "40% of development time"
    },
    {
      icon: FiTrendingDown,
      title: "Poor Quality Results",
      description: "Rushed development leads to buggy, unreliable applications that hurt user experience.",
      impact: "High user churn"
    },
    {
      icon: FiAlertTriangle,
      title: "Security Vulnerabilities",
      description: "Custom-built solutions often lack proper security measures, exposing sensitive data.",
      impact: "Data breach risks"
    },
    {
      icon: FiX,
      title: "Limited Functionality",
      description: "Budget constraints force compromises on features, resulting in incomplete solutions.",
      impact: "Competitive disadvantage"
    }
  ];

  return (
    <section className="py-20 bg-gradient-to-br from-neu-100 to-neu-200">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl lg:text-5xl font-bold text-neu-900 mb-6">
            Stop Wasting Time on
            <span className="gradient-text block" style={{ lineHeight: '1.2', paddingBottom: '0.1em' }}>
              Custom Development
            </span>
          </h2>
          <p className="text-xl text-neu-600 max-w-3xl mx-auto">
            Why reinvent the wheel? Businesses waste months and thousands of dollars building 
            common web applications that already exist as proven, professional solutions.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {painPoints.map((point, index) => (
            <motion.div
              key={point.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="neu-card p-8 hover:scale-105 transition-transform"
            >
              <div className="flex items-start gap-4">
                <div className="neu-button p-3 flex-shrink-0">
                  <SafeIcon icon={point.icon} className="w-6 h-6 text-red-600" />
                </div>
                <div className="space-y-3">
                  <h3 className="text-xl font-semibold text-neu-900">{point.title}</h3>
                  <p className="text-neu-600">{point.description}</p>
                  <div className="neu-card-inset px-3 py-2 inline-block">
                    <span className="text-red-700 font-medium text-sm">{point.impact}</span>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mt-16"
        >
          <div className="neu-card p-8 max-w-2xl mx-auto">
            <h3 className="text-2xl font-bold text-neu-900 mb-4">
              There's a Better Way
            </h3>
            <p className="text-neu-600 text-lg">
              Skip the development headaches. Get professional, ready-to-use web applications 
              that are tested, secure, and feature-complete from day one.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default PainPoints;