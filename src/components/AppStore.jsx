import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../common/SafeIcon';
import DropdownMenu from './DropdownMenu';
import AuthModal from './AuthModal';
import { useAuth } from '../hooks/useAuth';

const {
  FiSearch,
  FiFilter,
  FiStar,
  FiDownload,
  FiDollarSign,
  FiEye,
  FiHeart,
  FiExternalLink,
  FiShoppingCart,
  FiTrendingUp,
  FiZap,
  FiShield,
  FiCheck,
  FiArrowLeft,
  FiGrid,
  FiList,
  FiAward,
  FiClock,
  FiUsers,
  FiGlobe,
  FiEdit,
  FiGamepad2,
  FiBookOpen,
  FiTarget,
  FiLayers,
  FiTrendingDown,
  FiActivity,
  FiBarChart,
  FiDatabase,
  FiCode,
  FiBox,
  FiPackage
} = FiIcons;

const AppStore = () => {
  const navigate = useNavigate();
  const { user, requireAuth, login } = useAuth();
  const [apps, setApps] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [sortBy, setSortBy] = useState('popular');
  const [viewMode, setViewMode] = useState('grid');
  const [priceFilter, setPriceFilter] = useState('all');

  // Auth Modal State
  const [authModal, setAuthModal] = useState({
    isOpen: false,
    mode: 'login',
    triggerAction: null
  });

  const categories = [
    { id: 'all', name: 'All Apps', count: 127, icon: FiGlobe },
    { id: 'ecommerce', name: 'E-commerce', count: 23, icon: FiShoppingCart },
    { id: 'portfolio', name: 'Portfolio', count: 18, icon: FiUsers },
    { id: 'blog', name: 'Blog', count: 15, icon: FiEdit },
    { id: 'landing', name: 'Landing Page', count: 31, icon: FiZap },
    { id: 'saas', name: 'SaaS Tools', count: 12, icon: FiTrendingUp },
    { id: 'games', name: 'Games', count: 8, icon: FiGamepad2 },
    { id: 'education', name: 'Education', count: 20, icon: FiBookOpen }
  ];

  // Mock apps data - Fixed with proper structure
  const mockApps = [
    {
      id: 1,
      name: 'ShopFlow Pro',
      description: 'Complete e-commerce solution with inventory management and analytics dashboard',
      price: 49.99,
      category: 'ecommerce',
      rating: 4.8,
      downloads: 1250,
      preview: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=400&h=300&fit=crop',
      developer: 'TechStudio',
      featured: true,
      tags: ['react', 'stripe', 'inventory', 'analytics'],
      lastUpdate: '2024-01-15',
      version: '2.1.0',
      compatibility: ['React', 'Node.js', 'MongoDB'],
      highlights: ['Real-time inventory', 'Payment processing', 'Analytics dashboard']
    },
    {
      id: 2,
      name: 'Creative Portfolio',
      description: 'Stunning portfolio template for designers and creative professionals',
      price: 29.99,
      category: 'portfolio',
      rating: 4.9,
      downloads: 890,
      preview: 'https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?w=400&h=300&fit=crop',
      developer: 'DesignLab',
      featured: false,
      tags: ['design', 'responsive', 'animations', 'portfolio'],
      lastUpdate: '2024-01-10',
      version: '1.5.2',
      compatibility: ['React', 'CSS3', 'Framer Motion'],
      highlights: ['Responsive design', 'Smooth animations', 'Portfolio showcase']
    }
    // Add more mock apps...
  ];

  useEffect(() => {
    setApps(mockApps);
  }, []);

  // Handle actions that require authentication
  const handleAuthRequired = async (action, callback) => {
    try {
      await requireAuth(action);
      callback();
    } catch (error) {
      if (error.requiresAuth) {
        setAuthModal({
          isOpen: true,
          mode: 'login',
          triggerAction: action
        });
      }
    }
  };

  // Handle successful authentication
  const handleAuthSuccess = (userData) => {
    login(userData);
    setAuthModal({
      isOpen: false,
      mode: 'login',
      triggerAction: null
    });
    // Show success message
    console.log('Successfully logged in:', userData);
  };

  // ✅ FIXED: Purchase app action
  const handlePurchaseApp = (app) => {
    handleAuthRequired(`purchase ${app.name}`, () => {
      console.log('Purchasing app:', app.name);
      // Implement purchase logic here
      navigate('/dashboard');
    });
  };

  // ✅ FIXED: Download app action
  const handleDownloadApp = (app) => {
    handleAuthRequired(`download ${app.name}`, () => {
      console.log('Downloading app:', app.name);
      // Implement download logic here
    });
  };

  // ✅ FIXED: Like app action
  const handleLikeApp = (app) => {
    handleAuthRequired(`like ${app.name}`, () => {
      console.log('Liked app:', app.name);
      // Implement like/favorite logic here
    });
  };

  // ✅ FIXED: View demo navigation - This is the key fix!
  const handleViewDemo = (app) => {
    console.log('Navigating to preview for app:', app.id); // Debug log
    navigate(`/preview/${app.id}`);
  };

  // Filter and sort logic
  const filteredApps = apps.filter(app => {
    const matchesSearch = app.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         app.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || app.category === selectedCategory;
    
    let matchesPrice = true;
    if (priceFilter === 'free') matchesPrice = app.price === 0;
    else if (priceFilter === 'under50') matchesPrice = app.price > 0 && app.price < 50;
    else if (priceFilter === 'under100') matchesPrice = app.price >= 50 && app.price < 100;
    else if (priceFilter === 'premium') matchesPrice = app.price >= 100;
    
    return matchesSearch && matchesCategory && matchesPrice;
  });

  const sortedApps = [...filteredApps].sort((a, b) => {
    switch (sortBy) {
      case 'popular': return b.downloads - a.downloads;
      case 'rating': return b.rating - a.rating;
      case 'price-low': return a.price - b.price;
      case 'price-high': return b.price - a.price;
      case 'newest': return new Date(b.lastUpdate) - new Date(a.lastUpdate);
      default: return 0;
    }
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
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
                <h1 className="text-4xl lg:text-5xl font-bold text-neu-900 mb-2">
                  App <span className="gradient-text">Marketplace</span>
                </h1>
                <p className="text-xl text-neu-600">
                  Discover and purchase premium web applications
                </p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              {user ? (
                <div className="flex items-center gap-4">
                  <div className="neu-button px-6 py-3 bg-green-100">
                    <div className="flex items-center gap-2">
                      <img src={user.avatar} alt={user.name} className="w-6 h-6 rounded-full" />
                      <span className="text-green-700 font-medium">Welcome, {user.name}</span>
                    </div>
                  </div>
                  <button
                    onClick={() => navigate('/dashboard')}
                    className="neu-button px-6 py-3 hover:scale-105 transition-transform"
                  >
                    <div className="flex items-center gap-2">
                      <SafeIcon icon={FiUsers} className="w-5 h-5 text-neu-600" />
                      <span className="text-neu-700 font-medium">My Library</span>
                    </div>
                  </button>
                </div>
              ) : (
                <div className="flex items-center gap-4">
                  <div className="neu-button px-6 py-3 bg-blue-100">
                    <div className="flex items-center gap-2">
                      <SafeIcon icon={FiEye} className="w-5 h-5 text-blue-600" />
                      <span className="text-blue-700 font-medium">Browse Freely</span>
                    </div>
                  </div>
                  <button
                    onClick={() => setAuthModal({ isOpen: true, mode: 'login', triggerAction: null })}
                    className="neu-button px-6 py-3 bg-gradient-to-r from-green-500 to-blue-500 text-white hover:scale-105 transition-transform"
                  >
                    <div className="flex items-center gap-2">
                      <SafeIcon icon={FiShield} className="w-5 h-5" />
                      <span className="font-medium">Sign In</span>
                    </div>
                  </button>
                </div>
              )}
            </div>
          </div>
        </motion.div>

        {/* Search and Filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="neu-card p-8 mb-8 bg-gradient-to-br from-white to-blue-50"
        >
          <div className="space-y-6">
            {/* Search Bar */}
            <div className="relative">
              <SafeIcon icon={FiSearch} className="absolute left-4 top-1/2 transform -translate-y-1/2 text-neu-500 w-5 h-5" />
              <input
                type="text"
                placeholder="Search apps, developers, or technologies..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full neu-input pl-12 pr-4 py-4 text-neu-700 text-lg"
              />
            </div>

            {/* Filters */}
            <div className="flex flex-wrap gap-4 items-center">
              <div className="min-w-[200px]">
                <DropdownMenu
                  options={categories.map(cat => ({
                    value: cat.id,
                    label: `${cat.name} (${cat.count})`
                  }))}
                  value={selectedCategory}
                  onChange={setSelectedCategory}
                  placeholder="Select Category"
                  size="medium"
                  variant="primary"
                />
              </div>
              <div className="min-w-[150px]">
                <DropdownMenu
                  options={[
                    { value: 'all', label: 'All Prices' },
                    { value: 'free', label: 'Free' },
                    { value: 'under50', label: 'Under $50' },
                    { value: 'under100', label: '$50 - $100' },
                    { value: 'premium', label: '$100+' }
                  ]}
                  value={priceFilter}
                  onChange={setPriceFilter}
                  placeholder="Price Range"
                  size="medium"
                  variant="success"
                />
              </div>
              <div className="min-w-[200px]">
                <DropdownMenu
                  options={[
                    { value: 'popular', label: 'Most Popular' },
                    { value: 'rating', label: 'Highest Rated' },
                    { value: 'price-low', label: 'Price: Low to High' },
                    { value: 'price-high', label: 'Price: High to Low' },
                    { value: 'newest', label: 'Recently Updated' }
                  ]}
                  value={sortBy}
                  onChange={setSortBy}
                  placeholder="Sort by"
                  size="medium"
                  variant="default"
                />
              </div>
              <div className="flex gap-2 ml-auto">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`neu-button p-3 hover:scale-105 transition-transform ${
                    viewMode === 'grid' ? 'bg-blue-500 text-white' : ''
                  }`}
                >
                  <SafeIcon icon={FiGrid} className="w-5 h-5" />
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`neu-button p-3 hover:scale-105 transition-transform ${
                    viewMode === 'list' ? 'bg-blue-500 text-white' : ''
                  }`}
                >
                  <SafeIcon icon={FiList} className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Auth Notice for Guests */}
            {!user && (
              <div className="neu-card-inset p-4 bg-gradient-to-r from-yellow-50 to-orange-50">
                <div className="flex items-center gap-3">
                  <SafeIcon icon={FiShield} className="w-5 h-5 text-orange-600" />
                  <div>
                    <div className="font-medium text-neu-900">Browse Freely</div>
                    <div className="text-sm text-neu-600">
                      You can explore all apps without an account.
                      <button
                        onClick={() => setAuthModal({ isOpen: true, mode: 'signup', triggerAction: null })}
                        className="text-blue-600 hover:text-blue-800 font-medium ml-1"
                      >
                        Sign up
                      </button>
                      to purchase and download.
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </motion.div>

        {/* Apps Grid */}
        <div className={`grid gap-8 ${
          viewMode === 'grid' ? 'md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4' : 'grid-cols-1'
        }`}>
          {sortedApps.map((app, index) => (
            <motion.div
              key={app.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
            >
              <EnhancedAppCard
                app={app}
                viewMode={viewMode}
                user={user}
                onPurchase={() => handlePurchaseApp(app)}
                onDownload={() => handleDownloadApp(app)}
                onLike={() => handleLikeApp(app)}
                onViewDemo={() => handleViewDemo(app)} // ✅ Fixed navigation!
              />
            </motion.div>
          ))}
        </div>

        {/* Auth Modal */}
        <AuthModal
          isOpen={authModal.isOpen}
          onClose={() => setAuthModal({ isOpen: false, mode: 'login', triggerAction: null })}
          mode={authModal.mode}
          onSuccess={handleAuthSuccess}
          triggerAction={authModal.triggerAction}
        />
      </div>
    </div>
  );
};

// ✅ FIXED: Enhanced App Card Component with proper navigation
const EnhancedAppCard = ({ app, viewMode = 'grid', user, onPurchase, onDownload, onLike, onViewDemo }) => {
  const [isLiked, setIsLiked] = useState(false);

  const handleLike = () => {
    setIsLiked(!isLiked);
    onLike();
  };

  const ActionButton = ({ onClick, icon, children, variant = 'primary', disabled = false }) => (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`neu-button px-4 py-2 hover:scale-105 transition-transform disabled:opacity-50 ${
        variant === 'primary' ? 'bg-blue-500 text-white' :
        variant === 'success' ? 'bg-green-500 text-white' : ''
      }`}
    >
      <div className="flex items-center gap-2">
        <SafeIcon icon={icon} className="w-4 h-4" />
        <span className="font-medium">{children}</span>
      </div>
    </button>
  );

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      whileHover={{ scale: 1.02 }}
      className="neu-card p-6 hover:shadow-lg transition-all duration-300 group bg-white"
    >
      <div className="space-y-4">
        {/* Preview Image */}
        <div className="neu-card-inset p-2 bg-gradient-to-br from-blue-50 to-purple-50 rounded-lg">
          <div className="aspect-video bg-white rounded-lg overflow-hidden">
            <img
              src={app.preview}
              alt={app.name}
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        {/* App Info */}
        <div className="space-y-3">
          <div className="flex items-start justify-between">
            <div>
              <h3 className="font-semibold text-neu-900 text-lg">{app.name}</h3>
              <p className="text-neu-600 text-sm">{app.description}</p>
              <div className="text-xs text-neu-500 mt-1">by {app.developer}</div>
            </div>
            <button
              onClick={handleLike}
              className="neu-button p-2 hover:scale-110 transition-transform"
            >
              <SafeIcon icon={FiHeart} className={`w-4 h-4 ${isLiked ? 'text-red-500' : 'text-neu-500'}`} />
            </button>
          </div>

          {/* Tags */}
          <div className="flex flex-wrap gap-1">
            {app.tags.slice(0, 3).map(tag => (
              <span
                key={tag}
                className="px-2 py-1 text-xs text-neu-600 rounded-full"
                style={{
                  backgroundColor: '#f9f9ff',
                  boxShadow: 'inset 2px 2px 4px #d1d1d8, inset -2px -2px 4px #ffffff'
                }}
              >
                {tag}
              </span>
            ))}
          </div>

          {/* Stats */}
          <div className="flex items-center justify-between text-sm">
            <div className="flex items-center gap-1">
              <SafeIcon icon={FiStar} className="w-4 h-4 text-yellow-500" />
              <span className="text-neu-700 font-medium">{app.rating}</span>
            </div>
            <div className="flex items-center gap-1">
              <SafeIcon icon={FiDownload} className="w-4 h-4 text-neu-500" />
              <span className="text-neu-600">{app.downloads}</span>
            </div>
            <div className="text-2xl font-bold text-neu-900">
              {app.price === 0 ? 'Free' : `$${app.price}`}
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="flex gap-2">
          {/* ✅ FIXED: View Demo Button - Now properly calls onViewDemo */}
          <button
            onClick={() => {
              console.log('Demo button clicked for app:', app.id); // Debug log
              onViewDemo();
            }}
            className="neu-button px-4 py-2 hover:scale-105 transition-transform"
          >
            <SafeIcon icon={FiEye} className="w-4 h-4 text-neu-600" />
          </button>
          
          {user ? (
            <ActionButton
              onClick={app.price === 0 ? onDownload : onPurchase}
              icon={app.price === 0 ? FiDownload : FiShoppingCart}
              variant="primary"
            >
              {app.price === 0 ? 'Download' : 'Purchase'}
            </ActionButton>
          ) : (
            <ActionButton
              onClick={onPurchase}
              icon={FiShield}
              variant="success"
            >
              Sign In to Buy
            </ActionButton>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default AppStore;