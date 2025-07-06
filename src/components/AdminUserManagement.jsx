import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../common/SafeIcon';
import useDataStore from '../stores/DataStore';
import { useRealtimeData } from '../hooks/useRealtimeData';

const {
  FiUsers,
  FiMail,
  FiPhone,
  FiCalendar,
  FiDollarSign,
  FiShoppingCart,
  FiEye,
  FiEdit,
  FiTrash,
  FiUserCheck,
  FiUserX,
  FiFilter,
  FiSearch,
  FiDownload,
  FiMoreHorizontal,
  FiMapPin,
  FiMonitor,
  FiActivity
} = FiIcons;

const AdminUserManagement = () => {
  const { users, transactions, updateUser, getStats } = useDataStore();
  const stats = getStats();

  // Enable real-time updates
  useRealtimeData(15000);

  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [planFilter, setPlanFilter] = useState('all');
  const [selectedUsers, setSelectedUsers] = useState([]);

  const getStatusColor = (status) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800';
      case 'inactive': return 'bg-yellow-100 text-yellow-800';
      case 'suspended': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getPlanColor = (plan) => {
    switch (plan) {
      case 'Free': return 'bg-gray-100 text-gray-800';
      case 'Pro': return 'bg-blue-100 text-blue-800';
      case 'Business': return 'bg-purple-100 text-purple-800';
      case 'Enterprise': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const filteredUsers = users.filter(user => {
    const matchesSearch = user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         user.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || user.status === statusFilter;
    const matchesPlan = planFilter === 'all' || user.plan === planFilter;
    return matchesSearch && matchesStatus && matchesPlan;
  });

  const handleUserAction = (userId, action) => {
    switch (action) {
      case 'activate':
        updateUser(userId, { status: 'active', lastActivity: new Date().toISOString() });
        break;
      case 'suspend':
        updateUser(userId, { status: 'suspended' });
        break;
      case 'delete':
        // In a real app, you'd want to soft delete or archive
        console.log('Delete user:', userId);
        break;
      default:
        break;
    }
  };

  // Calculate user statistics
  const totalUsers = users.length;
  const activeUsers = users.filter(u => u.status === 'active').length;
  const totalRevenue = stats.totalRevenue;
  const avgSpent = totalUsers > 0 ? totalRevenue / totalUsers : 0;

  // Get user activity over time
  const getUserActivity = () => {
    const now = new Date();
    const last24Hours = users.filter(user => {
      const lastActivity = new Date(user.lastActivity);
      return (now - lastActivity) <= 24 * 60 * 60 * 1000;
    }).length;

    const lastWeek = users.filter(user => {
      const joinDate = new Date(user.joinDate);
      return (now - joinDate) <= 7 * 24 * 60 * 60 * 1000;
    }).length;

    return { last24Hours, lastWeek };
  };

  const userActivity = getUserActivity();

  return (
    <div className="space-y-8">
      {/* Real-time Status */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="neu-card p-4 bg-gradient-to-r from-blue-50 to-purple-50"
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
            <span className="text-blue-700 font-medium">User Data Live</span>
          </div>
          <div className="text-sm text-neu-600">
            Active users: {activeUsers} | Online now: {Math.floor(activeUsers * 0.3)}
          </div>
        </div>
      </motion.div>

      {/* User Statistics */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="grid grid-cols-2 lg:grid-cols-4 gap-6"
      >
        {[
          {
            label: 'Total Users',
            value: totalUsers.toLocaleString(),
            icon: FiUsers,
            color: 'text-blue-600',
            bg: 'from-blue-100 to-cyan-100',
            subtext: `+${userActivity.lastWeek} this week`
          },
          {
            label: 'Active Users',
            value: activeUsers.toLocaleString(),
            icon: FiUserCheck,
            color: 'text-green-600',
            bg: 'from-green-100 to-emerald-100',
            subtext: `${userActivity.last24Hours} active today`
          },
          {
            label: 'Total Revenue',
            value: `$${totalRevenue.toLocaleString()}`,
            icon: FiDollarSign,
            color: 'text-green-600',
            bg: 'from-green-100 to-emerald-100',
            subtext: 'All time'
          },
          {
            label: 'Avg. Spent',
            value: `$${avgSpent.toFixed(2)}`,
            icon: FiShoppingCart,
            color: 'text-purple-600',
            bg: 'from-purple-100 to-pink-100',
            subtext: 'Per user'
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
            <div className="text-2xl font-bold text-neu-900 mb-1">{stat.value}</div>
            <div className="text-xs text-neu-500">{stat.subtext}</div>
          </motion.div>
        ))}
      </motion.div>

      {/* User Management Interface */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="neu-card p-6 bg-gradient-to-br from-white to-blue-50"
      >
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-bold text-neu-900 flex items-center gap-2">
            <SafeIcon icon={FiUsers} className="w-6 h-6 text-blue-600" />
            User Management
          </h3>
          <div className="flex items-center gap-4">
            <div className="text-sm text-green-600 flex items-center gap-2">
              <SafeIcon icon={FiActivity} className="w-4 h-4" />
              Live Updates
            </div>
            <button className="neu-button px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-500 text-white hover:scale-105 transition-transform shadow-xl">
              <div className="flex items-center gap-2">
                <SafeIcon icon={FiDownload} className="w-4 h-4" />
                Export
              </div>
            </button>
          </div>
        </div>

        {/* Filters */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <div className="relative">
            <SafeIcon icon={FiSearch} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-neu-400 w-4 h-4" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full neu-input pl-10 pr-4 py-2 text-neu-700"
              placeholder="Search users..."
            />
          </div>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="neu-input p-2 text-neu-700"
          >
            <option value="all">All Status</option>
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
            <option value="suspended">Suspended</option>
          </select>
          <select
            value={planFilter}
            onChange={(e) => setPlanFilter(e.target.value)}
            className="neu-input p-2 text-neu-700"
          >
            <option value="all">All Plans</option>
            <option value="Free">Free</option>
            <option value="Pro">Pro</option>
            <option value="Business">Business</option>
            <option value="Enterprise">Enterprise</option>
          </select>
          <div className="text-neu-700 text-sm flex items-center">
            Showing {filteredUsers.length} of {totalUsers} users
          </div>
        </div>

        {/* User Table */}
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-neu-300">
                <th className="text-left p-3 text-neu-700">User</th>
                <th className="text-left p-3 text-neu-700">Status</th>
                <th className="text-left p-3 text-neu-700">Plan</th>
                <th className="text-left p-3 text-neu-700">Spent</th>
                <th className="text-left p-3 text-neu-700">Purchases</th>
                <th className="text-left p-3 text-neu-700">Last Active</th>
                <th className="text-left p-3 text-neu-700">Location</th>
                <th className="text-left p-3 text-neu-700">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredUsers.map((user) => {
                const lastActivity = new Date(user.lastActivity);
                const now = new Date();
                const timeDiff = now - lastActivity;
                const isOnline = timeDiff < 5 * 60 * 1000; // Online if active within 5 minutes

                return (
                  <motion.tr
                    key={user.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="border-b border-neu-200 hover:bg-blue-50/30"
                  >
                    <td className="p-3">
                      <div className="flex items-center gap-3">
                        <div className="relative">
                          <img
                            src={user.avatar}
                            alt={user.name}
                            className="w-10 h-10 rounded-full object-cover"
                          />
                          {isOnline && (
                            <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-white"></div>
                          )}
                        </div>
                        <div>
                          <div className="text-neu-900 font-medium flex items-center gap-2">
                            {user.name}
                            {isOnline && <div className="w-2 h-2 bg-green-400 rounded-full"></div>}
                          </div>
                          <div className="text-neu-500 text-sm">{user.email}</div>
                          <div className="text-neu-400 text-xs">{user.browser}</div>
                        </div>
                      </div>
                    </td>
                    <td className="p-3">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(user.status)}`}>
                        {user.status}
                      </span>
                    </td>
                    <td className="p-3">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getPlanColor(user.plan)}`}>
                        {user.plan}
                      </span>
                    </td>
                    <td className="p-3">
                      <span className="text-green-600 font-semibold">${user.totalSpent.toFixed(2)}</span>
                    </td>
                    <td className="p-3">
                      <span className="text-neu-900">{user.purchases}</span>
                    </td>
                    <td className="p-3">
                      <div className="text-neu-700 text-sm">
                        {isOnline ? (
                          <span className="text-green-600 flex items-center gap-1">
                            <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                            Online
                          </span>
                        ) : (
                          lastActivity.toLocaleDateString()
                        )}
                      </div>
                    </td>
                    <td className="p-3">
                      <div className="flex items-center gap-1 text-neu-700 text-sm">
                        <SafeIcon icon={FiMapPin} className="w-3 h-3" />
                        {user.location}
                      </div>
                    </td>
                    <td className="p-3">
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => handleUserAction(user.id, 'activate')}
                          className="neu-button p-2 bg-gradient-to-r from-green-500 to-emerald-500 text-white hover:scale-105 transition-transform"
                          title="Activate"
                        >
                          <SafeIcon icon={FiUserCheck} className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleUserAction(user.id, 'suspend')}
                          className="neu-button p-2 bg-gradient-to-r from-yellow-500 to-orange-500 text-white hover:scale-105 transition-transform"
                          title="Suspend"
                        >
                          <SafeIcon icon={FiUserX} className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleUserAction(user.id, 'delete')}
                          className="neu-button p-2 bg-gradient-to-r from-red-500 to-pink-500 text-white hover:scale-105 transition-transform"
                          title="Delete"
                        >
                          <SafeIcon icon={FiTrash} className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </motion.tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {filteredUsers.length === 0 && (
          <div className="text-center py-12">
            <SafeIcon icon={FiUsers} className="w-16 h-16 text-neu-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-neu-900 mb-2">No Users Found</h3>
            <p className="text-neu-600">Try adjusting your search or filter criteria.</p>
          </div>
        )}
      </motion.div>
    </div>
  );
};

export default AdminUserManagement;