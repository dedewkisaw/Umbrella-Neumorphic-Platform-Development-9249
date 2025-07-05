import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../common/SafeIcon';

const { FiUmbrella, FiMenu, FiX, FiShoppingBag, FiUsers, FiStar, FiZap } = FiIcons;

const Header = () => {
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      setIsScrolled(scrollPosition > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Smooth scroll to section
  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
    setIsMenuOpen(false);
  };

  // Handle navigation with scroll to top
  const handleNavigation = (path) => {
    navigate(path);
    // Scroll to top when navigating
    setTimeout(() => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }, 100);
    setIsMenuOpen(false);
  };

  return (
    <motion.header
      initial={{ y: -50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled 
          ? 'bg-neu-100/80 backdrop-blur-xl border-b border-neu-200/50 shadow-xl' 
          : 'bg-neu-100/90 backdrop-blur-xl border-b border-neu-200 shadow-lg'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 lg:px-6 py-3 lg:py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
            className="flex items-center gap-2 lg:gap-3 cursor-pointer"
            onClick={() => handleNavigation('/')}
          >
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="neu-button p-2 lg:p-3 hover:shadow-lg transition-all duration-300"
            >
              <SafeIcon icon={FiUmbrella} className="w-5 h-5 lg:w-6 lg:h-6 text-blue-600" />
            </motion.div>
            <div>
              <span className="text-xl lg:text-2xl font-bold gradient-text">Umbrella</span>
              <div className="text-xs text-neu-600 font-medium hidden lg:block">Premium App Platform</div>
            </div>
          </motion.div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-4 lg:gap-6">
            <motion.button
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              onClick={() => handleNavigation('/marketplace')}
              className="neu-button px-4 py-2 lg:px-5 lg:py-3 hover:scale-105 transition-transform group bg-gradient-to-r from-blue-100 to-purple-100"
            >
              <div className="flex items-center gap-2">
                <SafeIcon icon={FiShoppingBag} className="w-4 h-4 lg:w-5 lg:h-5 text-neu-600 group-hover:scale-110 transition-transform" />
                <span className="text-neu-700 font-medium text-sm lg:text-base">Browse Apps</span>
              </div>
            </motion.button>

            <motion.button
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              onClick={() => scrollToSection('pricing')}
              className="neu-button px-4 py-2 lg:px-5 lg:py-3 hover:scale-105 transition-transform group"
            >
              <div className="flex items-center gap-2">
                <SafeIcon icon={FiStar} className="w-4 h-4 lg:w-5 lg:h-5 text-neu-600 group-hover:scale-110 transition-transform" />
                <span className="text-neu-700 font-medium text-sm lg:text-base">Pricing</span>
              </div>
            </motion.button>

            <motion.button
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              onClick={() => scrollToSection('features')}
              className="neu-button px-4 py-2 lg:px-5 lg:py-3 hover:scale-105 transition-transform group"
            >
              <div className="flex items-center gap-2">
                <SafeIcon icon={FiZap} className="w-4 h-4 lg:w-5 lg:h-5 text-neu-600 group-hover:scale-110 transition-transform" />
                <span className="text-neu-700 font-medium text-sm lg:text-base">Features</span>
              </div>
            </motion.button>

            <motion.button
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              onClick={() => handleNavigation('/dashboard')}
              className="neu-button px-4 py-2 lg:px-6 lg:py-3 hover:scale-105 transition-transform bg-gradient-to-r from-green-500 to-blue-500 text-white shadow-lg"
            >
              <div className="flex items-center gap-2">
                <SafeIcon icon={FiUsers} className="w-4 h-4 lg:w-5 lg:h-5" />
                <span className="font-bold text-sm lg:text-base">My Library</span>
              </div>
            </motion.button>
          </nav>

          {/* Mobile Menu Button */}
          <motion.button
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden neu-button p-3 hover:scale-105 transition-transform"
          >
            <SafeIcon icon={isMenuOpen ? FiX : FiMenu} className="w-5 h-5 text-neu-600" />
          </motion.button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <motion.nav
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden mt-6 pb-6 border-t border-neu-200 pt-6"
          >
            <div className="flex flex-col gap-4">
              <motion.button
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 }}
                onClick={() => handleNavigation('/marketplace')}
                className="neu-button p-3 text-left hover:scale-105 transition-transform group"
              >
                <div className="flex items-center gap-3">
                  <SafeIcon icon={FiShoppingBag} className="w-5 h-5 text-neu-600 group-hover:scale-110 transition-transform" />
                  <span className="text-neu-700 font-medium">Browse Apps</span>
                </div>
              </motion.button>

              <motion.button
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
                onClick={() => scrollToSection('pricing')}
                className="neu-button p-3 text-left hover:scale-105 transition-transform group"
              >
                <div className="flex items-center gap-3">
                  <SafeIcon icon={FiStar} className="w-5 h-5 text-neu-600 group-hover:scale-110 transition-transform" />
                  <span className="text-neu-700 font-medium">Pricing</span>
                </div>
              </motion.button>

              <motion.button
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 }}
                onClick={() => scrollToSection('features')}
                className="neu-button p-3 text-left hover:scale-105 transition-transform group"
              >
                <div className="flex items-center gap-3">
                  <SafeIcon icon={FiZap} className="w-5 h-5 text-neu-600 group-hover:scale-110 transition-transform" />
                  <span className="text-neu-700 font-medium">Features</span>
                </div>
              </motion.button>

              <motion.button
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4 }}
                onClick={() => handleNavigation('/dashboard')}
                className="neu-button p-3 text-left bg-gradient-to-r from-green-500 to-blue-500 text-white hover:scale-105 transition-transform"
              >
                <div className="flex items-center gap-3">
                  <SafeIcon icon={FiUsers} className="w-5 h-5" />
                  <span className="font-bold">My Library</span>
                </div>
              </motion.button>
            </div>
          </motion.nav>
        )}
      </div>
    </motion.header>
  );
};

export default Header;