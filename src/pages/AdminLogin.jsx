import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../common/SafeIcon';

const { FiShield, FiLock, FiEye, FiEyeOff, FiAlertTriangle } = FiIcons;

const AdminLogin = () => {
  const navigate = useNavigate();
  const [credentials, setCredentials] = useState({ username: '', password: '', token: '' });
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [attempts, setAttempts] = useState(0);
  const [isLocked, setIsLocked] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    if (isLocked) return;

    setIsLoading(true);
    setError('');

    // Simulate secure authentication
    await new Promise(resolve => setTimeout(resolve, 1500));

    const isValidUsername = credentials.username === 'admin_umbrella_2024';
    const isValidPassword = credentials.password === 'UmBr3ll@_S3cur3_2024!';
    const isValidToken = credentials.token === '847392';

    if (isValidUsername && isValidPassword && isValidToken) {
      const sessionToken = btoa(JSON.stringify({
        user: 'admin',
        timestamp: Date.now(),
        sessionId: Math.random().toString(36).substr(2, 9)
      }));
      
      localStorage.setItem('admin_session', sessionToken);
      localStorage.setItem('admin_login_time', Date.now().toString());
      
      navigate('/admin/dashboard');
    } else {
      setAttempts(prev => prev + 1);
      setError('Invalid credentials or 2FA token');
      
      if (attempts >= 2) {
        setIsLocked(true);
        setTimeout(() => {
          setIsLocked(false);
          setAttempts(0);
        }, 300000); // 5 minute lockout
      }
    }
    
    setIsLoading(false);
  };

  if (isLocked) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-red-50 to-red-100 flex items-center justify-center p-6">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="neu-card p-8 max-w-md w-full bg-red-50"
        >
          <div className="text-center">
            <SafeIcon icon={FiShield} className="w-16 h-16 text-red-600 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-red-800 mb-4">Account Locked</h2>
            <p className="text-red-600">Too many failed attempts. Please wait 5 minutes.</p>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-blue-900 flex items-center justify-center p-6">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="neu-card p-8 max-w-md w-full bg-gray-800 border border-blue-500/30"
      >
        <div className="text-center mb-8">
          <SafeIcon icon={FiShield} className="w-16 h-16 text-blue-400 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-white mb-2">Secure Admin Access</h2>
          <p className="text-gray-300">Umbrella Analytics Dashboard</p>
          <div className="text-xs text-gray-400 mt-2">Attempts: {attempts}/3</div>
        </div>

        <form onSubmit={handleLogin} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-200 mb-2">
              Admin Username
            </label>
            <input
              type="text"
              value={credentials.username}
              onChange={(e) => setCredentials({ ...credentials, username: e.target.value })}
              className="w-full neu-input p-3 bg-gray-700 text-white border-gray-600"
              placeholder="Enter admin username"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-200 mb-2">
              Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                value={credentials.password}
                onChange={(e) => setCredentials({ ...credentials, password: e.target.value })}
                className="w-full neu-input p-3 bg-gray-700 text-white border-gray-600 pr-10"
                placeholder="Enter secure password"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400"
              >
                <SafeIcon icon={showPassword ? FiEyeOff : FiEye} className="w-5 h-5" />
              </button>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-200 mb-2">
              2FA Token
            </label>
            <input
              type="text"
              value={credentials.token}
              onChange={(e) => setCredentials({ ...credentials, token: e.target.value })}
              className="w-full neu-input p-3 bg-gray-700 text-white border-gray-600"
              placeholder="6-digit code"
              maxLength="6"
              required
            />
          </div>

          {error && (
            <div className="bg-red-900/50 border border-red-500 text-red-200 px-4 py-3 rounded">
              <div className="flex items-center gap-2">
                <SafeIcon icon={FiAlertTriangle} className="w-4 h-4" />
                {error}
              </div>
            </div>
          )}

          <button
            type="submit"
            disabled={isLoading || isLocked}
            className="w-full neu-button py-3 bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-50"
          >
            {isLoading ? (
              <div className="flex items-center justify-center gap-2">
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                Authenticating...
              </div>
            ) : (
              <div className="flex items-center justify-center gap-2">
                <SafeIcon icon={FiLock} className="w-5 h-5" />
                Secure Login
              </div>
            )}
          </button>
        </form>

        <div className="mt-6 p-4 bg-blue-900/30 rounded-lg">
          <p className="text-blue-200 text-xs text-center mb-2">
            <SafeIcon icon={FiShield} className="w-4 h-4 inline mr-1" />
            Demo Credentials
          </p>
          <div className="text-gray-300 text-xs space-y-1">
            <div><strong>Username:</strong> admin_umbrella_2024</div>
            <div><strong>Password:</strong> UmBr3ll@_S3cur3_2024!</div>
            <div><strong>2FA Token:</strong> 847392</div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default AdminLogin;