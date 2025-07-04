import React from 'react';
import { motion } from 'framer-motion';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../common/SafeIcon';

const { FiDollarSign, FiTrendingUp, FiShoppingCart, FiUsers, FiCalendar, FiDownload } = FiIcons;

const RevenueStats = ({ apps = [] }) => {
  // Calculate revenue stats
  const totalRevenue = apps.reduce((sum, app) => sum + (app.revenue || 0), 0);
  const totalSales = apps.reduce((sum, app) => sum + (app.sales || 0), 0);
  const avgRating = apps.length > 0 ? apps.reduce((sum, app) => sum + (app.rating || 0), 0) / apps.length : 0;
  const totalDownloads = apps.reduce((sum, app) => sum + (app.downloads || 0), 0);

  const stats = [
    {
      label: 'Total Revenue',
      value: `$${totalRevenue.toLocaleString()}`,
      change: '+12.5%',
      icon: FiDollarSign,
      color: 'text-green-600'
    },
    {
      label: 'Total Sales',
      value: totalSales.toLocaleString(),
      change: '+8.2%',
      icon: FiShoppingCart,
      color: 'text-blue-600'
    },
    {
      label: 'Average Rating',
      value: avgRating.toFixed(1),
      change: '+0.3',
      icon: FiTrendingUp,
      color: 'text-yellow-600'
    },
    {
      label: 'Total Downloads',
      value: totalDownloads.toLocaleString(),
      change: '+15.7%',
      icon: FiDownload,
      color: 'text-purple-600'
    }
  ];

  const recentSales = [
    { id: 1, app: 'ShopFlow Pro', amount: 49.99, buyer: 'john@example.com', date: '2 hours ago' },
    { id: 2, app: 'Creative Portfolio', amount: 29.99, buyer: 'jane@example.com', date: '4 hours ago' },
    { id: 3, app: 'BlogMaster', amount: 39.99, buyer: 'mike@example.com', date: '6 hours ago' },
    { id: 4, app: 'StartupLand', amount: 19.99, buyer: 'sarah@example.com', date: '8 hours ago' },
    { id: 5, app: 'TaskFlow', amount: 79.99, buyer: 'david@example.com', date: '12 hours ago' }
  ];

  return (
    <div className="space-y-8">
      {/* Revenue Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="neu-card p-6"
          >
            <div className="flex items-center justify-between mb-4">
              <div className={`neu-button p-3 ${stat.color}`}>
                <SafeIcon icon={stat.icon} className="w-6 h-6" />
              </div>
              <div className="text-right">
                <div className="text-xs text-green-600 font-medium">{stat.change}</div>
                <div className="text-xs text-neu-500">vs last month</div>
              </div>
            </div>
            <div className="space-y-1">
              <div className="text-2xl font-bold text-neu-900">{stat.value}</div>
              <div className="text-sm text-neu-600">{stat.label}</div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Revenue Chart */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="neu-card p-8"
      >
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-semibold text-neu-900">Revenue Overview</h3>
          <div className="flex gap-2">
            <button className="neu-button px-4 py-2 text-sm text-neu-700">7 days</button>
            <button className="neu-button px-4 py-2 text-sm text-neu-700 bg-blue-500 text-white">30 days</button>
            <button className="neu-button px-4 py-2 text-sm text-neu-700">90 days</button>
          </div>
        </div>
        
        {/* Simple Revenue Chart Placeholder */}
        <div className="neu-card-inset p-6 h-64 flex items-center justify-center">
          <div className="text-center">
            <SafeIcon icon={FiTrendingUp} className="w-16 h-16 text-neu-400 mx-auto mb-4" />
            <p className="text-neu-600">Revenue chart will be displayed here</p>
            <p className="text-neu-500 text-sm">Integration with Chart.js or similar</p>
          </div>
        </div>
      </motion.div>

      {/* Recent Sales */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="neu-card p-8"
      >
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-semibold text-neu-900">Recent Sales</h3>
          <button className="neu-button px-4 py-2 text-sm text-neu-700">View All</button>
        </div>
        
        <div className="space-y-4">
          {recentSales.map(sale => (
            <div key={sale.id} className="neu-card-inset p-4 flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="neu-button p-2">
                  <SafeIcon icon={FiShoppingCart} className="w-4 h-4 text-green-600" />
                </div>
                <div>
                  <div className="font-medium text-neu-900">{sale.app}</div>
                  <div className="text-sm text-neu-600">{sale.buyer}</div>
                </div>
              </div>
              <div className="text-right">
                <div className="font-semibold text-neu-900">${sale.amount}</div>
                <div className="text-sm text-neu-500">{sale.date}</div>
              </div>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Commission Info */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="neu-card p-8"
      >
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-semibold text-neu-900">Commission Breakdown</h3>
          <div className="neu-button px-4 py-2 bg-blue-500 text-white">
            <div className="flex items-center gap-2">
              <SafeIcon icon={FiTrendingUp} className="w-4 h-4" />
              <span className="text-sm font-medium">Upgrade to Pro</span>
            </div>
          </div>
        </div>
        
        <div className="grid md:grid-cols-2 gap-6">
          <div className="neu-card-inset p-6">
            <div className="text-center space-y-2">
              <div className="text-3xl font-bold text-neu-900">5%</div>
              <div className="text-neu-600">Current Commission</div>
              <div className="text-sm text-neu-500">Applied to all sales</div>
            </div>
          </div>
          <div className="neu-card-inset p-6">
            <div className="text-center space-y-2">
              <div className="text-3xl font-bold text-green-600">0%</div>
              <div className="text-neu-600">Pro Plan Commission</div>
              <div className="text-sm text-neu-500">Keep 100% of your revenue</div>
            </div>
          </div>
        </div>
        
        <div className="mt-6 p-4 bg-blue-50 rounded-lg">
          <div className="flex items-center gap-3">
            <SafeIcon icon={FiDollarSign} className="w-5 h-5 text-blue-600" />
            <div>
              <div className="font-medium text-neu-900">Commission saved with Pro plan</div>
              <div className="text-sm text-neu-600">
                Based on your current revenue, you'd save ${(totalRevenue * 0.05).toFixed(2)} per month
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default RevenueStats;