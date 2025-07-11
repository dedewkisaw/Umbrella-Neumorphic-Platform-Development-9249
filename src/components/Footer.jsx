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
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  // Navigation handlers with proper routing and scroll to top
  const handleNavigation = (type, target) => {
    switch (type) {
      case 'scroll':
        // If we're not on the home page, navigate to home first then scroll
        if (window.location.pathname !== '/' && window.location.hash !== '#/') {
          navigate('/');
          setTimeout(() => {
            scrollToSection(target);
          }, 100);
        } else {
          scrollToSection(target);
        }
        break;
      case 'navigate':
        navigate(target);
        // Scroll to top when navigating
        setTimeout(() => {
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }, 100);
        break;
      case 'external':
        window.open(target, '_blank', 'noopener,noreferrer');
        break;
      case 'email':
        window.location.href = `mailto:${target}`;
        break;
      case 'phone':
        window.location.href = `tel:${target.replace(/[^\d+]/g, '')}`;
        break;
      default:
        console.log('Navigation action:', type, target);
    }
  };

  const footerLinks = {
    Product: [
      { name: 'Features', type: 'scroll', target: 'features' },
      { name: 'Pricing', type: 'scroll', target: 'pricing' },
      { name: 'Browse Apps', type: 'navigate', target: '/marketplace' },
      { name: 'My Library', type: 'navigate', target: '/dashboard' },
    ],
    Company: [
      { name: 'About Us', type: 'navigate', target: '/about' },
      { name: 'Careers', type: 'navigate', target: '/careers' },
      { name: 'Press', type: 'navigate', target: '/press' },
      { name: 'Contact', type: 'navigate', target: '/contact' },
    ],
    Support: [
      { name: 'Help Center', type: 'navigate', target: '/help' },
      { name: 'Community', type: 'navigate', target: '/community' },
      { name: 'Status Page', type: 'navigate', target: '/status' },
      { name: 'Bug Reports', type: 'navigate', target: '/bugs' },
    ],
    Legal: [
      { name: 'Privacy Policy', type: 'navigate', target: '/privacy' },
      { name: 'Terms of Service', type: 'navigate', target: '/terms' },
      { name: 'Cookie Policy', type: 'navigate', target: '/cookies' },
      { name: 'GDPR', type: 'navigate', target: '/gdpr' },
    ],
  };

  return (
    <footer className="bg-gradient-to-br from-neu-200 to-neu-300 py-12 lg:py-20">
      <div className="max-w-7xl mx-auto px-4 lg:px-6">
        <div className="grid lg:grid-cols-4 gap-8 lg:gap-12">
          {/* Enhanced Brand Section */}
          <div className="lg:col-span-1">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="space-y-6 lg:space-y-8"
            >
              <div className="flex items-center gap-3 lg:gap-4">
                <div className="neu-button p-3 lg:p-4 bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-xl">
                  <SafeIcon icon={FiUmbrella} className="w-6 h-6 lg:w-8 lg:h-8" />
                </div>
                <div className="space-y-1">
                  <span className="text-2xl lg:text-3xl font-bold gradient-text">Umbrella</span>
                  <div className="text-xs lg:text-sm text-neu-600 font-medium">Premium Platform</div>
                </div>
              </div>
              <p className="text-neu-600 max-w-sm leading-relaxed text-sm lg:text-base">
                The premium platform for hosting beautiful web applications. Deploy with confidence, scale with ease, and focus on what matters most.
              </p>
              <div className="space-y-3 lg:space-y-4">
                <div className="flex items-center gap-2 lg:gap-3">
                  <SafeIcon icon={FiShield} className="w-4 h-4 lg:w-5 lg:h-5 text-green-600" />
                  <span className="text-neu-600 font-medium text-sm lg:text-base">Enterprise Security</span>
                </div>
                <div className="flex items-center gap-2 lg:gap-3">
                  <SafeIcon icon={FiStar} className="w-4 h-4 lg:w-5 lg:h-5 text-yellow-600" />
                  <span className="text-neu-600 font-medium text-sm lg:text-base">4.9/5 Rating</span>
                </div>
                <div className="flex items-center gap-2 lg:gap-3">
                  <SafeIcon icon={FiZap} className="w-4 h-4 lg:w-5 lg:h-5 text-blue-600" />
                  <span className="text-neu-600 font-medium text-sm lg:text-base">Lightning Fast</span>
                </div>
              </div>
              <div className="flex gap-3 lg:gap-4">
                <button
                  onClick={() => handleNavigation('external', 'https://twitter.com/umbrella')}
                  className="neu-button p-3 lg:p-4 hover:scale-110 transition-transform bg-gradient-to-r from-blue-500 to-purple-500 text-white"
                  aria-label="Follow us on Twitter"
                >
                  <SafeIcon icon={FiTwitter} className="w-4 h-4 lg:w-5 lg:h-5" />
                </button>
                <button
                  onClick={() => handleNavigation('external', 'https://github.com/umbrella')}
                  className="neu-button p-3 lg:p-4 hover:scale-110 transition-transform bg-gradient-to-r from-gray-700 to-gray-900 text-white"
                  aria-label="View our GitHub"
                >
                  <SafeIcon icon={FiGithub} className="w-4 h-4 lg:w-5 lg:h-5" />
                </button>
                <button
                  onClick={() => handleNavigation('external', 'https://linkedin.com/company/umbrella')}
                  className="neu-button p-3 lg:p-4 hover:scale-110 transition-transform bg-gradient-to-r from-blue-600 to-blue-800 text-white"
                  aria-label="Connect on LinkedIn"
                >
                  <SafeIcon icon={FiLinkedin} className="w-4 h-4 lg:w-5 lg:h-5" />
                </button>
              </div>
            </motion.div>
          </div>

          {/* Enhanced Links Sections */}
          <div className="lg:col-span-3">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 lg:gap-8">
              {Object.entries(footerLinks).map(([category, links], index) => (
                <motion.div
                  key={category}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="space-y-4 lg:space-y-6"
                >
                  <h3 className="font-bold text-neu-900 text-base lg:text-lg">{category}</h3>
                  <ul className="space-y-2 lg:space-y-3">
                    {links.map((link) => (
                      <li key={link.name}>
                        <button
                          onClick={() => handleNavigation(link.type, link.target)}
                          className="text-neu-600 hover:text-neu-800 transition-colors hover:translate-x-1 transform duration-200 inline-block text-left text-sm lg:text-base w-full text-start"
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
          className="mt-12 lg:mt-20 pt-6 lg:pt-8 border-t border-neu-300"
        >
          <div className="neu-card p-6 lg:p-8 bg-gradient-to-r from-blue-50 to-purple-50">
            <div className="grid md:grid-cols-3 gap-6 lg:gap-8">
              <div className="neu-card-inset p-4 lg:p-6 hover:scale-105 transition-transform">
                <div className="flex items-center gap-3 lg:gap-4">
                  <div className="neu-button p-2 lg:p-3 bg-gradient-to-r from-blue-500 to-purple-500 text-white">
                    <SafeIcon icon={FiMail} className="w-4 h-4 lg:w-5 lg:h-5" />
                  </div>
                  <div>
                    <div className="font-medium text-neu-900 text-sm lg:text-base">Email Us</div>
                    <button
                      onClick={() => handleNavigation('email', 'hello@umbrella.app')}
                      className="text-neu-700 hover:text-blue-600 transition-colors text-sm lg:text-base"
                    >
                      hello@umbrella.app
                    </button>
                  </div>
                </div>
              </div>
              <div className="neu-card-inset p-4 lg:p-6 hover:scale-105 transition-transform">
                <div className="flex items-center gap-3 lg:gap-4">
                  <div className="neu-button p-2 lg:p-3 bg-gradient-to-r from-green-500 to-blue-500 text-white">
                    <SafeIcon icon={FiPhone} className="w-4 h-4 lg:w-5 lg:h-5" />
                  </div>
                  <div>
                    <div className="font-medium text-neu-900 text-sm lg:text-base">Call Us</div>
                    <button
                      onClick={() => handleNavigation('phone', '+1 (555) 123-4567')}
                      className="text-neu-700 hover:text-blue-600 transition-colors text-sm lg:text-base"
                    >
                      +1 (555) 123-4567
                    </button>
                  </div>
                </div>
              </div>
              <div className="neu-card-inset p-4 lg:p-6 hover:scale-105 transition-transform">
                <div className="flex items-center gap-3 lg:gap-4">
                  <div className="neu-button p-2 lg:p-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white">
                    <SafeIcon icon={FiMapPin} className="w-4 h-4 lg:w-5 lg:h-5" />
                  </div>
                  <div>
                    <div className="font-medium text-neu-900 text-sm lg:text-base">Visit Us</div>
                    <button
                      onClick={() => handleNavigation('external', 'https://maps.google.com/?q=San+Francisco,+CA')}
                      className="text-neu-700 hover:text-blue-600 transition-colors text-sm lg:text-base"
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
          className="mt-12 lg:mt-16 pt-6 lg:pt-8 border-t border-neu-300"
        >
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 lg:gap-6">
            <div className="flex flex-col sm:flex-row items-center gap-2 lg:gap-3">
              <p className="text-neu-600 text-sm lg:text-base">
                © {currentYear} Umbrella. All rights reserved.
              </p>
              <div className="neu-button px-3 py-1 lg:px-4 lg:py-2 bg-gradient-to-r from-green-100 to-blue-100">
                <div className="flex items-center gap-2">
                  <SafeIcon icon={FiHeart} className="w-3 h-3 lg:w-4 lg:h-4 text-red-500" />
                  <span className="text-neu-700 font-medium text-xs lg:text-sm">Made with love</span>
                </div>
              </div>
            </div>
            <div className="flex flex-col sm:flex-row items-center gap-4 lg:gap-6">
              <span className="text-neu-600 text-xs lg:text-sm">Made with ❤️ for developers</span>
              <div className="neu-button px-3 py-1 lg:px-4 lg:py-2 bg-gradient-to-r from-green-100 to-blue-100">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                  <span className="text-neu-700 font-medium text-xs lg:text-sm">All systems operational</span>
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