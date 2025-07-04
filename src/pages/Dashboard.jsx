import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../common/SafeIcon';
import AppCard from '../components/AppCard';
import SubscriptionModal from '../components/SubscriptionModal';

const { 
  FiArrowLeft, FiShoppingBag, FiBarChart, FiGlobe, FiDollarSign, 
  FiShoppingCart, FiEye, FiDownload, FiStar, FiTrendingUp, FiZap,
  FiShield, FiCheck, FiClock, FiHeart, FiAward, FiGift
} = FiIcons;

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
      downloadUrl: '/downloads/shopflow-pro.zip',
      rating: 4.8,
      downloads: 1250,
      category: 'ecommerce',
      developer: 'TechStudio',
      tags: ['react', 'stripe', 'inventory']
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
      downloadUrl: '/downloads/creative-portfolio.zip',
      rating: 4.9,
      downloads: 890,
      category: 'portfolio',
      developer: 'DesignLab',
      tags: ['design', 'responsive', 'animations']
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
      downloadUrl: '/downloads/blogmaster.zip',
      rating: 4.7,
      downloads: 650,
      category: 'blog',
      developer: 'ContentPro',
      tags: ['seo', 'cms', 'markdown']
    },
    {
      id: 4,
      name: 'StartupLand',
      status: 'Active',
      purchaseDate: '2024-01-20',
      type: 'Landing Page',
      price: 19.99,
      version: '1.2.0',
      lastUpdate: '2024-01-18',
      preview: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=300&h=200&fit=crop',
      downloadUrl: '/downloads/startupland.zip',
      rating: 4.6,
      downloads: 2100,
      category: 'landing',
      developer: 'GrowthHackers',
      tags: ['conversion', 'analytics', 'a/b-testing']
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
    console.log('Downloading:', app.name);
  };

  const handleUpdateApp = (app) => {
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
  const totalDownloads = purchasedApps.reduce((sum, app) => sum + app.downloads, 0);
  const avgRating = purchasedApps.length > 0 
    ? purchasedApps.reduce((sum, app) => sum + app.rating, 0) / purchasedApps.length 
    : 0;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 p-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-7xl mx-auto"
      >
        {/* Enhanced Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="neu-card p-8 mb-8 bg-gradient-to-r from-blue-50 to-purple-50"
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-6">
              <button
                onClick={() => navigate('/')}
                className="neu-button p-4 hover:scale-105 transition-transform group"
              >
                <SafeIcon icon={FiArrowLeft} className="w-6 h-6 text-neu-600 group-hover:-translate-x-1 transition-transform" />
              </button>
              <div>
                <h1 className="text-4xl font-bold text-neu-900 mb-2">
                  My <span className="gradient-text">Dashboard</span>
                </h1>
                <p className="text-neu-600 text-lg">
                  Manage your premium application library and subscriptions
                </p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="neu-button px-6 py-3 bg-blue-500 text-white">
                <div className="flex items-center gap-2">
                  <SafeIcon icon={FiAward} className="w-5 h-5" />
                  <span className="font-semibold">{currentPlan} Member</span>
                </div>
              </div>
              <button
                onClick={() => navigate('/marketplace')}
                className="neu-button px-6 py-3 hover:scale-105 transition-transform group"
              >
                <div className="flex items-center gap-2">
                  <SafeIcon icon={FiShoppingBag} className="w-5 h-5 text-neu-600 group-hover:scale-110 transition-transform" />
                  <span className="text-neu-700 font-medium">Browse Apps</span>
                </div>
              </button>
            </div>
          </div>
        </motion.div>

        {/* Enhanced Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="neu-card p-3 mb-8"
        >
          <div className="flex gap-2 overflow-x-auto">
            {tabs.map((tab, index) => (
              <motion.button
                key={tab.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                onClick={() => setActiveTab(tab.id)}
                className={`neu-button px-8 py-4 hover:scale-105 transition-transform flex-shrink-0 ${
                  activeTab === tab.id ? 'bg-blue-500 text-white' : ''
                }`}
              >
                <div className="flex items-center gap-3">
                  <SafeIcon icon={tab.icon} className="w-5 h-5" />
                  <span className="font-medium">{tab.label}</span>
                </div>
              </motion.button>
            ))}
          </div>
        </motion.div>

        {/* Enhanced Tab Content */}
        <div className="space-y-8">
          {activeTab === 'library' && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-8"
            >
              {/* Hero Stats Section */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="neu-card p-8 lg:p-12 bg-gradient-to-br from-blue-50 to-purple-50"
              >
                <div className="text-center mb-12">
                  <div className="neu-button inline-flex items-center gap-2 px-6 py-3 mb-6 bg-blue-100">
                    <SafeIcon icon={FiGlobe} className="w-5 h-5 text-blue-600" />
                    <span className="text-blue-700 font-medium">Your Premium Library</span>
                  </div>
                  <h2 className="text-3xl lg:text-4xl font-bold text-neu-900 mb-4">
                    Professional Applications
                    <span className="gradient-text block" style={{ lineHeight: '1.2', paddingBottom: '0.1em' }}>
                      Ready to Deploy
                    </span>
                  </h2>
                  <p className="text-lg text-neu-600 max-w-2xl mx-auto">
                    Your curated collection of premium web applications, all owned forever with lifetime updates included.
                  </p>
                </div>

                {/* Enhanced Stats Grid */}
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
                  {[
                    { icon: FiGlobe, label: 'Owned Apps', value: totalApps, color: 'text-blue-600', bg: 'bg-blue-100' },
                    { icon: FiDollarSign, label: 'Total Investment', value: `$${totalSpent.toFixed(0)}`, color: 'text-green-600', bg: 'bg-green-100' },
                    { icon: FiDownload, label: 'Total Downloads', value: totalDownloads.toLocaleString(), color: 'text-purple-600', bg: 'bg-purple-100' },
                    { icon: FiStar, label: 'Average Rating', value: avgRating.toFixed(1), color: 'text-yellow-600', bg: 'bg-yellow-100' }
                  ].map((stat, index) => (
                    <motion.div
                      key={stat.label}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="neu-card-inset p-6 hover:scale-105 transition-transform"
                    >
                      <div className="text-center space-y-3">
                        <div className={`neu-button p-4 inline-flex mx-auto ${stat.bg}`}>
                          <SafeIcon icon={stat.icon} className={`w-6 h-6 ${stat.color}`} />
                        </div>
                        <div className="text-2xl font-bold text-neu-900">{stat.value}</div>
                        <div className="text-sm text-neu-600">{stat.label}</div>
                      </div>
                    </motion.div>
                  ))}
                </div>

                {/* Value Proposition */}
                <div className="neu-card-inset p-8 bg-gradient-to-r from-green-50 to-blue-50">
                  <div className="text-center space-y-4">
                    <div className="flex items-center justify-center gap-2 mb-4">
                      <SafeIcon icon={FiTrendingUp} className="w-6 h-6 text-green-600" />
                      <h3 className="text-xl font-bold text-neu-900">Your Smart Investment</h3>
                    </div>
                    <p className="text-neu-600 text-lg mb-6">
                      You've saved <span className="font-bold text-green-600">$200,000+</span> in development costs 
                      and <span className="font-bold text-blue-600">18+ months</span> of development time!
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                      <div className="neu-button px-6 py-3 bg-green-500 text-white hover:scale-105 transition-transform">
                        <div className="flex items-center gap-2">
                          <SafeIcon icon={FiGift} className="w-5 h-5" />
                          <span className="font-semibold">Share & Earn</span>
                        </div>
                      </div>
                      <div className="neu-button px-6 py-3 hover:scale-105 transition-transform">
                        <div className="flex items-center gap-2">
                          <SafeIcon icon={FiShoppingBag} className="w-5 h-5 text-neu-600" />
                          <span className="text-neu-700 font-medium">Find More Apps</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Enhanced Apps Grid */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="neu-card p-8"
              >
                <div className="flex items-center justify-between mb-8">
                  <h3 className="text-2xl font-bold text-neu-900">Your Applications</h3>
                  <div className="flex items-center gap-4">
                    <div className="neu-button px-4 py-2 bg-green-100">
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                        <span className="text-green-700 font-medium text-sm">All Systems Operational</span>
                      </div>
                    </div>
                    <select className="neu-input px-4 py-2 text-neu-700">
                      <option>All Apps</option>
                      <option>Recently Updated</option>
                      <option>Needs Update</option>
                    </select>
                  </div>
                </div>

                {purchasedApps.length === 0 ? (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="text-center py-20"
                  >
                    <div className="neu-card-inset p-12 max-w-md mx-auto bg-gradient-to-br from-blue-50 to-purple-50">
                      <div className="neu-button p-6 inline-flex mx-auto mb-6 bg-blue-100">
                        <SafeIcon icon={FiShoppingBag} className="w-12 h-12 text-blue-600" />
                      </div>
                      <h3 className="text-2xl font-bold text-neu-900 mb-4">Start Your Journey</h3>
                      <p className="text-neu-600 mb-8 text-lg">
                        Discover amazing professional applications in our premium marketplace
                      </p>
                      <button
                        onClick={() => navigate('/marketplace')}
                        className="neu-button px-8 py-4 bg-blue-500 text-white hover:scale-105 transition-transform"
                      >
                        <div className="flex items-center gap-3">
                          <SafeIcon icon={FiZap} className="w-5 h-5" />
                          <span className="font-semibold">Explore Marketplace</span>
                        </div>
                      </button>
                    </div>
                  </motion.div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {purchasedApps.map((app, index) => (
                      <motion.div
                        key={app.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                      >
                        <EnhancedPurchasedAppCard
                          app={app}
                          onDownload={handleDownloadApp}
                          onUpdate={handleUpdateApp}
                        />
                      </motion.div>
                    ))}
                  </div>
                )}
              </motion.div>

              {/* Success Stories Section */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="neu-card p-8 bg-gradient-to-br from-green-50 to-blue-50"
              >
                <div className="text-center mb-8">
                  <h3 className="text-2xl font-bold text-neu-900 mb-4">
                    <SafeIcon icon={FiHeart} className="w-6 h-6 text-red-500 inline mr-2" />
                    Success Stories
                  </h3>
                  <p className="text-neu-600">See how these apps have transformed businesses</p>
                </div>
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="neu-card-inset p-6">
                    <div className="flex items-center gap-3 mb-4">
                      <SafeIcon icon={FiTrendingUp} className="w-5 h-5 text-green-600" />
                      <span className="font-semibold text-neu-900">Performance Boost</span>
                    </div>
                    <p className="text-neu-600 text-sm">
                      ShopFlow Pro helped increase online sales by 340% in the first month
                    </p>
                  </div>
                  <div className="neu-card-inset p-6">
                    <div className="flex items-center gap-3 mb-4">
                      <SafeIcon icon={FiClock} className="w-5 h-5 text-blue-600" />
                      <span className="font-semibold text-neu-900">Time Saved</span>
                    </div>
                    <p className="text-neu-600 text-sm">
                      Creative Portfolio launched in 2 hours instead of 2 months
                    </p>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}

          {/* Other tab content remains the same */}
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
                      <img src={app.preview} alt={app.name} className="w-12 h-12 object-cover rounded-lg" />
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
                        : 'Full access to premium applications'}
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

// Enhanced Component for purchased app cards
const EnhancedPurchasedAppCard = ({ app, onDownload, onUpdate }) => {
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
      className="neu-card p-6 hover:shadow-lg transition-all duration-300 group"
    >
      <div className="space-y-6">
        {/* Enhanced Header */}
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3">
            <div className="neu-button p-2 group-hover:animate-pulse">
              <SafeIcon icon={FiGlobe} className="w-5 h-5 text-blue-600" />
            </div>
            <div>
              <h3 className="font-semibold text-neu-900 text-lg">{app.name}</h3>
              <p className="text-sm text-neu-600">{app.type}</p>
              <div className="text-xs text-neu-500">by {app.developer}</div>
            </div>
          </div>
          <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(app.status)}`}>
            {app.status}
          </span>
        </div>

        {/* Enhanced Preview */}
        <div className="neu-card-inset p-4 bg-gradient-to-br from-blue-50 to-purple-50 rounded-lg group-hover:scale-105 transition-transform">
          <div className="aspect-video bg-white rounded-lg overflow-hidden">
            <img src={app.preview} alt={app.name} className="w-full h-full object-cover" />
          </div>
        </div>

        {/* Tags */}
        <div className="flex flex-wrap gap-2">
          {app.tags.map(tag => (
            <span key={tag} className="neu-card-inset px-3 py-1 text-xs text-neu-600 rounded-full">
              {tag}
            </span>
          ))}
        </div>

        {/* Enhanced Stats */}
        <div className="grid grid-cols-2 gap-4">
          <div className="neu-card-inset p-3 text-center">
            <div className="flex items-center justify-center gap-2 mb-1">
              <SafeIcon icon={FiStar} className="w-4 h-4 text-yellow-500" />
              <span className="text-xs text-neu-500">Rating</span>
            </div>
            <span className="font-semibold text-neu-800">{app.rating}</span>
          </div>
          <div className="neu-card-inset p-3 text-center">
            <div className="flex items-center justify-center gap-2 mb-1">
              <SafeIcon icon={FiDownload} className="w-4 h-4 text-neu-500" />
              <span className="text-xs text-neu-500">Downloads</span>
            </div>
            <span className="font-semibold text-neu-800">{app.downloads}</span>
          </div>
        </div>

        {/* Enhanced Details */}
        <div className="neu-card-inset p-4 space-y-3">
          <div className="flex justify-between text-sm">
            <span className="text-neu-600">Version:</span>
            <span className="text-neu-800 font-medium">{app.version}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-neu-600">Updated:</span>
            <span className="text-neu-800 font-medium">{app.lastUpdate}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-neu-600">Purchased:</span>
            <span className="text-neu-800 font-medium">{app.purchaseDate}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-neu-600">Investment:</span>
            <span className="text-green-700 font-bold">${app.price}</span>
          </div>
        </div>

        {/* Enhanced Actions */}
        <div className="flex gap-3">
          <button
            onClick={() => onDownload(app)}
            className="flex-1 neu-button py-3 hover:scale-105 transition-transform group"
          >
            <div className="flex items-center justify-center gap-2">
              <SafeIcon icon={FiDownload} className="w-4 h-4 text-neu-600 group-hover:animate-bounce" />
              <span className="text-neu-700 font-medium">Download</span>
            </div>
          </button>
          {app.status === 'Update Available' && (
            <button
              onClick={() => onUpdate(app)}
              className="neu-button px-4 py-3 hover:scale-105 transition-transform bg-blue-500 text-white"
            >
              <div className="flex items-center gap-2">
                <SafeIcon icon={FiZap} className="w-4 h-4" />
                <span className="font-medium">Update</span>
              </div>
            </button>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default Dashboard;