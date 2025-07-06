import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../common/SafeIcon';
import useDataStore from '../stores/DataStore';
import { useRealtimeData } from '../hooks/useRealtimeData';

const {
  FiTrendingUp,
  FiUsers,
  FiDollarSign,
  FiShoppingCart,
  FiGlobe,
  FiEye,
  FiClock,
  FiTarget,
  FiBarChart,
  FiPieChart,
  FiActivity
} = FiIcons;

const AdminAnalytics = () => {
  const [timeRange, setTimeRange] = useState('7d');
  
  // Get real-time data from store
  const { users, applications, transactions, activityLogs, getStats } = useDataStore();
  const stats = getStats();

  // Enable real-time updates
  useRealtimeData(10000); // Update every 10 seconds

  const [realtimeMetrics, setRealtimeMetrics] = useState({
    revenue: { current: 0, previous: 0, change: 0 },
    users: { current: 0, previous: 0, change: 0 },
    sales: { current: 0, previous: 0, change: 0 },
    conversion: { current: 0, previous: 0, change: 0 }
  });

  // Update metrics when data changes
  useEffect(() => {
    const currentRevenue = stats.totalRevenue;
    const currentUsers = stats.totalUsers;
    const currentSales = transactions.filter(t => t.type === 'purchase').length;
    const currentConversion = parseFloat(stats.conversionRate);

    setRealtimeMetrics(prev => ({
      revenue: {
        current: currentRevenue,
        previous: prev.revenue.current || currentRevenue * 0.85,
        change: prev.revenue.current ? 
          ((currentRevenue - prev.revenue.current) / prev.revenue.current * 100).toFixed(1) : '+12.5'
      },
      users: {
        current: currentUsers,
        previous: prev.users.current || currentUsers - 3,
        change: prev.users.current ? 
          ((currentUsers - prev.users.current) / prev.users.current * 100).toFixed(1) : '+8.2'
      },
      sales: {
        current: currentSales,
        previous: prev.sales.current || currentSales - 2,
        change: prev.sales.current ? 
          ((currentSales - prev.sales.current) / prev.sales.current * 100).toFixed(1) : '+15.7'
      },
      conversion: {
        current: currentConversion,
        previous: prev.conversion.current || currentConversion - 0.5,
        change: prev.conversion.current ? 
          ((currentConversion - prev.conversion.current) / prev.conversion.current * 100).toFixed(1) : '+14.3'
      }
    }));
  }, [stats, transactions]);

  // Get recent activity (last 5 items)
  const recentActivity = activityLogs.slice(0, 5).map(log => {
    const user = users.find(u => u.id === log.userId);
    const app = applications.find(a => a.id === log.appId);
    return {
      id: log.id,
      type: log.type,
      user: user?.email || 'Unknown User',
      app: app?.name || 'Unknown App',
      time: new Date(log.timestamp).toLocaleTimeString(),
      location: user?.location || 'Unknown',
      amount: log.type === 'app_purchase' ? app?.price : null
    };
  });

  // Get top performing apps
  const topApps = [...applications]
    .sort((a, b) => b.revenue - a.revenue)
    .slice(0, 5);

  // Get conversion funnel data based on activity logs
  const getConversionFunnel = () => {
    const totalVisitors = users.length * 10; // Simulate visitors
    const appViews = activityLogs.filter(log => log.type === 'app_view').length + users.length * 3;
    const purchases = transactions.filter(t => t.type === 'purchase').length;

    return [
      { stage: 'Visitors', count: totalVisitors, percentage: 100 },
      { stage: 'App Views', count: appViews, percentage: ((appViews / totalVisitors) * 100).toFixed(1) },
      { stage: 'Add to Cart', count: Math.floor(purchases * 1.8), percentage: ((purchases * 1.8 / totalVisitors) * 100).toFixed(1) },
      { stage: 'Checkout', count: Math.floor(purchases * 1.2), percentage: ((purchases * 1.2 / totalVisitors) * 100).toFixed(1) },
      { stage: 'Purchase', count: purchases, percentage: ((purchases / totalVisitors) * 100).toFixed(1) }
    ];
  };

  const conversionFunnel = getConversionFunnel();

  // Get top countries based on users
  const getTopCountries = () => {
    const countryStats = users.reduce((acc, user) => {
      if (!acc[user.location]) {
        acc[user.location] = { users: 0, revenue: 0 };
      }
      acc[user.location].users += 1;
      acc[user.location].revenue += user.totalSpent;
      return acc;
    }, {});

    const flagMap = {
      'United States': '🇺🇸',
      'Canada': '🇨🇦',
      'United Kingdom': '🇬🇧',
      'Germany': '🇩🇪',
      'Australia': '🇦🇺'
    };

    return Object.entries(countryStats)
      .map(([country, data]) => ({
        country,
        users: data.users,
        revenue: data.revenue,
        flag: flagMap[country] || '🌍'
      }))
      .sort((a, b) => b.revenue - a.revenue)
      .slice(0, 5);
  };

  const topCountries = getTopCountries();

  // Get device stats (simulated based on user data)
  const deviceStats = [
    { device: 'Desktop', percentage: 45.2, users: Math.floor(stats.totalUsers * 0.452) },
    { device: 'Mobile', percentage: 38.7, users: Math.floor(stats.totalUsers * 0.387) },
    { device: 'Tablet', percentage: 16.1, users: Math.floor(stats.totalUsers * 0.161) }
  ];

  return (
    <div className="space-y-8">
      {/* Real-time Status Indicator */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="neu-card p-4 bg-gradient-to-r from-green-50 to-blue-50"
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
            <span className="text-green-700 font-medium">Live Data Active</span>
          </div>
          <div className="text-sm text-neu-600">
            Last update: {new Date().toLocaleTimeString()}
          </div>
        </div>
      </motion.div>

      {/* Key Metrics */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="grid grid-cols-2 lg:grid-cols-4 gap-6"
      >
        {[
          {
            key: 'revenue',
            label: 'Revenue',
            value: `$${realtimeMetrics.revenue.current.toLocaleString()}`,
            icon: FiDollarSign,
            color: 'text-green-600',
            bg: 'from-green-100 to-emerald-100',
            change: realtimeMetrics.revenue.change
          },
          {
            key: 'users',
            label: 'Total Users',
            value: realtimeMetrics.users.current.toLocaleString(),
            icon: FiUsers,
            color: 'text-blue-600',
            bg: 'from-blue-100 to-cyan-100',
            change: realtimeMetrics.users.change
          },
          {
            key: 'sales',
            label: 'Sales',
            value: realtimeMetrics.sales.current.toLocaleString(),
            icon: FiShoppingCart,
            color: 'text-purple-600',
            bg: 'from-purple-100 to-pink-100',
            change: realtimeMetrics.sales.change
          },
          {
            key: 'conversion',
            label: 'Conversion',
            value: `${realtimeMetrics.conversion.current}%`,
            icon: FiTarget,
            color: 'text-yellow-600',
            bg: 'from-yellow-100 to-orange-100',
            change: realtimeMetrics.conversion.change
          }
        ].map((metric, index) => (
          <motion.div
            key={metric.key}
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
            <div className="flex items-center gap-1 text-sm text-green-600">
              <SafeIcon icon={FiTrendingUp} className="w-4 h-4" />
              +{Math.abs(metric.change)}%
            </div>
          </motion.div>
        ))}
      </motion.div>

      {/* Real-time Charts */}
      <div className="grid lg:grid-cols-2 gap-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="neu-card p-6 bg-gradient-to-br from-white to-blue-50"
        >
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-bold text-neu-900 flex items-center gap-2">
              <SafeIcon icon={FiActivity} className="w-5 h-5 text-green-600" />
              Real-time Activity
            </h3>
            <div className="text-sm text-green-600 flex items-center gap-2">
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
              Live
            </div>
          </div>
          <div className="space-y-4">
            <div className="flex items-center justify-between text-sm">
              <span className="text-neu-600">Time</span>
              <span className="text-neu-600">User</span>
              <span className="text-neu-600">Action</span>
              <span className="text-neu-600">Amount</span>
            </div>
            {recentActivity.map((activity, index) => (
              <motion.div
                key={activity.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="neu-card-inset p-3 bg-white/70"
              >
                <div className="flex items-center justify-between text-sm">
                  <span className="text-neu-900 font-mono">{activity.time}</span>
                  <span className="text-blue-600 truncate max-w-[100px]">{activity.user}</span>
                  <span className={`font-medium ${
                    activity.type === 'app_purchase' ? 'text-green-600' :
                    activity.type === 'user_login' ? 'text-blue-600' : 'text-purple-600'
                  }`}>
                    {activity.type.replace('_', ' ')}
                  </span>
                  <span className="text-green-600">
                    {activity.amount ? `$${activity.amount}` : '-'}
                  </span>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="neu-card p-6 bg-gradient-to-br from-white to-purple-50"
        >
          <h3 className="text-xl font-bold text-neu-900 mb-6">Conversion Funnel</h3>
          <div className="space-y-3">
            {conversionFunnel.map((stage, index) => (
              <div key={stage.stage} className="neu-card-inset p-4 bg-white/70">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-neu-900 font-medium">{stage.stage}</span>
                  <span className="text-neu-700">{stage.count.toLocaleString()}</span>
                </div>
                <div className="w-full bg-neu-200 rounded-full h-2">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${stage.percentage}%` }}
                    transition={{ duration: 1, delay: index * 0.2 }}
                    className="bg-gradient-to-r from-blue-500 to-purple-500 h-2 rounded-full"
                  ></motion.div>
                </div>
                <div className="text-right text-xs text-neu-500 mt-1">
                  {stage.percentage}%
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Geographic and Device Analytics */}
      <div className="grid lg:grid-cols-2 gap-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="neu-card p-6 bg-gradient-to-br from-white to-green-50"
        >
          <h3 className="text-xl font-bold text-neu-900 mb-6">Top Countries</h3>
          <div className="space-y-4">
            {topCountries.map((country, index) => (
              <motion.div
                key={country.country}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="neu-card-inset p-4 bg-white/70"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">{country.flag}</span>
                    <div>
                      <div className="text-neu-900 font-medium">{country.country}</div>
                      <div className="text-neu-500 text-sm">{country.users.toLocaleString()} users</div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-green-600 font-semibold">${country.revenue.toLocaleString()}</div>
                    <div className="text-neu-500 text-sm">#{index + 1}</div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="neu-card p-6 bg-gradient-to-br from-white to-yellow-50"
        >
          <h3 className="text-xl font-bold text-neu-900 mb-6">Device Breakdown</h3>
          <div className="space-y-6">
            {deviceStats.map((device) => (
              <div key={device.device} className="neu-card-inset p-4 bg-white/70">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-neu-900 font-medium">{device.device}</span>
                  <span className="text-neu-700">{device.percentage}%</span>
                </div>
                <div className="w-full bg-neu-200 rounded-full h-3">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${device.percentage}%` }}
                    transition={{ duration: 1.5 }}
                    className={`h-3 rounded-full transition-all duration-1000 ${
                      device.device === 'Desktop' ? 'bg-blue-500' :
                      device.device === 'Mobile' ? 'bg-green-500' : 'bg-purple-500'
                    }`}
                  ></motion.div>
                </div>
                <div className="text-neu-500 text-sm mt-1">
                  {device.users.toLocaleString()} users
                </div>
              </div>
            ))}
          </div>
          <div className="mt-6 neu-card-inset p-4 bg-white/70">
            <h4 className="text-lg font-semibold text-neu-900 mb-3">Performance Metrics</h4>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <div className="text-neu-600">Avg. Session</div>
                <div className="text-neu-900 font-semibold">4m 12s</div>
              </div>
              <div>
                <div className="text-neu-600">Bounce Rate</div>
                <div className="text-neu-900 font-semibold">18.2%</div>
              </div>
              <div>
                <div className="text-neu-600">Pages/Session</div>
                <div className="text-neu-900 font-semibold">3.7</div>
              </div>
              <div>
                <div className="text-neu-600">Conversion</div>
                <div className="text-neu-900 font-semibold">{stats.conversionRate}%</div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default AdminAnalytics;