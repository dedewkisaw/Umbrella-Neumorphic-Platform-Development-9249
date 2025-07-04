import React from 'react';
import { motion } from 'framer-motion';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../common/SafeIcon';

const { FiUmbrella, FiMail, FiPhone, FiMapPin, FiTwitter, FiGithub, FiLinkedin } = FiIcons;

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const footerLinks = {
    Product: [
      { name: 'Features', href: '#features' },
      { name: 'Pricing', href: '#pricing' },
      { name: 'Documentation', href: '#' },
      { name: 'API Reference', href: '#' },
    ],
    Company: [
      { name: 'About Us', href: '#' },
      { name: 'Careers', href: '#' },
      { name: 'Press', href: '#' },
      { name: 'Contact', href: '#' },
    ],
    Support: [
      { name: 'Help Center', href: '#' },
      { name: 'Community', href: '#' },
      { name: 'Status Page', href: '#' },
      { name: 'Bug Reports', href: '#' },
    ],
    Legal: [
      { name: 'Privacy Policy', href: '#' },
      { name: 'Terms of Service', href: '#' },
      { name: 'Cookie Policy', href: '#' },
      { name: 'GDPR', href: '#' },
    ],
  };

  return (
    <footer className="bg-neu-200 py-16">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-4 gap-12">
          {/* Brand Section */}
          <div className="lg:col-span-1">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="space-y-6"
            >
              <div className="flex items-center gap-3">
                <div className="neu-button p-3">
                  <SafeIcon icon={FiUmbrella} className="w-6 h-6 text-blue-600" />
                </div>
                <span className="text-2xl font-bold gradient-text">Umbrella</span>
              </div>
              <p className="text-neu-600 max-w-sm">
                The premium platform for hosting beautiful web applications. 
                Deploy with confidence, scale with ease.
              </p>
              <div className="flex gap-4">
                <button className="neu-button p-3 hover:scale-110 transition-transform">
                  <SafeIcon icon={FiTwitter} className="w-5 h-5 text-neu-600" />
                </button>
                <button className="neu-button p-3 hover:scale-110 transition-transform">
                  <SafeIcon icon={FiGithub} className="w-5 h-5 text-neu-600" />
                </button>
                <button className="neu-button p-3 hover:scale-110 transition-transform">
                  <SafeIcon icon={FiLinkedin} className="w-5 h-5 text-neu-600" />
                </button>
              </div>
            </motion.div>
          </div>

          {/* Links Sections */}
          <div className="lg:col-span-3">
            <div className="grid md:grid-cols-4 gap-8">
              {Object.entries(footerLinks).map(([category, links], index) => (
                <motion.div
                  key={category}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="space-y-4"
                >
                  <h3 className="font-semibold text-neu-900">{category}</h3>
                  <ul className="space-y-2">
                    {links.map((link) => (
                      <li key={link.name}>
                        <a
                          href={link.href}
                          className="text-neu-600 hover:text-neu-800 transition-colors"
                        >
                          {link.name}
                        </a>
                      </li>
                    ))}
                  </ul>
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        {/* Contact Info */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-16 pt-8 border-t border-neu-300"
        >
          <div className="grid md:grid-cols-3 gap-8">
            <div className="flex items-center gap-3">
              <SafeIcon icon={FiMail} className="w-5 h-5 text-neu-600" />
              <span className="text-neu-700">hello@umbrella.app</span>
            </div>
            <div className="flex items-center gap-3">
              <SafeIcon icon={FiPhone} className="w-5 h-5 text-neu-600" />
              <span className="text-neu-700">+1 (555) 123-4567</span>
            </div>
            <div className="flex items-center gap-3">
              <SafeIcon icon={FiMapPin} className="w-5 h-5 text-neu-600" />
              <span className="text-neu-700">San Francisco, CA</span>
            </div>
          </div>
        </motion.div>

        {/* Bottom Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-12 pt-8 border-t border-neu-300 flex flex-col md:flex-row justify-between items-center gap-4"
        >
          <p className="text-neu-600">
            © {currentYear} Umbrella. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            <span className="text-neu-600 text-sm">Made with ❤️ for developers</span>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              <span className="text-neu-600 text-sm">All systems operational</span>
            </div>
          </div>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer;