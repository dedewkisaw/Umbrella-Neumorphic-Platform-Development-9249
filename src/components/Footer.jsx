import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../common/SafeIcon';

const { FiUmbrella, FiMail, FiPhone, FiMapPin, FiTwitter, FiGithub, FiLinkedin, FiHeart, FiStar, FiShield, FiZap } = FiIcons;

const Footer = () => {
  const navigate = useNavigate();
  const currentYear = new Date().getFullYear();

  // Smooth scroll to section
  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
      });
    }
  };

  const footerLinks = {
    Product: [
      { name: 'Features', action: () => scrollToSection('features') },
      { name: 'Pricing', action: () => scrollToSection('pricing') },
      { name: 'Browse Apps', action: () => navigate('/marketplace') },
      { name: 'My Library', action: () => navigate('/dashboard') },
    ],
    Company: [
      { name: 'About Us', action: () => navigate('/about') },
      { name: 'Careers', action: () => navigate('/careers') },
      { name: 'Press', action: () => navigate('/press') },
      { name: 'Contact', action: () => navigate('/contact') },
    ],
    Support: [
      { name: 'Help Center', action: () => navigate('/help') },
      { name: 'Community', action: () => navigate('/community') },
      { name: 'Status Page', action: () => navigate('/status') },
      { name: 'Bug Reports', action: () => navigate('/bugs') },
    ],
    Legal: [
      { name: 'Privacy Policy', action: () => navigate('/privacy') },
      { name: 'Terms of Service', action: () => navigate('/terms') },
      { name: 'Cookie Policy', action: () => navigate('/cookies') },
      { name: 'GDPR', action: () => navigate('/gdpr') },
    ],
  };

  return (
    <footer className="bg-gradient-to-br from-neu-200 to-neu-300 py-20">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-4 gap-12">
          {/* Enhanced Brand Section */}
          <div className="lg:col-span-1">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="space-y-8"
            >
              <div className="flex items-center gap-4">
                <div className="neu-button p-4 bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-xl">
                  <SafeIcon icon={FiUmbrella} className="w-8 h-8" />
                </div>
                <div className="space-y-1">
                  <span className="text-3xl font-bold gradient-text">Umbrella</span>
                  <div className="text-sm text-neu-600 font-medium">Premium Platform</div>
                </div>
              </div>

              <p className="text-neu-600 max-w-sm leading-relaxed">
                The premium platform for hosting beautiful web applications. Deploy with confidence, scale with ease, and focus on what matters most.
              </p>

              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <SafeIcon icon={FiShield} className="w-5 h-5 text-green-600" />
                  <span className="text-neu-600 font-medium">Enterprise Security</span>
                </div>
                <div className="flex items-center gap-3">
                  <SafeIcon icon={FiStar} className="w-5 h-5 text-yellow-600" />
                  <span className="text-neu-600 font-medium">4.9/5 Rating</span>
                </div>
                <div className="flex items-center gap-3">
                  <SafeIcon icon={FiZap} className="w-5 h-5 text-blue-600" />
                  <span className="text-neu-600 font-medium">Lightning Fast</span>
                </div>
              </div>

              <div className="flex gap-4">
                <button 
                  onClick={() => window.open('https://twitter.com/umbrella', '_blank')}
                  className="neu-button p-4 hover:scale-110 transition-transform bg-gradient-to-r from-blue-500 to-purple-500 text-white"
                >
                  <SafeIcon icon={FiTwitter} className="w-5 h-5" />
                </button>
                <button 
                  onClick={() => window.open('https://github.com/umbrella', '_blank')}
                  className="neu-button p-4 hover:scale-110 transition-transform bg-gradient-to-r from-gray-700 to-gray-900 text-white"
                >
                  <SafeIcon icon={FiGithub} className="w-5 h-5" />
                </button>
                <button 
                  onClick={() => window.open('https://linkedin.com/company/umbrella', '_blank')}
                  className="neu-button p-4 hover:scale-110 transition-transform bg-gradient-to-r from-blue-600 to-blue-800 text-white"
                >
                  <SafeIcon icon={FiLinkedin} className="w-5 h-5" />
                </button>
              </div>
            </motion.div>
          </div>

          {/* Enhanced Links Sections */}
          <div className="lg:col-span-3">
            <div className="grid md:grid-cols-4 gap-8">
              {Object.entries(footerLinks).map(([category, links], index) => (
                <motion.div
                  key={category}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="space-y-6"
                >
                  <h3 className="font-bold text-neu-900 text-lg">{category}</h3>
                  <ul className="space-y-3">
                    {links.map((link) => (
                      <li key={link.name}>
                        <button
                          onClick={link.action}
                          className="text-neu-600 hover:text-neu-800 transition-colors hover:translate-x-1 transform duration-200 inline-block text-left"
                        >
                          {link.name}
                        </button>
                      </li>
                    ))}
                  </ul>
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        {/* Enhanced Contact Info */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-20 pt-8 border-t border-neu-300"
        >
          <div className="neu-card p-8 bg-gradient-to-r from-blue-50 to-purple-50">
            <div className="grid md:grid-cols-3 gap-8">
              <div className="neu-card-inset p-6 hover:scale-105 transition-transform">
                <div className="flex items-center gap-4">
                  <div className="neu-button p-3 bg-gradient-to-r from-blue-500 to-purple-500 text-white">
                    <SafeIcon icon={FiMail} className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="font-medium text-neu-900">Email Us</div>
                    <button 
                      onClick={() => window.location.href = 'mailto:hello@umbrella.app'}
                      className="text-neu-700 hover:text-blue-600 transition-colors"
                    >
                      hello@umbrella.app
                    </button>
                  </div>
                </div>
              </div>

              <div className="neu-card-inset p-6 hover:scale-105 transition-transform">
                <div className="flex items-center gap-4">
                  <div className="neu-button p-3 bg-gradient-to-r from-green-500 to-blue-500 text-white">
                    <SafeIcon icon={FiPhone} className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="font-medium text-neu-900">Call Us</div>
                    <button 
                      onClick={() => window.location.href = 'tel:+15551234567'}
                      className="text-neu-700 hover:text-blue-600 transition-colors"
                    >
                      +1 (555) 123-4567
                    </button>
                  </div>
                </div>
              </div>

              <div className="neu-card-inset p-6 hover:scale-105 transition-transform">
                <div className="flex items-center gap-4">
                  <div className="neu-button p-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white">
                    <SafeIcon icon={FiMapPin} className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="font-medium text-neu-900">Visit Us</div>
                    <button 
                      onClick={() => window.open('https://maps.google.com/?q=San+Francisco,+CA', '_blank')}
                      className="text-neu-700 hover:text-blue-600 transition-colors"
                    >
                      San Francisco, CA
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Enhanced Bottom Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-16 pt-8 border-t border-neu-300"
        >
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="flex items-center gap-3">
              <p className="text-neu-600">
                © {currentYear} Umbrella. All rights reserved.
              </p>
              <div className="neu-button px-4 py-2 bg-gradient-to-r from-green-100 to-blue-100">
                <div className="flex items-center gap-2">
                  <SafeIcon icon={FiHeart} className="w-4 h-4 text-red-500" />
                  <span className="text-neu-700 font-medium text-sm">Made with love</span>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-6">
              <span className="text-neu-600 text-sm">Made with ❤️ for developers</span>
              <div className="neu-button px-4 py-2 bg-gradient-to-r from-green-100 to-blue-100">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                  <span className="text-neu-700 font-medium text-sm">All systems operational</span>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer;