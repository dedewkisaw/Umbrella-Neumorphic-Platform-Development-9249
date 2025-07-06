import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../common/SafeIcon';

const { FiX, FiMail, FiLock, FiUser, FiEye, FiEyeOff, FiCheck, FiShield, FiZap } = FiIcons;

const AuthModal = ({ isOpen, onClose, mode = 'login', onSuccess, triggerAction = null }) => {
  const [authMode, setAuthMode] = useState(mode); // 'login' or 'signup'
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    name: '',
    acceptTerms: false
  });
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setErrors({});

    // Basic validation
    const newErrors = {};
    if (!formData.email) newErrors.email = 'Email is required';
    if (!formData.password) newErrors.password = 'Password is required';
    if (authMode === 'signup') {
      if (!formData.name) newErrors.name = 'Name is required';
      if (formData.password !== formData.confirmPassword) {
        newErrors.confirmPassword = 'Passwords do not match';
      }
      if (!formData.acceptTerms) newErrors.acceptTerms = 'You must accept the terms';
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      setIsLoading(false);
      return;
    }

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Mock successful login/signup
      const userData = {
        id: Date.now(),
        name: formData.name || formData.email.split('@')[0],
        email: formData.email,
        avatar: `https://ui-avatars.com/api/?name=${encodeURIComponent(formData.name || formData.email)}&background=3b82f6&color=fff`
      };

      // Store user session
      localStorage.setItem('user_session', JSON.stringify(userData));
      
      // Call success callback
      if (onSuccess) onSuccess(userData);
      
      onClose();
    } catch (error) {
      setErrors({ general: 'Authentication failed. Please try again.' });
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: null }));
    }
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          className="neu-card p-8 max-w-md w-full bg-white"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-2xl font-bold text-neu-900">
                {authMode === 'login' ? 'Welcome Back' : 'Create Account'}
              </h2>
              <p className="text-neu-600 mt-1">
                {triggerAction ? `Please ${authMode} to ${triggerAction}` : 
                 authMode === 'login' ? 'Sign in to your account' : 'Join thousands of users'}
              </p>
            </div>
            <button
              onClick={onClose}
              className="neu-button p-2 hover:scale-105 transition-transform"
            >
              <SafeIcon icon={FiX} className="w-5 h-5 text-neu-600" />
            </button>
          </div>

          {/* Trigger Action Banner */}
          {triggerAction && (
            <div className="neu-card-inset p-4 mb-6 bg-gradient-to-r from-blue-50 to-purple-50">
              <div className="flex items-center gap-3">
                <SafeIcon icon={FiZap} className="w-5 h-5 text-blue-600" />
                <div>
                  <div className="font-medium text-neu-900">Ready to {triggerAction}?</div>
                  <div className="text-sm text-neu-600">Create an account or sign in to continue</div>
                </div>
              </div>
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Name Field (Signup Only) */}
            {authMode === 'signup' && (
              <div>
                <label className="block text-sm font-medium text-neu-700 mb-2">
                  Full Name
                </label>
                <div className="relative">
                  <SafeIcon icon={FiUser} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-neu-400 w-5 h-5" />
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => handleChange('name', e.target.value)}
                    className={`w-full neu-input pl-10 pr-4 py-3 text-neu-700 ${errors.name ? 'border-red-300' : ''}`}
                    placeholder="Your full name"
                  />
                </div>
                {errors.name && <p className="text-red-600 text-sm mt-1">{errors.name}</p>}
              </div>
            )}

            {/* Email Field */}
            <div>
              <label className="block text-sm font-medium text-neu-700 mb-2">
                Email Address
              </label>
              <div className="relative">
                <SafeIcon icon={FiMail} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-neu-400 w-5 h-5" />
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => handleChange('email', e.target.value)}
                  className={`w-full neu-input pl-10 pr-4 py-3 text-neu-700 ${errors.email ? 'border-red-300' : ''}`}
                  placeholder="your@email.com"
                />
              </div>
              {errors.email && <p className="text-red-600 text-sm mt-1">{errors.email}</p>}
            </div>

            {/* Password Field */}
            <div>
              <label className="block text-sm font-medium text-neu-700 mb-2">
                Password
              </label>
              <div className="relative">
                <SafeIcon icon={FiLock} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-neu-400 w-5 h-5" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={formData.password}
                  onChange={(e) => handleChange('password', e.target.value)}
                  className={`w-full neu-input pl-10 pr-12 py-3 text-neu-700 ${errors.password ? 'border-red-300' : ''}`}
                  placeholder="Enter your password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-neu-400"
                >
                  <SafeIcon icon={showPassword ? FiEyeOff : FiEye} className="w-5 h-5" />
                </button>
              </div>
              {errors.password && <p className="text-red-600 text-sm mt-1">{errors.password}</p>}
            </div>

            {/* Confirm Password (Signup Only) */}
            {authMode === 'signup' && (
              <div>
                <label className="block text-sm font-medium text-neu-700 mb-2">
                  Confirm Password
                </label>
                <div className="relative">
                  <SafeIcon icon={FiLock} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-neu-400 w-5 h-5" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={formData.confirmPassword}
                    onChange={(e) => handleChange('confirmPassword', e.target.value)}
                    className={`w-full neu-input pl-10 pr-4 py-3 text-neu-700 ${errors.confirmPassword ? 'border-red-300' : ''}`}
                    placeholder="Confirm your password"
                  />
                </div>
                {errors.confirmPassword && <p className="text-red-600 text-sm mt-1">{errors.confirmPassword}</p>}
              </div>
            )}

            {/* Terms Acceptance (Signup Only) */}
            {authMode === 'signup' && (
              <div className="flex items-start gap-3">
                <input
                  type="checkbox"
                  id="acceptTerms"
                  checked={formData.acceptTerms}
                  onChange={(e) => handleChange('acceptTerms', e.target.checked)}
                  className="w-4 h-4 text-blue-600 bg-neu-100 border-neu-300 rounded focus:ring-blue-500"
                />
                <label htmlFor="acceptTerms" className="text-sm text-neu-600">
                  I agree to the{' '}
                  <a href="/terms" target="_blank" className="text-blue-600 hover:text-blue-800">
                    Terms of Service
                  </a>{' '}
                  and{' '}
                  <a href="/privacy" target="_blank" className="text-blue-600 hover:text-blue-800">
                    Privacy Policy
                  </a>
                </label>
                {errors.acceptTerms && <p className="text-red-600 text-sm mt-1">{errors.acceptTerms}</p>}
              </div>
            )}

            {/* General Error */}
            {errors.general && (
              <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-lg">
                {errors.general}
              </div>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full neu-button py-4 bg-gradient-to-r from-blue-500 to-purple-500 text-white hover:scale-105 transition-transform disabled:opacity-50"
            >
              {isLoading ? (
                <div className="flex items-center justify-center gap-2">
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  {authMode === 'login' ? 'Signing In...' : 'Creating Account...'}
                </div>
              ) : (
                <div className="flex items-center justify-center gap-2">
                  <SafeIcon icon={authMode === 'login' ? FiShield : FiCheck} className="w-5 h-5" />
                  <span className="font-semibold">
                    {authMode === 'login' ? 'Sign In' : 'Create Account'}
                  </span>
                </div>
              )}
            </button>
          </form>

          {/* Mode Switch */}
          <div className="mt-6 text-center">
            <p className="text-neu-600">
              {authMode === 'login' ? "Don't have an account?" : 'Already have an account?'}{' '}
              <button
                onClick={() => setAuthMode(authMode === 'login' ? 'signup' : 'login')}
                className="text-blue-600 hover:text-blue-800 font-medium"
              >
                {authMode === 'login' ? 'Sign up' : 'Sign in'}
              </button>
            </p>
          </div>

          {/* Benefits (Signup Mode) */}
          {authMode === 'signup' && (
            <div className="mt-6 neu-card-inset p-4 bg-gradient-to-r from-green-50 to-blue-50">
              <h4 className="font-medium text-neu-900 mb-3">Join thousands of users who enjoy:</h4>
              <div className="space-y-2">
                {[
                  'Access to premium applications',
                  'Lifetime updates included',
                  'Priority customer support',
                  'Exclusive deals and discounts'
                ].map((benefit, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <SafeIcon icon={FiCheck} className="w-4 h-4 text-green-600" />
                    <span className="text-neu-700 text-sm">{benefit}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default AuthModal;