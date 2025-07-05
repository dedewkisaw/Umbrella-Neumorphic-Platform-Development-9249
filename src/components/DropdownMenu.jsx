import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../common/SafeIcon';

const { FiChevronDown, FiCheck } = FiIcons;

const DropdownMenu = ({ 
  options = [], 
  value, 
  onChange, 
  placeholder = "Select option",
  className = "",
  size = "medium",
  variant = "default"
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedValue, setSelectedValue] = useState(value);
  const dropdownRef = useRef(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Update selected value when prop changes
  useEffect(() => {
    setSelectedValue(value);
  }, [value]);

  const handleSelect = (option) => {
    setSelectedValue(option.value);
    setIsOpen(false);
    if (onChange) {
      onChange(option.value);
    }
  };

  const selectedOption = options.find(opt => opt.value === selectedValue);

  // Size variants
  const sizeClasses = {
    small: "px-3 py-2 text-sm",
    medium: "px-4 py-3 text-base",
    large: "px-6 py-4 text-lg"
  };

  // Variant styles
  const variantClasses = {
    default: "bg-gradient-to-r from-blue-50 to-purple-50",
    success: "bg-gradient-to-r from-green-50 to-blue-50",
    warning: "bg-gradient-to-r from-yellow-50 to-orange-50",
    primary: "bg-gradient-to-r from-blue-100 to-purple-100"
  };

  return (
    <div ref={dropdownRef} className={`relative ${className}`}>
      {/* Dropdown Trigger */}
      <motion.button
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        onClick={() => setIsOpen(!isOpen)}
        className={`
          w-full neu-button ${sizeClasses[size]} ${variantClasses[variant]}
          flex items-center justify-between gap-3
          text-neu-700 font-medium
          hover:shadow-lg transition-all duration-300
          focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-50
          ${isOpen ? 'shadow-neu-inset' : ''}
        `}
      >
        <span className="truncate">
          {selectedOption ? selectedOption.label : placeholder}
        </span>
        
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.2 }}
          className="flex-shrink-0"
        >
          <SafeIcon icon={FiChevronDown} className="w-4 h-4 text-neu-500" />
        </motion.div>
      </motion.button>

      {/* Dropdown Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.95 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="absolute top-full left-0 right-0 z-50 mt-2"
          >
            <div className="neu-card p-2 bg-gradient-to-br from-white to-blue-50 shadow-2xl border border-white/50 backdrop-blur-sm">
              <div className="space-y-1">
                {options.map((option, index) => (
                  <motion.button
                    key={option.value}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.05 }}
                    onClick={() => handleSelect(option)}
                    className={`
                      w-full neu-button-flat px-4 py-3 
                      flex items-center justify-between gap-3
                      text-left text-neu-700 font-medium
                      hover:scale-102 hover:bg-gradient-to-r hover:from-blue-100 hover:to-purple-100
                      transition-all duration-200
                      ${selectedValue === option.value ? 'bg-gradient-to-r from-blue-100 to-purple-100 text-blue-700' : ''}
                    `}
                  >
                    <span className="truncate">{option.label}</span>
                    {selectedValue === option.value && (
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ type: "spring", duration: 0.3 }}
                        className="flex-shrink-0"
                      >
                        <SafeIcon icon={FiCheck} className="w-4 h-4 text-blue-600" />
                      </motion.div>
                    )}
                  </motion.button>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default DropdownMenu;