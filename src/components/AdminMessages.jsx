import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../common/SafeIcon';
import useDataStore from '../stores/DataStore';
import { useRealtimeData } from '../hooks/useRealtimeData';

const {
  FiMessageSquare,
  FiMail,
  FiPhone,
  FiUser,
  FiClock,
  FiAlertCircle,
  FiCheckCircle,
  FiSend,
  FiPaperclip,
  FiMoreHorizontal,
  FiSearch,
  FiFilter,
  FiTag,
  FiFlag,
  FiArchive,
  FiReply,
  FiForward,
  FiTrash,
  FiStar,
  FiUsers,
  FiActivity,
  FiTrendingUp,
  FiEye,
  FiRefreshCw,
  FiSettings,
  FiEdit,
  FiCheck,
  FiX,
  FiZap,
  FiArrowLeft,
  FiPlus,
  FiMinus,
  FiMaximize2,
  FiMinimize2,
  FiCopy,
  FiDownload,
  FiUpload,
  FiBold,
  FiItalic,
  FiUnderline,
  FiList,
  FiLink,
  FiImage,
  FiSmile,
  FiAtSign
} = FiIcons;

const AdminMessages = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('chat');
  const [selectedChat, setSelectedChat] = useState(null);
  const [selectedTicket, setSelectedTicket] = useState(null);
  const [selectedEmail, setSelectedEmail] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [newMessage, setNewMessage] = useState('');
  const [newTicketReply, setNewTicketReply] = useState('');
  const [showAIAssistant, setShowAIAssistant] = useState(false);
  const [isReplying, setIsReplying] = useState(false);
  const [replyData, setReplyData] = useState({
    to: '',
    cc: '',
    subject: '',
    body: '',
    priority: 'normal'
  });
  const [emailCompose, setEmailCompose] = useState({
    to: '',
    cc: '',
    bcc: '',
    subject: '',
    body: '',
    priority: 'normal',
    attachments: []
  });

  // File handling states
  const [showFileUpload, setShowFileUpload] = useState(false);
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);

  // Refs for file inputs
  const fileInputRef = useRef(null);
  const imageInputRef = useRef(null);
  const chatEndRef = useRef(null);
  const ticketEndRef = useRef(null);

  // AI Writing Assistant
  const [aiSuggestions, setAISuggestions] = useState([]);
  const [isGeneratingAI, setIsGeneratingAI] = useState(false);

  // Common emojis for quick access
  const commonEmojis = [
    '😊', '😂', '😍', '🤔', '😢', '😮', '👍', '👎', '❤️', '💯', '🔥', '⭐',
    '✅', '❌', '⚡', '🎉', '👋', '🙏', '💪', '🚀', '📱', '💻', '📞', '📧'
  ];

  // Mock data for messages, tickets, and emails
  const [chats, setChats] = useState([
    {
      id: 1,
      user: {
        name: 'John Smith',
        email: 'john@example.com',
        avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop&crop=face',
        status: 'online',
        lastSeen: new Date()
      },
      lastMessage: 'Hi, I need help with my purchased app setup',
      timestamp: new Date(Date.now() - 300000),
      unread: 3,
      status: 'active',
      department: 'Technical Support',
      messages: [
        {
          id: 1,
          sender: 'user',
          message: 'Hi, I just purchased ShopFlow Pro but I\'m having trouble setting it up',
          timestamp: new Date(Date.now() - 900000),
          type: 'text',
          read: true
        },
        {
          id: 2,
          sender: 'admin',
          message: 'Hello John! I\'d be happy to help you with the setup. What specific issue are you encountering?',
          timestamp: new Date(Date.now() - 600000),
          type: 'text',
          read: true
        },
        {
          id: 3,
          sender: 'user',
          message: 'The database connection seems to be failing. I followed the documentation but still getting errors.',
          timestamp: new Date(Date.now() - 300000),
          type: 'text',
          read: false
        }
      ]
    },
    {
      id: 2,
      user: {
        name: 'Sarah Wilson',
        email: 'sarah@example.com',
        avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop&crop=face',
        status: 'away',
        lastSeen: new Date(Date.now() - 3600000)
      },
      lastMessage: 'Thank you for the quick response!',
      timestamp: new Date(Date.now() - 1800000),
      unread: 0,
      status: 'resolved',
      department: 'Sales',
      messages: [
        {
          id: 1,
          sender: 'user',
          message: 'Is there a way to customize the checkout process in the e-commerce template?',
          timestamp: new Date(Date.now() - 3600000),
          type: 'text',
          read: true
        },
        {
          id: 2,
          sender: 'admin',
          message: 'Absolutely! You can customize the checkout process by modifying the components in the /checkout folder. I can send you a detailed guide.',
          timestamp: new Date(Date.now() - 3000000),
          type: 'text',
          read: true
        },
        {
          id: 3,
          sender: 'user',
          message: 'Thank you for the quick response!',
          timestamp: new Date(Date.now() - 1800000),
          type: 'text',
          read: true
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
        avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=400&h=400&fit=crop&crop=face',
        status: 'online'
      },
      status: 'open',
      priority: 'high',
      category: 'billing',
      created: new Date(Date.now() - 7200000),
      lastUpdate: new Date(Date.now() - 1800000),
      assignedTo: 'Support Team',
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
          message: 'I\'ll investigate this immediately. Can you please check your Stripe webhook configuration in your dashboard?',
          timestamp: new Date(Date.now() - 1800000),
          type: 'text'
        },
        {
          id: 3,
          sender: 'user',
          message: 'I checked the webhook settings and they seem correct. The webhook URL is pointing to https://mysite.com/webhook/stripe',
          timestamp: new Date(Date.now() - 900000),
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
        avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop&crop=face',
        status: 'away'
      },
      status: 'in-progress',
      priority: 'medium',
      category: 'feature',
      created: new Date(Date.now() - 86400000),
      lastUpdate: new Date(Date.now() - 3600000),
      assignedTo: 'Development Team',
      description: 'Would love to see a dark mode option for the portfolio template.',
      messages: [
        {
          id: 1,
          sender: 'user',
          message: 'Would love to see a dark mode option for the portfolio template. Many of my clients prefer dark interfaces.',
          timestamp: new Date(Date.now() - 86400000),
          type: 'text'
        },
        {
          id: 2,
          sender: 'admin',
          message: 'Thank you for the suggestion! Dark mode is actually on our roadmap for the next major update. I\'ll add your vote to this feature request.',
          timestamp: new Date(Date.now() - 3600000),
          type: 'text'
        }
      ]
    }
  ]);

  const [emails, setEmails] = useState([
    {
      id: 'EMAIL-001',
      from: 'john.doe@example.com',
      fromName: 'John Doe',
      to: ['support@umbrella.app'],
      cc: [],
      bcc: [],
      subject: 'Question about app licensing',
      body: 'Hi team,\n\nI have a question about the commercial licensing for the apps I purchase. Can I use them for client projects?\n\nBest regards,\nJohn Doe',
      timestamp: new Date(Date.now() - 3600000),
      read: false,
      starred: false,
      priority: 'normal',
      labels: ['support', 'licensing'],
      attachments: [],
      thread: 'THREAD-001'
    },
    {
      id: 'EMAIL-002',
      from: 'marketing@partnercompany.com',
      fromName: 'Marketing Team',
      to: ['partnerships@umbrella.app'],
      cc: ['ceo@umbrella.app'],
      bcc: [],
      subject: 'Partnership Opportunity',
      body: 'Dear Umbrella Team,\n\nWe would like to discuss a potential partnership opportunity. Our company specializes in web development services and we believe there could be synergy between our offerings.\n\nWould you be available for a call next week?\n\nBest regards,\nMarketing Team',
      timestamp: new Date(Date.now() - 7200000),
      read: true,
      starred: true,
      priority: 'high',
      labels: ['business', 'partnership'],
      attachments: [
        {
          name: 'company-overview.pdf',
          size: '2.4 MB',
          type: 'pdf'
        }
      ],
      thread: 'THREAD-002'
    }
  ]);

  // Enable real-time updates
  useRealtimeData(15000);

  // Auto-scroll to bottom of chat and tickets
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [selectedChat?.messages]);

  useEffect(() => {
    ticketEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [selectedTicket?.messages]);

  // File upload handler
  const handleFileUpload = async (files, messageType = 'chat') => {
    if (!files || files.length === 0) return;

    setUploading(true);
    setUploadProgress(0);

    try {
      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        
        // Simulate upload progress
        for (let progress = 0; progress <= 100; progress += 10) {
          setUploadProgress(progress);
          await new Promise(resolve => setTimeout(resolve, 100));
        }

        // Create attachment object
        const attachment = {
          id: Date.now() + i,
          name: file.name,
          size: formatFileSize(file.size),
          type: file.type,
          url: URL.createObjectURL(file),
          uploadedAt: new Date()
        };

        // Add to appropriate message type
        if (messageType === 'chat') {
          if (activeTab === 'chat') {
            setNewMessage(prev => prev + `\n📎 Attached: ${file.name}`);
          } else if (activeTab === 'tickets') {
            setNewTicketReply(prev => prev + `\n📎 Attached: ${file.name}`);
          }
        } else if (messageType === 'email') {
          if (selectedEmail === 'compose') {
            setEmailCompose(prev => ({
              ...prev,
              attachments: [...prev.attachments, attachment]
            }));
          } else if (isReplying) {
            setReplyData(prev => ({
              ...prev,
              attachments: [...(prev.attachments || []), attachment]
            }));
          }
        }
      }

      console.log('Files uploaded successfully!');
    } catch (error) {
      console.error('Upload failed:', error);
    } finally {
      setUploading(false);
      setUploadProgress(0);
      setShowFileUpload(false);
    }
  };

  // Handle emoji selection
  const handleEmojiSelect = (emoji) => {
    if (activeTab === 'chat') {
      setNewMessage(prev => prev + emoji);
    } else if (activeTab === 'tickets') {
      setNewTicketReply(prev => prev + emoji);
    } else if (activeTab === 'email') {
      if (selectedEmail === 'compose') {
        setEmailCompose(prev => ({
          ...prev,
          body: prev.body + emoji
        }));
      } else if (isReplying) {
        setReplyData(prev => ({
          ...prev,
          body: prev.body + emoji
        }));
      }
    }
    setShowEmojiPicker(false);
  };

  // Format file size
  const formatFileSize = (bytes) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  // AI Writing Assistant Functions
  const generateAISuggestions = async (context, type = 'response') => {
    setIsGeneratingAI(true);
    // Simulate AI processing
    await new Promise(resolve => setTimeout(resolve, 2000));

    const suggestions = {
      response: [
        "Thank you for reaching out! I understand your concern and I'm here to help you resolve this issue promptly.",
        "I appreciate you bringing this to our attention. Let me investigate this matter and get back to you with a solution.",
        "Thank you for your patience. I've reviewed your request and I have some recommendations that should help."
      ],
      ticket: [
        "Thank you for submitting this ticket. I've reviewed your issue and here's what I recommend...",
        "I understand this is frustrating. Let me walk you through the solution step by step.",
        "This is a known issue that we've recently addressed. Here's how to resolve it..."
      ],
      email: [
        "Dear [Name],\n\nI hope this email finds you well. I wanted to follow up on your recent inquiry regarding...",
        "Hello [Name],\n\nThank you for contacting Umbrella support. I've reviewed your case and I'm pleased to provide the following information...",
        "Hi [Name],\n\nI wanted to reach out personally to ensure we're addressing all your concerns properly..."
      ],
      reply: [
        "Thank you for your email. I understand your concern and I'm here to help.",
        "I appreciate you reaching out to us. Let me address your questions one by one.",
        "Thank you for bringing this to our attention. Here's what I can tell you about your inquiry."
      ]
    };

    setAISuggestions(suggestions[type] || suggestions.response);
    setIsGeneratingAI(false);
  };

  const handleSendMessage = () => {
    if (!newMessage.trim() || !selectedChat) return;

    const message = {
      id: Date.now(),
      sender: 'admin',
      message: newMessage,
      timestamp: new Date(),
      type: 'text',
      read: true
    };

    setChats(prev =>
      prev.map(chat =>
        chat.id === selectedChat.id
          ? {
              ...chat,
              messages: [...chat.messages, message],
              lastMessage: message.message,
              timestamp: message.timestamp
            }
          : chat
      )
    );

    setNewMessage('');
    setShowAIAssistant(false);
  };

  const handleSendTicketReply = () => {
    if (!newTicketReply.trim() || !selectedTicket) return;

    const message = {
      id: Date.now(),
      sender: 'admin',
      message: newTicketReply,
      timestamp: new Date(),
      type: 'text'
    };

    setTickets(prev =>
      prev.map(ticket =>
        ticket.id === selectedTicket.id
          ? {
              ...ticket,
              messages: [...ticket.messages, message],
              lastUpdate: message.timestamp
            }
          : ticket
      )
    );

    setNewTicketReply('');
    setShowAIAssistant(false);
  };

  const handleCloseTicket = (ticketId) => {
    setTickets(prev =>
      prev.map(ticket =>
        ticket.id === ticketId
          ? { ...ticket, status: 'resolved' }
          : ticket
      )
    );
  };

  const handleReopenTicket = (ticketId) => {
    setTickets(prev =>
      prev.map(ticket =>
        ticket.id === ticketId
          ? { ...ticket, status: 'open' }
          : ticket
      )
    );
  };

  const handleSendEmail = () => {
    if (!emailCompose.to.trim() || !emailCompose.subject.trim()) return;

    const newEmail = {
      id: `EMAIL-${Date.now()}`,
      from: 'admin@umbrella.app',
      fromName: 'Umbrella Support',
      to: emailCompose.to.split(',').map(email => email.trim()),
      cc: emailCompose.cc.split(',').filter(email => email.trim()),
      bcc: emailCompose.bcc.split(',').filter(email => email.trim()),
      subject: emailCompose.subject,
      body: emailCompose.body,
      timestamp: new Date(),
      read: true,
      starred: false,
      priority: emailCompose.priority,
      labels: ['sent'],
      attachments: emailCompose.attachments,
      thread: `THREAD-${Date.now()}`
    };

    setEmails(prev => [newEmail, ...prev]);
    setEmailCompose({
      to: '',
      cc: '',
      bcc: '',
      subject: '',
      body: '',
      priority: 'normal',
      attachments: []
    });
  };

  const handleReply = (email) => {
    setIsReplying(true);
    setReplyData({
      to: email.from,
      cc: '',
      subject: email.subject.startsWith('Re:') ? email.subject : `Re: ${email.subject}`,
      body: `\n\n--- Original Message ---\nFrom: ${email.fromName || email.from}\nDate: ${email.timestamp.toLocaleString()}\nSubject: ${email.subject}\n\n${email.body}`,
      priority: 'normal'
    });
  };

  const handleSendReply = () => {
    if (!replyData.to.trim() || !replyData.subject.trim()) return;

    const newReply = {
      id: `EMAIL-${Date.now()}`,
      from: 'admin@umbrella.app',
      fromName: 'Umbrella Support',
      to: [replyData.to],
      cc: replyData.cc.split(',').filter(email => email.trim()),
      bcc: [],
      subject: replyData.subject,
      body: replyData.body,
      timestamp: new Date(),
      read: true,
      starred: false,
      priority: replyData.priority,
      labels: ['sent', 'replied'],
      attachments: [],
      thread: selectedEmail.thread
    };

    setEmails(prev => [newReply, ...prev]);
    setIsReplying(false);
    setReplyData({
      to: '',
      cc: '',
      subject: '',
      body: '',
      priority: 'normal'
    });
  };

  const handleForward = (email) => {
    setSelectedEmail('compose');
    setEmailCompose({
      to: '',
      cc: '',
      bcc: '',
      subject: email.subject.startsWith('Fwd:') ? email.subject : `Fwd: ${email.subject}`,
      body: `\n\n--- Forwarded Message ---\nFrom: ${email.fromName || email.from}\nDate: ${email.timestamp.toLocaleString()}\nSubject: ${email.subject}\n\n${email.body}`,
      priority: 'normal',
      attachments: [...email.attachments]
    });
  };

  const toggleStar = (emailId) => {
    setEmails(prev =>
      prev.map(email =>
        email.id === emailId
          ? { ...email, starred: !email.starred }
          : email
      )
    );
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

  const filteredEmails = emails.filter(email => {
    const matchesSearch = email.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         email.from.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         email.body.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === 'all' ||
                         (filterStatus === 'unread' && !email.read) ||
                         (filterStatus === 'starred' && email.starred);
    return matchesSearch && matchesStatus;
  });

  // Calculate stats
  const stats = {
    activeChats: chats.filter(c => c.status === 'active').length,
    unreadMessages: chats.reduce((sum, chat) => sum + chat.unread, 0),
    openTickets: tickets.filter(t => t.status === 'open').length,
    unreadEmails: emails.filter(e => !e.read).length
  };

  // Enhanced Icon Button Component
  const IconButton = ({
    icon,
    onClick,
    title,
    className = "neu-button p-2 hover:scale-105 transition-transform",
    children,
    active = false
  }) => (
    <div className="dropdown-container relative">
      <button
        onClick={onClick}
        className={`${className} ${active ? 'bg-blue-500 text-white shadow-lg' : ''} transition-all duration-200`}
        title={title}
      >
        <SafeIcon icon={icon} className="w-4 h-4" />
      </button>
      {children}
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 p-4 lg:p-6">
      <div className="max-w-7xl mx-auto">
        {/* ✅ BEAUTIFUL NEUMORPHIC HEADER */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="neu-card p-6 mb-8 bg-gradient-to-r from-blue-50 to-purple-50"
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <button
                onClick={() => navigate('/admin/dashboard')}
                className="neu-button p-3 hover:scale-105 transition-transform group"
              >
                <SafeIcon icon={FiArrowLeft} className="w-5 h-5 text-neu-600 group-hover:-translate-x-1 transition-transform" />
              </button>
              <div className="neu-button p-3 bg-blue-600 text-white shadow-xl">
                <SafeIcon icon={FiMessageSquare} className="w-6 h-6" />
              </div>
              <div>
                <h1 className="text-2xl lg:text-3xl font-bold text-neu-900">
                  Communication <span className="gradient-text">Center</span>
                </h1>
                <div className="flex items-center gap-4 text-sm text-neu-600">
                  <span>{stats.activeChats} active chats</span>
                  <span>{stats.openTickets} open tickets</span>
                  <span>{stats.unreadEmails} unread emails</span>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="text-sm text-green-600 flex items-center gap-2">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                Live Support
              </div>
              <button
                onClick={() => setShowAIAssistant(!showAIAssistant)}
                className={`neu-button px-4 py-2 hover:scale-105 transition-transform ${
                  showAIAssistant ? 'bg-purple-500 text-white shadow-lg' : ''
                }`}
              >
                <div className="flex items-center gap-2">
                  <SafeIcon icon={FiZap} className="w-4 h-4" />
                  <span className="font-medium">AI Assistant</span>
                </div>
              </button>
            </div>
          </div>
        </motion.div>

        {/* ✅ BEAUTIFUL STATISTICS CARDS */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-8"
        >
          {[
            {
              label: 'Active Chats',
              value: stats.activeChats,
              icon: FiMessageSquare,
              color: 'text-blue-600',
              bg: 'from-blue-100 to-cyan-100'
            },
            {
              label: 'Open Tickets',
              value: stats.openTickets,
              icon: FiFlag,
              color: 'text-red-600',
              bg: 'from-red-100 to-pink-100'
            },
            {
              label: 'Avg Response',
              value: '< 5min',
              icon: FiClock,
              color: 'text-green-600',
              bg: 'from-green-100 to-emerald-100'
            },
            {
              label: 'Satisfaction',
              value: '98%',
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
        </motion.div>

        {/* ✅ BEAUTIFUL MAIN INTERFACE */}
        <div className="neu-card p-6 bg-gradient-to-br from-white to-blue-50">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-neu-900 flex items-center gap-2">
              <SafeIcon icon={FiMessageSquare} className="w-6 h-6 text-blue-600" />
              Support Management
            </h2>
            <div className="flex items-center gap-2">
              <div className="text-sm text-green-600 flex items-center gap-2">
                <SafeIcon icon={FiActivity} className="w-4 h-4" />
                Live Support
              </div>
            </div>
          </div>

          {/* ✅ BEAUTIFUL TABS */}
          <div className="flex gap-3 mb-6">
            {[
              { id: 'chat', label: 'Live Chat', icon: FiMessageSquare, count: stats.unreadMessages },
              { id: 'tickets', label: 'Support Tickets', icon: FiFlag, count: stats.openTickets },
              { id: 'email', label: 'Email Management', icon: FiMail, count: stats.unreadEmails }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`neu-button px-6 py-3 hover:scale-105 transition-transform relative ${
                  activeTab === tab.id
                    ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-xl'
                    : 'text-neu-700'
                }`}
              >
                <div className="flex items-center gap-2">
                  <SafeIcon icon={tab.icon} className="w-5 h-5" />
                  <span className="font-medium">{tab.label}</span>
                  {tab.count > 0 && (
                    <div className="bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                      {tab.count}
                    </div>
                  )}
                </div>
              </button>
            ))}
          </div>

          {/* ✅ BEAUTIFUL SEARCH AND FILTERS */}
          <div className="flex gap-4 mb-6">
            <div className="relative flex-1">
              <SafeIcon icon={FiSearch} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-neu-400 w-4 h-4" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full neu-input pl-10 pr-4 py-3 text-neu-700"
                placeholder={`Search ${activeTab}...`}
              />
            </div>
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="neu-input p-3 text-neu-700"
            >
              <option value="all">All Status</option>
              {activeTab === 'chat' && (
                <>
                  <option value="active">Active</option>
                  <option value="resolved">Resolved</option>
                </>
              )}
              {activeTab === 'tickets' && (
                <>
                  <option value="open">Open</option>
                  <option value="in-progress">In Progress</option>
                  <option value="resolved">Resolved</option>
                </>
              )}
              {activeTab === 'email' && (
                <>
                  <option value="unread">Unread</option>
                  <option value="starred">Starred</option>
                </>
              )}
            </select>
          </div>

          {/* Hidden File Inputs */}
          <input
            ref={fileInputRef}
            type="file"
            multiple
            className="hidden"
            onChange={(e) => handleFileUpload(e.target.files)}
            accept="*/*"
          />
          <input
            ref={imageInputRef}
            type="file"
            multiple
            className="hidden"
            onChange={(e) => handleFileUpload(e.target.files)}
            accept="image/*"
          />

          {/* Upload Progress Indicator */}
          {uploading && (
            <div className="fixed top-4 right-4 neu-card p-4 bg-white border-2 border-blue-200 z-50 shadow-xl">
              <div className="flex items-center gap-3">
                <div className="animate-spin">
                  <SafeIcon icon={FiUpload} className="w-5 h-5 text-blue-600" />
                </div>
                <div>
                  <div className="text-neu-900 text-sm font-medium">Uploading...</div>
                  <div className="w-32 bg-neu-200 rounded-full h-2 mt-1">
                    <div
                      className="bg-blue-500 h-2 rounded-full transition-all duration-300"
                      style={{ width: `${uploadProgress}%` }}
                    ></div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* ✅ BEAUTIFUL CONTENT AREA */}
          <div className="h-[600px]">
            {/* Live Chat Interface */}
            {activeTab === 'chat' && (
              <div className="grid lg:grid-cols-4 gap-6 h-full">
                {/* Chat List */}
                <div className="neu-card-inset p-4 bg-gradient-to-br from-blue-50 to-white overflow-y-auto">
                  <h3 className="text-lg font-bold text-neu-900 mb-4">Active Conversations</h3>
                  <div className="space-y-3">
                    {filteredChats.map((chat) => (
                      <motion.div
                        key={chat.id}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        onClick={() => setSelectedChat(chat)}
                        className={`neu-button p-4 cursor-pointer transition-all ${
                          selectedChat?.id === chat.id
                            ? 'bg-blue-500 text-white shadow-xl'
                            : 'hover:scale-105'
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <div className="relative">
                            <img
                              src={chat.user.avatar}
                              alt={chat.user.name}
                              className="w-10 h-10 rounded-full object-cover"
                            />
                            <div className={`absolute -bottom-1 -right-1 w-3 h-3 rounded-full border-2 border-white ${
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

                {/* Chat Messages Area */}
                <div className="lg:col-span-3 neu-card-inset bg-white flex flex-col">
                  {selectedChat ? (
                    <>
                      {/* Chat Header */}
                      <div className="p-4 border-b border-neu-200 flex items-center justify-between bg-gradient-to-r from-blue-50 to-purple-50">
                        <div className="flex items-center gap-3">
                          <img
                            src={selectedChat.user.avatar}
                            alt={selectedChat.user.name}
                            className="w-10 h-10 rounded-full object-cover"
                          />
                          <div>
                            <div className="text-neu-900 font-medium">{selectedChat.user.name}</div>
                            <div className="text-neu-600 text-sm">{selectedChat.user.email}</div>
                          </div>
                        </div>
                        <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                          selectedChat.user.status === 'online' ? 'bg-green-100 text-green-800' :
                          selectedChat.user.status === 'away' ? 'bg-yellow-100 text-yellow-800' :
                          'bg-gray-100 text-gray-800'
                        }`}>
                          {selectedChat.user.status}
                        </span>
                      </div>

                      {/* Messages */}
                      <div className="flex-1 p-4 overflow-y-auto space-y-4">
                        {selectedChat.messages.map((message) => (
                          <div
                            key={message.id}
                            className={`flex ${message.sender === 'admin' ? 'justify-end' : 'justify-start'}`}
                          >
                            <div className={`max-w-xs px-4 py-3 rounded-lg ${
                              message.sender === 'admin'
                                ? 'neu-card bg-blue-500 text-white shadow-lg'
                                : 'neu-card bg-white text-neu-700 shadow-lg'
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

                      {/* AI Assistant Panel */}
                      {showAIAssistant && (
                        <div className="p-4 bg-gradient-to-r from-purple-50 to-blue-50 border-t border-neu-200">
                          <div className="flex items-center justify-between mb-3">
                            <h4 className="text-neu-900 font-medium flex items-center gap-2">
                              <SafeIcon icon={FiZap} className="w-4 h-4 text-purple-600" />
                              AI Assistant
                            </h4>
                            <button
                              onClick={() => generateAISuggestions(newMessage, 'response')}
                              disabled={isGeneratingAI}
                              className="neu-button px-3 py-1 bg-purple-500 text-white text-sm hover:scale-105 transition-transform"
                            >
                              {isGeneratingAI ? 'Generating...' : 'Suggest'}
                            </button>
                          </div>
                          {aiSuggestions.length > 0 && (
                            <div className="space-y-2">
                              {aiSuggestions.map((suggestion, index) => (
                                <button
                                  key={index}
                                  onClick={() => setNewMessage(suggestion)}
                                  className="w-full text-left p-3 neu-button hover:scale-105 transition-transform text-sm"
                                >
                                  {suggestion.substring(0, 80)}...
                                </button>
                              ))}
                            </div>
                          )}
                        </div>
                      )}

                      {/* Enhanced Message Input */}
                      <div className="p-4 border-t border-neu-200 space-y-3 bg-gradient-to-r from-blue-50 to-white">
                        <div className="text-xs text-neu-500 italic">
                          💡 Tip: Press Enter for new line, click "Send" to send message
                        </div>
                        <div>
                          <textarea
                            value={newMessage}
                            onChange={(e) => setNewMessage(e.target.value)}
                            className="w-full neu-input p-3 text-neu-700 h-20 resize-none"
                            placeholder="Type your message... (Press Enter for new line)"
                          />
                        </div>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <IconButton
                              icon={FiPaperclip}
                              onClick={() => fileInputRef.current?.click()}
                              title="Attach File"
                            />
                            <IconButton
                              icon={FiImage}
                              onClick={() => imageInputRef.current?.click()}
                              title="Attach Image"
                            />
                            <IconButton
                              icon={FiSmile}
                              onClick={() => setShowEmojiPicker(!showEmojiPicker)}
                              title="Add Emoji"
                              active={showEmojiPicker}
                            >
                              {showEmojiPicker && (
                                <div className="absolute bottom-full left-0 mb-2 neu-card p-4 bg-white border-2 border-neu-200 rounded-lg shadow-xl z-50">
                                  <div className="text-neu-900 font-medium text-sm mb-3">Quick Emojis</div>
                                  <div className="grid grid-cols-8 gap-2 max-w-xs">
                                    {commonEmojis.map((emoji, index) => (
                                      <button
                                        key={index}
                                        onClick={() => handleEmojiSelect(emoji)}
                                        className="p-2 hover:bg-neu-100 rounded text-lg hover:scale-110 transition-transform"
                                        title={`Add ${emoji}`}
                                      >
                                        {emoji}
                                      </button>
                                    ))}
                                  </div>
                                </div>
                              )}
                            </IconButton>
                          </div>
                          <button
                            onClick={handleSendMessage}
                            disabled={!newMessage.trim()}
                            className="neu-button px-6 py-2 bg-blue-500 text-white hover:scale-105 transition-transform disabled:opacity-50 disabled:cursor-not-allowed"
                          >
                            <div className="flex items-center gap-2">
                              <SafeIcon icon={FiSend} className="w-4 h-4" />
                              <span className="font-medium">Send Message</span>
                            </div>
                          </button>
                        </div>
                      </div>
                    </>
                  ) : (
                    <div className="flex-1 flex items-center justify-center">
                      <div className="text-center">
                        <SafeIcon icon={FiMessageSquare} className="w-16 h-16 text-neu-400 mx-auto mb-4" />
                        <h3 className="text-xl font-semibold text-neu-900 mb-2">Select a Conversation</h3>
                        <p className="text-neu-600">Choose a chat from the list to start messaging</p>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Support Tickets Interface */}
            {activeTab === 'tickets' && (
              <div className="grid lg:grid-cols-4 gap-6 h-full">
                {/* Ticket List */}
                <div className="neu-card-inset p-4 bg-gradient-to-br from-red-50 to-white overflow-y-auto">
                  <h3 className="text-lg font-bold text-neu-900 mb-4">Support Tickets</h3>
                  <div className="space-y-3">
                    {filteredTickets.map((ticket) => (
                      <motion.div
                        key={ticket.id}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        onClick={() => setSelectedTicket(ticket)}
                        className={`neu-button p-4 cursor-pointer transition-all ${
                          selectedTicket?.id === ticket.id
                            ? 'bg-red-500 text-white shadow-xl'
                            : 'hover:scale-105'
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <div className="relative">
                            <img
                              src={ticket.user.avatar}
                              alt={ticket.user.name}
                              className="w-10 h-10 rounded-full object-cover"
                            />
                            <div className={`absolute -bottom-1 -right-1 w-3 h-3 rounded-full border-2 border-white ${
                              ticket.user.status === 'online' ? 'bg-green-500' :
                              ticket.user.status === 'away' ? 'bg-yellow-500' : 'bg-gray-500'
                            }`}></div>
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2 mb-1">
                              <div className="font-medium truncate text-sm">{ticket.user.name}</div>
                              <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(ticket.status)}`}>
                                {ticket.status}
                              </span>
                              <SafeIcon icon={FiFlag} className={`w-3 h-3 ${getPriorityColor(ticket.priority)}`} />
                            </div>
                            <div className="text-xs font-medium truncate">{ticket.id}</div>
                            <div className="text-xs opacity-75 truncate">{ticket.subject}</div>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>

                {/* Ticket Messages Area */}
                <div className="lg:col-span-3 neu-card-inset bg-white flex flex-col">
                  {selectedTicket ? (
                    <>
                      {/* Ticket Header */}
                      <div className="p-4 border-b border-neu-200 bg-gradient-to-r from-red-50 to-orange-50">
                        <div className="flex items-center justify-between mb-3">
                          <div className="flex items-center gap-3">
                            <img
                              src={selectedTicket.user.avatar}
                              alt={selectedTicket.user.name}
                              className="w-10 h-10 rounded-full object-cover"
                            />
                            <div>
                              <div className="text-neu-900 font-medium">{selectedTicket.user.name}</div>
                              <div className="text-neu-600 text-sm">{selectedTicket.user.email}</div>
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(selectedTicket.status)}`}>
                              {selectedTicket.status}
                            </span>
                            <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                              selectedTicket.priority === 'high' ? 'bg-red-100 text-red-800' :
                              selectedTicket.priority === 'medium' ? 'bg-yellow-100 text-yellow-800' :
                              'bg-green-100 text-green-800'
                            }`}>
                              {selectedTicket.priority} priority
                            </span>
                          </div>
                        </div>
                        <div className="text-neu-900 font-semibold">{selectedTicket.subject}</div>
                        <div className="text-neu-600 text-sm flex items-center gap-4 mt-1">
                          <span>#{selectedTicket.id}</span>
                          <span>{selectedTicket.category}</span>
                          <span>Created: {selectedTicket.created.toLocaleDateString()}</span>
                        </div>
                      </div>

                      {/* Ticket Messages */}
                      <div className="flex-1 p-4 overflow-y-auto space-y-4">
                        {selectedTicket.messages.map((message) => (
                          <div
                            key={message.id}
                            className={`flex ${message.sender === 'admin' ? 'justify-end' : 'justify-start'}`}
                          >
                            <div className={`max-w-xs px-4 py-3 rounded-lg ${
                              message.sender === 'admin'
                                ? 'neu-card bg-red-500 text-white shadow-lg'
                                : 'neu-card bg-white text-neu-700 shadow-lg'
                            }`}>
                              <div>{message.message}</div>
                              <div className="text-xs opacity-75 mt-1">
                                {message.timestamp.toLocaleTimeString()}
                              </div>
                            </div>
                          </div>
                        ))}
                        <div ref={ticketEndRef} />
                      </div>

                      {/* AI Assistant Panel for Tickets */}
                      {showAIAssistant && (
                        <div className="p-4 bg-gradient-to-r from-purple-50 to-red-50 border-t border-neu-200">
                          <div className="flex items-center justify-between mb-3">
                            <h4 className="text-neu-900 font-medium flex items-center gap-2">
                              <SafeIcon icon={FiZap} className="w-4 h-4 text-purple-600" />
                              AI Ticket Assistant
                            </h4>
                            <button
                              onClick={() => generateAISuggestions(newTicketReply, 'ticket')}
                              disabled={isGeneratingAI}
                              className="neu-button px-3 py-1 bg-purple-500 text-white text-sm hover:scale-105 transition-transform"
                            >
                              {isGeneratingAI ? 'Generating...' : 'Suggest'}
                            </button>
                          </div>
                          {aiSuggestions.length > 0 && (
                            <div className="space-y-2">
                              {aiSuggestions.map((suggestion, index) => (
                                <button
                                  key={index}
                                  onClick={() => setNewTicketReply(suggestion)}
                                  className="w-full text-left p-3 neu-button hover:scale-105 transition-transform text-sm"
                                >
                                  {suggestion.substring(0, 80)}...
                                </button>
                              ))}
                            </div>
                          )}
                        </div>
                      )}

                      {/* Enhanced Ticket Actions & Reply */}
                      <div className="p-4 border-t border-neu-200 space-y-3 bg-gradient-to-r from-red-50 to-white">
                        {/* Action Buttons */}
                        <div className="flex gap-2">
                          {selectedTicket.status !== 'resolved' ? (
                            <button
                              onClick={() => handleCloseTicket(selectedTicket.id)}
                              className="neu-button px-4 py-2 bg-green-500 text-white hover:scale-105 transition-transform"
                            >
                              <div className="flex items-center gap-2">
                                <SafeIcon icon={FiCheck} className="w-4 h-4" />
                                Resolve
                              </div>
                            </button>
                          ) : (
                            <button
                              onClick={() => handleReopenTicket(selectedTicket.id)}
                              className="neu-button px-4 py-2 bg-yellow-500 text-white hover:scale-105 transition-transform"
                            >
                              <div className="flex items-center gap-2">
                                <SafeIcon icon={FiReply} className="w-4 h-4" />
                                Reopen
                              </div>
                            </button>
                          )}
                          <button className="neu-button px-4 py-2 hover:scale-105 transition-transform">
                            <div className="flex items-center gap-2">
                              <SafeIcon icon={FiFlag} className="w-4 h-4 text-neu-600" />
                              Priority
                            </div>
                          </button>
                          <button className="neu-button px-4 py-2 bg-purple-500 text-white hover:scale-105 transition-transform">
                            <div className="flex items-center gap-2">
                              <SafeIcon icon={FiUser} className="w-4 h-4" />
                              Assign
                            </div>
                          </button>
                        </div>
                        
                        <div className="text-xs text-neu-500 italic">
                          💡 Tip: Press Enter for new line, click "Send Reply" to send response
                        </div>
                        
                        {/* Enhanced Reply Input */}
                        <div>
                          <textarea
                            value={newTicketReply}
                            onChange={(e) => setNewTicketReply(e.target.value)}
                            className="w-full neu-input p-3 text-neu-700 h-20 resize-none"
                            placeholder="Type your reply... (Press Enter for new line)"
                          />
                        </div>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <IconButton
                              icon={FiPaperclip}
                              onClick={() => fileInputRef.current?.click()}
                              title="Attach File"
                            />
                            <IconButton
                              icon={FiImage}
                              onClick={() => imageInputRef.current?.click()}
                              title="Attach Image"
                            />
                            <select className="neu-input p-2 text-neu-700 text-sm">
                              <option value="normal">Normal</option>
                              <option value="high">High Priority</option>
                              <option value="urgent">Urgent</option>
                            </select>
                          </div>
                          <button
                            onClick={handleSendTicketReply}
                            disabled={!newTicketReply.trim()}
                            className="neu-button px-6 py-2 bg-red-500 text-white hover:scale-105 transition-transform disabled:opacity-50 disabled:cursor-not-allowed"
                          >
                            <div className="flex items-center gap-2">
                              <SafeIcon icon={FiSend} className="w-4 h-4" />
                              <span className="font-medium">Send Reply</span>
                            </div>
                          </button>
                        </div>
                      </div>
                    </>
                  ) : (
                    <div className="flex-1 flex items-center justify-center">
                      <div className="text-center">
                        <SafeIcon icon={FiFlag} className="w-16 h-16 text-neu-400 mx-auto mb-4" />
                        <h3 className="text-xl font-semibold text-neu-900 mb-2">Select a Ticket</h3>
                        <p className="text-neu-600">Choose a support ticket to start responding</p>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Email Management Interface */}
            {activeTab === 'email' && (
              <div className="grid lg:grid-cols-3 gap-6 h-full">
                {/* Email List */}
                <div className="neu-card-inset p-4 bg-gradient-to-br from-yellow-50 to-white overflow-y-auto">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-bold text-neu-900">Inbox</h3>
                    <button
                      onClick={() => setSelectedEmail('compose')}
                      className="neu-button px-3 py-2 bg-blue-500 text-white hover:scale-105 transition-transform"
                    >
                      <SafeIcon icon={FiPlus} className="w-4 h-4" />
                    </button>
                  </div>
                  <div className="space-y-3">
                    {filteredEmails.map((email) => (
                      <motion.div
                        key={email.id}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        onClick={() => {
                          setSelectedEmail(email);
                          setIsReplying(false);
                        }}
                        className={`neu-button p-3 cursor-pointer transition-all ${
                          selectedEmail?.id === email.id
                            ? 'bg-yellow-500 text-white shadow-xl'
                            : `hover:scale-105 ${!email.read ? 'border-l-4 border-blue-500' : ''}`
                        }`}
                      >
                        <div className="flex items-start justify-between">
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2 mb-1">
                              <span className={`font-medium truncate text-sm ${!email.read ? 'font-bold' : ''}`}>
                                {email.fromName || email.from}
                              </span>
                              {email.starred && <SafeIcon icon={FiStar} className="w-3 h-3 text-yellow-600" />}
                              {email.priority === 'high' && <SafeIcon icon={FiFlag} className="w-3 h-3 text-red-500" />}
                            </div>
                            <div className={`text-xs truncate ${!email.read ? 'font-semibold' : 'opacity-75'}`}>
                              {email.subject}
                            </div>
                            <div className="text-xs opacity-50 truncate">
                              {email.body.substring(0, 40)}...
                            </div>
                            <div className="text-xs opacity-50 flex items-center justify-between mt-1">
                              <span>{email.timestamp.toLocaleDateString()}</span>
                              {email.attachments.length > 0 && (
                                <SafeIcon icon={FiPaperclip} className="w-3 h-3" />
                              )}
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>

                {/* Email Content Area */}
                <div className="lg:col-span-2 neu-card-inset bg-white flex flex-col">
                  {selectedEmail === 'compose' ? (
                    <>
                      {/* Compose Header */}
                      <div className="p-4 border-b border-neu-200 flex items-center justify-between bg-gradient-to-r from-blue-50 to-purple-50">
                        <h3 className="text-neu-900 font-medium">Compose Email</h3>
                        <button
                          onClick={() => setSelectedEmail(null)}
                          className="neu-button p-2 hover:scale-105 transition-transform"
                        >
                          <SafeIcon icon={FiX} className="w-4 h-4 text-neu-600" />
                        </button>
                      </div>

                      {/* Compose Form */}
                      <div className="flex-1 p-4 overflow-y-auto space-y-4">
                        <div>
                          <input
                            type="email"
                            value={emailCompose.to}
                            onChange={(e) => setEmailCompose({ ...emailCompose, to: e.target.value })}
                            className="w-full neu-input p-3 text-neu-700"
                            placeholder="To: recipient@example.com"
                          />
                        </div>
                        <div className="grid grid-cols-2 gap-3">
                          <input
                            type="email"
                            value={emailCompose.cc}
                            onChange={(e) => setEmailCompose({ ...emailCompose, cc: e.target.value })}
                            className="neu-input p-3 text-neu-700"
                            placeholder="CC:"
                          />
                          <select
                            value={emailCompose.priority}
                            onChange={(e) => setEmailCompose({ ...emailCompose, priority: e.target.value })}
                            className="neu-input p-3 text-neu-700"
                          >
                            <option value="low">Low Priority</option>
                            <option value="normal">Normal Priority</option>
                            <option value="high">High Priority</option>
                          </select>
                        </div>
                        <div>
                          <input
                            type="text"
                            value={emailCompose.subject}
                            onChange={(e) => setEmailCompose({ ...emailCompose, subject: e.target.value })}
                            className="w-full neu-input p-3 text-neu-700"
                            placeholder="Subject"
                          />
                        </div>

                        {/* Show attachments */}
                        {emailCompose.attachments.length > 0 && (
                          <div className="neu-card-inset p-4 bg-blue-50">
                            <div className="text-neu-900 font-medium mb-2">Attachments:</div>
                            <div className="space-y-2">
                              {emailCompose.attachments.map((attachment, index) => (
                                <div key={index} className="flex items-center gap-2 text-sm">
                                  <SafeIcon icon={FiPaperclip} className="w-3 h-3 text-neu-500" />
                                  <span className="text-neu-700">{attachment.name}</span>
                                  <span className="text-neu-500">({attachment.size})</span>
                                  <button
                                    onClick={() => setEmailCompose(prev => ({
                                      ...prev,
                                      attachments: prev.attachments.filter((_, i) => i !== index)
                                    }))}
                                    className="ml-auto text-red-500 hover:text-red-700"
                                  >
                                    <SafeIcon icon={FiX} className="w-3 h-3" />
                                  </button>
                                </div>
                              ))}
                            </div>
                          </div>
                        )}

                        {/* AI Assistant for Email */}
                        {showAIAssistant && (
                          <div className="neu-card-inset p-4 bg-purple-50">
                            <div className="flex items-center justify-between mb-3">
                              <h4 className="text-neu-900 font-medium flex items-center gap-2">
                                <SafeIcon icon={FiZap} className="w-4 h-4 text-purple-600" />
                                AI Email Assistant
                              </h4>
                              <button
                                onClick={() => generateAISuggestions(emailCompose.subject, 'email')}
                                disabled={isGeneratingAI}
                                className="neu-button px-3 py-1 bg-purple-500 text-white text-sm hover:scale-105 transition-transform"
                              >
                                {isGeneratingAI ? 'Generating...' : 'Generate'}
                              </button>
                            </div>
                            {aiSuggestions.length > 0 && (
                              <div className="space-y-2">
                                {aiSuggestions.map((suggestion, index) => (
                                  <button
                                    key={index}
                                    onClick={() => setEmailCompose({ ...emailCompose, body: suggestion })}
                                    className="w-full text-left p-3 neu-button hover:scale-105 transition-transform text-sm"
                                  >
                                    {suggestion.substring(0, 80)}...
                                  </button>
                                ))}
                              </div>
                            )}
                          </div>
                        )}

                        <div className="text-xs text-neu-500 italic">
                          💡 Tip: Press Enter for new line, click "Send" to send email
                        </div>
                        <div>
                          <textarea
                            value={emailCompose.body}
                            onChange={(e) => setEmailCompose({ ...emailCompose, body: e.target.value })}
                            className="w-full neu-input p-3 text-neu-700 h-40 resize-none"
                            placeholder="Type your message... (Press Enter for new line)"
                          />
                        </div>

                        {/* Email Compose Icons */}
                        <div className="flex items-center gap-2">
                          <IconButton
                            icon={FiPaperclip}
                            onClick={() => fileInputRef.current?.click()}
                            title="Attach File"
                          />
                          <IconButton
                            icon={FiImage}
                            onClick={() => imageInputRef.current?.click()}
                            title="Attach Image"
                          />
                          <IconButton
                            icon={FiSmile}
                            onClick={() => setShowEmojiPicker(!showEmojiPicker)}
                            title="Add Emoji"
                            active={showEmojiPicker}
                          >
                            {showEmojiPicker && (
                              <div className="absolute bottom-full left-0 mb-2 neu-card p-4 bg-white border-2 border-neu-200 rounded-lg shadow-xl z-50">
                                <div className="text-neu-900 font-medium text-sm mb-3">Quick Emojis</div>
                                <div className="grid grid-cols-8 gap-2 max-w-xs">
                                  {commonEmojis.map((emoji, index) => (
                                    <button
                                      key={index}
                                      onClick={() => handleEmojiSelect(emoji)}
                                      className="p-2 hover:bg-neu-100 rounded text-lg hover:scale-110 transition-transform"
                                      title={`Add ${emoji}`}
                                    >
                                      {emoji}
                                    </button>
                                  ))}
                                </div>
                              </div>
                            )}
                          </IconButton>
                        </div>
                      </div>

                      {/* Send Button */}
                      <div className="p-4 border-t border-neu-200 bg-gradient-to-r from-blue-50 to-white">
                        <div className="flex gap-3 justify-end">
                          <button
                            onClick={() => setSelectedEmail(null)}
                            className="neu-button px-4 py-2 hover:scale-105 transition-transform"
                          >
                            Cancel
                          </button>
                          <button
                            onClick={handleSendEmail}
                            disabled={!emailCompose.to.trim() || !emailCompose.subject.trim()}
                            className="neu-button px-4 py-2 bg-blue-500 text-white hover:scale-105 transition-transform disabled:opacity-50 disabled:cursor-not-allowed"
                          >
                            <div className="flex items-center gap-2">
                              <SafeIcon icon={FiSend} className="w-4 h-4" />
                              Send Email
                            </div>
                          </button>
                        </div>
                      </div>
                    </>
                  ) : selectedEmail && !isReplying ? (
                    <>
                      {/* Email Header with Working Action Buttons */}
                      <div className="p-4 border-b border-neu-200 bg-gradient-to-r from-yellow-50 to-orange-50">
                        <div className="flex items-start justify-between mb-3">
                          <div>
                            <h3 className="text-neu-900 font-medium mb-2">{selectedEmail.subject}</h3>
                            <div className="text-neu-600 text-sm space-y-1">
                              <div>From: {selectedEmail.fromName || selectedEmail.from}</div>
                              <div>To: {selectedEmail.to.join(', ')}</div>
                              {selectedEmail.cc.length > 0 && <div>CC: {selectedEmail.cc.join(', ')}</div>}
                              <div>Date: {selectedEmail.timestamp.toLocaleString()}</div>
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            <button
                              onClick={() => handleReply(selectedEmail)}
                              className="neu-button p-2 bg-blue-500 text-white hover:scale-105 transition-transform"
                              title="Reply"
                            >
                              <SafeIcon icon={FiReply} className="w-4 h-4" />
                            </button>
                            <button
                              onClick={() => handleForward(selectedEmail)}
                              className="neu-button p-2 bg-green-500 text-white hover:scale-105 transition-transform"
                              title="Forward"
                            >
                              <SafeIcon icon={FiForward} className="w-4 h-4" />
                            </button>
                            <button
                              onClick={() => toggleStar(selectedEmail.id)}
                              className={`neu-button p-2 hover:scale-105 transition-transform ${
                                selectedEmail.starred ? 'bg-yellow-500 text-white' : ''
                              }`}
                              title="Star"
                            >
                              <SafeIcon icon={FiStar} className="w-4 h-4" />
                            </button>
                            <button className="neu-button p-2 bg-red-500 text-white hover:scale-105 transition-transform" title="Delete">
                              <SafeIcon icon={FiTrash} className="w-4 h-4" />
                            </button>
                          </div>
                        </div>
                      </div>

                      {/* Email Body */}
                      <div className="flex-1 p-4 overflow-y-auto">
                        <div className="text-neu-700 whitespace-pre-wrap leading-relaxed">
                          {selectedEmail.body}
                        </div>
                        {selectedEmail.attachments.length > 0 && (
                          <div className="mt-6 pt-4 border-t border-neu-200">
                            <h4 className="text-neu-900 font-medium mb-3">Attachments:</h4>
                            <div className="space-y-2">
                              {selectedEmail.attachments.map((attachment, index) => (
                                <div key={index} className="flex items-center gap-3 p-3 neu-card-inset bg-blue-50">
                                  <SafeIcon icon={FiPaperclip} className="w-4 h-4 text-neu-500" />
                                  <span className="text-neu-700">{attachment.name}</span>
                                  <span className="text-neu-500 text-sm">({attachment.size})</span>
                                  <button className="ml-auto neu-button p-2 bg-blue-500 text-white hover:scale-105 transition-transform">
                                    <SafeIcon icon={FiDownload} className="w-4 h-4" />
                                  </button>
                                </div>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                    </>
                  ) : isReplying ? (
                    <>
                      {/* Reply Header */}
                      <div className="p-4 border-b border-neu-200 flex items-center justify-between bg-gradient-to-r from-green-50 to-blue-50">
                        <h3 className="text-neu-900 font-medium">Reply</h3>
                        <button
                          onClick={() => setIsReplying(false)}
                          className="neu-button p-2 hover:scale-105 transition-transform"
                        >
                          <SafeIcon icon={FiX} className="w-4 h-4 text-neu-600" />
                        </button>
                      </div>

                      {/* Reply Form */}
                      <div className="flex-1 p-4 overflow-y-auto space-y-4">
                        <div>
                          <input
                            type="email"
                            value={replyData.to}
                            onChange={(e) => setReplyData({ ...replyData, to: e.target.value })}
                            className="w-full neu-input p-3 text-neu-700"
                            placeholder="To:"
                          />
                        </div>
                        <div>
                          <input
                            type="text"
                            value={replyData.subject}
                            onChange={(e) => setReplyData({ ...replyData, subject: e.target.value })}
                            className="w-full neu-input p-3 text-neu-700"
                            placeholder="Subject"
                          />
                        </div>

                        {/* AI Assistant for Reply */}
                        {showAIAssistant && (
                          <div className="neu-card-inset p-4 bg-purple-50">
                            <div className="flex items-center justify-between mb-3">
                              <h4 className="text-neu-900 font-medium flex items-center gap-2">
                                <SafeIcon icon={FiZap} className="w-4 h-4 text-purple-600" />
                                AI Reply Assistant
                              </h4>
                              <button
                                onClick={() => generateAISuggestions(replyData.subject, 'reply')}
                                disabled={isGeneratingAI}
                                className="neu-button px-3 py-1 bg-purple-500 text-white text-sm hover:scale-105 transition-transform"
                              >
                                {isGeneratingAI ? 'Generating...' : 'Suggest'}
                              </button>
                            </div>
                            {aiSuggestions.length > 0 && (
                              <div className="space-y-2">
                                {aiSuggestions.map((suggestion, index) => (
                                  <button
                                    key={index}
                                    onClick={() => setReplyData({ ...replyData, body: suggestion + replyData.body })}
                                    className="w-full text-left p-3 neu-button hover:scale-105 transition-transform text-sm"
                                  >
                                    {suggestion.substring(0, 80)}...
                                  </button>
                                ))}
                              </div>
                            )}
                          </div>
                        )}

                        <div className="text-xs text-neu-500 italic">
                          💡 Tip: Press Enter for new line, click "Send Reply" to send response
                        </div>
                        <div>
                          <textarea
                            value={replyData.body}
                            onChange={(e) => setReplyData({ ...replyData, body: e.target.value })}
                            className="w-full neu-input p-3 text-neu-700 h-40 resize-none"
                            placeholder="Type your reply... (Press Enter for new line)"
                          />
                        </div>

                        {/* Reply Icons */}
                        <div className="flex items-center gap-2">
                          <IconButton
                            icon={FiPaperclip}
                            onClick={() => fileInputRef.current?.click()}
                            title="Attach File"
                          />
                          <IconButton
                            icon={FiImage}
                            onClick={() => imageInputRef.current?.click()}
                            title="Attach Image"
                          />
                          <IconButton
                            icon={FiSmile}
                            onClick={() => setShowEmojiPicker(!showEmojiPicker)}
                            title="Add Emoji"
                            active={showEmojiPicker}
                          >
                            {showEmojiPicker && (
                              <div className="absolute bottom-full left-0 mb-2 neu-card p-4 bg-white border-2 border-neu-200 rounded-lg shadow-xl z-50">
                                <div className="text-neu-900 font-medium text-sm mb-3">Quick Emojis</div>
                                <div className="grid grid-cols-8 gap-2 max-w-xs">
                                  {commonEmojis.map((emoji, index) => (
                                    <button
                                      key={index}
                                      onClick={() => handleEmojiSelect(emoji)}
                                      className="p-2 hover:bg-neu-100 rounded text-lg hover:scale-110 transition-transform"
                                      title={`Add ${emoji}`}
                                    >
                                      {emoji}
                                    </button>
                                  ))}
                                </div>
                              </div>
                            )}
                          </IconButton>
                        </div>
                      </div>

                      {/* Reply Send Button */}
                      <div className="p-4 border-t border-neu-200 bg-gradient-to-r from-green-50 to-white">
                        <div className="flex gap-3 justify-end">
                          <button
                            onClick={() => setIsReplying(false)}
                            className="neu-button px-4 py-2 hover:scale-105 transition-transform"
                          >
                            Cancel
                          </button>
                          <button
                            onClick={handleSendReply}
                            disabled={!replyData.to.trim() || !replyData.subject.trim()}
                            className="neu-button px-4 py-2 bg-green-500 text-white hover:scale-105 transition-transform disabled:opacity-50 disabled:cursor-not-allowed"
                          >
                            <div className="flex items-center gap-2">
                              <SafeIcon icon={FiSend} className="w-4 h-4" />
                              Send Reply
                            </div>
                          </button>
                        </div>
                      </div>
                    </>
                  ) : (
                    <div className="flex-1 flex items-center justify-center">
                      <div className="text-center">
                        <SafeIcon icon={FiMail} className="w-16 h-16 text-neu-400 mx-auto mb-4" />
                        <h3 className="text-xl font-semibold text-neu-900 mb-2">Select an Email</h3>
                        <p className="text-neu-600">Choose an email to view or compose a new one</p>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminMessages;