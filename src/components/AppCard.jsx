import React from 'react';
import { motion } from 'framer-motion';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../common/SafeIcon';

const { FiGlobe, FiEye, FiSettings, FiTrendingUp, FiExternalLink } = FiIcons;

const AppCard = ({ app, onSettings, onView }) => {
  const getStatusColor = (status) => {
    switch (status) {
      case 'Active': return 'bg-green-100 text-green-800';
      case 'Deploying': return 'bg-blue-100 text-blue-800';
      case 'Maintenance': return 'bg-yellow-100 text-yellow-800';
      case 'Offline': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      whileHover={{ scale: 1.02 }}
      className="neu-card p-6 hover:shadow-lg transition-all duration-300"
    >
      <div className="space-y-4">
        {/* Header */}
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3">
            <div className="neu-button p-2">
              <SafeIcon icon={FiGlobe} className="w-5 h-5 text-blue-600" />
            </div>
            <div>
              <h3 className="font-semibold text-neu-900">{app.name}</h3>
              <p className="text-sm text-neu-600">{app.type}</p>
            </div>
          </div>
          <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(app.status)}`}>
            {app.status}
          </span>
        </div>

        {/* Preview */}
        <div className="neu-card-inset p-4 bg-gradient-to-br from-blue-50 to-purple-50 rounded-lg">
          <div className="aspect-video bg-white rounded-lg flex items-center justify-center">
            <img 
              src={app.preview || 'https://via.placeholder.com/300x200/f0f0f3/64748b?text=App+Preview'} 
              alt={app.name}
              className="w-full h-full object-cover rounded-lg"
            />
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 gap-4">
          <div className="neu-card-inset p-3 text-center">
            <div className="flex items-center justify-center gap-2 mb-1">
              <SafeIcon icon={FiEye} className="w-4 h-4 text-neu-600" />
              <span className="text-xs text-neu-500">Views</span>
            </div>
            <span className="font-semibold text-neu-800">{app.views}</span>
          </div>
          <div className="neu-card-inset p-3 text-center">
            <div className="flex items-center justify-center gap-2 mb-1">
              <SafeIcon icon={FiTrendingUp} className="w-4 h-4 text-neu-600" />
              <span className="text-xs text-neu-500">Revenue</span>
            </div>
            <span className="font-semibold text-neu-800">${app.revenue}</span>
          </div>
        </div>

        {/* URL */}
        <div className="neu-card-inset p-3">
          <div className="flex items-center justify-between">
            <span className="text-sm text-neu-600 truncate">{app.url}</span>
            <button 
              onClick={() => onView(app)}
              className="neu-button p-2 hover:scale-105 transition-transform"
            >
              <SafeIcon icon={FiExternalLink} className="w-4 h-4 text-neu-600" />
            </button>
          </div>
        </div>

        {/* Actions */}
        <div className="flex gap-2">
          <button
            onClick={() => onView(app)}
            className="flex-1 neu-button py-3 hover:scale-105 transition-transform"
          >
            <span className="text-neu-700 font-medium">View App</span>
          </button>
          <button
            onClick={() => onSettings(app)}
            className="neu-button p-3 hover:scale-105 transition-transform"
          >
            <SafeIcon icon={FiSettings} className="w-5 h-5 text-neu-600" />
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default AppCard;