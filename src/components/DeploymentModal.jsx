import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../common/SafeIcon';

const { FiX, FiUpload, FiGithub, FiLink, FiCheck, FiLoader } = FiIcons;

const DeploymentModal = ({ isOpen, onClose, onDeploy }) => {
  const [deploymentMethod, setDeploymentMethod] = useState('github');
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    githubUrl: '',
    customDomain: '',
    category: 'webapp'
  });
  const [isDeploying, setIsDeploying] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsDeploying(true);
    
    // Simulate deployment process
    await new Promise(resolve => setTimeout(resolve, 3000));
    
    const newApp = {
      id: Date.now(),
      name: formData.name,
      type: formData.category,
      status: 'Active',
      views: '0',
      revenue: '0',
      url: `https://${formData.name.toLowerCase().replace(/\s+/g, '-')}.umbrella.app`,
      preview: 'https://via.placeholder.com/300x200/f0f0f3/64748b?text=' + encodeURIComponent(formData.name),
      createdAt: new Date().toISOString()
    };

    onDeploy(newApp);
    setIsDeploying(false);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          className="neu-card p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto"
        >
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-neu-900">Deploy New App</h2>
            <button
              onClick={onClose}
              className="neu-button p-2 hover:scale-105 transition-transform"
            >
              <SafeIcon icon={FiX} className="w-5 h-5 text-neu-600" />
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Deployment Method */}
            <div className="space-y-3">
              <label className="block text-sm font-medium text-neu-700">
                Deployment Method
              </label>
              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => setDeploymentMethod('github')}
                  className={`neu-button p-4 transition-all ${
                    deploymentMethod === 'github' ? 'ring-2 ring-blue-500' : ''
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <SafeIcon icon={FiGithub} className="w-5 h-5 text-neu-600" />
                    <span className="text-neu-700">GitHub</span>
                  </div>
                </button>
                <button
                  type="button"
                  onClick={() => setDeploymentMethod('upload')}
                  className={`neu-button p-4 transition-all ${
                    deploymentMethod === 'upload' ? 'ring-2 ring-blue-500' : ''
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <SafeIcon icon={FiUpload} className="w-5 h-5 text-neu-600" />
                    <span className="text-neu-700">Upload</span>
                  </div>
                </button>
              </div>
            </div>

            {/* App Details */}
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="block text-sm font-medium text-neu-700">
                  App Name
                </label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  className="w-full neu-input p-3 text-neu-700"
                  placeholder="My Awesome App"
                />
              </div>
              <div className="space-y-2">
                <label className="block text-sm font-medium text-neu-700">
                  Category
                </label>
                <select
                  value={formData.category}
                  onChange={(e) => setFormData({...formData, category: e.target.value})}
                  className="w-full neu-input p-3 text-neu-700"
                >
                  <option value="webapp">Web App</option>
                  <option value="portfolio">Portfolio</option>
                  <option value="ecommerce">E-commerce</option>
                  <option value="blog">Blog</option>
                  <option value="landing">Landing Page</option>
                </select>
              </div>
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-medium text-neu-700">
                Description
              </label>
              <textarea
                value={formData.description}
                onChange={(e) => setFormData({...formData, description: e.target.value})}
                className="w-full neu-input p-3 text-neu-700 h-20 resize-none"
                placeholder="Brief description of your app..."
              />
            </div>

            {deploymentMethod === 'github' && (
              <div className="space-y-2">
                <label className="block text-sm font-medium text-neu-700">
                  GitHub Repository URL
                </label>
                <input
                  type="url"
                  required
                  value={formData.githubUrl}
                  onChange={(e) => setFormData({...formData, githubUrl: e.target.value})}
                  className="w-full neu-input p-3 text-neu-700"
                  placeholder="https://github.com/username/repo"
                />
              </div>
            )}

            <div className="space-y-2">
              <label className="block text-sm font-medium text-neu-700">
                Custom Domain (Optional)
              </label>
              <input
                type="text"
                value={formData.customDomain}
                onChange={(e) => setFormData({...formData, customDomain: e.target.value})}
                className="w-full neu-input p-3 text-neu-700"
                placeholder="myapp.com"
              />
            </div>

            {/* Deploy Button */}
            <button
              type="submit"
              disabled={isDeploying}
              className="w-full neu-button py-4 hover:scale-105 transition-transform disabled:opacity-50"
            >
              <div className="flex items-center justify-center gap-3">
                {isDeploying ? (
                  <SafeIcon icon={FiLoader} className="w-5 h-5 text-neu-600 animate-spin" />
                ) : (
                  <SafeIcon icon={FiCheck} className="w-5 h-5 text-neu-600" />
                )}
                <span className="text-neu-700 font-semibold">
                  {isDeploying ? 'Deploying...' : 'Deploy App'}
                </span>
              </div>
            </button>
          </form>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default DeploymentModal;