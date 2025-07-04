import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../common/SafeIcon';
import AppCard from '../components/AppCard';
import SubscriptionModal from '../components/SubscriptionModal';

const { FiArrowLeft, FiShoppingBag, FiBarChart, FiGlobe, FiDollarSign, FiShoppingCart, FiEye, FiDownload } = FiIcons;

const Dashboard = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('library');
  const [purchasedApps, setPurchasedApps] = useState([
    {
      id: 1,
      name: 'ShopFlow Pro',
      status: 'Active',
      purchaseDate: '2024-01-15',
      type: 'E-commerce',
      price: 49.99,
      version: '2.1.0',
      lastUpdate: '2024-01-10',
      preview: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=300&h=200&fit=crop',
      downloadUrl: '/downloads/shopflow-pro.zip'
    },
    {
      id: 2,
      name: 'Creative Portfolio',
      status: 'Active',
      purchaseDate: '2024-01-08',
      type: 'Portfolio',
      price: 29.99,
      version: '1.5.2',
      lastUpdate: '2024-01-05',
      preview: 'https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?w=300&h=200&fit=crop',
      downloadUrl: '/downloads/creative-portfolio.zip'
    },
    {
      id: 3,
      name: 'BlogMaster',
      status: 'Update Available',
      purchaseDate: '2023-12-20',
      type: 'Blog',
      price: 39.99,
      version: '3.0.1',
      lastUpdate: '2024-01-12',
      preview: 'https://images.unsplash.com/photo-1486312338219-ce68e2c6b3b8?w=300&h=200&fit=crop',
      downloadUrl: '/downloads/blogmaster.zip'
    }
  ]);

  const [isSubscriptionModalOpen, setIsSubscriptionModalOpen] = useState(false);
  const [currentPlan, setCurrentPlan] = useState('Free');

  const tabs = [
    { id: 'library', label: 'My Library', icon: FiGlobe },
    { id: 'purchases', label: 'Purchase History', icon: FiShoppingCart },
    { id: 'subscription', label: 'Subscription', icon: FiDollarSign },
    { id: 'marketplace', label: 'Browse Apps', icon: FiShoppingBag }
  ];

  const handleDownloadApp = (app) => {
    // Simulate download
    console.log('Downloading:', app.name);
    // In a real app, this would trigger a file download
  };

  const handleUpdateApp = (app) => {
    // Simulate update
    console.log('Updating:', app.name);
    setPurchasedApps(apps => 
      apps.map(a => 
        a.id === app.id 
          ? { ...a, status: 'Active', lastUpdate: new Date().toISOString().split('T')[0] }
          : a
      )
    );
  };

  const totalSpent = purchasedApps.reduce((sum, app) => sum + app.price, 0);
  const totalApps = purchasedApps.length;

  return (
    <div className="min-h-screen bg-neu-100 p-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-7xl mx-auto"
      >
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <button
              onClick={() => navigate('/')}
              className="neu-button p-3 hover:scale-105 transition-transform"
            >
              <SafeIcon icon={FiArrowLeft} className="w-5 h-5 text-neu-600" />
            </button>
            <div>
              <h1 className="text-3xl font-bold text-neu-800">My Dashboard</h1>
              <p className="text-neu-600">Manage your purchased applications and subscriptions</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={() => setIsSubscriptionModalOpen(true)}
              className="neu-button px-4 py-2 hover:scale-105 transition-transform"
            >
              <div className="flex items-center gap-2">
                <SafeIcon icon={FiDollarSign} className="w-4 h-4 text-neu-600" />
                <span className="text-neu-700 font-medium">{currentPlan} Plan</span>
              </div>
            </button>
            <button
              onClick={() => navigate('/marketplace')}
              className="neu-button px-6 py-3 hover:scale-105 transition-transform"
            >
              <div className="flex items-center gap-2">
                <SafeIcon icon={FiShoppingBag} className="w-5 h-5 text-neu-600" />
                <span className="text-neu-700 font-medium">Browse Apps</span>
              </div>
            </button>
          </div>
        </div>

        {/* Tabs */}
        <div className="neu-card p-2 mb-8">
          <div className="flex gap-2">
            {tabs.map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`neu-button px-6 py-3 hover:scale-105 transition-transform ${
                  activeTab === tab.id ? 'bg-blue-500 text-white' : ''
                }`}
              >
                <div className="flex items-center gap-2">
                  <SafeIcon icon={tab.icon} className="w-4 h-4" />
                  <span className="font-medium">{tab.label}</span>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Tab Content */}
        <div className="space-y-8">
          {activeTab === 'library' && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-8"
            >
              {/* Quick Stats */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="neu-card p-6"
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-neu-500 text-sm">Owned Apps</p>
                      <p className="text-2xl font-bold text-neu-800">{totalApps}</p>
                    </div>
                    <SafeIcon icon={FiGlobe} className="w-8 h-8 text-neu-400" />
                  </div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 }}
                  className="neu-card p-6"
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-neu-500 text-sm">Total Spent</p>
                      <p className="text-2xl font-bold text-neu-800">${totalSpent}</p>
                    </div>
                    <SafeIcon icon={FiDollarSign} className="w-8 h-8 text-neu-400" />
                  </div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className="neu-card p-6"
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-neu-500 text-sm">Updates Available</p>
                      <p className="text-2xl font-bold text-neu-800">
                        {purchasedApps.filter(app => app.status === 'Update Available').length}
                      </p>
                    </div>
                    <SafeIcon icon={FiDownload} className="w-8 h-8 text-neu-400" />
                  </div>
                </motion.div>
              </div>

              {/* My Apps */}
              <div className="neu-card p-8">
                <h3 className="text-xl font-semibold text-neu-900 mb-6">My Applications</h3>
                {purchasedApps.length === 0 ? (
                  <div className="text-center py-16">
                    <div className="neu-card-inset p-8 max-w-md mx-auto">
                      <SafeIcon icon={FiShoppingBag} className="w-16 h-16 text-neu-400 mx-auto mb-4" />
                      <h3 className="text-lg font-semibold text-neu-800 mb-2">No Apps Yet</h3>
                      <p className="text-neu-600 mb-4">Browse our marketplace to find amazing applications</p>
                      <button
                        onClick={() => navigate('/marketplace')}
                        className="neu-button px-6 py-3 hover:scale-105 transition-transform"
                      >
                        <div className="flex items-center gap-2">
                          <SafeIcon icon={FiShoppingBag} className="w-5 h-5 text-neu-600" />
                          <span className="text-neu-700 font-medium">Browse Apps</span>
                        </div>
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {purchasedApps.map(app => (
                      <PurchasedAppCard
                        key={app.id}
                        app={app}
                        onDownload={handleDownloadApp}
                        onUpdate={handleUpdateApp}
                      />
                    ))}
                  </div>
                )}
              </div>
            </motion.div>
          )}

          {activeTab === 'purchases' && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="neu-card p-8"
            >
              <h2 className="text-xl font-semibold text-neu-800 mb-6">Purchase History</h2>
              <div className="space-y-4">
                {purchasedApps.map(app => (
                  <div key={app.id} className="neu-card-inset p-4 flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <img 
                        src={app.preview} 
                        alt={app.name}
                        className="w-12 h-12 object-cover rounded-lg"
                      />
                      <div>
                        <div className="font-medium text-neu-900">{app.name}</div>
                        <div className="text-sm text-neu-600">{app.type}</div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="font-semibold text-neu-900">${app.price}</div>
                      <div className="text-sm text-neu-500">{app.purchaseDate}</div>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          )}

          {activeTab === 'subscription' && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="neu-card p-8"
            >
              <h2 className="text-xl font-semibold text-neu-800 mb-6">Subscription Management</h2>
              <div className="grid md:grid-cols-2 gap-8">
                <div className="space-y-4">
                  <h3 className="font-semibold text-neu-900">Current Plan</h3>
                  <div className="neu-card-inset p-6">
                    <div className="text-2xl font-bold text-neu-900 mb-2">{currentPlan}</div>
                    <p className="text-neu-600 mb-4">
                      {currentPlan === 'Free' 
                        ? 'Limited access to basic applications' 
                        : 'Full access to premium applications'
                      }
                    </p>
                    <button
                      onClick={() => setIsSubscriptionModalOpen(true)}
                      className="neu-button px-4 py-2 hover:scale-105 transition-transform"
                    >
                      <span className="text-neu-700 font-medium">
                        {currentPlan === 'Free' ? 'Upgrade Plan' : 'Manage Plan'}
                      </span>
                    </button>
                  </div>
                </div>
                <div className="space-y-4">
                  <h3 className="font-semibold text-neu-900">Benefits</h3>
                  <div className="neu-card-inset p-6">
                    <ul className="space-y-2 text-neu-600">
                      <li>• Access to purchased applications</li>
                      <li>• Lifetime updates included</li>
                      <li>• Commercial use license</li>
                      <li>• Developer support</li>
                      {currentPlan !== 'Free' && (
                        <>
                          <li>• Priority support</li>
                          <li>• Advanced features</li>
                          <li>• Early access to new apps</li>
                        </>
                      )}
                    </ul>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {activeTab === 'marketplace' && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="neu-card p-8 text-center"
            >
              <SafeIcon icon={FiShoppingBag} className="w-16 h-16 text-neu-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-neu-900 mb-4">Discover New Applications</h3>
              <p className="text-neu-600 mb-6">
                Browse our marketplace to find professional web applications for your projects
              </p>
              <button
                onClick={() => navigate('/marketplace')}
                className="neu-button px-6 py-3 hover:scale-105 transition-transform"
              >
                <div className="flex items-center gap-2">
                  <SafeIcon icon={FiEye} className="w-5 h-5 text-neu-600" />
                  <span className="text-neu-700 font-medium">Browse Marketplace</span>
                </div>
              </button>
            </motion.div>
          )}
        </div>

        {/* Subscription Modal */}
        <SubscriptionModal
          isOpen={isSubscriptionModalOpen}
          onClose={() => setIsSubscriptionModalOpen(false)}
          currentPlan={currentPlan}
        />
      </motion.div>
    </div>
  );
};

