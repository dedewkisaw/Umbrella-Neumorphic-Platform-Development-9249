import React from 'react';
import { motion } from 'framer-motion';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../common/SafeIcon';

const { FiCode, FiGlobe, FiShield, FiZap, FiBarChart, FiUsers, FiCloud, FiSmartphone } = FiIcons;

const Features = () => {
  const features = [
    {
      icon: FiCode,
      title: "One-Click Deployment",
      description: "Connect your GitHub repo and deploy instantly. No complex CI/CD pipelines needed.",
      demo: "GitHub → Umbrella → Live App"
    },
    {
      icon: FiGlobe,
      title: "Global CDN",
      description: "200+ edge locations worldwide ensure your app loads instantly everywhere.",
      demo: "< 100ms worldwide"
    },
    {
      icon: FiShield,
      title: "Enterprise Security",
      description: "SSL certificates, DDoS protection, and security monitoring included by default.",
      demo: "99.9% uptime SLA"
    },
    {
      icon: FiZap,
      title: "Auto-Scaling",
      description: "Handle traffic spikes seamlessly. From 10 to 10 million users automatically.",
      demo: "Infinite scalability"
    },
    {
      icon: FiBarChart,
      title: "Real-Time Analytics",
      description: "Beautiful dashboards showing visitor stats, performance metrics, and more.",
      demo: "Live insights"
    },
    {
      icon: FiUsers,
      title: "Team Collaboration",
      description: "Invite team members, manage permissions, and collaborate on projects effortlessly.",
      demo: "Unlimited teammates"
    },
    {
      icon: FiCloud,
      title: "Automatic Backups",
      description: "Your data is safe with automated backups and version control integration.",
      demo: "24/7 protection"
    },
    {
      icon: FiSmartphone,
      title: "Mobile Optimized",
      description: "Every app looks perfect on mobile with our responsive design system.",
      demo: "Perfect on all devices"
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
            <span className="gradient-text block">Built Right In</span>
          </h2>
          <p className="text-xl text-neu-600 max-w-3xl mx-auto">
            No more juggling multiple services. Umbrella provides everything you need 
            to build, deploy, and scale beautiful web applications.
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
                  See It in Action
                </h3>
                <p className="text-neu-600 text-lg">
                  Watch how easy it is to deploy your first app on Umbrella. 
                  From zero to production in under a minute.
                </p>
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                      <span className="text-blue-600 font-bold text-sm">1</span>
                    </div>
                    <span className="text-neu-700">Connect your GitHub repository</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                      <span className="text-blue-600 font-bold text-sm">2</span>
                    </div>
                    <span className="text-neu-700">Choose your domain name</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                      <span className="text-blue-600 font-bold text-sm">3</span>
                    </div>
                    <span className="text-neu-700">Click deploy and you're live!</span>
                  </div>
                </div>
              </div>
              <div className="neu-card-inset p-8">
                <div className="space-y-4">
                  <div className="flex items-center gap-2 text-xs text-neu-500">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span>Live deployment in progress...</span>
                  </div>
                  <div className="space-y-2">
                    <div className="w-full bg-neu-200 rounded-full h-2">
                      <div className="bg-green-500 h-2 rounded-full w-3/4"></div>
                    </div>
                    <div className="text-xs text-neu-600">Deploying to global CDN...</div>
                  </div>
                  <div className="text-green-700 font-semibold">
                    🎉 Deployed successfully!
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