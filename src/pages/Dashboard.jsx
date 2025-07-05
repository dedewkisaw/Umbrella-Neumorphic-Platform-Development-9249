import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate, useLocation } from 'react-router-dom';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../common/SafeIcon';
import AppCard from '../components/AppCard';
import SubscriptionModal from '../components/SubscriptionModal';
import DropdownMenu from '../components/DropdownMenu';

const { FiArrowLeft, FiShoppingBag, FiBarChart, FiGlobe, FiDollarSign, FiShoppingCart, FiEye, FiDownload, FiStar, FiTrendingUp, FiZap, FiShield, FiCheck, FiClock, FiHeart, FiAward, FiGift, FiUsers, FiCalendar, FiCreditCard, FiPackage, FiExternalLink, FiShare, FiFolderOpen, FiRefreshCw, FiFilter, FiSearch, FiMail, FiPhone, FiMapPin, FiArchive } = FiIcons;

const Dashboard = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [activeTab, setActiveTab] = useState('library');
  const [sortBy, setSortBy] = useState('recent');
  const [filterBy, setFilterBy] = useState('all');
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

  // Check if we should open subscription modal from navigation state
  useEffect(() => {
    if (location.state?.showSubscription) {
      setIsSubscriptionModalOpen(true);
      if (location.state?.selectedPlan) {
        setCurrentPlan(location.state.selectedPlan);
      }
      // Clear the navigation state
      navigate(location.pathname, { replace: true });
    }
  }, [location.state, navigate, location.pathname]);

  // Scroll to top when component mounts or tab changes
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [activeTab]);

  const tabs = [
    { id: 'library', label: 'My Library', icon: FiGlobe },
    { id: 'purchases', label: 'Purchase History', icon: FiShoppingCart },
    { id: 'subscription', label: 'Subscription', icon: FiDollarSign },
    { id: 'marketplace', label: 'Browse Apps', icon: FiShoppingBag }
  ];

  // Dropdown options
  const sortOptions = [
    { value: 'recent', label: 'Recently Added' },
    { value: 'name', label: 'Name (A-Z)' },
    { value: 'rating', label: 'Highest Rated' },
    { value: 'price', label: 'Price (Low to High)' },
    { value: 'updated', label: 'Recently Updated' }
  ];

  const filterOptions = [
    { value: 'all', label: 'All Apps' },
    { value: 'active', label: 'Active' },
    { value: 'updates', label: 'Needs Update' },
    { value: 'ecommerce', label: 'E-commerce' },
    { value: 'portfolio', label: 'Portfolio' },
    { value: 'blog', label: 'Blog' },
    { value: 'landing', label: 'Landing Page' }
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

  const handleShareAndEarn = () => {
    // Open referral program
    window.open('https://umbrella.app/referral', '_blank');
  };

  const handleFindMoreApps = () => {
    navigate('/marketplace');
  };

  const totalSpent = purchasedApps.reduce((sum, app) => sum + app.price, 0);
  const totalApps = purchasedApps.length;
  const totalDownloads = purchasedApps.reduce((sum, app) => sum + app.downloads, 0);
  const avgRating = purchasedApps.length > 0 ? purchasedApps.reduce((sum, app) => sum + app.rating, 0) / purchasedApps.length : 0;

  // Filter and sort apps
  const filteredAndSortedApps = purchasedApps
    .filter(app => {
      if (filterBy === 'all') return true;
      if (filterBy === 'active') return app.status === 'Active';
      if (filterBy === 'updates') return app.status === 'Update Available';
      return app.category === filterBy;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case 'name': return a.name.localeCompare(b.name);
        case 'rating': return b.rating - a.rating;
        case 'price': return a.price - b.price;
        case 'updated': return new Date(b.lastUpdate) - new Date(a.lastUpdate);
        case 'recent':
        default: return new Date(b.purchaseDate) - new Date(a.purchaseDate);
      }
    });

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
                    { icon: FiDollarSign, label: 'Total Investment', value: `€${totalSpent.toFixed(0)}`, color: 'text-green-600', bg: 'bg-green-100' },
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

                {/* Value Proposition with Working Buttons */}
                <div className="neu-card-inset p-8 bg-gradient-to-r from-green-50 to-blue-50">
                  <div className="text-center space-y-4">
                    <div className="flex items-center justify-center gap-2 mb-4">
                      <SafeIcon icon={FiTrendingUp} className="w-6 h-6 text-green-600" />
                      <h3 className="text-xl font-bold text-neu-900">Your Smart Investment</h3>
                    </div>
                    <p className="text-neu-600 text-lg mb-6">
                      You've saved <span className="font-bold text-green-600">€200,000+</span> in development costs and{' '}
                      <span className="font-bold text-blue-600">18+ months</span> of development time!
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                      <button
                        onClick={handleShareAndEarn}
                        className="neu-button px-6 py-3 bg-green-500 text-white hover:scale-105 transition-transform"
                      >
                        <div className="flex items-center gap-2">
                          <SafeIcon icon={FiShare} className="w-5 h-5" />
                          <span className="font-semibold">Share & Earn</span>
                        </div>
                      </button>
                      <button
                        onClick={handleFindMoreApps}
                        className="neu-button px-6 py-3 hover:scale-105 transition-transform"
                      >
                        <div className="flex items-center gap-2">
                          <SafeIcon icon={FiShoppingBag} className="w-5 h-5 text-neu-600" />
                          <span className="text-neu-700 font-medium">Find More Apps</span>
                        </div>
                      </button>
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Enhanced Apps Grid */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="neu-card p-8"
                style={{ backgroundColor: '#f4f9ff' }}
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
                    {/* Beautiful Filter Dropdown */}
                    <div className="min-w-[150px]">
                      <DropdownMenu
                        options={filterOptions}
                        value={filterBy}
                        onChange={setFilterBy}
                        placeholder="Filter Apps"
                        size="small"
                        variant="success"
                      />
                    </div>
                    {/* Beautiful Sort Dropdown */}
                    <div className="min-w-[150px]">
                      <DropdownMenu
                        options={sortOptions}
                        value={sortBy}
                        onChange={setSortBy}
                        placeholder="Sort Apps"
                        size="small"
                        variant="primary"
                      />
                    </div>
                  </div>
                </div>

                {filteredAndSortedApps.length === 0 ? (
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
                    {filteredAndSortedApps.map((app, index) => (
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

          {/* Enhanced Purchase History Tab */}
          {activeTab === 'purchases' && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-8"
            >
              {/* Purchase History Header */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="neu-card p-8 lg:p-12 bg-gradient-to-br from-purple-50 to-blue-50"
              >
                <div className="text-center mb-8">
                  <div className="neu-button inline-flex items-center gap-2 px-6 py-3 mb-6 bg-purple-100">
                    <SafeIcon icon={FiShoppingCart} className="w-5 h-5 text-purple-600" />
                    <span className="text-purple-700 font-medium">Transaction History</span>
                  </div>
                  <h2 className="text-3xl lg:text-4xl font-bold text-neu-900 mb-4">
                    Purchase History
                    <span className="gradient-text block" style={{ lineHeight: '1.2', paddingBottom: '0.1em' }}>
                      Your Investment Journey
                    </span>
                  </h2>
                  <p className="text-lg text-neu-600 max-w-2xl mx-auto">
                    Track all your purchases, downloads, and transaction details in one convenient location.
                  </p>
                </div>

                {/* Purchase Stats */}
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
                  {[
                    { icon: FiShoppingCart, label: 'Total Purchases', value: totalApps, color: 'text-purple-600', bg: 'bg-purple-100' },
                    { icon: FiDollarSign, label: 'Total Spent', value: `€${totalSpent.toFixed(2)}`, color: 'text-green-600', bg: 'bg-green-100' },
                    { icon: FiCalendar, label: 'First Purchase', value: '2023-12', color: 'text-blue-600', bg: 'bg-blue-100' },
                    { icon: FiTrendingUp, label: 'Avg Order', value: `€${(totalSpent / totalApps).toFixed(2)}`, color: 'text-yellow-600', bg: 'bg-yellow-100' }
                  ].map((stat, index) => (
                    <motion.div
                      key={stat.label}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="neu-card-inset p-6 hover:scale-105 transition-transform"
                    >
                      <div className="text-center space-y-3">
                        <div className={`neu-button p-3 inline-flex mx-auto ${stat.bg}`}>
                          <SafeIcon icon={stat.icon} className={`w-5 h-5 ${stat.color}`} />
                        </div>
                        <div className="text-xl font-bold text-neu-900">{stat.value}</div>
                        <div className="text-xs text-neu-600">{stat.label}</div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>

              {/* Purchase List */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="neu-card p-8 bg-gradient-to-br from-white to-blue-50"
              >
                <div className="flex items-center justify-between mb-8">
                  <h3 className="text-2xl font-bold text-neu-900">Transaction Details</h3>
                  <div className="flex items-center gap-4">
                    <div className="neu-button px-4 py-2 bg-green-100">
                      <div className="flex items-center gap-2">
                        <SafeIcon icon={FiShield} className="w-4 h-4 text-green-600" />
                        <span className="text-green-700 font-medium text-sm">Secure Payments</span>
                      </div>
                    </div>
                    <button className="neu-button px-4 py-2 hover:scale-105 transition-transform">
                      <div className="flex items-center gap-2">
                        <SafeIcon icon={FiDownload} className="w-4 h-4 text-neu-600" />
                        <span className="text-neu-700 font-medium">Export</span>
                      </div>
                    </button>
                  </div>
                </div>

                <div className="space-y-4">
                  {purchasedApps.map((app, index) => (
                    <motion.div
                      key={app.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="neu-card-inset p-6 hover:scale-105 transition-transform"
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                          <img
                            src={app.preview}
                            alt={app.name}
                            className="w-16 h-16 object-cover rounded-lg neu-card-inset"
                          />
                          <div>
                            <div className="font-semibold text-neu-900 text-lg">{app.name}</div>
                            <div className="text-neu-600 text-sm">{app.type} • by {app.developer}</div>
                            <div className="flex items-center gap-4 mt-2">
                              <span className="text-xs text-neu-500 bg-neu-100 px-2 py-1 rounded-full">
                                Version {app.version}
                              </span>
                              <span className="text-xs text-neu-500">
                                Updated {app.lastUpdate}
                              </span>
                            </div>
                          </div>
                        </div>
                        <div className="text-right space-y-2">
                          <div className="text-2xl font-bold text-green-600">€{app.price}</div>
                          <div className="text-sm text-neu-600">{app.purchaseDate}</div>
                          <div className="flex items-center gap-2">
                            <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                              app.status === 'Active' ? 'bg-green-100 text-green-800' : 'bg-blue-100 text-blue-800'
                            }`}>
                              {app.status}
                            </span>
                            <button className="neu-button p-2 hover:scale-105 transition-transform">
                              <SafeIcon icon={FiDownload} className="w-4 h-4 text-neu-600" />
                            </button>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>

                {/* Payment Methods */}
                <div className="mt-12 neu-card-inset p-6 bg-gradient-to-r from-blue-50 to-purple-50">
                  <h4 className="text-lg font-semibold text-neu-900 mb-4">Payment Methods Used</h4>
                  <div className="grid grid-cols-3 gap-4">
                    {[
                      { icon: FiCreditCard, label: 'Credit Card', count: 3 },
                      { icon: FiShield, label: 'PayPal', count: 1 },
                      { icon: FiDollarSign, label: 'Bank Transfer', count: 0 }
                    ].map((method, index) => (
                      <div key={index} className="text-center neu-card-inset p-4">
                        <SafeIcon icon={method.icon} className="w-6 h-6 text-neu-600 mx-auto mb-2" />
                        <div className="font-medium text-neu-900">{method.label}</div>
                        <div className="text-sm text-neu-600">{method.count} transactions</div>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}

          {/* Enhanced Subscription Tab */}
          {activeTab === 'subscription' && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-8"
            >
              {/* Subscription Header */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="neu-card p-8 lg:p-12 bg-gradient-to-br from-green-50 to-blue-50"
              >
                <div className="text-center mb-8">
                  <div className="neu-button inline-flex items-center gap-2 px-6 py-3 mb-6 bg-green-100">
                    <SafeIcon icon={FiDollarSign} className="w-5 h-5 text-green-600" />
                    <span className="text-green-700 font-medium">Subscription Management</span>
                  </div>
                  <h2 className="text-3xl lg:text-4xl font-bold text-neu-900 mb-4">
                    Your Subscription
                    <span className="gradient-text block" style={{ lineHeight: '1.2', paddingBottom: '0.1em' }}>
                      Premium Access
                    </span>
                  </h2>
                  <p className="text-lg text-neu-600 max-w-2xl mx-auto">
                    Manage your subscription, billing information, and explore upgrade options for enhanced features.
                  </p>
                </div>
              </motion.div>

              {/* Subscription Details */}
              <div className="grid lg:grid-cols-2 gap-8">
                {/* Current Plan */}
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="neu-card p-8 bg-gradient-to-br from-white to-blue-50"
                >
                  <div className="space-y-6">
                    <div className="text-center">
                      <div className="neu-button p-4 inline-flex mx-auto mb-4 bg-blue-500 text-white">
                        <SafeIcon icon={FiAward} className="w-8 h-8" />
                      </div>
                      <h3 className="text-2xl font-bold text-neu-900 mb-2">Current Plan</h3>
                    </div>

                    <div className="neu-card-inset p-6 text-center">
                      <div className="text-3xl font-bold text-neu-900 mb-2">{currentPlan}</div>
                      <p className="text-neu-600 mb-4">
                        {currentPlan === 'Free'
                          ? 'Limited access to basic applications'
                          : 'Full access to premium applications'}
                      </p>
                      <div className="space-y-3">
                        <div className="flex justify-between text-sm">
                          <span className="text-neu-600">Plan Type:</span>
                          <span className="text-neu-900 font-medium">{currentPlan}</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-neu-600">Monthly Cost:</span>
                          <span className="text-neu-900 font-medium">
                            {currentPlan === 'Free' ? '€0' : '€19'}
                          </span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-neu-600">Next Billing:</span>
                          <span className="text-neu-900 font-medium">
                            {currentPlan === 'Free' ? 'N/A' : 'Feb 15, 2024'}
                          </span>
                        </div>
                      </div>
                    </div>

                    <button
                      onClick={() => setIsSubscriptionModalOpen(true)}
                      className="w-full neu-button py-4 hover:scale-105 transition-transform bg-blue-500 text-white"
                    >
                      <div className="flex items-center justify-center gap-2">
                        <SafeIcon icon={FiTrendingUp} className="w-5 h-5" />
                        <span className="font-semibold">
                          {currentPlan === 'Free' ? 'Upgrade Plan' : 'Manage Plan'}
                        </span>
                      </div>
                    </button>
                  </div>
                </motion.div>

                {/* Benefits & Features */}
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="neu-card p-8 bg-gradient-to-br from-white to-purple-50"
                >
                  <div className="space-y-6">
                    <div className="text-center">
                      <div className="neu-button p-4 inline-flex mx-auto mb-4 bg-purple-500 text-white">
                        <SafeIcon icon={FiPackage} className="w-8 h-8" />
                      </div>
                      <h3 className="text-2xl font-bold text-neu-900 mb-2">Plan Benefits</h3>
                    </div>

                    <div className="neu-card-inset p-6">
                      <h4 className="font-semibold text-neu-900 mb-4">What's Included:</h4>
                      <ul className="space-y-3">
                        {[
                          'Access to purchased applications',
                          'Lifetime updates included',
                          'Commercial use license',
                          'Developer support',
                          ...(currentPlan !== 'Free'
                            ? ['Priority support', 'Advanced features', 'Early access to new apps']
                            : [])
                        ].map((benefit, index) => (
                          <li key={index} className="flex items-center gap-3">
                            <SafeIcon icon={FiCheck} className="w-4 h-4 text-green-600" />
                            <span className="text-neu-700">{benefit}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {currentPlan === 'Free' && (
                      <div className="neu-card-inset p-6 bg-gradient-to-r from-green-50 to-blue-50">
                        <h4 className="font-semibold text-neu-900 mb-4">Upgrade Benefits:</h4>
                        <ul className="space-y-2 text-sm">
                          {[
                            'Access to 500+ premium applications',
                            'Unlimited downloads and updates',
                            'Priority customer support',
                            'Advanced customization tools',
                            'Early access to new releases'
                          ].map((benefit, index) => (
                            <li key={index} className="flex items-center gap-2 text-neu-600">
                              <SafeIcon icon={FiZap} className="w-3 h-3 text-blue-600" />
                              {benefit}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                </motion.div>
              </div>

              {/* Billing Information */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="neu-card p-8 bg-gradient-to-br from-white to-green-50"
              >
                <div className="flex items-center justify-between mb-8">
                  <h3 className="text-2xl font-bold text-neu-900">Billing Information</h3>
                  <button className="neu-button px-6 py-3 hover:scale-105 transition-transform">
                    <div className="flex items-center gap-2">
                      <SafeIcon icon={FiCreditCard} className="w-5 h-5 text-neu-600" />
                      <span className="text-neu-700 font-medium">Update Payment</span>
                    </div>
                  </button>
                </div>

                <div className="grid md:grid-cols-2 gap-8">
                  <div className="neu-card-inset p-6">
                    <h4 className="font-semibold text-neu-900 mb-4">Payment Method</h4>
                    {currentPlan === 'Free' ? (
                      <div className="text-center py-8">
                        <SafeIcon icon={FiCreditCard} className="w-12 h-12 text-neu-400 mx-auto mb-4" />
                        <p className="text-neu-600">No payment method required for free plan</p>
                      </div>
                    ) : (
                      <div className="flex items-center gap-4">
                        <div className="neu-button p-3 bg-blue-100">
                          <SafeIcon icon={FiCreditCard} className="w-6 h-6 text-blue-600" />
                        </div>
                        <div>
                          <div className="font-medium text-neu-900">•••• •••• •••• 4242</div>
                          <div className="text-sm text-neu-600">Expires 12/26</div>
                        </div>
                      </div>
                    )}
                  </div>

                  <div className="neu-card-inset p-6">
                    <h4 className="font-semibold text-neu-900 mb-4">Billing Address</h4>
                    {currentPlan === 'Free' ? (
                      <div className="text-center py-8">
                        <SafeIcon icon={FiMapPin} className="w-12 h-12 text-neu-400 mx-auto mb-4" />
                        <p className="text-neu-600">No billing address required for free plan</p>
                      </div>
                    ) : (
                      <div className="space-y-2 text-sm">
                        <div className="text-neu-900">John Doe</div>
                        <div className="text-neu-600">123 Main Street</div>
                        <div className="text-neu-600">San Francisco, CA 94102</div>
                        <div className="text-neu-600">United States</div>
                      </div>
                    )}
                  </div>
                </div>

                {/* Usage Statistics */}
                <div className="mt-8 neu-card-inset p-6 bg-gradient-to-r from-purple-50 to-blue-50">
                  <h4 className="font-semibold text-neu-900 mb-4">Account Usage</h4>
                  <div className="grid grid-cols-3 gap-6 text-center">
                    <div>
                      <div className="text-2xl font-bold text-neu-900">{totalApps}</div>
                      <div className="text-sm text-neu-600">Apps Owned</div>
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-neu-900">{totalDownloads.toLocaleString()}</div>
                      <div className="text-sm text-neu-600">Total Downloads</div>
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-neu-900">365</div>
                      <div className="text-sm text-neu-600">Days Active</div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}

          {/* Enhanced Browse Apps Tab */}
          {activeTab === 'marketplace' && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-8"
            >
              {/* Browse Apps Header */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="neu-card p-8 lg:p-12 bg-gradient-to-br from-yellow-50 to-orange-50"
              >
                <div className="text-center mb-8">
                  <div className="neu-button inline-flex items-center gap-2 px-6 py-3 mb-6 bg-orange-100">
                    <SafeIcon icon={FiShoppingBag} className="w-5 h-5 text-orange-600" />
                    <span className="text-orange-700 font-medium">Discover New Apps</span>
                  </div>
                  <h2 className="text-3xl lg:text-4xl font-bold text-neu-900 mb-4">
                    App Marketplace
                    <span className="gradient-text block" style={{ lineHeight: '1.2', paddingBottom: '0.1em' }}>
                      Endless Possibilities
                    </span>
                  </h2>
                  <p className="text-lg text-neu-600 max-w-2xl mx-auto">
                    Explore our vast collection of premium web applications. From e-commerce to portfolios, find the perfect solution for your next project.
                  </p>
                </div>

                {/* Quick Stats */}
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
                  {[
                    { icon: FiGlobe, label: 'Total Apps', value: '500+', color: 'text-blue-600', bg: 'bg-blue-100' },
                    { icon: FiUsers, label: 'Developers', value: '150+', color: 'text-green-600', bg: 'bg-green-100' },
                    { icon: FiStar, label: 'Avg Rating', value: '4.8', color: 'text-yellow-600', bg: 'bg-yellow-100' },
                    { icon: FiDownload, label: 'Downloads', value: '50K+', color: 'text-purple-600', bg: 'bg-purple-100' }
                  ].map((stat, index) => (
                    <motion.div
                      key={stat.label}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="neu-card-inset p-6 hover:scale-105 transition-transform"
                    >
                      <div className="text-center space-y-3">
                        <div className={`neu-button p-3 inline-flex mx-auto ${stat.bg}`}>
                          <SafeIcon icon={stat.icon} className={`w-5 h-5 ${stat.color}`} />
                        </div>
                        <div className="text-xl font-bold text-neu-900">{stat.value}</div>
                        <div className="text-xs text-neu-600">{stat.label}</div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>

              {/* Browse Options */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="neu-card p-8 bg-gradient-to-br from-white to-blue-50"
              >
                <div className="text-center mb-8">
                  <SafeIcon icon={FiShoppingBag} className="w-16 h-16 text-neu-400 mx-auto mb-4" />
                  <h3 className="text-2xl font-bold text-neu-900 mb-4">Discover Premium Applications</h3>
                  <p className="text-neu-600 mb-8 text-lg">
                    Browse our marketplace to find professional web applications for your projects. Each app is carefully curated and tested for quality.
                  </p>
                </div>

                {/* Category Grid */}
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                  {[
                    {
                      icon: FiShoppingCart,
                      name: 'E-commerce',
                      count: '120+',
                      desc: 'Online stores & marketplaces',
                      color: 'from-green-500 to-emerald-500'
                    },
                    {
                      icon: FiUsers,
                      name: 'Portfolio',
                      count: '85+',
                      desc: 'Personal & professional portfolios',
                      color: 'from-blue-500 to-cyan-500'
                    },
                    {
                      icon: FiFolderOpen,
                      name: 'Blog & CMS',
                      count: '95+',
                      desc: 'Content management systems',
                      color: 'from-purple-500 to-pink-500'
                    },
                    {
                      icon: FiZap,
                      name: 'Landing Pages',
                      count: '150+',
                      desc: 'High-converting landing pages',
                      color: 'from-yellow-500 to-orange-500'
                    },
                    {
                      icon: FiBarChart,
                      name: 'SaaS Tools',
                      count: '45+',
                      desc: 'Business & productivity apps',
                      color: 'from-indigo-500 to-purple-500'
                    },
                    {
                      icon: FiPackage,
                      name: 'Components',
                      count: '200+',
                      desc: 'Reusable UI components',
                      color: 'from-teal-500 to-blue-500'
                    }
                  ].map((category, index) => (
                    <motion.div
                      key={category.name}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="neu-card-inset p-6 hover:scale-105 transition-transform cursor-pointer"
                      onClick={() => navigate('/marketplace')}
                    >
                      <div className={`w-12 h-12 bg-gradient-to-r ${category.color} rounded-xl flex items-center justify-center text-white mb-4 mx-auto`}>
                        <SafeIcon icon={category.icon} className="w-6 h-6" />
                      </div>
                      <div className="text-center">
                        <h4 className="font-semibold text-neu-900 mb-2">{category.name}</h4>
                        <p className="text-neu-600 text-sm mb-3">{category.desc}</p>
                        <div className="text-blue-600 font-semibold">{category.count}</div>
                      </div>
                    </motion.div>
                  ))}
                </div>

                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <button
                    onClick={() => navigate('/marketplace')}
                    className="neu-button px-8 py-4 bg-blue-500 text-white hover:scale-105 transition-transform"
                  >
                    <div className="flex items-center gap-3">
                      <SafeIcon icon={FiEye} className="w-5 h-5" />
                      <span className="font-semibold">Browse All Apps</span>
                    </div>
                  </button>
                  <button
                    onClick={() => navigate('/marketplace')}
                    className="neu-button px-8 py-4 hover:scale-105 transition-transform"
                  >
                    <div className="flex items-center gap-3">
                      <SafeIcon icon={FiStar} className="w-5 h-5 text-neu-600" />
                      <span className="text-neu-700 font-medium">Featured Apps</span>
                    </div>
                  </button>
                </div>

                {/* Popular This Week */}
                <div className="mt-12 neu-card-inset p-6 bg-gradient-to-r from-green-50 to-blue-50">
                  <h4 className="text-lg font-semibold text-neu-900 mb-4 text-center">🔥 Popular This Week</h4>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {[
                      { name: 'ShopFlow Pro', category: 'E-commerce', price: '€49' },
                      { name: 'Portfolio Studio', category: 'Portfolio', price: '€29' },
                      { name: 'Blog Master', category: 'Blog', price: '€39' },
                      { name: 'Landing Pro', category: 'Landing', price: '€25' }
                    ].map((app, index) => (
                      <div key={index} className="text-center neu-card-inset p-4">
                        <div className="font-medium text-neu-900 text-sm">{app.name}</div>
                        <div className="text-neu-600 text-xs">{app.category}</div>
                        <div className="text-green-600 font-semibold text-sm mt-1">{app.price}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
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
      style={{ backgroundColor: 'white' }}
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
            <span
              key={tag}
              className="px-3 py-1 text-xs text-neu-600 rounded-full"
              style={{
                backgroundColor: '#f9f9ff',
                boxShadow: 'inset 2px 2px 4px #d1d1d8, inset -2px -2px 4px #ffffff'
              }}
            >
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
            <span className="text-green-700 font-bold">€{app.price}</span>
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