import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate, useLocation } from 'react-router-dom';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../common/SafeIcon';
import SubscriptionModal from '../components/SubscriptionModal';
import AuthModal from '../components/AuthModal';
import { useAuth } from '../hooks/useAuth';

const {
  FiArrowLeft,
  FiShoppingBag,
  FiBarChart,
  FiGlobe,
  FiDollarSign,
  FiShoppingCart,
  FiEye,
  FiDownload,
  FiStar,
  FiTrendingUp,
  FiZap,
  FiShield,
  FiCheck,
  FiClock,
  FiHeart,
  FiAward,
  FiGift,
  FiUsers,
  FiCalendar,
  FiCreditCard,
  FiPackage,
  FiExternalLink,
  FiShare,
  FiFolderOpen,
  FiRefreshCw,
  FiFilter,
  FiSearch,
  FiMail,
  FiPhone,
  FiMapPin,
  FiArchive
} = FiIcons;

const Dashboard = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { user, login } = useAuth();

  // Auth Modal State for non-authenticated users
  const [authModal, setAuthModal] = useState({
    isOpen: false,
    mode: 'login',
    triggerAction: null
  });

  const [activeTab, setActiveTab] = useState('library');
  const [sortBy, setSortBy] = useState('recent');
  const [filterBy, setFilterBy] = useState('all');
  const [purchasedApps, setPurchasedApps] = useState([]);
  const [isSubscriptionModalOpen, setIsSubscriptionModalOpen] = useState(false);
  const [currentPlan, setCurrentPlan] = useState('Free');

  // Check authentication on component mount
  useEffect(() => {
    if (!user) {
      // User is not authenticated, show login modal
      setAuthModal({
        isOpen: true,
        mode: 'login',
        triggerAction: 'access your dashboard'
      });
    } else {
      // User is authenticated, load their purchased apps
      setPurchasedApps([
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
        }
        // Add more apps based on user's actual purchases
      ]);
    }
  }, [user]);

  // Handle successful authentication
  const handleAuthSuccess = (userData) => {
    login(userData);
    setAuthModal({
      isOpen: false,
      mode: 'login',
      triggerAction: null
    });
    // Now load user's purchased apps
    // In a real app, you'd fetch this from your backend
    setPurchasedApps([
      // User's actual purchased apps would be loaded here
    ]);
  };

  // Handle auth modal close - redirect to home if user cancels
  const handleAuthModalClose = () => {
    setAuthModal({
      isOpen: false,
      mode: 'login',
      triggerAction: null
    });
    navigate('/'); // Redirect to home page
  };

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

  // If user is not authenticated, show auth modal
  if (!user) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 flex items-center justify-center p-6">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="neu-card p-8 max-w-md w-full text-center bg-white"
        >
          <div className="neu-button p-4 inline-flex mx-auto mb-6 bg-blue-500 text-white">
            <SafeIcon icon={FiUsers} className="w-8 h-8" />
          </div>
          <h2 className="text-2xl font-bold text-neu-900 mb-4">Access Required</h2>
          <p className="text-neu-600 mb-6">
            Please sign in to access your dashboard and manage your purchased applications.
          </p>
          <div className="space-y-4">
            <button
              onClick={() => setAuthModal({ isOpen: true, mode: 'login', triggerAction: 'access your dashboard' })}
              className="w-full neu-button py-3 bg-blue-500 text-white hover:scale-105 transition-transform"
            >
              <div className="flex items-center justify-center gap-2">
                <SafeIcon icon={FiShield} className="w-5 h-5" />
                <span className="font-semibold">Sign In</span>
              </div>
            </button>
            <button
              onClick={() => navigate('/')}
              className="w-full neu-button py-3 hover:scale-105 transition-transform"
            >
              <div className="flex items-center justify-center gap-2">
                <SafeIcon icon={FiArrowLeft} className="w-5 h-5 text-neu-600" />
                <span className="text-neu-700 font-medium">Back to Home</span>
              </div>
            </button>
          </div>
        </motion.div>

        {/* Auth Modal */}
        <AuthModal
          isOpen={authModal.isOpen}
          onClose={handleAuthModalClose}
          mode={authModal.mode}
          onSuccess={handleAuthSuccess}
          triggerAction={authModal.triggerAction}
        />
      </div>
    );
  }

  // ✅ FIXED: App action handlers with proper navigation
  const handleDownloadApp = (app) => {
    console.log('Downloading:', app.name);
    // Implement actual download logic
    // Create a temporary download link
    const link = document.createElement('a');
    link.href = app.downloadUrl || '#';
    link.download = `${app.name.toLowerCase().replace(/\s+/g, '-')}.zip`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
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

  // ✅ FIXED: View Demo handler for purchased apps
  const handleViewDemo = (app) => {
    console.log('Viewing demo for app:', app.id); // Debug log
    navigate(`/preview/${app.id}`);
  };

  const totalSpent = purchasedApps.reduce((sum, app) => sum + app.price, 0);
  const totalApps = purchasedApps.length;

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
                  Welcome back, {user.name}! Manage your premium application library
                </p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="neu-button px-6 py-3 bg-green-100">
                <div className="flex items-center gap-2">
                  <img src={user.avatar} alt={user.name} className="w-6 h-6 rounded-full" />
                  <span className="text-green-700 font-medium">{currentPlan} Member</span>
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

        {/* Show empty state if user has no purchased apps */}
        {purchasedApps.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="neu-card p-12 text-center bg-white"
          >
            <div className="neu-button p-6 inline-flex mx-auto mb-6 bg-blue-100">
              <SafeIcon icon={FiShoppingBag} className="w-12 h-12 text-blue-600" />
            </div>
            <h3 className="text-2xl font-bold text-neu-900 mb-4">Start Your Journey</h3>
            <p className="text-neu-600 mb-8 text-lg max-w-2xl mx-auto">
              Welcome to your dashboard! You haven't purchased any apps yet. Discover amazing professional applications in our premium marketplace.
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
          </motion.div>
        ) : (
          // Show user's purchased apps
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
                  onViewDemo={handleViewDemo} // ✅ Added view demo handler
                />
              </motion.div>
            ))}
          </div>
        )}

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

// ✅ FIXED: Enhanced Component for purchased app cards with view demo
const EnhancedPurchasedAppCard = ({ app, onDownload, onUpdate, onViewDemo }) => {
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
      className="neu-card p-6 hover:shadow-lg transition-all duration-300 group bg-white"
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
            <img
              src={app.preview}
              alt={app.name}
              className="w-full h-full object-cover"
            />
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

        {/* Enhanced Actions */}
        <div className="flex gap-3">
          {/* ✅ FIXED: Added View Demo button */}
          <button
            onClick={() => onViewDemo(app)}
            className="neu-button py-3 px-4 hover:scale-105 transition-transform group"
          >
            <div className="flex items-center justify-center gap-2">
              <SafeIcon icon={FiEye} className="w-4 h-4 text-neu-600 group-hover:scale-110 transition-transform" />
              <span className="text-neu-700 font-medium">Preview</span>
            </div>
          </button>

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