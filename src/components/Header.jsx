import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../common/SafeIcon';

const { FiUmbrella, FiMenu, FiX, FiShoppingBag, FiUsers, FiStar, FiZap } = FiIcons;

const Header = () => {
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  return (
    <motion.header
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6 }}
      className="relative z-50 bg-neu-100/90 backdrop-blur-xl border-b border-neu-200 shadow-xl"
    >
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Enhanced Neumorphic Logo */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="flex items-center gap-4 cursor-pointer"
            onClick={() => navigate('/')}
          >
            <motion.div 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="neu-button p-3 hover:shadow-lg transition-all duration-300"
            >
              <SafeIcon icon={FiUmbrella} className="w-7 h-7 text-blue-600" />
            </motion.div>
            <div className="space-y-1">
              <span className="text-3xl font-bold gradient-text">Umbrella</span>
              <div className="text-xs text-neu-600 font-medium">Premium App Platform</div>
            </div>
          </motion.div>

          {/* Enhanced Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            <motion.button
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              onClick={() => navigate('/marketplace')}
              className="neu-button px-6 py-3 hover:scale-105 transition-transform group bg-gradient-to-r from-blue-100 to-purple-100"
            >
              <div className="flex items-center gap-2">
                <SafeIcon icon={FiShoppingBag} className="w-5 h-5 text-neu-600 group-hover:scale-110 transition-transform" />
                <span className="text-neu-700 font-medium">Browse Apps</span>
              </div>
            </motion.button>

            <motion.a
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              href="#pricing"
              className="neu-button px-6 py-3 hover:scale-105 transition-transform group"
            >
              <div className="flex items-center gap-2">
                <SafeIcon icon={FiStar} className="w-5 h-5 text-neu-600 group-hover:scale-110 transition-transform" />
                <span className="text-neu-700 font-medium">Pricing</span>
              </div>
            </motion.a>

            <motion.a
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              href="#features"
              className="neu-button px-6 py-3 hover:scale-105 transition-transform group"
            >
              <div className="flex items-center gap-2">
                <SafeIcon icon={FiZap} className="w-5 h-5 text-neu-600 group-hover:scale-110 transition-transform" />
                <span className="text-neu-700 font-medium">Features</span>
              </div>
            </motion.a>

            <motion.button
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              onClick={() => navigate('/dashboard')}
              className="neu-button px-8 py-4 hover:scale-105 transition-transform bg-gradient-to-r from-green-500 to-blue-500 text-white shadow-xl"
            >
              <div className="flex items-center gap-3">
                <SafeIcon icon={FiUsers} className="w-5 h-5" />
                <span className="font-bold">My Library</span>
              </div>
            </motion.button>
          </nav>

          {/* Enhanced Mobile Menu Button */}
          <motion.button
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3 }}
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden neu-button p-4 hover:scale-105 transition-transform"
          >
            <SafeIcon icon={isMenuOpen ? FiX : FiMenu} className="w-6 h-6 text-neu-600" />
          </motion.button>
        </div>

        {/* Enhanced Mobile Navigation */}
        {isMenuOpen && (
          <motion.nav
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden mt-8 pb-8 border-t border-neu-200 pt-8"
          >
            <div className="flex flex-col gap-6">
              <motion.button
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 }}
                onClick={() => navigate('/marketplace')}
                className="neu-button p-4 text-left hover:scale-105 transition-transform group"
              >
                <div className="flex items-center gap-3">
                  <SafeIcon icon={FiShoppingBag} className="w-5 h-5 text-neu-600 group-hover:scale-110 transition-transform" />
                  <span className="text-neu-700 font-medium">Browse Apps</span>
                </div>
              </motion.button>

              <motion.a
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
                href="#pricing"
                className="neu-button p-4 text-left hover:scale-105 transition-transform group"
              >
                <div className="flex items-center gap-3">
                  <SafeIcon icon={FiStar} className="w-5 h-5 text-neu-600 group-hover:scale-110 transition-transform" />
                  <span className="text-neu-700 font-medium">Pricing</span>
                </div>
              </motion.a>

              <motion.a
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 }}
                href="#features"
                className="neu-button p-4 text-left hover:scale-105 transition-transform group"
              >
                <div className="flex items-center gap-3">
                  <SafeIcon icon={FiZap} className="w-5 h-5 text-neu-600 group-hover:scale-110 transition-transform" />
                  <span className="text-neu-700 font-medium">Features</span>
                </div>
              </motion.a>

              <motion.button
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4 }}
                onClick={() => navigate('/dashboard')}
                className="neu-button p-4 text-left bg-gradient-to-r from-green-500 to-blue-500 text-white hover:scale-105 transition-transform"
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