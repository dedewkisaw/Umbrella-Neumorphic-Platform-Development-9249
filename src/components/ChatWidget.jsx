import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../common/SafeIcon';

const { FiMessageCircle, FiX, FiSend, FiMail, FiUser, FiClock, FiCheck, FiMinimize2, FiMaximize2 } = FiIcons;

const ChatWidget = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([
    {
      id: 1,
      type: 'bot',
      message: 'Hi! I\'m here to help you with any questions about our platform. How can I assist you today?',
      timestamp: new Date()
    }
  ]);
  const [isTyping, setIsTyping] = useState(false);
  const [unreadCount, setUnreadCount] = useState(0);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Simulate bot responses
  const botResponses = [
    "Thank you for your message! Our team will get back to you shortly.",
    "I understand your concern. Let me connect you with a specialist.",
    "That's a great question! Here's what I can tell you...",
    "I'd be happy to help you with that. Let me gather some information.",
    "Thanks for reaching out! Is there anything specific you'd like to know?"
  ];

  const handleSendMessage = () => {
    if (!message.trim()) return;

    const newMessage = {
      id: Date.now(),
      type: 'user',
      message: message,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, newMessage]);
    setMessage('');
    setIsTyping(true);

    // Simulate bot response
    setTimeout(() => {
      setIsTyping(false);
      const botMessage = {
        id: Date.now() + 1,
        type: 'bot',
        message: botResponses[Math.floor(Math.random() * botResponses.length)],
        timestamp: new Date()
      };
      setMessages(prev => [...prev, botMessage]);
      
      if (!isOpen) {
        setUnreadCount(prev => prev + 1);
      }
    }, 2000);
  };

  const handleOpen = () => {
    setIsOpen(true);
    setUnreadCount(0);
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ 
              opacity: 1, 
              scale: 1, 
              y: 0,
              height: isMinimized ? 'auto' : '500px'
            }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className={`neu-card bg-white shadow-2xl border border-blue-200/50 mb-4 ${
              isMinimized ? 'w-80' : 'w-80 h-96'
            }`}
            style={{ backgroundColor: 'white' }}
          >
            {/* Chat Header */}
            <div className="p-4 border-b border-neu-200 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-t-2xl">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                    <SafeIcon icon={FiMessageCircle} className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="font-semibold">Umbrella Support</div>
                    <div className="text-xs opacity-90">We're here to help</div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setIsMinimized(!isMinimized)}
                    className="p-2 hover:bg-white/20 rounded-lg transition-colors"
                  >
                    <SafeIcon icon={isMinimized ? FiMaximize2 : FiMinimize2} className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => setIsOpen(false)}
                    className="p-2 hover:bg-white/20 rounded-lg transition-colors"
                  >
                    <SafeIcon icon={FiX} className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>

            {!isMinimized && (
              <>
                {/* Messages */}
                <div className="flex-1 p-4 overflow-y-auto bg-gradient-to-b from-blue-50/30 to-white" style={{ height: '280px' }}>
                  <div className="space-y-4">
                    {messages.map((msg) => (
                      <div
                        key={msg.id}
                        className={`flex ${msg.type === 'user' ? 'justify-end' : 'justify-start'}`}
                      >
                        <div
                          className={`max-w-xs px-4 py-2 rounded-2xl ${
                            msg.type === 'user'
                              ? 'bg-blue-500 text-white neu-button'
                              : 'bg-white neu-card-inset text-neu-700'
                          }`}
                        >
                          <div className="text-sm">{msg.message}</div>
                          <div className={`text-xs mt-1 opacity-75 ${
                            msg.type === 'user' ? 'text-white' : 'text-neu-500'
                          }`}>
                            {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                          </div>
                        </div>
                      </div>
                    ))}
                    
                    {isTyping && (
                      <div className="flex justify-start">
                        <div className="bg-white neu-card-inset text-neu-700 px-4 py-2 rounded-2xl">
                          <div className="flex space-x-1">
                            <div className="w-2 h-2 bg-neu-400 rounded-full animate-pulse"></div>
                            <div className="w-2 h-2 bg-neu-400 rounded-full animate-pulse" style={{ animationDelay: '0.2s' }}></div>
                            <div className="w-2 h-2 bg-neu-400 rounded-full animate-pulse" style={{ animationDelay: '0.4s' }}></div>
                          </div>
                        </div>
                      </div>
                    )}
                    <div ref={messagesEndRef} />
                  </div>
                </div>

                {/* Input */}
                <div className="p-4 border-t border-neu-200 bg-white rounded-b-2xl">
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                      className="flex-1 neu-input px-4 py-2 text-neu-700 placeholder-neu-400"
                      placeholder="Type your message..."
                    />
                    <button
                      onClick={handleSendMessage}
                      className="neu-button p-2 bg-blue-500 text-white hover:bg-blue-600"
                    >
                      <SafeIcon icon={FiSend} className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Chat Toggle Button */}
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={handleOpen}
        className="neu-button p-4 bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-xl hover:shadow-2xl transition-all duration-300 relative"
      >
        <SafeIcon icon={FiMessageCircle} className="w-6 h-6" />
        {unreadCount > 0 && (
          <div className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-6 h-6 flex items-center justify-center">
            {unreadCount}
          </div>
        )}
      </motion.button>
    </div>
  );
};

export default ChatWidget;