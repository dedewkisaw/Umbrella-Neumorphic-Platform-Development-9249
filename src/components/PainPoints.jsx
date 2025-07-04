import React from 'react';
import { motion } from 'framer-motion';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../common/SafeIcon';

const { FiAlertTriangle, FiClock, FiDollarSign, FiSettings, FiTrendingDown, FiX } = FiIcons;

const PainPoints = () => {
  const painPoints = [
    {
      icon: FiClock,
      title: "Endless Setup Time",
      description: "Hours wasted configuring servers, domains, and deployment pipelines instead of building your app.",
      impact: "40+ hours per project"
    },
    {
      icon: FiDollarSign,
      title: "Hidden Costs Everywhere",
      description: "Server costs, domain fees, SSL certificates, monitoring tools - expenses add up quickly.",
      impact: "$200+ monthly"
    },
    {
      icon: FiSettings,
      title: "Complex Maintenance",
      description: "Constant updates, security patches, and server monitoring eating into your productive time.",
      impact: "60% of dev time"
    },
    {
      icon: FiTrendingDown,
      title: "Poor Performance",
      description: "Slow loading times and downtime hurt your users and damage your reputation.",
      impact: "30% user drop-off"
    },
    {
      icon: FiAlertTriangle,
      title: "Security Nightmares",
      description: "Vulnerabilities, breaches, and compliance issues keep you awake at night.",
      impact: "High risk exposure"
    },
    {
      icon: FiX,
      title: "Scaling Headaches",
      description: "Traffic spikes crash your site, and scaling solutions are complex and expensive.",
      impact: "Lost opportunities"
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
            Stop Fighting with
            <span className="gradient-text block">Hosting Nightmares</span>
          </h2>
          <p className="text-xl text-neu-600 max-w-3xl mx-auto">
            Traditional hosting is broken. Developers waste countless hours on setup, maintenance, 
            and troubleshooting instead of building amazing applications.
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
              Sound Familiar?
            </h3>
            <p className="text-neu-600 text-lg">
              You're not alone. 89% of developers report spending more time on infrastructure 
              than actual development. It's time for a better way.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default PainPoints;