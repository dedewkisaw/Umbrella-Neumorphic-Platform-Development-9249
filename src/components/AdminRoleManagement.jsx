import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../common/SafeIcon';
import useDataStore from '../stores/DataStore';
import { useRealtimeData } from '../hooks/useRealtimeData';

const {
  FiUsers,
  FiShield,
  FiSettings,
  FiEdit,
  FiTrash,
  FiPlus,
  FiCheck,
  FiX,
  FiEye,
  FiLock,
  FiUnlock,
  FiUserCheck,
  FiUserX,
  FiCrown,
  FiStar,
  FiZap,
  FiSearch,
  FiFilter,
  FiMoreHorizontal,
  FiChevronDown,
  FiChevronUp,
  FiCopy,
  FiRefreshCw,
  FiAlertTriangle,
  FiInfo,
  FiCheckCircle,
  FiXCircle,
  FiActivity,
  FiDatabase,
  FiMail,
  FiMessageSquare,
  FiBarChart,
  FiDollarSign,
  FiDownload,
  FiUpload,
  FiGlobe,
  FiCode
} = FiIcons;

const AdminRoleManagement = () => {
  const { users, updateUser, getStats } = useDataStore();
  const stats = getStats();

  // Enable real-time updates
  useRealtimeData(15000);

  const [activeTab, setActiveTab] = useState('roles');
  const [searchTerm, setSearchTerm] = useState('');
  const [filterBy, setFilterBy] = useState('all');
  const [selectedRole, setSelectedRole] = useState(null);
  const [selectedUser, setSelectedUser] = useState(null);
  const [showRoleModal, setShowRoleModal] = useState(false);
  const [showUserModal, setShowUserModal] = useState(false);
  const [showPermissionModal, setShowPermissionModal] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  // Role management state
  const [roles, setRoles] = useState([
    {
      id: 1,
      name: 'Super Admin',
      description: 'Full system access with all permissions',
      color: 'from-red-500 to-pink-500',
      icon: FiCrown,
      userCount: 1,
      isSystem: true,
      createdAt: '2024-01-01',
      permissions: {
        users: { read: true, write: true, delete: true },
        roles: { read: true, write: true, delete: true },
        apps: { read: true, write: true, delete: true },
        analytics: { read: true, write: true, delete: false },
        settings: { read: true, write: true, delete: false },
        billing: { read: true, write: true, delete: false },
        support: { read: true, write: true, delete: false },
        system: { read: true, write: true, delete: true }
      }
    },
    {
      id: 2,
      name: 'Admin',
      description: 'Administrative access with most permissions',
      color: 'from-blue-500 to-purple-500',
      icon: FiShield,
      userCount: 2,
      isSystem: false,
      createdAt: '2024-01-01',
      permissions: {
        users: { read: true, write: true, delete: false },
        roles: { read: true, write: false, delete: false },
        apps: { read: true, write: true, delete: false },
        analytics: { read: true, write: false, delete: false },
        settings: { read: true, write: true, delete: false },
        billing: { read: true, write: false, delete: false },
        support: { read: true, write: true, delete: false },
        system: { read: true, write: false, delete: false }
      }
    },
    {
      id: 3,
      name: 'Support Manager',
      description: 'Manage customer support and user assistance',
      color: 'from-green-500 to-blue-500',
      icon: FiMessageSquare,
      userCount: 3,
      isSystem: false,
      createdAt: '2024-01-05',
      permissions: {
        users: { read: true, write: false, delete: false },
        roles: { read: false, write: false, delete: false },
        apps: { read: true, write: false, delete: false },
        analytics: { read: true, write: false, delete: false },
        settings: { read: false, write: false, delete: false },
        billing: { read: true, write: false, delete: false },
        support: { read: true, write: true, delete: false },
        system: { read: false, write: false, delete: false }
      }
    },
    {
      id: 4,
      name: 'Content Manager',
      description: 'Manage applications and content approval',
      color: 'from-purple-500 to-pink-500',
      icon: FiGlobe,
      userCount: 2,
      isSystem: false,
      createdAt: '2024-01-08',
      permissions: {
        users: { read: true, write: false, delete: false },
        roles: { read: false, write: false, delete: false },
        apps: { read: true, write: true, delete: false },
        analytics: { read: true, write: false, delete: false },
        settings: { read: false, write: false, delete: false },
        billing: { read: false, write: false, delete: false },
        support: { read: true, write: false, delete: false },
        system: { read: false, write: false, delete: false }
      }
    },
    {
      id: 5,
      name: 'Viewer',
      description: 'Read-only access to system information',
      color: 'from-gray-500 to-gray-600',
      icon: FiEye,
      userCount: 5,
      isSystem: false,
      createdAt: '2024-01-10',
      permissions: {
        users: { read: true, write: false, delete: false },
        roles: { read: false, write: false, delete: false },
        apps: { read: true, write: false, delete: false },
        analytics: { read: true, write: false, delete: false },
        settings: { read: false, write: false, delete: false },
        billing: { read: false, write: false, delete: false },
        support: { read: true, write: false, delete: false },
        system: { read: false, write: false, delete: false }
      }
    }
  ]);

  const [newRole, setNewRole] = useState({
    name: '',
    description: '',
    color: 'from-blue-500 to-purple-500',
    icon: FiUsers,
    permissions: {
      users: { read: false, write: false, delete: false },
      roles: { read: false, write: false, delete: false },
      apps: { read: false, write: false, delete: false },
      analytics: { read: false, write: false, delete: false },
      settings: { read: false, write: false, delete: false },
      billing: { read: false, write: false, delete: false },
      support: { read: false, write: false, delete: false },
      system: { read: false, write: false, delete: false }
    }
  });

  // Permission categories
  const permissionCategories = {
    users: {
      name: 'User Management',
      description: 'Manage user accounts and profiles',
      icon: FiUsers,
      color: 'text-blue-600'
    },
    roles: {
      name: 'Role Management',
      description: 'Create and manage user roles',
      icon: FiShield,
      color: 'text-purple-600'
    },
    apps: {
      name: 'Application Management',
      description: 'Manage apps and content',
      icon: FiGlobe,
      color: 'text-green-600'
    },
    analytics: {
      name: 'Analytics & Reports',
      description: 'View system analytics',
      icon: FiBarChart,
      color: 'text-yellow-600'
    },
    settings: {
      name: 'System Settings',
      description: 'Configure system settings',
      icon: FiSettings,
      color: 'text-indigo-600'
    },
    billing: {
      name: 'Billing & Payments',
      description: 'Manage billing and transactions',
      icon: FiDollarSign,
      color: 'text-green-600'
    },
    support: {
      name: 'Customer Support',
      description: 'Handle customer inquiries',
      icon: FiMessageSquare,
      color: 'text-blue-600'
    },
    system: {
      name: 'System Administration',
      description: 'System-level operations',
      icon: FiDatabase,
      color: 'text-red-600'
    }
  };

  // Enhanced users with roles
  const usersWithRoles = users.map(user => ({
    ...user,
    role: roles.find(role => role.id === (user.roleId || 5)) || roles[4], // Default to Viewer
    lastLogin: new Date(user.lastActivity).toLocaleDateString(),
    permissions: roles.find(role => role.id === (user.roleId || 5))?.permissions || {}
  }));

  // Color options for roles
  const colorOptions = [
    { name: 'Blue to Purple', value: 'from-blue-500 to-purple-500' },
    { name: 'Green to Blue', value: 'from-green-500 to-blue-500' },
    { name: 'Purple to Pink', value: 'from-purple-500 to-pink-500' },
    { name: 'Red to Pink', value: 'from-red-500 to-pink-500' },
    { name: 'Yellow to Orange', value: 'from-yellow-500 to-orange-500' },
    { name: 'Indigo to Purple', value: 'from-indigo-500 to-purple-500' },
    { name: 'Teal to Blue', value: 'from-teal-500 to-blue-500' },
    { name: 'Gray', value: 'from-gray-500 to-gray-600' }
  ];

  // Icon options for roles
  const iconOptions = [
    { name: 'Users', value: FiUsers },
    { name: 'Shield', value: FiShield },
    { name: 'Crown', value: FiCrown },
    { name: 'Star', value: FiStar },
    { name: 'Zap', value: FiZap },
    { name: 'Globe', value: FiGlobe },
    { name: 'Eye', value: FiEye },
    { name: 'Message', value: FiMessageSquare },
    { name: 'Settings', value: FiSettings },
    { name: 'Code', value: FiCode }
  ];

  const handleCreateRole = () => {
    if (!newRole.name.trim()) return;

    const role = {
      ...newRole,
      id: Date.now(),
      userCount: 0,
      isSystem: false,
      createdAt: new Date().toISOString().split('T')[0]
    };

    setRoles(prev => [...prev, role]);
    setNewRole({
      name: '',
      description: '',
      color: 'from-blue-500 to-purple-500',
      icon: FiUsers,
      permissions: {
        users: { read: false, write: false, delete: false },
        roles: { read: false, write: false, delete: false },
        apps: { read: false, write: false, delete: false },
        analytics: { read: false, write: false, delete: false },
        settings: { read: false, write: false, delete: false },
        billing: { read: false, write: false, delete: false },
        support: { read: false, write: false, delete: false },
        system: { read: false, write: false, delete: false }
      }
    });
    setShowRoleModal(false);
  };

  const handleUpdateRole = (roleId, updates) => {
    setRoles(prev => prev.map(role => 
      role.id === roleId ? { ...role, ...updates } : role
    ));
  };

  const handleDeleteRole = (roleId) => {
    const role = roles.find(r => r.id === roleId);
    if (role?.isSystem) return; // Can't delete system roles

    setRoles(prev => prev.filter(role => role.id !== roleId));
    
    // Update users with this role to default role
    usersWithRoles.forEach(user => {
      if (user.roleId === roleId) {
        updateUser(user.id, { roleId: 5 }); // Set to Viewer role
      }
    });
  };

  const handleAssignRole = (userId, roleId) => {
    updateUser(userId, { roleId });
    
    // Update role user counts
    setRoles(prev => prev.map(role => ({
      ...role,
      userCount: usersWithRoles.filter(u => u.roleId === role.id).length
    })));
  };

  const getPermissionIcon = (hasPermission, permissionType) => {
    if (permissionType === 'read') return hasPermission ? FiEye : FiX;
    if (permissionType === 'write') return hasPermission ? FiEdit : FiX;
    if (permissionType === 'delete') return hasPermission ? FiTrash : FiX;
    return FiX;
  };

  const getPermissionColor = (hasPermission) => {
    return hasPermission ? 'text-green-600' : 'text-red-400';
  };

  const filteredRoles = roles.filter(role => {
    const matchesSearch = role.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         role.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterBy === 'all' || 
                         (filterBy === 'system' && role.isSystem) ||
                         (filterBy === 'custom' && !role.isSystem);
    return matchesSearch && matchesFilter;
  });

  const filteredUsers = usersWithRoles.filter(user => {
    const matchesSearch = user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         user.role.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterBy === 'all' || user.role.name.toLowerCase().includes(filterBy.toLowerCase());
    return matchesSearch && matchesFilter;
  });

  return (
    <div className="space-y-8">
      {/* Real-time Status Indicator */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="neu-card p-4 bg-gradient-to-r from-purple-50 to-blue-50"
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
            <span className="text-purple-700 font-medium">Role Management Active</span>
          </div>
          <div className="text-sm text-gray-600">
            {roles.length} roles managing {usersWithRoles.length} users
          </div>
        </div>
      </motion.div>

      {/* Role Management Statistics */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="grid grid-cols-2 lg:grid-cols-4 gap-6"
      >
        {[
          {
            label: 'Total Roles',
            value: roles.length,
            icon: FiShield,
            color: 'text-purple-400',
            bg: 'bg-purple-900/30',
            subtext: `${roles.filter(r => !r.isSystem).length} custom roles`
          },
          {
            label: 'Active Users',
            value: usersWithRoles.filter(u => u.status === 'active').length,
            icon: FiUsers,
            color: 'text-blue-400',
            bg: 'bg-blue-900/30',
            subtext: 'with assigned roles'
          },
          {
            label: 'Admin Users',
            value: usersWithRoles.filter(u => u.role.name.includes('Admin')).length,
            icon: FiCrown,
            color: 'text-yellow-400',
            bg: 'bg-yellow-900/30',
            subtext: 'elevated privileges'
          },
          {
            label: 'Permission Groups',
            value: Object.keys(permissionCategories).length,
            icon: FiLock,
            color: 'text-green-400',
            bg: 'bg-green-900/30',
            subtext: 'system modules'
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
            <div className="text-2xl font-bold text-white mb-1">{stat.value}</div>
            <div className="text-xs text-gray-400">{stat.subtext}</div>
          </motion.div>
        ))}
      </motion.div>

      {/* Main Role Management Interface */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="neu-card p-6 bg-gray-800"
      >
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-white flex items-center gap-2">
            <SafeIcon icon={FiShield} className="w-6 h-6 text-purple-400" />
            Role & Permission Management
          </h2>
          <div className="flex items-center gap-4">
            <div className="text-sm text-green-400 flex items-center gap-2">
              <SafeIcon icon={FiActivity} className="w-4 h-4" />
              Live Management
            </div>
            <button
              onClick={() => setShowRoleModal(true)}
              className="neu-button px-4 py-2 bg-purple-600 text-white hover:bg-purple-700"
            >
              <div className="flex items-center gap-2">
                <SafeIcon icon={FiPlus} className="w-4 h-4" />
                Create Role
              </div>
            </button>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex gap-2 mb-6">
          {[
            { id: 'roles', label: 'Roles', icon: FiShield },
            { id: 'users', label: 'User Assignments', icon: FiUsers },
            { id: 'permissions', label: 'Permission Matrix', icon: FiLock }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`neu-button px-6 py-3 hover:scale-105 transition-transform ${
                activeTab === tab.id ? 'bg-purple-600 text-white' : 'bg-gray-700 text-gray-300'
              }`}
            >
              <div className="flex items-center gap-2">
                <SafeIcon icon={tab.icon} className="w-5 h-5" />
                <span className="font-medium">{tab.label}</span>
              </div>
            </button>
          ))}
        </div>

        {/* Search and Filters */}
        <div className="flex gap-4 mb-6">
          <div className="relative flex-1">
            <SafeIcon icon={FiSearch} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full neu-input pl-10 pr-4 py-2 bg-gray-700 text-white"
              placeholder={`Search ${activeTab}...`}
            />
          </div>
          <select
            value={filterBy}
            onChange={(e) => setFilterBy(e.target.value)}
            className="neu-input p-2 bg-gray-700 text-white"
          >
            <option value="all">All</option>
            {activeTab === 'roles' && (
              <>
                <option value="system">System Roles</option>
                <option value="custom">Custom Roles</option>
              </>
            )}
            {activeTab === 'users' && 
              roles.map(role => (
                <option key={role.id} value={role.name.toLowerCase()}>{role.name}</option>
              ))
            }
          </select>
        </div>

        {/* Tab Content */}
        {activeTab === 'roles' && (
          <div className="space-y-4">
            {filteredRoles.length === 0 ? (
              <div className="text-center py-12">
                <SafeIcon icon={FiShield} className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-white mb-2">No Roles Found</h3>
                <p className="text-gray-400">Try adjusting your search or filter criteria.</p>
              </div>
            ) : (
              filteredRoles.map((role) => (
                <motion.div
                  key={role.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="neu-card-inset p-6 bg-gray-700/30 hover:scale-105 transition-transform"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className={`w-16 h-16 bg-gradient-to-r ${role.color} rounded-xl flex items-center justify-center text-white shadow-lg`}>
                        <SafeIcon icon={role.icon} className="w-8 h-8" />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <h3 className="text-xl font-semibold text-white">{role.name}</h3>
                          {role.isSystem && (
                            <span className="px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                              System Role
                            </span>
                          )}
                        </div>
                        <p className="text-gray-400 mb-2">{role.description}</p>
                        <div className="flex items-center gap-4 text-sm text-gray-500">
                          <span>{role.userCount} users</span>
                          <span>•</span>
                          <span>Created {role.createdAt}</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => {
                          setSelectedRole(role);
                          setShowPermissionModal(true);
                        }}
                        className="neu-button p-2 bg-blue-600 text-white hover:bg-blue-700"
                        title="View Permissions"
                      >
                        <SafeIcon icon={FiEye} className="w-4 h-4" />
                      </button>
                      {!role.isSystem && (
                        <>
                          <button
                            onClick={() => {
                              setSelectedRole(role);
                              setNewRole(role);
                              setIsEditing(true);
                              setShowRoleModal(true);
                            }}
                            className="neu-button p-2 bg-yellow-600 text-white hover:bg-yellow-700"
                            title="Edit Role"
                          >
                            <SafeIcon icon={FiEdit} className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => handleDeleteRole(role.id)}
                            className="neu-button p-2 bg-red-600 text-white hover:bg-red-700"
                            title="Delete Role"
                          >
                            <SafeIcon icon={FiTrash} className="w-4 h-4" />
                          </button>
                        </>
                      )}
                    </div>
                  </div>
                </motion.div>
              ))
            )}
          </div>
        )}

        {activeTab === 'users' && (
          <div className="space-y-4">
            {filteredUsers.length === 0 ? (
              <div className="text-center py-12">
                <SafeIcon icon={FiUsers} className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-white mb-2">No Users Found</h3>
                <p className="text-gray-400">Try adjusting your search or filter criteria.</p>
              </div>
            ) : (
              filteredUsers.map((user) => (
                <motion.div
                  key={user.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="neu-card-inset p-6 bg-gray-700/30 hover:scale-105 transition-transform"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <img
                        src={user.avatar}
                        alt={user.name}
                        className="w-12 h-12 rounded-full object-cover"
                      />
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-1">
                          <h3 className="text-lg font-semibold text-white">{user.name}</h3>
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                            user.status === 'active' ? 'bg-green-100 text-green-800' :
                            user.status === 'inactive' ? 'bg-yellow-100 text-yellow-800' :
                            'bg-red-100 text-red-800'
                          }`}>
                            {user.status}
                          </span>
                        </div>
                        <p className="text-gray-400 text-sm mb-1">{user.email}</p>
                        <div className="flex items-center gap-4 text-xs text-gray-500">
                          <span>Last login: {user.lastLogin}</span>
                          <span>•</span>
                          <span>{user.location}</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="text-right">
                        <div className="flex items-center gap-2 mb-1">
                          <div className={`w-4 h-4 bg-gradient-to-r ${user.role.color} rounded`}></div>
                          <span className="text-white font-medium">{user.role.name}</span>
                        </div>
                        <p className="text-gray-400 text-xs">{user.role.description}</p>
                      </div>
                      <select
                        value={user.roleId || user.role.id}
                        onChange={(e) => handleAssignRole(user.id, parseInt(e.target.value))}
                        className="neu-input p-2 bg-gray-700 text-white text-sm"
                      >
                        {roles.map(role => (
                          <option key={role.id} value={role.id}>{role.name}</option>
                        ))}
                      </select>
                    </div>
                  </div>
                </motion.div>
              ))
            )}
          </div>
        )}

        {activeTab === 'permissions' && (
          <div className="space-y-6">
            <div className="neu-card-inset p-6 bg-gray-700/30">
              <h3 className="text-xl font-bold text-white mb-6">Permission Matrix</h3>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-gray-600">
                      <th className="text-left p-3 text-gray-300 min-w-[200px]">Permission Category</th>
                      {roles.map(role => (
                        <th key={role.id} className="text-center p-3 text-gray-300 min-w-[120px]">
                          <div className="flex flex-col items-center gap-1">
                            <div className={`w-8 h-8 bg-gradient-to-r ${role.color} rounded-lg flex items-center justify-center text-white`}>
                              <SafeIcon icon={role.icon} className="w-4 h-4" />
                            </div>
                            <span className="text-xs">{role.name}</span>
                          </div>
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {Object.entries(permissionCategories).map(([key, category]) => (
                      <tr key={key} className="border-b border-gray-700">
                        <td className="p-3">
                          <div className="flex items-center gap-3">
                            <SafeIcon icon={category.icon} className={`w-5 h-5 ${category.color}`} />
                            <div>
                              <div className="text-white font-medium">{category.name}</div>
                              <div className="text-gray-400 text-xs">{category.description}</div>
                            </div>
                          </div>
                        </td>
                        {roles.map(role => (
                          <td key={role.id} className="p-3 text-center">
                            <div className="flex justify-center gap-1">
                              {['read', 'write', 'delete'].map(permType => (
                                <div
                                  key={permType}
                                  className={`w-6 h-6 rounded flex items-center justify-center ${
                                    role.permissions[key]?.[permType] 
                                      ? 'bg-green-600 text-white' 
                                      : 'bg-gray-600 text-gray-400'
                                  }`}
                                  title={`${permType} permission`}
                                >
                                  <SafeIcon 
                                    icon={getPermissionIcon(role.permissions[key]?.[permType], permType)} 
                                    className="w-3 h-3" 
                                  />
                                </div>
                              ))}
                            </div>
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}
      </motion.div>

      {/* Role Creation/Edit Modal */}
      <AnimatePresence>
        {showRoleModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
            onClick={() => setShowRoleModal(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="neu-card p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto bg-gray-800"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-white">
                  {isEditing ? 'Edit Role' : 'Create New Role'}
                </h2>
                <button
                  onClick={() => setShowRoleModal(false)}
                  className="neu-button p-2 bg-gray-700 text-gray-300"
                >
                  <SafeIcon icon={FiX} className="w-5 h-5" />
                </button>
              </div>

              <div className="space-y-6">
                {/* Basic Info */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Role Name
                    </label>
                    <input
                      type="text"
                      value={newRole.name}
                      onChange={(e) => setNewRole({ ...newRole, name: e.target.value })}
                      className="w-full neu-input p-3 bg-gray-700 text-white"
                      placeholder="Enter role name"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Color Theme
                    </label>
                    <select
                      value={newRole.color}
                      onChange={(e) => setNewRole({ ...newRole, color: e.target.value })}
                      className="w-full neu-input p-3 bg-gray-700 text-white"
                    >
                      {colorOptions.map(color => (
                        <option key={color.value} value={color.value}>{color.name}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Description
                  </label>
                  <textarea
                    value={newRole.description}
                    onChange={(e) => setNewRole({ ...newRole, description: e.target.value })}
                    className="w-full neu-input p-3 bg-gray-700 text-white h-20 resize-none"
                    placeholder="Describe the role's purpose and responsibilities"
                  />
                </div>

                {/* Icon Selection */}
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Icon
                  </label>
                  <div className="grid grid-cols-5 gap-2">
                    {iconOptions.map(iconOption => (
                      <button
                        key={iconOption.name}
                        onClick={() => setNewRole({ ...newRole, icon: iconOption.value })}
                        className={`neu-button p-3 ${
                          newRole.icon === iconOption.value 
                            ? 'bg-purple-600 text-white' 
                            : 'bg-gray-700 text-gray-300'
                        }`}
                      >
                        <SafeIcon icon={iconOption.value} className="w-5 h-5" />
                      </button>
                    ))}
                  </div>
                </div>

                {/* Permissions */}
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-4">
                    Permissions
                  </label>
                  <div className="space-y-4">
                    {Object.entries(permissionCategories).map(([key, category]) => (
                      <div key={key} className="neu-card-inset p-4 bg-gray-700/30">
                        <div className="flex items-center justify-between mb-3">
                          <div className="flex items-center gap-3">
                            <SafeIcon icon={category.icon} className={`w-5 h-5 ${category.color}`} />
                            <div>
                              <div className="text-white font-medium">{category.name}</div>
                              <div className="text-gray-400 text-xs">{category.description}</div>
                            </div>
                          </div>
                        </div>
                        <div className="flex gap-4">
                          {['read', 'write', 'delete'].map(permType => (
                            <label key={permType} className="flex items-center gap-2">
                              <input
                                type="checkbox"
                                checked={newRole.permissions[key]?.[permType] || false}
                                onChange={(e) => setNewRole({
                                  ...newRole,
                                  permissions: {
                                    ...newRole.permissions,
                                    [key]: {
                                      ...newRole.permissions[key],
                                      [permType]: e.target.checked
                                    }
                                  }
                                })}
                                className="w-4 h-4 text-purple-600 bg-gray-700 border-gray-600 rounded focus:ring-purple-500"
                              />
                              <span className="text-gray-300 text-sm capitalize">{permType}</span>
                            </label>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Actions */}
                <div className="flex gap-4 justify-end">
                  <button
                    onClick={() => setShowRoleModal(false)}
                    className="neu-button px-6 py-3 bg-gray-700 text-gray-300"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleCreateRole}
                    className="neu-button px-6 py-3 bg-purple-600 text-white"
                  >
                    {isEditing ? 'Update Role' : 'Create Role'}
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Permission Details Modal */}
      <AnimatePresence>
        {showPermissionModal && selectedRole && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
            onClick={() => setShowPermissionModal(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="neu-card p-8 max-w-4xl w-full max-h-[90vh] overflow-y-auto bg-gray-800"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-4">
                  <div className={`w-12 h-12 bg-gradient-to-r ${selectedRole.color} rounded-xl flex items-center justify-center text-white`}>
                    <SafeIcon icon={selectedRole.icon} className="w-6 h-6" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-white">{selectedRole.name}</h2>
                    <p className="text-gray-400">{selectedRole.description}</p>
                  </div>
                </div>
                <button
                  onClick={() => setShowPermissionModal(false)}
                  className="neu-button p-2 bg-gray-700 text-gray-300"
                >
                  <SafeIcon icon={FiX} className="w-5 h-5" />
                </button>
              </div>

              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-white mb-4">Detailed Permissions</h3>
                {Object.entries(permissionCategories).map(([key, category]) => (
                  <div key={key} className="neu-card-inset p-6 bg-gray-700/30">
                    <div className="flex items-center gap-3 mb-4">
                      <SafeIcon icon={category.icon} className={`w-6 h-6 ${category.color}`} />
                      <div>
                        <h4 className="text-white font-semibold">{category.name}</h4>
                        <p className="text-gray-400 text-sm">{category.description}</p>
                      </div>
                    </div>
                    <div className="grid grid-cols-3 gap-4">
                      {['read', 'write', 'delete'].map(permType => (
                        <div
                          key={permType}
                          className={`p-3 rounded-lg border-2 ${
                            selectedRole.permissions[key]?.[permType]
                              ? 'border-green-500 bg-green-500/10'
                              : 'border-red-500 bg-red-500/10'
                          }`}
                        >
                          <div className="flex items-center gap-2">
                            <SafeIcon 
                              icon={getPermissionIcon(selectedRole.permissions[key]?.[permType], permType)} 
                              className={`w-5 h-5 ${getPermissionColor(selectedRole.permissions[key]?.[permType])}`}
                            />
                            <span className={`font-medium capitalize ${getPermissionColor(selectedRole.permissions[key]?.[permType])}`}>
                              {permType}
                            </span>
                          </div>
                          <p className="text-xs text-gray-400 mt-1">
                            {selectedRole.permissions[key]?.[permType] ? 'Allowed' : 'Denied'}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default AdminRoleManagement;