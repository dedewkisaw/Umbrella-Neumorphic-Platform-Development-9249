import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../common/SafeIcon';
import AppCard from '../components/AppCard';
import DeploymentModal from '../components/DeploymentModal';
import SubscriptionModal from '../components/SubscriptionModal';
import RevenueStats from '../components/RevenueStats';

const { FiArrowLeft, FiPlus, FiBarChart, FiGlobe, FiDollarSign, FiShoppingCart, FiEye } = FiIcons;

const Dashboard = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('overview');
  const [apps, setApps] = useState([
    {
      id: 1,
      name: 'ShopFlow Pro',
      status: 'Active',
      views: '12.5K',
      revenue: 2450,
      sales: 49,
      rating: 4.8,
      downloads: 1250,
      type: 'E-commerce',
      url: 'https://shopflow.umbrella.app',
      preview: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=300&h=200&fit=crop',
      price: 49.99
    },
    {
      id: 2,
      name: 'Creative Portfolio',
      status: 'Active',
      views: '8.2K',
      revenue: 890,
      sales: 31,
      rating: 4.9,
      downloads: 890,
      type: 'Portfolio',
      url: 'https://portfolio.umbrella.app',
      preview: 'https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?w=300&h=200&fit=crop',
      price: 29.99
    },
    {
      id: 3,
      name: 'BlogMaster',
      status: 'Active',
      views: '6.1K',
      revenue: 1200,
      sales: 30,
      rating: 4.7,
      downloads: 650,
      type: 'Blog',
      url: 'https://blog.umbrella.app',
      preview: 'https://images.unsplash.com/photo-1486312338219-ce68e2c6b3b8?w=300&h=200&fit=crop',
      price: 39.99
    }
  ]);

  const [isDeployModalOpen, setIsDeployModalOpen] = useState(false);
  const [isSubscriptionModalOpen, setIsSubscriptionModalOpen] = useState(false);
  const [currentPlan, setCurrentPlan] = useState('Free');

  const tabs = [
    { id: 'overview', label: 'Overview', icon: FiBarChart },
    { id: 'apps', label: 'My Apps', icon: FiGlobe },
    { id: 'revenue', label: 'Revenue', icon: FiDollarSign },
    { id: 'marketplace', label: 'Marketplace', icon: FiShoppingCart }
  ];

  const handleDeploy = (newApp) => {
    setApps([...apps, newApp]);
  };

  const handleViewApp = (app) => {
    window.open(app.url, '_blank');
  };

  const handleAppSettings = (app) => {
    console.log('Opening settings for:', app.name);
  };

  const totalRevenue = apps.reduce((sum, app) => sum + (app.revenue || 0), 0);
  const totalSales = apps.reduce((sum, app) => sum + (app.sales || 0), 0);
  const commission = totalRevenue * 0.05; // 5% commission
  const netRevenue = totalRevenue - commission;

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
              <h1 className="text-3xl font-bold text-neu-800">Developer Dashboard</h1>
              <p className="text-neu-600">Manage your apps and track your revenue</p>
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
              className="neu-button px-4 py-2 hover:scale-105 transition-transform"
            >
              <div className="flex items-center gap-2">
                <SafeIcon icon={FiEye} className="w-4 h-4 text-neu-600" />
                <span className="text-neu-700 font-medium">Browse Apps</span>
              </div>
            </button>
            <button
              onClick={() => setIsDeployModalOpen(true)}
              className="neu-button px-6 py-3 hover:scale-105 transition-transform"
            >
              <div className="flex items-center gap-2">
                <SafeIcon icon={FiPlus} className="w-5 h-5 text-neu-600" />
                <span className="text-neu-700 font-medium">Deploy App</span>
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
          {activeTab === 'overview' && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-8"
            >
              {/* Quick Stats */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                {[
                  { label: 'Total Apps', value: apps.length, icon: FiGlobe },
                  { label: 'Total Sales', value: totalSales, icon: FiShoppingCart },
                  { label: 'Gross Revenue', value: `$${totalRevenue.toLocaleString()}`, icon: FiDollarSign },
                  { label: 'Net Revenue', value: `$${netRevenue.toLocaleString()}`, icon: FiBarChart }
                ].map((stat, index) => (
                  <motion.div
                    key={stat.label}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="neu-card p-6"
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-neu-500 text-sm">{stat.label}</p>
                        <p className="text-2xl font-bold text-neu-800">{stat.value}</p>
                      </div>
                      <SafeIcon icon={stat.icon} className="w-8 h-8 text-neu-400" />
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Commission Info */}
              <div className="neu-card p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-neu-900">Commission Breakdown</h3>
                  <button
                    onClick={() => setIsSubscriptionModalOpen(true)}
                    className="neu-button px-4 py-2 bg-blue-500 text-white hover:scale-105 transition-transform"
                  >
                    <span className="text-sm font-medium">Upgrade to 0% Commission</span>
                  </button>
                </div>
                <div className="grid md:grid-cols-3 gap-4">
                  <div className="neu-card-inset p-4 text-center">
                    <div className="text-2xl font-bold text-neu-900">${totalRevenue.toLocaleString()}</div>
                    <div className="text-neu-600 text-sm">Gross Revenue</div>
                  </div>
                  <div className="neu-card-inset p-4 text-center">
                    <div className="text-2xl font-bold text-red-600">-${commission.toFixed(2)}</div>
                    <div className="text-neu-600 text-sm">Commission (5%)</div>
                  </div>
                  <div className="neu-card-inset p-4 text-center">
                    <div className="text-2xl font-bold text-green-600">${netRevenue.toLocaleString()}</div>
                    <div className="text-neu-600 text-sm">Net Revenue</div>
                  </div>
                </div>
              </div>

              {/* Recent Apps */}
              <div className="neu-card p-8">
                <h3 className="text-xl font-semibold text-neu-900 mb-6">Recent Apps</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {apps.slice(0, 3).map(app => (
                    <AppCard
                      key={app.id}
                      app={app}
                      onView={handleViewApp}
                      onSettings={handleAppSettings}
                    />
                  ))}
                </div>
              </div>
            </motion.div>
          )}

          {activeTab === 'apps' && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="neu-card p-8"
            >
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold text-neu-800">My Applications</h2>
                <button
                  onClick={() => setIsDeployModalOpen(true)}
                  className="neu-button px-6 py-3 hover:scale-105 transition-transform"
                >
                  <div className="flex items-center gap-2">
                    <SafeIcon icon={FiPlus} className="w-5 h-5 text-neu-600" />
                    <span className="text-neu-700 font-medium">Deploy New App</span>
                  </div>
                </button>
              </div>

              {apps.length === 0 ? (
                <div className="text-center py-16">
                  <div className="neu-card-inset p-8 max-w-md mx-auto">
                    <SafeIcon icon={FiGlobe} className="w-16 h-16 text-neu-400 mx-auto mb-4" />
                    <h3 className="text-lg font-semibold text-neu-800 mb-2">No Apps Yet</h3>
                    <p className="text-neu-600 mb-4">Deploy your first app to start earning</p>
                    <button
                      onClick={() => setIsDeployModalOpen(true)}
                      className="neu-button px-6 py-3 hover:scale-105 transition-transform"
                    >
                      <div className="flex items-center gap-2">
                        <SafeIcon icon={FiPlus} className="w-5 h-5 text-neu-600" />
                        <span className="text-neu-700 font-medium">Deploy First App</span>
                      </div>
                    </button>
                  </div>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {apps.map(app => (
                    <AppCard
                      key={app.id}
                      app={app}
                      onView={handleViewApp}
                      onSettings={handleAppSettings}
                    />
                  ))}
                </div>
              )}
            </motion.div>
          )}

          {activeTab === 'revenue' && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <RevenueStats apps={apps} />
            </motion.div>
          )}

          {activeTab === 'marketplace' && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="neu-card p-8 text-center"
            >
              <SafeIcon icon={FiShoppingCart} className="w-16 h-16 text-neu-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-neu-900 mb-4">Browse Marketplace</h3>
              <p className="text-neu-600 mb-6">
                Discover apps built by other developers and get inspired for your next project
              </p>
              <button
                onClick={() => navigate('/marketplace')}
                className="neu-button px-6 py-3 hover:scale-105 transition-transform"
              >
                <div className="flex items-center gap-2">
                  <SafeIcon icon={FiEye} className="w-5 h-5 text-neu-600" />
                  <span className="text-neu-700 font-medium">Browse Apps</span>
                </div>
              </button>
            </motion.div>
          )}
        </div>

        {/* Modals */}
        <DeploymentModal
          isOpen={isDeployModalOpen}
          onClose={() => setIsDeployModalOpen(false)}
          onDeploy={handleDeploy}
        />
        <SubscriptionModal
          isOpen={isSubscriptionModalOpen}
          onClose={() => setIsSubscriptionModalOpen(false)}
          currentPlan={currentPlan}
        />
      </motion.div>
    </div>
  );
};

export default Dashboard;