// Component for purchased app cards
const PurchasedAppCard = ({ app, onDownload, onUpdate }) => {
  const getStatusColor = (status) => {
    switch (status) {
      case 'Active': return 'bg-green-100 text-green-800';
      case 'Update Available': return 'bg-blue-100 text-blue-800';
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
          <div>
            <h3 className="font-semibold text-neu-900">{app.name}</h3>
            <p className="text-sm text-neu-600">{app.type}</p>
          </div>
          <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(app.status)}`}>
            {app.status}
          </span>
        </div>

        {/* Preview */}
        <div className="neu-card-inset p-4 bg-gradient-to-br from-blue-50 to-purple-50 rounded-lg">
          <div className="aspect-video bg-white rounded-lg flex items-center justify-center">
            <img 
              src={app.preview} 
              alt={app.name}
              className="w-full h-full object-cover rounded-lg"
            />
          </div>
        </div>

        {/* Details */}
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span className="text-neu-600">Version:</span>
            <span className="text-neu-800">{app.version}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-neu-600">Updated:</span>
            <span className="text-neu-800">{app.lastUpdate}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-neu-600">Purchased:</span>
            <span className="text-neu-800">{app.purchaseDate}</span>
          </div>
        </div>

        {/* Actions */}
        <div className="flex gap-2">
          <button
            onClick={() => onDownload(app)}
            className="flex-1 neu-button py-3 hover:scale-105 transition-transform"
          >
            <div className="flex items-center justify-center gap-2">
              <SafeIcon icon={FiDownload} className="w-4 h-4 text-neu-600" />
              <span className="text-neu-700 font-medium">Download</span>
            </div>
          </button>
          {app.status === 'Update Available' && (
            <button
              onClick={() => onUpdate(app)}
              className="neu-button px-4 py-3 hover:scale-105 transition-transform bg-blue-500 text-white"
            >
              <span className="font-medium">Update</span>
            </button>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default Dashboard;