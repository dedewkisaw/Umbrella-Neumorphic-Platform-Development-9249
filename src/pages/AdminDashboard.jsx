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

const { FiShield, FiUsers, FiDollarSign, FiTrendingUp, FiActivity, FiGlobe, FiShoppingCart, FiEye, FiDownload, FiStar, FiClock, FiBarChart, FiPieChart, FiMap, FiMonitor, FiDatabase, FiLock, FiLogOut, FiRefreshCw, FiAlertTriangle, FiCheckCircle, FiXCircle, FiSettings, FiMail, FiPhone, FiCreditCard, FiTarget, FiTrendingDown, FiUserCheck, FiUserX, FiFilter, FiCalendar, FiFileText, FiExternalLink, FiAward } = FiIcons;

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

  const tabs = [
    { id: 'overview', label: 'Overview', icon: FiBarChart },
    { id: 'analytics', label: 'Analytics', icon: FiPieChart },
    { id: 'users', label: 'Users', icon: FiUsers },
    { id: 'sales', label: 'Sales', icon: FiDollarSign },
    { id: 'apps', label: 'Applications', icon: FiShoppingCart },
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

  const [systemHealth] = useState({
    apiStatus: 'healthy',
    databaseStatus: 'healthy',
    paymentStatus: 'healthy',
    cdnStatus: 'healthy',
    uptime: '99.96%',
    responseTime: '145ms'
  });

  const [securityLogs] = useState([
    {
      id: 1,
      type: 'login',
      severity: 'info',
      message: 'Admin login successful',
      ip: '192.168.1.1',
      time: new Date().toLocaleTimeString()
    },
    {
      id: 2,
      type: 'failed_login',
      severity: 'warning',
      message: 'Failed login attempt',
      ip: '45.123.45.67',
      time: new Date(Date.now() - 300000).toLocaleTimeString()
    },
    {
      id: 3,
      type: 'api_limit',
      severity: 'warning',
      message: 'Rate limit exceeded',
      ip: '123.45.67.89',
      time: new Date(Date.now() - 600000).toLocaleTimeString()
    }
  ]);

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
                onClick={() => setActiveTab(tab.id)}
                className={`neu-button px-6 py-3 hover:scale-105 transition-transform flex-shrink-0 ${
                  activeTab === tab.id ? 'bg-blue-600 text-white' : 'bg-gray-700 text-gray-300'
                }`}
              >
                <div className="flex items-center gap-2">
                  <SafeIcon icon={tab.icon} className="w-5 h-5" />
                  <span className="font-medium">{tab.label}</span>
                  {/* Show live indicators for data tabs */}
                  {(tab.id === 'users' || tab.id === 'sales' || tab.id === 'apps') && (
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

                {/* Apps list */}
                <div className="space-y-4">
                  {applications.map((app) => (
                    <div key={app.id} className="neu-card-inset p-6 bg-gray-700/30">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                          <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg flex items-center justify-center text-white font-bold text-xl">
                            {app.name.charAt(0)}
                          </div>
                          <div>
                            <div className="text-white font-semibold text-lg flex items-center gap-2">
                              {app.name}
                              {app.featured && (
                                <SafeIcon icon={FiStar} className="w-4 h-4 text-yellow-400" />
                              )}
                            </div>
                            <div className="text-gray-400 text-sm">
                              by {app.developer} • {app.category}
                            </div>
                            <div className="text-gray-500 text-xs mt-1">
                              Version {app.version} • {app.size}
                            </div>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="text-2xl font-bold text-green-400">${app.price}</div>
                          <div className="text-gray-400 text-sm">
                            {app.downloads} downloads
                          </div>
                          <div className="flex items-center gap-1 text-yellow-400 text-sm">
                            <SafeIcon icon={FiStar} className="w-3 h-3" />
                            {app.rating} ({app.reviews} reviews)
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          )}

          {/* Security and System tabs remain the same as original implementation */}
          {activeTab === 'security' && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-8"
            >
              <div className="neu-card p-8 bg-gray-800">
                <h2 className="text-2xl font-bold text-white mb-6">Security Monitoring</h2>
                <div className="grid lg:grid-cols-3 gap-6 mb-8">
                  <div className="neu-card-inset p-6 bg-green-900/30">
                    <div className="flex items-center gap-3 mb-3">
                      <SafeIcon icon={FiCheckCircle} className="w-6 h-6 text-green-400" />
                      <span className="text-green-400 font-medium">System Secure</span>
                    </div>
                    <div className="text-white text-2xl font-bold">No Threats</div>
                  </div>
                  {/* Add other security components */}
                </div>
              </div>
            </motion.div>
          )}

          {activeTab === 'system' && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-8"
            >
              <div className="neu-card p-8 bg-gray-800">
                <h2 className="text-2xl font-bold text-white mb-6">System Health</h2>
                {/* System health components */}
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;