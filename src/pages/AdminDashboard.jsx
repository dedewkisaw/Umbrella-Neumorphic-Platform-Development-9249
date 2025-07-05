import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../common/SafeIcon';
import DropdownMenu from '../components/DropdownMenu';
import AdminAnalytics from '../components/AdminAnalytics';
import AdminUserManagement from '../components/AdminUserManagement';
import useDataStore from '../stores/DataStore';
import { useRealtimeData } from '../hooks/useRealtimeData';

const { FiShield, FiUsers, FiDollarSign, FiTrendingUp, FiActivity, FiGlobe, FiShoppingCart, FiEye, FiDownload, FiStar, FiClock, FiBarChart, FiPieChart, FiMap, FiMonitor, FiDatabase, FiLock, FiLogOut, FiRefreshCw, FiAlertTriangle, FiCheckCircle, FiXCircle, FiSettings, FiMail, FiPhone, FiCreditCard, FiTarget, FiTrendingDown, FiUserCheck, FiUserX, FiFilter, FiCalendar, FiFileText, FiExternalLink, FiAward, FiCpu, FiHardDrive, FiWifi, FiServer, FiCloud, FiCode, FiPackage, FiEdit, FiBookOpen, FiGamepad2, FiLayers, FiZap, FiMessageSquare } = FiIcons;

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
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-blue-900 p-4 lg:p-6">
      <div className="max-w-7xl mx-auto">
        {/* Enhanced Header with Live Stats */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="neu-card p-6 mb-8 bg-gray-800 border border-blue-500/30"
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="neu-button p-3 bg-blue-600 text-white">
                <SafeIcon icon={FiShield} className="w-6 h-6" />
              </div>
              <div>
                <h1 className="text-2xl lg:text-3xl font-bold text-white">
                  Umbrella <span className="text-blue-400">Admin</span>
                </h1>
                <p className="text-gray-300">Real-time Analytics Dashboard</p>
                <div className="flex items-center gap-4 mt-2">
                  <div className="text-sm text-green-400 flex items-center gap-1">
                    <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                    {stats.activeUsers} users online
                  </div>
                  <div className="text-sm text-blue-400">
                    ${stats.totalRevenue.toLocaleString()} total revenue
                  </div>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="text-right">
                <div className="text-green-400 text-sm font-medium flex items-center gap-2">
                  <SafeIcon icon={FiActivity} className="w-4 h-4" />
                  LIVE DATA
                </div>
                <div className="text-gray-400 text-xs">
                  Last update: {lastUpdate.toLocaleTimeString()}
                </div>
              </div>
              <button
                onClick={refreshData}
                disabled={isRefreshing}
                className="neu-button p-3 bg-gray-700 text-gray-300 hover:bg-gray-600"
              >
                <SafeIcon 
                  icon={FiRefreshCw} 
                  className={`w-5 h-5 ${isRefreshing ? 'animate-spin' : ''}`} 
                />
              </button>
              <button
                onClick={handleLogout}
                className="neu-button p-3 bg-red-600 text-white hover:bg-red-700"
              >
                <SafeIcon icon={FiLogOut} className="w-5 h-5" />
              </button>
            </div>
          </div>
        </motion.div>

        {/* Navigation Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="neu-card p-3 mb-8 bg-gray-800"
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
                  activeTab === tab.id ? 'bg-blue-600 text-white' : 'bg-gray-700 text-gray-300'
                }`}
              >
                <div className="flex items-center gap-2">
                  <SafeIcon icon={tab.icon} className="w-5 h-5" />
                  <span className="font-medium">{tab.label}</span>
                  {/* Show live indicators for data tabs */}
                  {(tab.id === 'users' || tab.id === 'sales' || tab.id === 'apps' || tab.id === 'messages' || tab.id === 'security' || tab.id === 'system') && (
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
              <div className="neu-card p-8 bg-gray-800">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-bold text-white flex items-center gap-2">
                    <SafeIcon icon={FiTrendingUp} className="w-6 h-6 text-green-400" />
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
                      color: 'text-green-400',
                      bg: 'bg-green-900/30',
                      change: '+12.5%'
                    },
                    {
                      label: 'Total Users',
                      value: stats.totalUsers.toLocaleString(),
                      icon: FiUsers,
                      color: 'text-blue-400',
                      bg: 'bg-blue-900/30',
                      change: '+8.2%'
                    },
                    {
                      label: 'Active Users',
                      value: stats.activeUsers.toLocaleString(),
                      icon: FiUserCheck,
                      color: 'text-purple-400',
                      bg: 'bg-purple-900/30',
                      change: '+15.7%'
                    },
                    {
                      label: 'Conversion Rate',
                      value: `${stats.conversionRate}%`,
                      icon: FiTarget,
                      color: 'text-yellow-400',
                      bg: 'bg-yellow-900/30',
                      change: '+14.3%'
                    }
                  ].map((stat, index) => (
                    <motion.div
                      key={stat.label}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className={`neu-card-inset p-6 ${stat.bg} hover:scale-105 transition-transform`}
                    >
                      <div className="flex items-center gap-3 mb-3">
                        <SafeIcon icon={stat.icon} className={`w-6 h-6 ${stat.color}`} />
                        <span className="text-gray-300 text-sm font-medium">{stat.label}</span>
                      </div>
                      <div className="text-2xl font-bold text-white mb-2">{stat.value}</div>
                      <div className="flex items-center gap-1 text-sm text-green-400">
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
                <div className="neu-card p-6 bg-gray-800">
                  <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
                    <SafeIcon icon={FiActivity} className="w-5 h-5 text-green-400" />
                    Real-time Activity
                    <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                  </h3>
                  <div className="space-y-4 max-h-96 overflow-y-auto">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-300">Time</span>
                      <span className="text-gray-300">User</span>
                      <span className="text-gray-300">Action</span>
                      <span className="text-gray-300">Amount</span>
                    </div>
                    {recentActivity.map((activity) => (
                      <div key={activity.id} className="neu-card-inset p-4 bg-gray-700/50">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <div className={`w-3 h-3 rounded-full ${
                              activity.type === 'app_purchase' ? 'bg-green-400' :
                              activity.type === 'user_signup' ? 'bg-blue-400' :
                              activity.type === 'app_view' ? 'bg-purple-400' :
                              activity.type === 'user_login' ? 'bg-yellow-400' : 'bg-gray-400'
                            }`}></div>
                            <div>
                              <div className="text-white font-medium text-sm">
                                {activity.user.split('@')[0]}
                              </div>
                              <div className="text-gray-400 text-xs">
                                {activity.app}
                              </div>
                            </div>
                          </div>
                          <div className="text-right">
                            {activity.amount && (
                              <div className="text-green-400 font-semibold">
                                ${activity.amount}
                              </div>
                            )}
                            <div className="text-gray-400 text-xs">{activity.time}</div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Top Performing Apps */}
                <div className="neu-card p-6 bg-gray-800">
                  <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
                    <SafeIcon icon={FiAward} className="w-5 h-5 text-yellow-400" />
                    Top Performing Apps
                  </h3>
                  <div className="space-y-4">
                    {topApps.map((app, index) => (
                      <div key={app.id} className="neu-card-inset p-4 bg-gray-700/50">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <div className="text-2xl font-bold text-blue-400">#{index + 1}</div>
                            <div>
                              <div className="text-white font-medium">{app.name}</div>
                              <div className="text-gray-400 text-sm flex items-center gap-2">
                                <span>{app.category}</span>
                                <span>•</span>
                                <span className="flex items-center gap-1">
                                  <SafeIcon icon={FiStar} className="w-3 h-3 text-yellow-400" />
                                  {app.rating}
                                </span>
                              </div>
                            </div>
                          </div>
                          <div className="text-right">
                            <div className="text-green-400 font-semibold">
                              ${app.revenue.toLocaleString()}
                            </div>
                            <div className="text-gray-400 text-sm">
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

          {activeTab === 'sales' && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-8"
            >
              <div className="neu-card p-8 bg-gray-800">
                <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
                  <SafeIcon icon={FiDollarSign} className="w-6 h-6 text-green-400" />
                  Live Sales Dashboard
                  <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                </h2>
                
                {/* Sales metrics */}
                <div className="grid lg:grid-cols-3 gap-6 mb-8">
                  <div className="neu-card-inset p-6 bg-green-900/30">
                    <div className="flex items-center gap-3 mb-3">
                      <SafeIcon icon={FiTrendingUp} className="w-6 h-6 text-green-400" />
                      <span className="text-gray-300 text-sm font-medium">Total Sales</span>
                    </div>
                    <div className="text-2xl font-bold text-white">
                      {transactions.filter(t => t.type === 'purchase').length}
                    </div>
                  </div>
                  <div className="neu-card-inset p-6 bg-blue-900/30">
                    <div className="flex items-center gap-3 mb-3">
                      <SafeIcon icon={FiDollarSign} className="w-6 h-6 text-blue-400" />
                      <span className="text-gray-300 text-sm font-medium">Revenue</span>
                    </div>
                    <div className="text-2xl font-bold text-white">
                      ${stats.totalRevenue.toLocaleString()}
                    </div>
                  </div>
                  <div className="neu-card-inset p-6 bg-purple-900/30">
                    <div className="flex items-center gap-3 mb-3">
                      <SafeIcon icon={FiTarget} className="w-6 h-6 text-purple-400" />
                      <span className="text-gray-300 text-sm font-medium">Avg. Order</span>
                    </div>
                    <div className="text-2xl font-bold text-white">
                      ${(stats.totalRevenue / Math.max(transactions.filter(t => t.type === 'purchase').length, 1)).toFixed(2)}
                    </div>
                  </div>
                </div>

                {/* Recent Transactions */}
                <h3 className="text-lg font-semibold text-white mb-4">Recent Transactions</h3>
                <div className="space-y-3">
                  {transactions.slice(0, 10).map((transaction) => {
                    const user = users.find(u => u.id === transaction.userId);
                    const app = applications.find(a => a.id === transaction.appId);
                    
                    return (
                      <div key={transaction.id} className="neu-card-inset p-4 bg-gray-700/30">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <div className={`w-3 h-3 rounded-full ${
                              transaction.type === 'purchase' ? 'bg-green-400' : 'bg-red-400'
                            }`}></div>
                            <div>
                              <div className="text-white font-medium">
                                {user?.name || 'Unknown User'}
                              </div>
                              <div className="text-gray-400 text-sm">
                                {app?.name || 'Unknown App'} • {transaction.paymentMethod}
                              </div>
                            </div>
                          </div>
                          <div className="text-right">
                            <div className={`font-semibold ${
                              transaction.type === 'purchase' ? 'text-green-400' : 'text-red-400'
                            }`}>
                              {transaction.type === 'purchase' ? '+' : '-'}${Math.abs(transaction.amount)}
                            </div>
                            <div className="text-gray-400 text-sm">
                              {new Date(transaction.timestamp).toLocaleString()}
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </motion.div>
          )}

          {activeTab === 'apps' && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-8"
            >
              <div className="neu-card p-8 bg-gray-800">
                <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
                  <SafeIcon icon={FiShoppingCart} className="w-6 h-6 text-blue-400" />
                  Application Management
                  <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse"></div>
                </h2>

                {/* Apps overview */}
                <div className="grid lg:grid-cols-4 gap-6 mb-8">
                  <div className="neu-card-inset p-6 bg-blue-900/30">
                    <div className="flex items-center gap-3 mb-3">
                      <SafeIcon icon={FiGlobe} className="w-6 h-6 text-blue-400" />
                      <span className="text-gray-300 text-sm font-medium">Total Apps</span>
                    </div>
                    <div className="text-2xl font-bold text-white">{applications.length}</div>
                  </div>
                  <div className="neu-card-inset p-6 bg-green-900/30">
                    <div className="flex items-center gap-3 mb-3">
                      <SafeIcon icon={FiDownload} className="w-6 h-6 text-green-400" />
                      <span className="text-gray-300 text-sm font-medium">Downloads</span>
                    </div>
                    <div className="text-2xl font-bold text-white">
                      {applications.reduce((sum, app) => sum + app.downloads, 0).toLocaleString()}
                    </div>
                  </div>
                  <div className="neu-card-inset p-6 bg-yellow-900/30">
                    <div className="flex items-center gap-3 mb-3">
                      <SafeIcon icon={FiStar} className="w-6 h-6 text-yellow-400" />
                      <span className="text-gray-300 text-sm font-medium">Avg Rating</span>
                    </div>
                    <div className="text-2xl font-bold text-white">{stats.avgRating}</div>
                  </div>
                  <div className="neu-card-inset p-6 bg-purple-900/30">
                    <div className="flex items-center gap-3 mb-3">
                      <SafeIcon icon={FiTrendingUp} className="w-6 h-6 text-purple-400" />
                      <span className="text-gray-300 text-sm font-medium">Featured</span>
                    </div>
                    <div className="text-2xl font-bold text-white">
                      {applications.filter(app => app.featured).length}
                    </div>
                  </div>
                </div>

                {/* Enhanced Apps list with beautiful icons */}
                <div className="space-y-4">
                  {applications.map((app) => {
                    const IconComponent = getAppIcon(app.category);
                    const gradientClass = getAppGradient(app.category);
                    
                    return (
                      <div key={app.id} className="neu-card-inset p-6 bg-gray-700/30 hover:scale-105 transition-transform">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-4">
                            <div className={`w-16 h-16 bg-gradient-to-r ${gradientClass} rounded-xl flex items-center justify-center text-white shadow-lg hover:scale-110 transition-transform`}>
                              <SafeIcon icon={IconComponent} className="w-8 h-8" />
                            </div>
                            <div>
                              <div className="text-white font-semibold text-lg flex items-center gap-2">
                                {app.name}
                                {app.featured && (
                                  <div className="neu-button p-1 bg-yellow-500 text-white">
                                    <SafeIcon icon={FiStar} className="w-3 h-3" />
                                  </div>
                                )}
                              </div>
                              <div className="text-gray-400 text-sm flex items-center gap-2">
                                <span>by {app.developer}</span>
                                <span>•</span>
                                <span className="px-2 py-1 rounded-full text-xs bg-blue-900/50 text-blue-300">
                                  {app.category}
                                </span>
                              </div>
                              <div className="text-gray-500 text-xs mt-1 flex items-center gap-4">
                                <span>Version {app.version}</span>
                                <span>•</span>
                                <span>{app.size}</span>
                                <span>•</span>
                                <span>Published {new Date(app.publishDate).toLocaleDateString()}</span>
                              </div>
                            </div>
                          </div>
                          <div className="text-right">
                            <div className="text-2xl font-bold text-green-400 mb-1">${app.price}</div>
                            <div className="text-gray-400 text-sm mb-2">
                              {app.downloads.toLocaleString()} downloads
                            </div>
                            <div className="flex items-center gap-1 text-yellow-400 text-sm mb-2">
                              <SafeIcon icon={FiStar} className="w-3 h-3" />
                              {app.rating} ({app.reviews} reviews)
                            </div>
                            <div className="text-green-300 text-sm font-semibold">
                              ${app.revenue.toLocaleString()} revenue
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </motion.div>
          )}

          {/* Enhanced Security Tab */}
          {activeTab === 'security' && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-8"
            >
              {/* Real-time Status Indicator */}
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="neu-card p-4 bg-gradient-to-r from-green-50 to-blue-50"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                    <span className="text-green-700 font-medium">Security Monitoring Active</span>
                  </div>
                  <div className="text-sm text-gray-600">
                    Threat Level: <span className={`font-semibold ${
                      securityMetrics.threatLevel === 'Low' ? 'text-green-600' :
                      securityMetrics.threatLevel === 'Medium' ? 'text-yellow-600' : 'text-red-600'
                    }`}>{securityMetrics.threatLevel}</span>
                  </div>
                </div>
              </motion.div>

              {/* Security Metrics */}
              <div className="neu-card p-8 bg-gray-800">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-bold text-white flex items-center gap-2">
                    <SafeIcon icon={FiShield} className="w-6 h-6 text-green-400" />
                    Security Dashboard
                  </h2>
                  <div className="text-sm text-green-400 flex items-center gap-2">
                    <SafeIcon icon={FiActivity} className="w-4 h-4" />
                    Live Monitoring
                  </div>
                </div>

                <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                  {[
                    {
                      label: 'Threat Level',
                      value: securityMetrics.threatLevel,
                      icon: FiShield,
                      color: securityMetrics.threatLevel === 'Low' ? 'text-green-400' : 
                             securityMetrics.threatLevel === 'Medium' ? 'text-yellow-400' : 'text-red-400',
                      bg: securityMetrics.threatLevel === 'Low' ? 'bg-green-900/30' :
                          securityMetrics.threatLevel === 'Medium' ? 'bg-yellow-900/30' : 'bg-red-900/30'
                    },
                    {
                      label: 'Blocked Attacks',
                      value: securityMetrics.blockedAttacks,
                      icon: FiXCircle,
                      color: 'text-red-400',
                      bg: 'bg-red-900/30'
                    },
                    {
                      label: 'Active Connections',
                      value: securityMetrics.activeConnections,
                      icon: FiWifi,
                      color: 'text-blue-400',
                      bg: 'bg-blue-900/30'
                    },
                    {
                      label: 'Failed Logins',
                      value: securityMetrics.failedLogins,
                      icon: FiLock,
                      color: 'text-yellow-400',
                      bg: 'bg-yellow-900/30'
                    }
                  ].map((metric, index) => (
                    <motion.div
                      key={metric.label}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className={`neu-card-inset p-6 ${metric.bg} hover:scale-105 transition-transform`}
                    >
                      <div className="flex items-center gap-3 mb-3">
                        <SafeIcon icon={metric.icon} className={`w-6 h-6 ${metric.color}`} />
                        <span className="text-gray-300 text-sm font-medium">{metric.label}</span>
                      </div>
                      <div className="text-2xl font-bold text-white">{metric.value}</div>
                    </motion.div>
                  ))}
                </div>

                {/* Security Charts */}
                <div className="grid lg:grid-cols-2 gap-8">
                  {/* Real-time Security Logs */}
                  <div className="neu-card-inset p-6 bg-gray-700/30">
                    <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
                      <SafeIcon icon={FiActivity} className="w-5 h-5 text-green-400" />
                      Live Security Events
                      <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                    </h3>
                    <div className="space-y-3 max-h-80 overflow-y-auto">
                      {securityLogs.map((log) => (
                        <motion.div
                          key={log.id}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          className="neu-card-inset p-3 bg-gray-600/30"
                        >
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                              <div className={`w-3 h-3 rounded-full ${
                                log.severity === 'info' ? 'bg-blue-400' :
                                log.severity === 'warning' ? 'bg-yellow-400' : 'bg-red-400'
                              }`}></div>
                              <div>
                                <div className="text-white font-medium text-sm">{log.message}</div>
                                <div className="text-gray-400 text-xs">
                                  {log.ip} • {log.location}
                                </div>
                              </div>
                            </div>
                            <div className="text-gray-400 text-xs">{log.time}</div>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </div>

                  {/* Security Status */}
                  <div className="neu-card-inset p-6 bg-gray-700/30">
                    <h3 className="text-xl font-bold text-white mb-6">System Security Status</h3>
                    <div className="space-y-4">
                      {[
                        { component: 'Firewall', status: 'Active', icon: FiShield, color: 'text-green-400' },
                        { component: 'SSL Certificates', status: 'Valid', icon: FiLock, color: 'text-green-400' },
                        { component: 'DDoS Protection', status: 'Enabled', icon: FiWifi, color: 'text-green-400' },
                        { component: 'Intrusion Detection', status: 'Monitoring', icon: FiEye, color: 'text-blue-400' },
                        { component: 'Access Control', status: 'Enforced', icon: FiUserCheck, color: 'text-green-400' },
                        { component: 'Data Encryption', status: 'AES-256', icon: FiDatabase, color: 'text-green-400' }
                      ].map((item, index) => (
                        <motion.div
                          key={item.component}
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: index * 0.1 }}
                          className="flex items-center justify-between p-3 neu-card-inset bg-gray-600/20"
                        >
                          <div className="flex items-center gap-3">
                            <SafeIcon icon={item.icon} className={`w-5 h-5 ${item.color}`} />
                            <span className="text-white font-medium">{item.component}</span>
                          </div>
                          <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                            item.status === 'Active' || item.status === 'Valid' || item.status === 'Enabled' || item.status === 'Enforced' || item.status === 'AES-256'
                              ? 'bg-green-100 text-green-800' : 'bg-blue-100 text-blue-800'
                          }`}>
                            {item.status}
                          </span>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {/* Enhanced System Tab */}
          {activeTab === 'system' && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-8"
            >
              {/* Real-time Status Indicator */}
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="neu-card p-4 bg-gradient-to-r from-green-50 to-blue-50"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                    <span className="text-green-700 font-medium">System Health Monitoring</span>
                  </div>
                  <div className="text-sm text-gray-600">
                    Uptime: <span className="font-semibold text-green-600">{systemMetrics.uptime}</span>
                  </div>
                </div>
              </motion.div>

              {/* System Metrics */}
              <div className="neu-card p-8 bg-gray-800">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-bold text-white flex items-center gap-2">
                    <SafeIcon icon={FiMonitor} className="w-6 h-6 text-blue-400" />
                    System Performance
                  </h2>
                  <div className="text-sm text-green-400 flex items-center gap-2">
                    <SafeIcon icon={FiActivity} className="w-4 h-4" />
                    Real-time Monitoring
                  </div>
                </div>

                {/* Real-time Performance Metrics */}
                <div className="grid grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                  {[
                    {
                      label: 'CPU Usage',
                      value: `${systemMetrics.cpuUsage.toFixed(1)}%`,
                      icon: FiCpu,
                      color: systemMetrics.cpuUsage > 80 ? 'text-red-400' : systemMetrics.cpuUsage > 60 ? 'text-yellow-400' : 'text-green-400',
                      bg: systemMetrics.cpuUsage > 80 ? 'bg-red-900/30' : systemMetrics.cpuUsage > 60 ? 'bg-yellow-900/30' : 'bg-green-900/30',
                      percentage: systemMetrics.cpuUsage
                    },
                    {
                      label: 'Memory Usage',
                      value: `${systemMetrics.memoryUsage.toFixed(1)}%`,
                      icon: FiHardDrive,
                      color: systemMetrics.memoryUsage > 80 ? 'text-red-400' : systemMetrics.memoryUsage > 60 ? 'text-yellow-400' : 'text-green-400',
                      bg: systemMetrics.memoryUsage > 80 ? 'bg-red-900/30' : systemMetrics.memoryUsage > 60 ? 'bg-yellow-900/30' : 'bg-green-900/30',
                      percentage: systemMetrics.memoryUsage
                    },
                    {
                      label: 'Disk Usage',
                      value: `${systemMetrics.diskUsage.toFixed(1)}%`,
                      icon: FiDatabase,
                      color: systemMetrics.diskUsage > 80 ? 'text-red-400' : systemMetrics.diskUsage > 60 ? 'text-yellow-400' : 'text-green-400',
                      bg: systemMetrics.diskUsage > 80 ? 'bg-red-900/30' : systemMetrics.diskUsage > 60 ? 'bg-yellow-900/30' : 'bg-green-900/30',
                      percentage: systemMetrics.diskUsage
                    }
                  ].map((metric, index) => (
                    <motion.div
                      key={metric.label}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className={`neu-card-inset p-6 ${metric.bg} hover:scale-105 transition-transform`}
                    >
                      <div className="flex items-center gap-3 mb-3">
                        <SafeIcon icon={metric.icon} className={`w-6 h-6 ${metric.color}`} />
                        <span className="text-gray-300 text-sm font-medium">{metric.label}</span>
                      </div>
                      <div className="text-2xl font-bold text-white mb-3">{metric.value}</div>
                      <div className="w-full bg-gray-600 rounded-full h-2">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: `${metric.percentage}%` }}
                          className={`h-2 rounded-full ${
                            metric.percentage > 80 ? 'bg-red-500' :
                            metric.percentage > 60 ? 'bg-yellow-500' : 'bg-green-500'
                          }`}
                        ></motion.div>
                      </div>
                    </motion.div>
                  ))}
                </div>

                {/* System Charts */}
                <div className="grid lg:grid-cols-2 gap-8">
                  {/* Network Activity */}
                  <div className="neu-card-inset p-6 bg-gray-700/30">
                    <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
                      <SafeIcon icon={FiWifi} className="w-5 h-5 text-blue-400" />
                      Network Activity
                      <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse"></div>
                    </h3>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <span className="text-gray-300">Network In</span>
                        <span className="text-green-400 font-semibold">{systemMetrics.networkIn.toFixed(1)} MB/s</span>
                      </div>
                      <div className="w-full bg-gray-600 rounded-full h-3">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: `${(systemMetrics.networkIn / 100) * 100}%` }}
                          className="bg-green-500 h-3 rounded-full"
                        ></motion.div>
                      </div>
                      
                      <div className="flex items-center justify-between mt-4">
                        <span className="text-gray-300">Network Out</span>
                        <span className="text-blue-400 font-semibold">{systemMetrics.networkOut.toFixed(1)} MB/s</span>
                      </div>
                      <div className="w-full bg-gray-600 rounded-full h-3">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: `${(systemMetrics.networkOut / 100) * 100}%` }}
                          className="bg-blue-500 h-3 rounded-full"
                        ></motion.div>
                      </div>
                    </div>
                  </div>

                  {/* Service Status */}
                  <div className="neu-card-inset p-6 bg-gray-700/30">
                    <h3 className="text-xl font-bold text-white mb-6">Service Status</h3>
                    <div className="space-y-4">
                      {[
                        { service: 'Web Server', status: 'Running', icon: FiServer, uptime: '99.96%' },
                        { service: 'Database', status: 'Running', icon: FiDatabase, uptime: '99.98%' },
                        { service: 'API Gateway', status: 'Running', icon: FiCloud, uptime: '99.94%' },
                        { service: 'CDN', status: 'Running', icon: FiGlobe, uptime: '99.99%' },
                        { service: 'Load Balancer', status: 'Running', icon: FiWifi, uptime: '99.95%' },
                        { service: 'Cache', status: 'Running', icon: FiCpu, uptime: '99.97%' }
                      ].map((service, index) => (
                        <motion.div
                          key={service.service}
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: index * 0.1 }}
                          className="flex items-center justify-between p-3 neu-card-inset bg-gray-600/20"
                        >
                          <div className="flex items-center gap-3">
                            <SafeIcon icon={service.icon} className="w-5 h-5 text-blue-400" />
                            <span className="text-white font-medium">{service.service}</span>
                          </div>
                          <div className="flex items-center gap-3">
                            <span className="text-gray-300 text-sm">{service.uptime}</span>
                            <span className="px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                              {service.status}
                            </span>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Additional System Info */}
                <div className="mt-8 neu-card-inset p-6 bg-gray-700/30">
                  <h3 className="text-xl font-bold text-white mb-6">System Information</h3>
                  <div className="grid md:grid-cols-3 gap-6">
                    <div className="text-center">
                      <div className="neu-button p-4 inline-flex mx-auto mb-3 bg-blue-500 text-white">
                        <SafeIcon icon={FiServer} className="w-6 h-6" />
                      </div>
                      <div className="text-white font-semibold">Response Time</div>
                      <div className="text-green-400 text-lg font-bold">145ms</div>
                    </div>
                    <div className="text-center">
                      <div className="neu-button p-4 inline-flex mx-auto mb-3 bg-green-500 text-white">
                        <SafeIcon icon={FiCheckCircle} className="w-6 h-6" />
                      </div>
                      <div className="text-white font-semibold">System Uptime</div>
                      <div className="text-green-400 text-lg font-bold">{systemMetrics.uptime}</div>
                    </div>
                    <div className="text-center">
                      <div className="neu-button p-4 inline-flex mx-auto mb-3 bg-purple-500 text-white">
                        <SafeIcon icon={FiActivity} className="w-6 h-6" />
                      </div>
                      <div className="text-white font-semibold">Active Processes</div>
                      <div className="text-green-400 text-lg font-bold">1,247</div>
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