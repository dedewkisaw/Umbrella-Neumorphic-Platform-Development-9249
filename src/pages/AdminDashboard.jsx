import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../common/SafeIcon';
import DropdownMenu from '../components/DropdownMenu';
import AdminAnalytics from '../components/AdminAnalytics';
import AdminUserManagement from '../components/AdminUserManagement';
import AdminRoleManagement from '../components/AdminRoleManagement';
import useDataStore from '../stores/DataStore';
import { useRealtimeData } from '../hooks/useRealtimeData';

const {
  FiShield,
  FiUsers,
  FiDollarSign,
  FiTrendingUp,
  FiActivity,
  FiGlobe,
  FiShoppingCart,
  FiEye,
  FiDownload,
  FiStar,
  FiClock,
  FiBarChart,
  FiPieChart,
  FiMap,
  FiMonitor,
  FiDatabase,
  FiLock,
  FiLogOut,
  FiRefreshCw,
  FiAlertTriangle,
  FiCheckCircle,
  FiXCircle,
  FiSettings,
  FiMail,
  FiPhone,
  FiCreditCard,
  FiTarget,
  FiTrendingDown,
  FiUserCheck,
  FiUserX,
  FiFilter,
  FiCalendar,
  FiFileText,
  FiExternalLink,
  FiAward,
  FiCpu,
  FiHardDrive,
  FiWifi,
  FiServer,
  FiCloud,
  FiCode,
  FiPackage,
  FiEdit,
  FiBookOpen,
  FiGamepad2,
  FiLayers,
  FiZap,
  FiMessageSquare,
  FiCrown,
  FiFlag,
  FiTrash,
  FiSearch,
  FiPlus,
  FiMinus,
  FiX,
  FiCheck,
  FiUpload,
  FiArchive,
  FiPlay,
  FiPause,
  FiRotateCcw,
  FiHeart,
  FiShare,
  FiLink,
  FiCopy,
  FiMoreHorizontal
} = FiIcons;

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('overview');
  const [dateRange, setDateRange] = useState('7d');
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [lastUpdate, setLastUpdate] = useState(new Date());

  // Get real-time data from store
  const { users, applications, transactions, activityLogs, getStats, simulateActivity } = useDataStore();
  const stats = getStats();

  // Enable real-time updates
  useRealtimeData(8000); // Update every 8 seconds

  // Update last update time when data changes
  useEffect(() => {
    setLastUpdate(new Date());
  }, [users, applications, transactions, activityLogs]);

  // Real-time security data
  const [securityMetrics, setSecurityMetrics] = useState({
    threatLevel: 'Low',
    blockedAttacks: 0,
    activeConnections: 0,
    failedLogins: 0
  });

  // Real-time system metrics
  const [systemMetrics, setSystemMetrics] = useState({
    cpuUsage: 0,
    memoryUsage: 0,
    diskUsage: 0,
    networkIn: 0,
    networkOut: 0,
    uptime: '99.96%'
  });

  // Update metrics in real-time
  useEffect(() => {
    const interval = setInterval(() => {
      setSecurityMetrics(prev => ({
        threatLevel: ['Low', 'Medium', 'Low', 'Low'][Math.floor(Math.random() * 4)],
        blockedAttacks: prev.blockedAttacks + Math.floor(Math.random() * 3),
        activeConnections: 150 + Math.floor(Math.random() * 50),
        failedLogins: prev.failedLogins + Math.floor(Math.random() * 2)
      }));

      setSystemMetrics(prev => ({
        cpuUsage: 15 + Math.random() * 25,
        memoryUsage: 45 + Math.random() * 20,
        diskUsage: 68 + Math.random() * 5,
        networkIn: Math.random() * 100,
        networkOut: Math.random() * 80,
        uptime: '99.96%'
      }));
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const tabs = [
    { id: 'overview', label: 'Overview', icon: FiBarChart },
    { id: 'analytics', label: 'Analytics', icon: FiPieChart },
    { id: 'users', label: 'Users', icon: FiUsers },
    { id: 'roles', label: 'Roles & Permissions', icon: FiCrown },
    { id: 'sales', label: 'Sales', icon: FiDollarSign },
    { id: 'apps', label: 'Applications', icon: FiShoppingCart },
    { id: 'messages', label: 'Messages', icon: FiMessageSquare },
    { id: 'security', label: 'Security', icon: FiShield },
    { id: 'system', label: 'System', icon: FiMonitor }
  ];

  const handleLogout = () => {
    localStorage.removeItem('admin_session');
    localStorage.removeItem('admin_login_time');
    navigate('/admin');
    window.location.reload();
  };

  const refreshData = async () => {
    setIsRefreshing(true);
    // Simulate manual data refresh
    simulateActivity();
    await new Promise(resolve => setTimeout(resolve, 1500));
    setLastUpdate(new Date());
    setIsRefreshing(false);
  };

  // Get recent activity with user and app details
  const getRecentActivity = () => {
    return activityLogs.slice(0, 5).map(log => {
      const user = users.find(u => u.id === log.userId);
      const app = applications.find(a => a.id === log.appId);
      return {
        id: log.id,
        type: log.type,
        user: user?.email || 'Unknown User',
        app: app?.name || log.details,
        time: new Date(log.timestamp).toLocaleTimeString(),
        location: user?.location || 'Unknown',
        amount: log.type === 'app_purchase' ? app?.price : null
      };
    });
  };

  // Get top performing apps
  const getTopApps = () => {
    return [...applications]
      .sort((a, b) => b.revenue - a.revenue)
      .slice(0, 5);
  };

  const recentActivity = getRecentActivity();
  const topApps = getTopApps();

  // Enhanced app icon mapping
  const getAppIcon = (category) => {
    const iconMap = {
      'E-commerce': FiShoppingCart,
      'Portfolio': FiUsers,
      'Blog': FiEdit,
      'Landing': FiZap,
      'SaaS': FiLayers,
      'Games': FiGamepad2,
      'Education': FiBookOpen,
      'ecommerce': FiShoppingCart,
      'portfolio': FiUsers,
      'blog': FiEdit,
      'landing': FiZap,
      'saas': FiLayers
    };
    return iconMap[category] || FiPackage;
  };

  const getAppGradient = (category) => {
    const gradientMap = {
      'E-commerce': 'from-green-500 to-emerald-500',
      'Portfolio': 'from-blue-500 to-cyan-500',
      'Blog': 'from-purple-500 to-pink-500',
      'Landing': 'from-yellow-500 to-orange-500',
      'SaaS': 'from-indigo-500 to-purple-500',
      'Games': 'from-red-500 to-pink-500',
      'Education': 'from-teal-500 to-blue-500',
      'ecommerce': 'from-green-500 to-emerald-500',
      'portfolio': 'from-blue-500 to-cyan-500',
      'blog': 'from-purple-500 to-pink-500',
      'landing': 'from-yellow-500 to-orange-500',
      'saas': 'from-indigo-500 to-purple-500'
    };
    return gradientMap[category] || 'from-gray-500 to-gray-600';
  };

  // Security logs with real-time updates
  const [securityLogs, setSecurityLogs] = useState([
    {
      id: 1,
      type: 'login',
      severity: 'info',
      message: 'Admin login successful',
      ip: '192.168.1.1',
      time: new Date().toLocaleTimeString(),
      location: 'San Francisco, CA'
    },
    {
      id: 2,
      type: 'failed_login',
      severity: 'warning',
      message: 'Failed login attempt',
      ip: '45.123.45.67',
      time: new Date(Date.now() - 300000).toLocaleTimeString(),
      location: 'Unknown'
    },
    {
      id: 3,
      type: 'api_limit',
      severity: 'warning',
      message: 'Rate limit exceeded',
      ip: '123.45.67.89',
      time: new Date(Date.now() - 600000).toLocaleTimeString(),
      location: 'London, UK'
    }
  ]);

  // Update security logs periodically
  useEffect(() => {
    const interval = setInterval(() => {
      if (Math.random() > 0.7) {
        const newLog = {
          id: Date.now(),
          type: ['login', 'failed_login', 'api_access', 'data_export'][Math.floor(Math.random() * 4)],
          severity: ['info', 'warning', 'error'][Math.floor(Math.random() * 3)],
          message: [
            'User authentication successful',
            'Suspicious login attempt blocked',
            'API rate limit exceeded',
            'Data export completed'
          ][Math.floor(Math.random() * 4)],
          ip: `${Math.floor(Math.random() * 255)}.${Math.floor(Math.random() * 255)}.${Math.floor(Math.random() * 255)}.${Math.floor(Math.random() * 255)}`,
          time: new Date().toLocaleTimeString(),
          location: ['New York, NY', 'London, UK', 'Tokyo, JP', 'Sydney, AU'][Math.floor(Math.random() * 4)]
        };
        setSecurityLogs(prev => [newLog, ...prev.slice(0, 9)]);
      }
    }, 10000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 p-4 lg:p-6">
      <div className="max-w-7xl mx-auto">
        {/* Enhanced Header with Neumorphic Design */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="neu-card p-6 mb-8 bg-gradient-to-r from-blue-50 to-purple-50"
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="neu-button p-3 bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-xl">
                <SafeIcon icon={FiShield} className="w-6 h-6" />
              </div>
              <div>
                <h1 className="text-2xl lg:text-3xl font-bold text-neu-900">
                  Umbrella <span className="gradient-text">Admin</span>
                </h1>
                <p className="text-neu-600">Real-time Analytics Dashboard</p>
                <div className="flex items-center gap-4 mt-2">
                  <div className="text-sm text-green-600 flex items-center gap-1">
                    <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                    {stats.activeUsers} users online
                  </div>
                  <div className="text-sm text-blue-600">
                    ${stats.totalRevenue.toLocaleString()} total revenue
                  </div>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="text-right">
                <div className="text-green-600 text-sm font-medium flex items-center gap-2">
                  <SafeIcon icon={FiActivity} className="w-4 h-4" />
                  LIVE DATA
                </div>
                <div className="text-neu-500 text-xs">
                  Last update: {lastUpdate.toLocaleTimeString()}
                </div>
              </div>
              <button
                onClick={refreshData}
                disabled={isRefreshing}
                className="neu-button p-3 hover:scale-105 transition-transform"
              >
                <SafeIcon icon={FiRefreshCw} className={`w-5 h-5 text-neu-600 ${isRefreshing ? 'animate-spin' : ''}`} />
              </button>
              <button
                onClick={handleLogout}
                className="neu-button p-3 bg-gradient-to-r from-red-500 to-pink-500 text-white hover:scale-105 transition-transform shadow-xl"
              >
                <SafeIcon icon={FiLogOut} className="w-5 h-5" />
              </button>
            </div>
          </div>
        </motion.div>

        {/* Navigation Tabs - Neumorphic Style */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="neu-card p-3 mb-8 bg-gradient-to-r from-white to-blue-50"
        >
          <div className="flex gap-2 overflow-x-auto">
            {tabs.map((tab, index) => (
              <motion.button
                key={tab.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                onClick={() => {
                  if (tab.id === 'messages') {
                    navigate('/admin/messages');
                  } else {
                    setActiveTab(tab.id);
                  }
                }}
                className={`neu-button px-6 py-3 hover:scale-105 transition-transform flex-shrink-0 ${
                  activeTab === tab.id
                    ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-xl'
                    : 'text-neu-700'
                }`}
              >
                <div className="flex items-center gap-2">
                  <SafeIcon icon={tab.icon} className="w-5 h-5" />
                  <span className="font-medium">{tab.label}</span>
                  {/* Show live indicators for data tabs */}
                  {(tab.id === 'users' || tab.id === 'sales' || tab.id === 'apps' || tab.id === 'messages' || tab.id === 'security' || tab.id === 'system' || tab.id === 'roles') && (
                    <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                  )}
                </div>
              </motion.button>
            ))}
          </div>
        </motion.div>

        {/* Tab Content */}
        <div className="space-y-8">
          {activeTab === 'overview' && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-8"
            >
              {/* Live Metrics Overview */}
              <div className="neu-card p-8 bg-gradient-to-br from-white to-blue-50">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-bold text-neu-900 flex items-center gap-2">
                    <SafeIcon icon={FiTrendingUp} className="w-6 h-6 text-green-600" />
                    Live Metrics Overview
                  </h2>
                  <DropdownMenu
                    options={[
                      { value: '24h', label: 'Last 24 Hours' },
                      { value: '7d', label: 'Last 7 Days' },
                      { value: '30d', label: 'Last 30 Days' },
                      { value: '90d', label: 'Last 90 Days' }
                    ]}
                    value={dateRange}
                    onChange={setDateRange}
                    size="small"
                    variant="primary"
                  />
                </div>

                <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
                  {[
                    {
                      label: 'Total Revenue',
                      value: `$${stats.totalRevenue.toLocaleString()}`,
                      icon: FiDollarSign,
                      color: 'text-green-600',
                      bg: 'from-green-100 to-emerald-100',
                      change: '+12.5%'
                    },
                    {
                      label: 'Total Users',
                      value: stats.totalUsers.toLocaleString(),
                      icon: FiUsers,
                      color: 'text-blue-600',
                      bg: 'from-blue-100 to-cyan-100',
                      change: '+8.2%'
                    },
                    {
                      label: 'Active Users',
                      value: stats.activeUsers.toLocaleString(),
                      icon: FiUserCheck,
                      color: 'text-purple-600',
                      bg: 'from-purple-100 to-pink-100',
                      change: '+15.7%'
                    },
                    {
                      label: 'Conversion Rate',
                      value: `${stats.conversionRate}%`,
                      icon: FiTarget,
                      color: 'text-yellow-600',
                      bg: 'from-yellow-100 to-orange-100',
                      change: '+14.3%'
                    }
                  ].map((stat, index) => (
                    <motion.div
                      key={stat.label}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className={`neu-card-inset p-6 bg-gradient-to-br ${stat.bg} hover:scale-105 transition-transform`}
                    >
                      <div className="flex items-center gap-3 mb-3">
                        <SafeIcon icon={stat.icon} className={`w-6 h-6 ${stat.color}`} />
                        <span className="text-neu-700 text-sm font-medium">{stat.label}</span>
                      </div>
                      <div className="text-2xl font-bold text-neu-900 mb-2">{stat.value}</div>
                      <div className="flex items-center gap-1 text-sm text-green-600">
                        <SafeIcon icon={FiTrendingUp} className="w-4 h-4" />
                        {stat.change}
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Real-time Activity and Top Apps */}
              <div className="grid lg:grid-cols-2 gap-8">
                {/* Real-time Activity */}
                <div className="neu-card p-6 bg-gradient-to-br from-white to-green-50">
                  <h3 className="text-xl font-bold text-neu-900 mb-6 flex items-center gap-2">
                    <SafeIcon icon={FiActivity} className="w-5 h-5 text-green-600" />
                    Real-time Activity
                    <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                  </h3>

                  <div className="space-y-4 max-h-96 overflow-y-auto">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-neu-600">Time</span>
                      <span className="text-neu-600">User</span>
                      <span className="text-neu-600">Action</span>
                      <span className="text-neu-600">Amount</span>
                    </div>
                    {recentActivity.map((activity) => (
                      <div key={activity.id} className="neu-card-inset p-4 bg-white/70 hover:bg-white transition-colors">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <div className={`w-3 h-3 rounded-full ${
                              activity.type === 'app_purchase' ? 'bg-green-400' :
                              activity.type === 'user_signup' ? 'bg-blue-400' :
                              activity.type === 'app_view' ? 'bg-purple-400' :
                              activity.type === 'user_login' ? 'bg-yellow-400' : 'bg-gray-400'
                            }`}></div>
                            <div>
                              <div className="text-neu-900 font-medium text-sm">
                                {activity.user.split('@')[0]}
                              </div>
                              <div className="text-neu-500 text-xs">
                                {activity.app}
                              </div>
                            </div>
                          </div>
                          <div className="text-right">
                            {activity.amount && (
                              <div className="text-green-600 font-semibold">
                                ${activity.amount}
                              </div>
                            )}
                            <div className="text-neu-500 text-xs">{activity.time}</div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Top Performing Apps */}
                <div className="neu-card p-6 bg-gradient-to-br from-white to-purple-50">
                  <h3 className="text-xl font-bold text-neu-900 mb-6 flex items-center gap-2">
                    <SafeIcon icon={FiAward} className="w-5 h-5 text-yellow-600" />
                    Top Performing Apps
                  </h3>

                  <div className="space-y-4">
                    {topApps.map((app, index) => (
                      <div key={app.id} className="neu-card-inset p-4 bg-white/70 hover:bg-white transition-colors">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <div className="text-2xl font-bold text-blue-600">#{index + 1}</div>
                            <div>
                              <div className="text-neu-900 font-medium">{app.name}</div>
                              <div className="text-neu-500 text-sm flex items-center gap-2">
                                <span>{app.category}</span>
                                <span>•</span>
                                <span className="flex items-center gap-1">
                                  <SafeIcon icon={FiStar} className="w-3 h-3 text-yellow-500" />
                                  {app.rating}
                                </span>
                              </div>
                            </div>
                          </div>
                          <div className="text-right">
                            <div className="text-green-600 font-semibold">
                              ${app.revenue.toLocaleString()}
                            </div>
                            <div className="text-neu-500 text-sm">
                              {app.downloads} downloads
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {activeTab === 'analytics' && <AdminAnalytics />}
          {activeTab === 'users' && <AdminUserManagement />}
          {activeTab === 'roles' && <AdminRoleManagement />}

          {/* ✅ BEAUTIFUL SALES TAB */}
          {activeTab === 'sales' && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-8"
            >
              {/* Sales Overview */}
              <div className="neu-card p-8 bg-gradient-to-br from-white to-green-50">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-bold text-neu-900 flex items-center gap-2">
                    <SafeIcon icon={FiDollarSign} className="w-6 h-6 text-green-600" />
                    Sales Dashboard
                  </h2>
                  <div className="flex items-center gap-4">
                    <div className="text-sm text-green-600 flex items-center gap-2">
                      <SafeIcon icon={FiActivity} className="w-4 h-4" />
                      Live Sales Data
                    </div>
                  </div>
                </div>

                {/* Sales Metrics */}
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                  {[
                    {
                      label: 'Total Sales',
                      value: `$${stats.totalRevenue.toLocaleString()}`,
                      icon: FiDollarSign,
                      color: 'text-green-600',
                      bg: 'from-green-100 to-emerald-100',
                      change: '+18.2%'
                    },
                    {
                      label: 'Transactions',
                      value: transactions.length.toLocaleString(),
                      icon: FiCreditCard,
                      color: 'text-blue-600',
                      bg: 'from-blue-100 to-cyan-100',
                      change: '+12.4%'
                    },
                    {
                      label: 'Avg Order Value',
                      value: `$${(stats.totalRevenue / transactions.length).toFixed(2)}`,
                      icon: FiTrendingUp,
                      color: 'text-purple-600',
                      bg: 'from-purple-100 to-pink-100',
                      change: '+5.7%'
                    },
                    {
                      label: 'Refunds',
                      value: `$${stats.totalRefunds.toLocaleString()}`,
                      icon: FiTrendingDown,
                      color: 'text-red-600',
                      bg: 'from-red-100 to-pink-100',
                      change: '-2.1%'
                    }
                  ].map((metric, index) => (
                    <motion.div
                      key={metric.label}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className={`neu-card-inset p-6 bg-gradient-to-br ${metric.bg} hover:scale-105 transition-transform`}
                    >
                      <div className="flex items-center gap-3 mb-3">
                        <SafeIcon icon={metric.icon} className={`w-6 h-6 ${metric.color}`} />
                        <span className="text-neu-700 text-sm font-medium">{metric.label}</span>
                      </div>
                      <div className="text-2xl font-bold text-neu-900 mb-2">{metric.value}</div>
                      <div className={`flex items-center gap-1 text-sm ${metric.change.startsWith('+') ? 'text-green-600' : 'text-red-600'}`}>
                        <SafeIcon icon={metric.change.startsWith('+') ? FiTrendingUp : FiTrendingDown} className="w-4 h-4" />
                        {metric.change}
                      </div>
                    </motion.div>
                  ))}
                </div>

                {/* Recent Transactions */}
                <div className="neu-card-inset p-6 bg-white/70">
                  <h3 className="text-xl font-bold text-neu-900 mb-6">Recent Transactions</h3>
                  <div className="space-y-4">
                    <div className="grid grid-cols-6 gap-4 text-sm font-medium text-neu-600 border-b border-neu-200 pb-2">
                      <span>Transaction ID</span>
                      <span>User</span>
                      <span>App</span>
                      <span>Amount</span>
                      <span>Status</span>
                      <span>Date</span>
                    </div>
                    {transactions.slice(0, 10).map((transaction) => {
                      const user = users.find(u => u.id === transaction.userId);
                      const app = applications.find(a => a.id === transaction.appId);
                      return (
                        <motion.div
                          key={transaction.id}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          className="grid grid-cols-6 gap-4 text-sm neu-card-inset p-4 bg-white/50 hover:bg-white transition-colors"
                        >
                          <span className="font-mono text-blue-600">#{transaction.id}</span>
                          <span className="text-neu-900">{user?.name || 'Unknown'}</span>
                          <span className="text-neu-700">{app?.name || 'Unknown App'}</span>
                          <span className={`font-semibold ${transaction.type === 'refund' ? 'text-red-600' : 'text-green-600'}`}>
                            {transaction.type === 'refund' ? '-' : ''}${transaction.amount}
                          </span>
                          <span className={`px-2 py-1 rounded-full text-xs ${
                            transaction.status === 'completed' ? 'bg-green-100 text-green-800' :
                            transaction.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                            'bg-red-100 text-red-800'
                          }`}>
                            {transaction.status}
                          </span>
                          <span className="text-neu-500">
                            {new Date(transaction.timestamp).toLocaleDateString()}
                          </span>
                        </motion.div>
                      );
                    })}
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {/* ✅ BEAUTIFUL APPS TAB */}
          {activeTab === 'apps' && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-8"
            >
              {/* Apps Overview */}
              <div className="neu-card p-8 bg-gradient-to-br from-white to-purple-50">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-bold text-neu-900 flex items-center gap-2">
                    <SafeIcon icon={FiShoppingCart} className="w-6 h-6 text-purple-600" />
                    Application Management
                  </h2>
                  <div className="flex items-center gap-4">
                    <button className="neu-button px-4 py-2 bg-gradient-to-r from-green-500 to-blue-500 text-white hover:scale-105 transition-transform">
                      <div className="flex items-center gap-2">
                        <SafeIcon icon={FiPlus} className="w-4 h-4" />
                        Add App
                      </div>
                    </button>
                  </div>
                </div>

                {/* App Statistics */}
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                  {[
                    {
                      label: 'Total Apps',
                      value: applications.length,
                      icon: FiPackage,
                      color: 'text-blue-600',
                      bg: 'from-blue-100 to-cyan-100'
                    },
                    {
                      label: 'Published',
                      value: applications.filter(app => app.status === 'published').length,
                      icon: FiCheckCircle,
                      color: 'text-green-600',
                      bg: 'from-green-100 to-emerald-100'
                    },
                    {
                      label: 'Total Downloads',
                      value: applications.reduce((sum, app) => sum + app.downloads, 0).toLocaleString(),
                      icon: FiDownload,
                      color: 'text-purple-600',
                      bg: 'from-purple-100 to-pink-100'
                    },
                    {
                      label: 'Avg Rating',
                      value: stats.avgRating,
                      icon: FiStar,
                      color: 'text-yellow-600',
                      bg: 'from-yellow-100 to-orange-100'
                    }
                  ].map((stat, index) => (
                    <motion.div
                      key={stat.label}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className={`neu-card-inset p-6 bg-gradient-to-br ${stat.bg} hover:scale-105 transition-transform`}
                    >
                      <div className="flex items-center gap-3 mb-3">
                        <SafeIcon icon={stat.icon} className={`w-6 h-6 ${stat.color}`} />
                        <span className="text-neu-700 text-sm font-medium">{stat.label}</span>
                      </div>
                      <div className="text-2xl font-bold text-neu-900">{stat.value}</div>
                    </motion.div>
                  ))}
                </div>

                {/* Apps List */}
                <div className="neu-card-inset p-6 bg-white/70">
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="text-xl font-bold text-neu-900">Applications</h3>
                    <div className="flex items-center gap-4">
                      <div className="relative">
                        <SafeIcon icon={FiSearch} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-neu-400 w-4 h-4" />
                        <input
                          type="text"
                          className="neu-input pl-10 pr-4 py-2 bg-neu-100 text-neu-700"
                          placeholder="Search apps..."
                        />
                      </div>
                      <select className="neu-input p-2 bg-neu-100 text-neu-700">
                        <option>All Categories</option>
                        <option>E-commerce</option>
                        <option>Portfolio</option>
                        <option>Blog</option>
                      </select>
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {applications.map((app) => {
                      const IconComponent = getAppIcon(app.category);
                      const gradientClass = getAppGradient(app.category);
                      
                      return (
                        <motion.div
                          key={app.id}
                          initial={{ opacity: 0, scale: 0.9 }}
                          animate={{ opacity: 1, scale: 1 }}
                          className="neu-card-inset p-6 bg-white/50 hover:bg-white hover:scale-105 transition-all"
                        >
                          <div className="flex items-center gap-3 mb-4">
                            <div className={`w-12 h-12 bg-gradient-to-r ${gradientClass} rounded-xl flex items-center justify-center text-white shadow-lg`}>
                              <SafeIcon icon={IconComponent} className="w-6 h-6" />
                            </div>
                            <div>
                              <h4 className="font-semibold text-neu-900">{app.name}</h4>
                              <p className="text-neu-600 text-sm">{app.developer}</p>
                            </div>
                          </div>

                          <div className="space-y-3">
                            <div className="flex items-center justify-between text-sm">
                              <span className="text-neu-600">Price</span>
                              <span className="font-semibold text-green-600">${app.price}</span>
                            </div>
                            <div className="flex items-center justify-between text-sm">
                              <span className="text-neu-600">Downloads</span>
                              <span className="font-semibold text-neu-900">{app.downloads.toLocaleString()}</span>
                            </div>
                            <div className="flex items-center justify-between text-sm">
                              <span className="text-neu-600">Rating</span>
                              <div className="flex items-center gap-1">
                                <SafeIcon icon={FiStar} className="w-4 h-4 text-yellow-500" />
                                <span className="font-semibold text-neu-900">{app.rating}</span>
                              </div>
                            </div>
                            <div className="flex items-center justify-between text-sm">
                              <span className="text-neu-600">Revenue</span>
                              <span className="font-semibold text-green-600">${app.revenue.toLocaleString()}</span>
                            </div>
                          </div>

                          <div className="flex gap-2 mt-4">
                            <button className="neu-button p-2 bg-blue-500 text-white hover:scale-105 transition-transform">
                              <SafeIcon icon={FiEye} className="w-4 h-4" />
                            </button>
                            <button className="neu-button p-2 bg-green-500 text-white hover:scale-105 transition-transform">
                              <SafeIcon icon={FiEdit} className="w-4 h-4" />
                            </button>
                            <button className="neu-button p-2 bg-purple-500 text-white hover:scale-105 transition-transform">
                              <SafeIcon icon={FiBarChart} className="w-4 h-4" />
                            </button>
                          </div>
                        </motion.div>
                      );
                    })}
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {/* ✅ BEAUTIFUL SECURITY TAB */}
          {activeTab === 'security' && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-8"
            >
              {/* Security Overview */}
              <div className="neu-card p-8 bg-gradient-to-br from-white to-red-50">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-bold text-neu-900 flex items-center gap-2">
                    <SafeIcon icon={FiShield} className="w-6 h-6 text-red-600" />
                    Security Dashboard
                  </h2>
                  <div className="flex items-center gap-4">
                    <div className={`text-sm font-medium flex items-center gap-2 ${
                      securityMetrics.threatLevel === 'Low' ? 'text-green-600' : 
                      securityMetrics.threatLevel === 'Medium' ? 'text-yellow-600' : 'text-red-600'
                    }`}>
                      <div className={`w-2 h-2 rounded-full animate-pulse ${
                        securityMetrics.threatLevel === 'Low' ? 'bg-green-500' : 
                        securityMetrics.threatLevel === 'Medium' ? 'bg-yellow-500' : 'bg-red-500'
                      }`}></div>
                      Threat Level: {securityMetrics.threatLevel}
                    </div>
                  </div>
                </div>

                {/* Security Metrics */}
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                  {[
                    {
                      label: 'Blocked Attacks',
                      value: securityMetrics.blockedAttacks,
                      icon: FiShield,
                      color: 'text-red-600',
                      bg: 'from-red-100 to-pink-100'
                    },
                    {
                      label: 'Active Connections',
                      value: securityMetrics.activeConnections,
                      icon: FiUsers,
                      color: 'text-blue-600',
                      bg: 'from-blue-100 to-cyan-100'
                    },
                    {
                      label: 'Failed Logins',
                      value: securityMetrics.failedLogins,
                      icon: FiXCircle,
                      color: 'text-yellow-600',
                      bg: 'from-yellow-100 to-orange-100'
                    },
                    {
                      label: 'Security Score',
                      value: '98%',
                      icon: FiCheckCircle,
                      color: 'text-green-600',
                      bg: 'from-green-100 to-emerald-100'
                    }
                  ].map((metric, index) => (
                    <motion.div
                      key={metric.label}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className={`neu-card-inset p-6 bg-gradient-to-br ${metric.bg} hover:scale-105 transition-transform`}
                    >
                      <div className="flex items-center gap-3 mb-3">
                        <SafeIcon icon={metric.icon} className={`w-6 h-6 ${metric.color}`} />
                        <span className="text-neu-700 text-sm font-medium">{metric.label}</span>
                      </div>
                      <div className="text-2xl font-bold text-neu-900">{metric.value}</div>
                    </motion.div>
                  ))}
                </div>

                {/* Security Logs */}
                <div className="neu-card-inset p-6 bg-white/70">
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="text-xl font-bold text-neu-900">Security Logs</h3>
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                      <span className="text-green-600 text-sm font-medium">Live Monitoring</span>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <div className="grid grid-cols-6 gap-4 text-sm font-medium text-neu-600 border-b border-neu-200 pb-2">
                      <span>Time</span>
                      <span>Type</span>
                      <span>Severity</span>
                      <span>Message</span>
                      <span>IP Address</span>
                      <span>Location</span>
                    </div>
                    {securityLogs.map((log) => (
                      <motion.div
                        key={log.id}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="grid grid-cols-6 gap-4 text-sm neu-card-inset p-3 bg-white/50 hover:bg-white transition-colors"
                      >
                        <span className="text-neu-900 font-mono">{log.time}</span>
                        <span className="text-neu-700 capitalize">{log.type.replace('_', ' ')}</span>
                        <span className={`px-2 py-1 rounded-full text-xs ${
                          log.severity === 'info' ? 'bg-blue-100 text-blue-800' :
                          log.severity === 'warning' ? 'bg-yellow-100 text-yellow-800' :
                          'bg-red-100 text-red-800'
                        }`}>
                          {log.severity}
                        </span>
                        <span className="text-neu-700">{log.message}</span>
                        <span className="text-neu-600 font-mono">{log.ip}</span>
                        <span className="text-neu-500">{log.location}</span>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {/* ✅ BEAUTIFUL SYSTEM TAB */}
          {activeTab === 'system' && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-8"
            >
              {/* System Overview */}
              <div className="neu-card p-8 bg-gradient-to-br from-white to-gray-50">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-bold text-neu-900 flex items-center gap-2">
                    <SafeIcon icon={FiMonitor} className="w-6 h-6 text-gray-600" />
                    System Monitoring
                  </h2>
                  <div className="flex items-center gap-4">
                    <div className="text-sm text-green-600 flex items-center gap-2">
                      <SafeIcon icon={FiActivity} className="w-4 h-4" />
                      System Healthy
                    </div>
                  </div>
                </div>

                {/* System Metrics */}
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                  {[
                    {
                      label: 'CPU Usage',
                      value: `${systemMetrics.cpuUsage.toFixed(1)}%`,
                      icon: FiCpu,
                      color: 'text-blue-600',
                      bg: 'from-blue-100 to-cyan-100',
                      progress: systemMetrics.cpuUsage
                    },
                    {
                      label: 'Memory Usage',
                      value: `${systemMetrics.memoryUsage.toFixed(1)}%`,
                      icon: FiHardDrive,
                      color: 'text-purple-600',
                      bg: 'from-purple-100 to-pink-100',
                      progress: systemMetrics.memoryUsage
                    },
                    {
                      label: 'Disk Usage',
                      value: `${systemMetrics.diskUsage.toFixed(1)}%`,
                      icon: FiDatabase,
                      color: 'text-green-600',
                      bg: 'from-green-100 to-emerald-100',
                      progress: systemMetrics.diskUsage
                    },
                    {
                      label: 'Uptime',
                      value: systemMetrics.uptime,
                      icon: FiServer,
                      color: 'text-yellow-600',
                      bg: 'from-yellow-100 to-orange-100',
                      progress: 99.96
                    }
                  ].map((metric, index) => (
                    <motion.div
                      key={metric.label}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className={`neu-card-inset p-6 bg-gradient-to-br ${metric.bg} hover:scale-105 transition-transform`}
                    >
                      <div className="flex items-center gap-3 mb-3">
                        <SafeIcon icon={metric.icon} className={`w-6 h-6 ${metric.color}`} />
                        <span className="text-neu-700 text-sm font-medium">{metric.label}</span>
                      </div>
                      <div className="text-2xl font-bold text-neu-900 mb-3">{metric.value}</div>
                      {metric.progress !== undefined && (
                        <div className="w-full bg-neu-200 rounded-full h-2">
                          <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: `${metric.progress}%` }}
                            transition={{ duration: 1, delay: index * 0.2 }}
                            className={`bg-gradient-to-r ${metric.color.replace('text-', 'from-').replace('-600', '-500')} to-${metric.color.replace('text-', '').replace('-600', '-600')} h-2 rounded-full`}
                          ></motion.div>
                        </div>
                      )}
                    </motion.div>
                  ))}
                </div>

                {/* Network Activity */}
                <div className="grid lg:grid-cols-2 gap-8">
                  <div className="neu-card-inset p-6 bg-white/70">
                    <h3 className="text-xl font-bold text-neu-900 mb-6 flex items-center gap-2">
                      <SafeIcon icon={FiWifi} className="w-5 h-5 text-blue-600" />
                      Network Activity
                    </h3>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <span className="text-neu-600">Network In</span>
                        <span className="font-semibold text-green-600">{systemMetrics.networkIn.toFixed(1)} MB/s</span>
                      </div>
                      <div className="w-full bg-neu-200 rounded-full h-2">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: `${systemMetrics.networkIn}%` }}
                          transition={{ duration: 1 }}
                          className="bg-gradient-to-r from-green-500 to-blue-500 h-2 rounded-full"
                        ></motion.div>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-neu-600">Network Out</span>
                        <span className="font-semibold text-blue-600">{systemMetrics.networkOut.toFixed(1)} MB/s</span>
                      </div>
                      <div className="w-full bg-neu-200 rounded-full h-2">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: `${systemMetrics.networkOut}%` }}
                          transition={{ duration: 1, delay: 0.2 }}
                          className="bg-gradient-to-r from-blue-500 to-purple-500 h-2 rounded-full"
                        ></motion.div>
                      </div>
                    </div>
                  </div>

                  <div className="neu-card-inset p-6 bg-white/70">
                    <h3 className="text-xl font-bold text-neu-900 mb-6 flex items-center gap-2">
                      <SafeIcon icon={FiCloud} className="w-5 h-5 text-purple-600" />
                      System Status
                    </h3>
                    <div className="space-y-4">
                      {[
                        { service: 'Web Server', status: 'Online', color: 'text-green-600' },
                        { service: 'Database', status: 'Online', color: 'text-green-600' },
                        { service: 'Cache', status: 'Online', color: 'text-green-600' },
                        { service: 'CDN', status: 'Online', color: 'text-green-600' },
                        { service: 'Email Service', status: 'Online', color: 'text-green-600' },
                        { service: 'Backup', status: 'Running', color: 'text-blue-600' }
                      ].map((service, index) => (
                        <motion.div
                          key={service.service}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: index * 0.1 }}
                          className="flex items-center justify-between p-3 neu-card-inset bg-white/50"
                        >
                          <span className="text-neu-900 font-medium">{service.service}</span>
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                            service.status === 'Online' ? 'bg-green-100 text-green-800' : 'bg-blue-100 text-blue-800'
                          }`}>
                            {service.status}
                          </span>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;