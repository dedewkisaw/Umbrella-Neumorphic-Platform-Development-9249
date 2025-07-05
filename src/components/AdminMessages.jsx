import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../common/SafeIcon';
import useDataStore from '../stores/DataStore';
import { useRealtimeData } from '../hooks/useRealtimeData';

const { FiMessageSquare, FiMail, FiPhone, FiUser, FiClock, FiAlertCircle, FiCheckCircle, FiSend, FiPaperclip, FiMoreHorizontal, FiSearch, FiFilter, FiTag, FiFlag, FiArchive, FiReply, FiForward, FiTrash, FiStar, FiUsers, FiActivity, FiTrendingUp, FiEye, FiRefreshCw, FiSettings } = FiIcons;

const AdminMessages = () => {
  const [activeTab, setActiveTab] = useState('chat');
  const [selectedChat, setSelectedChat] = useState(null);
  const [selectedTicket, setSelectedTicket] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [newMessage, setNewMessage] = useState('');
  const chatEndRef = useRef(null);

  // Mock data for messages and tickets
  const [chats, setChats] = useState([
    {
      id: 1,
      user: {
        name: 'John Smith',
        email: 'john@example.com',
        avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop&crop=face',
        status: 'online'
      },
      lastMessage: 'Hi, I need help with my purchased app setup',
      timestamp: new Date(Date.now() - 300000),
      unread: 3,
      status: 'active',
      messages: [
        {
          id: 1,
          sender: 'user',
          message: 'Hi, I just purchased ShopFlow Pro but I\'m having trouble setting it up',
          timestamp: new Date(Date.now() - 900000),
          type: 'text'
        },
        {
          id: 2,
          sender: 'admin',
          message: 'Hello John! I\'d be happy to help you with the setup. What specific issue are you encountering?',
          timestamp: new Date(Date.now() - 600000),
          type: 'text'
        },
        {
          id: 3,
          sender: 'user',
          message: 'The database connection seems to be failing. I followed the documentation but still getting errors.',
          timestamp: new Date(Date.now() - 300000),
          type: 'text'
        }
      ]
    },
    {
      id: 2,
      user: {
        name: 'Sarah Wilson',
        email: 'sarah@example.com',
        avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop&crop=face',
        status: 'away'
      },
      lastMessage: 'Thank you for the quick response!',
      timestamp: new Date(Date.now() - 1800000),
      unread: 0,
      status: 'resolved',
      messages: [
        {
          id: 1,
          sender: 'user',
          message: 'Is there a way to customize the checkout process in the e-commerce template?',
          timestamp: new Date(Date.now() - 3600000),
          type: 'text'
        },
        {
          id: 2,
          sender: 'admin',
          message: 'Absolutely! You can customize the checkout process by modifying the components in the /checkout folder. I can send you a detailed guide.',
          timestamp: new Date(Date.now() - 3000000),
          type: 'text'
        },
        {
          id: 3,
          sender: 'user',
          message: 'Thank you for the quick response!',
          timestamp: new Date(Date.now() - 1800000),
          type: 'text'
        }
      ]
    },
    {
      id: 3,
      user: {
        name: 'Mike Johnson',
        email: 'mike@example.com',
        avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=face',
        status: 'offline'
      },
      lastMessage: 'When will the new features be available?',
      timestamp: new Date(Date.now() - 3600000),
      unread: 1,
      status: 'pending',
      messages: [
        {
          id: 1,
          sender: 'user',
          message: 'When will the new features be available?',
          timestamp: new Date(Date.now() - 3600000),
          type: 'text'
        }
      ]
    }
  ]);

  const [tickets, setTickets] = useState([
    {
      id: 'TKT-001',
      subject: 'Payment Processing Issue',
      user: {
        name: 'Alice Brown',
        email: 'alice@example.com',
        avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=400&h=400&fit=crop&crop=face'
      },
      status: 'open',
      priority: 'high',
      category: 'billing',
      created: new Date(Date.now() - 7200000),
      lastUpdate: new Date(Date.now() - 1800000),
      description: 'I\'m experiencing issues with payment processing on my e-commerce site. Customers are reporting failed transactions even with valid cards.',
      messages: [
        {
          id: 1,
          sender: 'user',
          message: 'I\'m experiencing issues with payment processing on my e-commerce site. Customers are reporting failed transactions even with valid cards.',
          timestamp: new Date(Date.now() - 7200000),
          type: 'text'
        },
        {
          id: 2,
          sender: 'admin',
          message: 'I\'ll investigate this immediately. Can you please check your Stripe webhook configuration?',
          timestamp: new Date(Date.now() - 1800000),
          type: 'text'
        }
      ]
    },
    {
      id: 'TKT-002',
      subject: 'Feature Request: Dark Mode',
      user: {
        name: 'David Chen',
        email: 'david@example.com',
        avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop&crop=face'
      },
      status: 'in-progress',
      priority: 'medium',
      category: 'feature',
      created: new Date(Date.now() - 86400000),
      lastUpdate: new Date(Date.now() - 3600000),
      description: 'Would love to see a dark mode option for the portfolio template.',
      messages: [
        {
          id: 1,
          sender: 'user',
          message: 'Would love to see a dark mode option for the portfolio template.',
          timestamp: new Date(Date.now() - 86400000),
          type: 'text'
        }
      ]
    },
    {
      id: 'TKT-003',
      subject: 'Bug Report: Mobile Responsiveness',
      user: {
        name: 'Emma Davis',
        email: 'emma@example.com',
        avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400&h=400&fit=crop&crop=face'
      },
      status: 'resolved',
      priority: 'low',
      category: 'bug',
      created: new Date(Date.now() - 172800000),
      lastUpdate: new Date(Date.now() - 86400000),
      description: 'The navigation menu is not working properly on mobile devices.',
      messages: [
        {
          id: 1,
          sender: 'user',
          message: 'The navigation menu is not working properly on mobile devices.',
          timestamp: new Date(Date.now() - 172800000),
          type: 'text'
        },
        {
          id: 2,
          sender: 'admin',
          message: 'This has been fixed in version 2.1.1. Please update your template.',
          timestamp: new Date(Date.now() - 86400000),
          type: 'text'
        }
      ]
    }
  ]);

  // Enable real-time updates
  useRealtimeData(15000);

  // Auto-scroll to bottom of chat
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [selectedChat?.messages]);

  // Simulate new messages
  useEffect(() => {
    const interval = setInterval(() => {
      if (Math.random() > 0.8) {
        const randomChat = chats[Math.floor(Math.random() * chats.length)];
        const newMsg = {
          id: Date.now(),
          sender: 'user',
          message: [
            'Thanks for your help!',
            'Is there an update available?',
            'How do I implement this feature?',
            'The issue is resolved, thank you!'
          ][Math.floor(Math.random() * 4)],
          timestamp: new Date(),
          type: 'text'
        };
        
        setChats(prev => prev.map(chat => 
          chat.id === randomChat.id 
            ? {
                ...chat,
                messages: [...chat.messages, newMsg],
                lastMessage: newMsg.message,
                timestamp: newMsg.timestamp,
                unread: chat.unread + 1
              }
            : chat
        ));
      }
    }, 30000);

    return () => clearInterval(interval);
  }, [chats]);

  const handleSendMessage = () => {
    if (!newMessage.trim() || !selectedChat) return;

    const message = {
      id: Date.now(),
      sender: 'admin',
      message: newMessage,
      timestamp: new Date(),
      type: 'text'
    };

    setChats(prev => prev.map(chat => 
      chat.id === selectedChat.id 
        ? {
            ...chat,
            messages: [...chat.messages, message],
            lastMessage: message.message,
            timestamp: message.timestamp
          }
        : chat
    ));

    setNewMessage('');
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'open': return 'bg-red-100 text-red-800';
      case 'in-progress': return 'bg-yellow-100 text-yellow-800';
      case 'resolved': return 'bg-green-100 text-green-800';
      case 'closed': return 'bg-gray-100 text-gray-800';
      default: return 'bg-blue-100 text-blue-800';
    }
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high': return 'text-red-600';
      case 'medium': return 'text-yellow-600';
      case 'low': return 'text-green-600';
      default: return 'text-gray-600';
    }
  };

  const filteredChats = chats.filter(chat => {
    const matchesSearch = chat.user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         chat.lastMessage.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === 'all' || chat.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  const filteredTickets = tickets.filter(ticket => {
    const matchesSearch = ticket.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         ticket.user.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === 'all' || ticket.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="space-y-8">
      {/* Real-time Status Indicator */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="neu-card p-4 bg-gradient-to-r from-blue-50 to-purple-50"
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
            <span className="text-blue-700 font-medium">Live Support Active</span>
          </div>
          <div className="text-sm text-gray-600">
            {chats.reduce((sum, chat) => sum + chat.unread, 0)} unread messages
          </div>
        </div>
      </motion.div>

      {/* Support Statistics */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="grid grid-cols-2 lg:grid-cols-4 gap-6"
      >
        {[
          {
            label: 'Active Chats',
            value: chats.filter(c => c.status === 'active').length,
            icon: FiMessageSquare,
            color: 'text-blue-400',
            bg: 'bg-blue-900/30'
          },
          {
            label: 'Open Tickets',
            value: tickets.filter(t => t.status === 'open').length,
            icon: FiMail,
            color: 'text-red-400',
            bg: 'bg-red-900/30'
          },
          {
            label: 'Avg Response',
            value: '< 5min',
            icon: FiClock,
            color: 'text-green-400',
            bg: 'bg-green-900/30'
          },
          {
            label: 'Satisfaction',
            value: '98%',
            icon: FiStar,
            color: 'text-yellow-400',
            bg: 'bg-yellow-900/30'
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
            <div className="text-2xl font-bold text-white">{stat.value}</div>
          </motion.div>
        ))}
      </motion.div>

      {/* Main Messages Interface */}
      <div className="neu-card p-8 bg-gray-800">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-white flex items-center gap-2">
            <SafeIcon icon={FiMessageSquare} className="w-6 h-6 text-blue-400" />
            Support Center
          </h2>
          <div className="flex items-center gap-4">
            <div className="text-sm text-green-400 flex items-center gap-2">
              <SafeIcon icon={FiActivity} className="w-4 h-4" />
              Live Support
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex gap-2 mb-6">
          {[
            { id: 'chat', label: 'Live Chat', icon: FiMessageSquare },
            { id: 'tickets', label: 'Support Tickets', icon: FiMail }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`neu-button px-6 py-3 hover:scale-105 transition-transform ${
                activeTab === tab.id ? 'bg-blue-600 text-white' : 'bg-gray-700 text-gray-300'
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
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="neu-input p-2 bg-gray-700 text-white"
          >
            <option value="all">All Status</option>
            <option value="active">Active</option>
            <option value="pending">Pending</option>
            <option value="resolved">Resolved</option>
            <option value="open">Open</option>
            <option value="in-progress">In Progress</option>
          </select>
        </div>

        {activeTab === 'chat' && (
          <div className="grid lg:grid-cols-3 gap-6 h-96">
            {/* Chat List */}
            <div className="neu-card-inset p-4 bg-gray-700/30 overflow-y-auto">
              <h3 className="text-lg font-semibold text-white mb-4">Active Conversations</h3>
              <div className="space-y-3">
                {filteredChats.map((chat) => (
                  <motion.div
                    key={chat.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    onClick={() => setSelectedChat(chat)}
                    className={`p-3 rounded-lg cursor-pointer transition-all ${
                      selectedChat?.id === chat.id 
                        ? 'bg-blue-600 text-white' 
                        : 'bg-gray-600/30 text-gray-300 hover:bg-gray-600/50'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className="relative">
                        <img
                          src={chat.user.avatar}
                          alt={chat.user.name}
                          className="w-10 h-10 rounded-full object-cover"
                        />
                        <div className={`absolute -bottom-1 -right-1 w-3 h-3 rounded-full border-2 border-gray-800 ${
                          chat.user.status === 'online' ? 'bg-green-500' :
                          chat.user.status === 'away' ? 'bg-yellow-500' : 'bg-gray-500'
                        }`}></div>
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between">
                          <div className="font-medium truncate">{chat.user.name}</div>
                          {chat.unread > 0 && (
                            <div className="bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                              {chat.unread}
                            </div>
                          )}
                        </div>
                        <div className="text-sm opacity-75 truncate">{chat.lastMessage}</div>
                        <div className="text-xs opacity-50">
                          {chat.timestamp.toLocaleTimeString()}
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Chat Messages */}
            <div className="lg:col-span-2 neu-card-inset bg-gray-700/30 flex flex-col">
              {selectedChat ? (
                <>
                  {/* Chat Header */}
                  <div className="p-4 border-b border-gray-600 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <img
                        src={selectedChat.user.avatar}
                        alt={selectedChat.user.name}
                        className="w-10 h-10 rounded-full object-cover"
                      />
                      <div>
                        <div className="text-white font-medium">{selectedChat.user.name}</div>
                        <div className="text-gray-400 text-sm">{selectedChat.user.email}</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        selectedChat.user.status === 'online' ? 'bg-green-100 text-green-800' :
                        selectedChat.user.status === 'away' ? 'bg-yellow-100 text-yellow-800' : 'bg-gray-100 text-gray-800'
                      }`}>
                        {selectedChat.user.status}
                      </span>
                    </div>
                  </div>

                  {/* Messages */}
                  <div className="flex-1 p-4 overflow-y-auto space-y-4">
                    {selectedChat.messages.map((message) => (
                      <div
                        key={message.id}
                        className={`flex ${message.sender === 'admin' ? 'justify-end' : 'justify-start'}`}
                      >
                        <div className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                          message.sender === 'admin'
                            ? 'bg-blue-600 text-white'
                            : 'bg-gray-600 text-gray-200'
                        }`}>
                          <div>{message.message}</div>
                          <div className="text-xs opacity-75 mt-1">
                            {message.timestamp.toLocaleTimeString()}
                          </div>
                        </div>
                      </div>
                    ))}
                    <div ref={chatEndRef} />
                  </div>

                  {/* Message Input */}
                  <div className="p-4 border-t border-gray-600">
                    <div className="flex gap-2">
                      <input
                        type="text"
                        value={newMessage}
                        onChange={(e) => setNewMessage(e.target.value)}
                        onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                        className="flex-1 neu-input p-3 bg-gray-700 text-white"
                        placeholder="Type your message..."
                      />
                      <button
                        onClick={handleSendMessage}
                        className="neu-button p-3 bg-blue-600 text-white hover:bg-blue-700"
                      >
                        <SafeIcon icon={FiSend} className="w-5 h-5" />
                      </button>
                    </div>
                  </div>
                </>
              ) : (
                <div className="flex-1 flex items-center justify-center">
                  <div className="text-center">
                    <SafeIcon icon={FiMessageSquare} className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                    <h3 className="text-xl font-semibold text-white mb-2">Select a Conversation</h3>
                    <p className="text-gray-400">Choose a chat from the list to start messaging</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {activeTab === 'tickets' && (
          <div className="space-y-4">
            {filteredTickets.length === 0 ? (
              <div className="text-center py-12">
                <SafeIcon icon={FiMail} className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-white mb-2">No Tickets Found</h3>
                <p className="text-gray-400">No support tickets match your current filters</p>
              </div>
            ) : (
              filteredTickets.map((ticket) => (
                <motion.div
                  key={ticket.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="neu-card-inset p-6 bg-gray-700/30 hover:scale-105 transition-transform cursor-pointer"
                  onClick={() => setSelectedTicket(ticket)}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex items-start gap-4">
                      <img
                        src={ticket.user.avatar}
                        alt={ticket.user.name}
                        className="w-12 h-12 rounded-full object-cover"
                      />
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <span className="text-blue-400 font-medium">{ticket.id}</span>
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(ticket.status)}`}>
                            {ticket.status}
                          </span>
                          <SafeIcon 
                            icon={FiFlag} 
                            className={`w-4 h-4 ${getPriorityColor(ticket.priority)}`} 
                          />
                        </div>
                        <h4 className="text-white font-semibold text-lg mb-2">{ticket.subject}</h4>
                        <p className="text-gray-400 text-sm mb-3 line-clamp-2">{ticket.description}</p>
                        <div className="flex items-center gap-4 text-xs text-gray-500">
                          <span>By {ticket.user.name}</span>
                          <span>•</span>
                          <span>{ticket.created.toLocaleDateString()}</span>
                          <span>•</span>
                          <span className="capitalize">{ticket.category}</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <button className="neu-button p-2 bg-gray-600 text-gray-300 hover:bg-gray-500">
                        <SafeIcon icon={FiEye} className="w-4 h-4" />
                      </button>
                      <button className="neu-button p-2 bg-blue-600 text-white hover:bg-blue-700">
                        <SafeIcon icon={FiReply} className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminMessages;