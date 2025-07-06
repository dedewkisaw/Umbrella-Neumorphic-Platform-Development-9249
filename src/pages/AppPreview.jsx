import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useParams, useNavigate } from 'react-router-dom';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../common/SafeIcon';
import { useAuth } from '../hooks/useAuth';
import AuthModal from '../components/AuthModal';

const {
  FiArrowLeft,
  FiExternalLink,
  FiShoppingCart,
  FiHeart,
  FiShare,
  FiStar,
  FiDownload,
  FiEye,
  FiCode,
  FiMonitor,
  FiSmartphone,
  FiTablet,
  FiZap,
  FiShield,
  FiCheck,
  FiPlay,
  FiPause,
  FiRefreshCw,
  FiMaximize2,
  FiMinimize2,
  FiInfo,
  FiGlobe,
  FiUsers,
  FiEdit,
  FiBarChart,
  FiGamepad2,
  FiBookOpen,
  FiHome
} = FiIcons;

const AppPreview = () => {
  const { appId } = useParams();
  const navigate = useNavigate();
  const { user, login } = useAuth();
  
  const [app, setApp] = useState(null);
  const [viewMode, setViewMode] = useState('desktop'); // desktop, tablet, mobile
  const [isLiked, setIsLiked] = useState(false);
  const [showCode, setShowCode] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [authModal, setAuthModal] = useState({ isOpen: false, mode: 'login', triggerAction: null });

  // Mock app data - in real app, fetch by appId
  const mockApps = {
    1: {
      id: 1,
      name: 'ShopFlow Pro',
      developer: 'TechStudio',
      category: 'E-commerce',
      price: 49.99,
      rating: 4.8,
      downloads: 1250,
      preview: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800&h=600&fit=crop',
      demoUrl: 'https://shopflow-pro-demo.vercel.app',
      description: 'Complete e-commerce solution with inventory management, analytics dashboard, and seamless payment integration.',
      features: [
        'Advanced inventory management',
        'Real-time analytics dashboard',
        'Stripe payment integration',
        'Customer management system',
        'Order tracking & notifications',
        'Mobile-responsive design',
        'SEO optimization',
        'Multi-language support'
      ],
      techStack: ['React', 'Node.js', 'MongoDB', 'Stripe', 'Tailwind CSS'],
      screenshots: [
        'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800&h=600&fit=crop',
        'https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=800&h=600&fit=crop',
        'https://images.unsplash.com/photo-1556742111-a301076d9d18?w=800&h=600&fit=crop'
      ],
      highlights: [
        'Production-ready code',
        'Comprehensive documentation',
        'Lifetime updates',
        'Developer support'
      ]
    },
    2: {
      id: 2,
      name: 'Creative Portfolio',
      developer: 'DesignLab',
      category: 'Portfolio',
      price: 29.99,
      rating: 4.9,
      downloads: 890,
      preview: 'https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?w=800&h=600&fit=crop',
      demoUrl: 'https://creative-portfolio-demo.vercel.app',
      description: 'Stunning portfolio template for designers and creative professionals with smooth animations and modern design.',
      features: [
        'Smooth scroll animations',
        'Interactive project gallery',
        'Contact form integration',
        'Blog functionality',
        'Dark/light mode toggle',
        'Responsive design',
        'Fast loading times',
        'Custom cursor effects'
      ],
      techStack: ['React', 'Framer Motion', 'GSAP', 'EmailJS', 'CSS3'],
      screenshots: [
        'https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?w=800&h=600&fit=crop',
        'https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=800&h=600&fit=crop',
        'https://images.unsplash.com/photo-1581291518633-83b4ebd1d83e?w=800&h=600&fit=crop'
      ],
      highlights: [
        'Award-winning design',
        'Animation library included',
        'Easy customization',
        'Portfolio CMS'
      ]
    }
  };

  // Get app icon based on category
  const getAppIcon = (category) => {
    const iconMap = {
      'E-commerce': FiShoppingCart,
      'Portfolio': FiUsers,
      'Blog': FiEdit,
      'Landing': FiZap,
      'SaaS': FiBarChart,
      'Games': FiGamepad2,
      'Education': FiBookOpen
    };
    return iconMap[category] || FiGlobe;
  };

  // Get responsive dimensions
  const getViewportDimensions = () => {
    switch (viewMode) {
      case 'mobile':
        return { width: '375px', height: '667px' };
      case 'tablet':
        return { width: '768px', height: '1024px' };
      default:
        return { width: '100%', height: '600px' };
    }
  };

  useEffect(() => {
    // Simulate loading
    setIsLoading(true);
    setTimeout(() => {
      const foundApp = mockApps[appId] || mockApps[1];
      setApp(foundApp);
      setIsLoading(false);
    }, 1000);
  }, [appId]);

  // Handle auth required actions
  const handleAuthRequired = (action, callback) => {
    if (user) {
      callback();
    } else {
      setAuthModal({
        isOpen: true,
        mode: 'login',
        triggerAction: action
      });
    }
  };

  const handleAuthSuccess = (userData) => {
    login(userData);
    setAuthModal({ isOpen: false, mode: 'login', triggerAction: null });
  };

  const handlePurchase = () => {
    handleAuthRequired(`purchase ${app.name}`, () => {
      console.log('Purchasing app:', app.name);
      // Implement purchase logic
    });
  };

  const handleLike = () => {
    handleAuthRequired(`like ${app.name}`, () => {
      setIsLiked(!isLiked);
    });
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: app.name,
        text: app.description,
        url: window.location.href
      });
    } else {
      navigator.clipboard.writeText(window.location.href);
      // Show toast notification
      console.log('Link copied to clipboard!');
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 flex items-center justify-center p-6">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center"
        >
          <div className="neu-button p-6 inline-flex mx-auto mb-6 bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-xl">
            <div className="w-8 h-8 border-4 border-white border-t-transparent rounded-full animate-spin"></div>
          </div>
          <h3 className="text-2xl font-bold text-neu-900 mb-4">Loading Demo</h3>
          <p className="text-neu-600 text-lg">Preparing your app preview...</p>
        </motion.div>
      </div>
    );
  }

  if (!app) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 flex items-center justify-center p-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center neu-card p-12 max-w-md w-full bg-white"
        >
          <SafeIcon icon={FiInfo} className="w-16 h-16 text-neu-400 mx-auto mb-6" />
          <h3 className="text-2xl font-bold text-neu-900 mb-4">App Not Found</h3>
          <p className="text-neu-600 mb-8 text-lg">The requested app demo could not be found.</p>
          <button
            onClick={() => navigate('/marketplace')}
            className="neu-button px-8 py-4 bg-gradient-to-r from-blue-500 to-purple-500 text-white hover:scale-105 transition-transform shadow-xl"
          >
            <div className="flex items-center gap-3">
              <SafeIcon icon={FiArrowLeft} className="w-5 h-5" />
              <span className="font-semibold">Back to Marketplace</span>
            </div>
          </button>
        </motion.div>
      </div>
    );
  }

  const IconComponent = getAppIcon(app.category);
  const dimensions = getViewportDimensions();

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50">
      {/* Header */}
      <motion.header
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-neu-100/80 backdrop-blur-xl border-b border-neu-200/50 shadow-lg sticky top-0 z-50"
      >
        <div className="max-w-7xl mx-auto px-4 lg:px-6 py-4 lg:py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4 lg:gap-6">
              <button
                onClick={() => navigate(-1)}
                className="neu-button p-3 lg:p-4 hover:scale-105 transition-transform group"
              >
                <SafeIcon icon={FiArrowLeft} className="w-5 h-5 lg:w-6 lg:h-6 text-neu-600 group-hover:-translate-x-1 transition-transform" />
              </button>
              
              <div className="flex items-center gap-3 lg:gap-4">
                <div className="neu-button p-3 lg:p-4 bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-xl">
                  <SafeIcon icon={IconComponent} className="w-5 h-5 lg:w-6 lg:h-6" />
                </div>
                <div>
                  <h1 className="text-xl lg:text-2xl xl:text-3xl font-bold text-neu-900">{app.name}</h1>
                  <p className="text-neu-600 text-sm lg:text-base">Live Demo Preview</p>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-3 lg:gap-4">
              {/* Viewport Controls */}
              <div className="neu-card-inset p-1 lg:p-2 bg-gradient-to-r from-blue-50 to-purple-50">
                <div className="flex items-center gap-1">
                  <button
                    onClick={() => setViewMode('desktop')}
                    className={`neu-button p-2 lg:p-3 hover:scale-105 transition-transform ${
                      viewMode === 'desktop' ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-lg' : 'text-neu-600'
                    }`}
                    title="Desktop View"
                  >
                    <SafeIcon icon={FiMonitor} className="w-4 h-4 lg:w-5 lg:h-5" />
                  </button>
                  <button
                    onClick={() => setViewMode('tablet')}
                    className={`neu-button p-2 lg:p-3 hover:scale-105 transition-transform ${
                      viewMode === 'tablet' ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-lg' : 'text-neu-600'
                    }`}
                    title="Tablet View"
                  >
                    <SafeIcon icon={FiTablet} className="w-4 h-4 lg:w-5 lg:h-5" />
                  </button>
                  <button
                    onClick={() => setViewMode('mobile')}
                    className={`neu-button p-2 lg:p-3 hover:scale-105 transition-transform ${
                      viewMode === 'mobile' ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-lg' : 'text-neu-600'
                    }`}
                    title="Mobile View"
                  >
                    <SafeIcon icon={FiSmartphone} className="w-4 h-4 lg:w-5 lg:h-5" />
                  </button>
                </div>
              </div>

              {/* Action Buttons */}
              <button
                onClick={handleLike}
                className={`neu-button p-3 lg:p-4 hover:scale-105 transition-transform ${
                  isLiked ? 'bg-gradient-to-r from-red-500 to-pink-500 text-white shadow-lg' : 'text-neu-600'
                }`}
              >
                <SafeIcon icon={FiHeart} className="w-5 h-5 lg:w-6 lg:h-6" />
              </button>
              
              <button
                onClick={handleShare}
                className="neu-button p-3 lg:p-4 hover:scale-105 transition-transform text-neu-600"
              >
                <SafeIcon icon={FiShare} className="w-5 h-5 lg:w-6 lg:h-6" />
              </button>

              <button
                onClick={() => setIsFullscreen(!isFullscreen)}
                className="neu-button p-3 lg:p-4 hover:scale-105 transition-transform text-neu-600"
              >
                <SafeIcon icon={isFullscreen ? FiMinimize2 : FiMaximize2} className="w-5 h-5 lg:w-6 lg:h-6" />
              </button>

              <button
                onClick={() => navigate('/')}
                className="neu-button px-4 py-2 lg:px-6 lg:py-3 hover:scale-105 transition-transform group"
              >
                <div className="flex items-center gap-2 lg:gap-3">
                  <SafeIcon icon={FiHome} className="w-4 h-4 lg:w-5 lg:h-5 text-neu-600 group-hover:scale-110 transition-transform" />
                  <span className="text-neu-700 font-medium text-sm lg:text-base">Home</span>
                </div>
              </button>
            </div>
          </div>
        </div>
      </motion.header>

      {/* Main Content */}
      <div className={`${isFullscreen ? 'h-screen' : 'min-h-screen'} p-4 lg:p-6`}>
        <div className="max-w-7xl mx-auto">
          <div className={`grid ${isFullscreen ? 'grid-cols-1' : 'lg:grid-cols-4'} gap-6 lg:gap-8 h-full`}>
            
            {/* App Info Sidebar */}
            {!isFullscreen && (
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="lg:col-span-1 space-y-6 lg:space-y-8"
              >
                {/* App Details */}
                <div className="neu-card p-6 lg:p-8 bg-gradient-to-br from-white to-blue-50">
                  <div className="space-y-4 lg:space-y-6">
                    <div className="flex items-center gap-3 lg:gap-4">
                      <div className="flex items-center gap-1 lg:gap-2">
                        <SafeIcon icon={FiStar} className="w-4 h-4 lg:w-5 lg:h-5 text-yellow-500" />
                        <span className="text-neu-900 font-bold text-lg">{app.rating}</span>
                      </div>
                      <div className="flex items-center gap-1 lg:gap-2">
                        <SafeIcon icon={FiDownload} className="w-4 h-4 lg:w-5 lg:h-5 text-neu-500" />
                        <span className="text-neu-700 font-medium">{app.downloads}</span>
                      </div>
                    </div>
                    
                    <div>
                      <h3 className="text-neu-900 font-bold text-lg lg:text-xl mb-3 lg:mb-4">Description</h3>
                      <p className="text-neu-700 leading-relaxed text-sm lg:text-base">{app.description}</p>
                    </div>

                    <div>
                      <h4 className="text-neu-900 font-bold text-base lg:text-lg mb-3 lg:mb-4">Key Features</h4>
                      <ul className="space-y-2 lg:space-y-3">
                        {app.features.slice(0, 6).map((feature, index) => (
                          <li key={index} className="flex items-center gap-2 lg:gap-3 text-sm lg:text-base">
                            <div className="neu-button p-1 lg:p-2 bg-gradient-to-r from-green-500 to-blue-500 text-white flex-shrink-0">
                              <SafeIcon icon={FiCheck} className="w-3 h-3 lg:w-4 lg:h-4" />
                            </div>
                            <span className="text-neu-700">{feature}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div>
                      <h4 className="text-neu-900 font-bold text-base lg:text-lg mb-3 lg:mb-4">Tech Stack</h4>
                      <div className="flex flex-wrap gap-2 lg:gap-3">
                        {app.techStack.map((tech, index) => (
                          <span 
                            key={index} 
                            className="neu-button px-3 py-1 lg:px-4 lg:py-2 text-xs lg:text-sm font-medium text-neu-700 bg-gradient-to-r from-blue-100 to-purple-100"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="neu-card-inset p-4 lg:p-6 bg-gradient-to-r from-green-50 to-blue-50">
                      <div className="flex items-center justify-between mb-4 lg:mb-6">
                        <span className="text-neu-600 font-medium">Price</span>
                        <span className="text-2xl lg:text-3xl font-bold text-neu-900">${app.price}</span>
                      </div>
                      
                      <button
                        onClick={handlePurchase}
                        className="w-full neu-button py-3 lg:py-4 bg-gradient-to-r from-green-500 to-blue-500 text-white hover:scale-105 transition-transform shadow-xl"
                      >
                        <div className="flex items-center justify-center gap-2 lg:gap-3">
                          <SafeIcon icon={FiShoppingCart} className="w-5 h-5 lg:w-6 lg:h-6" />
                          <span className="font-bold text-base lg:text-lg">Purchase App</span>
                        </div>
                      </button>
                    </div>
                  </div>
                </div>

                {/* Developer Info */}
                <div className="neu-card p-6 lg:p-8 bg-gradient-to-br from-white to-purple-50">
                  <h4 className="text-neu-900 font-bold text-lg lg:text-xl mb-4">Developer</h4>
                  <div className="space-y-3">
                    <div className="flex items-center gap-3">
                      <div className="neu-button p-2 lg:p-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white">
                        <SafeIcon icon={FiUsers} className="w-4 h-4 lg:w-5 lg:h-5" />
                      </div>
                      <div>
                        <p className="font-bold text-neu-900">{app.developer}</p>
                        <p className="text-neu-600 text-sm">Verified Developer</p>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {/* Preview Area */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className={`${isFullscreen ? 'col-span-1' : 'lg:col-span-3'}`}
            >
              <div className="neu-card p-6 lg:p-8 bg-gradient-to-br from-white to-blue-50 h-full">
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-3 lg:gap-4">
                    <div className="neu-card-inset p-2 lg:p-3 bg-gradient-to-r from-blue-50 to-purple-50">
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 lg:w-3 lg:h-3 bg-red-500 rounded-full"></div>
                        <div className="w-2 h-2 lg:w-3 lg:h-3 bg-yellow-500 rounded-full"></div>
                        <div className="w-2 h-2 lg:w-3 lg:h-3 bg-green-500 rounded-full"></div>
                      </div>
                    </div>
                    <div className="neu-card-inset px-4 py-2 lg:px-6 lg:py-3 bg-gradient-to-r from-blue-50 to-purple-50">
                      <div className="flex items-center gap-2">
                        <SafeIcon icon={FiGlobe} className="w-3 h-3 lg:w-4 lg:h-4 text-neu-500" />
                        <span className="text-neu-700 font-medium text-sm lg:text-base">{app.demoUrl}</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-3 lg:gap-4">
                    <span className="text-neu-600 font-medium text-sm lg:text-base capitalize">{viewMode} View</span>
                    <button
                      onClick={() => window.open(app.demoUrl, '_blank')}
                      className="neu-button p-2 lg:p-3 bg-gradient-to-r from-blue-500 to-purple-500 text-white hover:scale-105 transition-transform shadow-lg"
                      title="Open in New Tab"
                    >
                      <SafeIcon icon={FiExternalLink} className="w-4 h-4 lg:w-5 lg:h-5" />
                    </button>
                  </div>
                </div>

                {/* Preview Frame */}
                <div className="neu-card-inset p-4 lg:p-6 bg-gradient-to-br from-blue-50 to-purple-50 rounded-2xl h-full flex items-center justify-center">
                  <div 
                    className="bg-white rounded-xl overflow-hidden shadow-2xl transition-all duration-300 border border-white/50"
                    style={{
                      width: dimensions.width,
                      height: dimensions.height,
                      maxWidth: '100%',
                      maxHeight: '100%'
                    }}
                  >
                    <iframe
                      src={app.demoUrl}
                      className="w-full h-full border-0 rounded-xl"
                      title={`${app.name} Demo`}
                      loading="lazy"
                      sandbox="allow-same-origin allow-scripts allow-forms"
                    />
                  </div>
                </div>

                {/* Quick Actions */}
                <div className="flex items-center justify-center gap-4 lg:gap-6 mt-6">
                  <button
                    onClick={() => window.location.reload()}
                    className="neu-button px-4 py-2 lg:px-6 lg:py-3 hover:scale-105 transition-transform"
                  >
                    <div className="flex items-center gap-2">
                      <SafeIcon icon={FiRefreshCw} className="w-4 h-4 lg:w-5 lg:h-5 text-neu-600" />
                      <span className="text-neu-700 font-medium">Refresh</span>
                    </div>
                  </button>
                  
                  <button
                    onClick={() => setShowCode(!showCode)}
                    className="neu-button px-4 py-2 lg:px-6 lg:py-3 hover:scale-105 transition-transform"
                  >
                    <div className="flex items-center gap-2">
                      <SafeIcon icon={FiCode} className="w-4 h-4 lg:w-5 lg:h-5 text-neu-600" />
                      <span className="text-neu-700 font-medium">{showCode ? 'Hide' : 'Show'} Code</span>
                    </div>
                  </button>
                </div>

                {/* Code Preview */}
                {showCode && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    className="mt-6 neu-card-inset p-4 lg:p-6 bg-gradient-to-r from-gray-900 to-blue-900 rounded-xl overflow-x-auto"
                  >
                    <pre className="text-green-400 text-sm lg:text-base">
                      <code>{`// ${app.name} - Sample Code Structure
import React from 'react';
import { ${app.techStack.join(', ')} } from 'dependencies';

const ${app.name.replace(/\s+/g, '')} = () => {
  return (
    <div className="app-container">
      <Header />
      <MainContent />
      <Footer />
    </div>
  );
};

export default ${app.name.replace(/\s+/g, '')};`}</code>
                    </pre>
                  </motion.div>
                )}
              </div>
            </motion.div>
          </div>
        </div>
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
  );
};

export default AppPreview;