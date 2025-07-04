import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../common/SafeIcon';

const { FiUmbrella, FiMenu, FiX } = FiIcons;

const Header = () => {
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className="relative z-50 bg-neu-100/80 backdrop-blur-md border-b border-neu-200"
    >
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <div className="neu-button p-3">
              <SafeIcon icon={FiUmbrella} className="w-6 h-6 text-blue-600" />
            </div>
            <span className="text-2xl font-bold gradient-text">Umbrella</span>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            <a href="#features" className="text-neu-600 hover:text-neu-800 transition-colors">
              Features
            </a>
            <a href="#pricing" className="text-neu-600 hover:text-neu-800 transition-colors">
              Pricing
            </a>
            <a href="#about" className="text-neu-600 hover:text-neu-800 transition-colors">
              About
            </a>
            <button
              onClick={() => navigate('/dashboard')}
              className="neu-button px-6 py-3 hover:scale-105 transition-transform"
            >
              <span className="text-neu-700 font-medium">Dashboard</span>
            </button>
          </nav>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden neu-button p-3"
          >
            <SafeIcon 
              icon={isMenuOpen ? FiX : FiMenu} 
              className="w-6 h-6 text-neu-600" 
            />
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <motion.nav
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden mt-6 pb-6 border-t border-neu-200 pt-6"
          >
            <div className="flex flex-col gap-4">
              <a href="#features" className="text-neu-600 hover:text-neu-800 transition-colors">
                Features
              </a>
              <a href="#pricing" className="text-neu-600 hover:text-neu-800 transition-colors">
                Pricing
              </a>
              <a href="#about" className="text-neu-600 hover:text-neu-800 transition-colors">
                About
              </a>
              <button
                onClick={() => navigate('/dashboard')}
                className="neu-button px-6 py-3 text-left"
              >
                <span className="text-neu-700 font-medium">Dashboard</span>
              </button>
            </div>
          </motion.nav>
        )}
      </div>
    </motion.header>
  );
};

export default Header;