import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../common/SafeIcon';

const { FiSearch, FiFilter, FiStar, FiDownload, FiDollarSign, FiEye, FiHeart, FiExternalLink } = FiIcons;

const AppStore = () => {
  const [apps, setApps] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [sortBy, setSortBy] = useState('popular');

  const categories = [
    { id: 'all', name: 'All Apps', count: 127 },
    { id: 'ecommerce', name: 'E-commerce', count: 23 },
    { id: 'portfolio', name: 'Portfolio', count: 18 },
    { id: 'blog', name: 'Blog', count: 15 },
    { id: 'landing', name: 'Landing Page', count: 31 },
    { id: 'saas', name: 'SaaS Tools', count: 12 },
    { id: 'games', name: 'Games', count: 8 },
    { id: 'education', name: 'Education', count: 20 }
  ];

  const mockApps = [
    {
      id: 1,
      name: 'ShopFlow Pro',
      description: 'Complete e-commerce solution with inventory management',
      price: 49.99,
      category: 'ecommerce',
      rating: 4.8,
      downloads: 1250,
      preview: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=400&h=300&fit=crop',
      developer: 'TechStudio',
      featured: true,
      tags: ['react', 'stripe', 'inventory']
    },
    {
      id: 2,
      name: 'Creative Portfolio',
      description: 'Stunning portfolio template for designers and artists',
      price: 29.99,
      category: 'portfolio',
      rating: 4.9,
      downloads: 890,
      preview: 'https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?w=400&h=300&fit=crop',
      developer: 'DesignLab',
      featured: false,
      tags: ['design', 'responsive', 'animations']
    },
    {
      id: 3,
      name: 'BlogMaster',
      description: 'Professional blogging platform with SEO optimization',
      price: 39.99,
      category: 'blog',
      rating: 4.7,
      downloads: 650,
      preview: 'https://images.unsplash.com/photo-1486312338219-ce68e2c6b3b8?w=400&h=300&fit=crop',
      developer: 'ContentPro',
      featured: true,
      tags: ['seo', 'cms', 'markdown']
    },
    {
      id: 4,
      name: 'StartupLand',
      description: 'High-converting landing page for startups',
      price: 19.99,
      category: 'landing',
      rating: 4.6,
      downloads: 2100,
      preview: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&h=300&fit=crop',
      developer: 'GrowthHackers',
      featured: false,
      tags: ['conversion', 'analytics', 'a/b-testing']
    },
    {
      id: 5,
      name: 'TaskFlow',
      description: 'Project management tool for small teams',
      price: 79.99,
      category: 'saas',
      rating: 4.9,
      downloads: 420,
      preview: 'https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=400&h=300&fit=crop',
      developer: 'ProductivityCorp',
      featured: true,
      tags: ['productivity', 'teams', 'kanban']
    },
    {
      id: 6,
      name: 'EduPlatform',
      description: 'Online learning management system',
      price: 0,
      category: 'education',
      rating: 4.5,
      downloads: 3400,
      preview: 'https://images.unsplash.com/photo-1501504905252-473c47e087f8?w=400&h=300&fit=crop',
      developer: 'EduTech',
      featured: false,
      tags: ['education', 'lms', 'video']
    }
  ];

  useEffect(() => {
    setApps(mockApps);
  }, []);

  const filteredApps = apps.filter(app => {
    const matchesSearch = app.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         app.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || app.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const sortedApps = [...filteredApps].sort((a, b) => {
    switch (sortBy) {
      case 'popular':
        return b.downloads - a.downloads;
      case 'rating':
        return b.rating - a.rating;
      case 'price-low':
        return a.price - b.price;
      case 'price-high':
        return b.price - a.price;
      case 'newest':
        return b.id - a.id;
      default:
        return 0;
    }
  });

  return (
    <div className="min-h-screen bg-neu-100 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl lg:text-6xl font-bold text-neu-900 mb-4">
            App <span className="gradient-text">Marketplace</span>
          </h1>
          <p className="text-xl text-neu-600 max-w-2xl mx-auto">
            Discover and purchase premium web applications built by talented developers
          </p>
        </motion.div>

        {/* Search and Filters */}
        <div className="neu-card p-6 mb-8">
          <div className="flex flex-col lg:flex-row gap-4">
            {/* Search */}
            <div className="flex-1 relative">
              <SafeIcon icon={FiSearch} className="absolute left-4 top-1/2 transform -translate-y-1/2 text-neu-500 w-5 h-5" />
              <input
                type="text"
                placeholder="Search apps..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full neu-input pl-12 pr-4 py-3 text-neu-700"
              />
            </div>

            {/* Category Filter */}
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="neu-input px-4 py-3 text-neu-700 min-w-[200px]"
            >
              {categories.map(category => (
                <option key={category.id} value={category.id}>
                  {category.name} ({category.count})
                </option>
              ))}
            </select>

            {/* Sort */}
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="neu-input px-4 py-3 text-neu-700 min-w-[200px]"
            >
              <option value="popular">Most Popular</option>
              <option value="rating">Highest Rated</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="newest">Newest</option>
            </select>
          </div>
        </div>

        {/* Featured Apps */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-12"
        >
          <h2 className="text-2xl font-bold text-neu-900 mb-6">Featured Apps</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {sortedApps.filter(app => app.featured).map(app => (
              <AppCard key={app.id} app={app} featured />
            ))}
          </div>
        </motion.div>

        {/* All Apps */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-neu-900">
              All Apps ({sortedApps.length})
            </h2>
            <div className="text-neu-600">
              Showing {sortedApps.length} of {apps.length} apps
            </div>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {sortedApps.map(app => (
              <AppCard key={app.id} app={app} />
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

const AppCard = ({ app, featured = false }) => {
  const [isLiked, setIsLiked] = useState(false);

  const handlePurchase = () => {
    // Implement purchase logic
    console.log('Purchasing app:', app.name);
  };

  const handlePreview = () => {
    window.open(`/preview/${app.id}`, '_blank');
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      whileHover={{ scale: 1.02 }}
      className={`neu-card p-6 hover:shadow-lg transition-all duration-300 ${
        featured ? 'ring-2 ring-blue-500' : ''
      }`}
    >
      {featured && (
        <div className="absolute -top-3 -right-3 neu-button p-2 bg-blue-500 text-white">
          <SafeIcon icon={FiStar} className="w-4 h-4" />
        </div>
      )}

      <div className="space-y-4">
        {/* Preview Image */}
        <div className="neu-card-inset p-2 bg-gradient-to-br from-blue-50 to-purple-50 rounded-lg">
          <div className="aspect-video bg-white rounded-lg overflow-hidden">
            <img
              src={app.preview}
              alt={app.name}
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        {/* App Info */}
        <div className="space-y-2">
          <div className="flex items-start justify-between">
            <h3 className="font-semibold text-neu-900 text-lg">{app.name}</h3>
            <button
              onClick={() => setIsLiked(!isLiked)}
              className="neu-button p-2 hover:scale-110 transition-transform"
            >
              <SafeIcon
                icon={FiHeart}
                className={`w-4 h-4 ${isLiked ? 'text-red-500' : 'text-neu-500'}`}
              />
            </button>
          </div>
          <p className="text-neu-600 text-sm">{app.description}</p>
          <div className="text-xs text-neu-500">by {app.developer}</div>
        </div>

        {/* Tags */}
        <div className="flex flex-wrap gap-1">
          {app.tags.map(tag => (
            <span
              key={tag}
              className="neu-card-inset px-2 py-1 text-xs text-neu-600 rounded-full"
            >
              {tag}
            </span>
          ))}
        </div>

        {/* Stats */}
        <div className="flex items-center justify-between text-sm">
          <div className="flex items-center gap-1">
            <SafeIcon icon={FiStar} className="w-4 h-4 text-yellow-500" />
            <span className="text-neu-700 font-medium">{app.rating}</span>
          </div>
          <div className="flex items-center gap-1">
            <SafeIcon icon={FiDownload} className="w-4 h-4 text-neu-500" />
            <span className="text-neu-600">{app.downloads}</span>
          </div>
        </div>

        {/* Price and Actions */}
        <div className="flex items-center justify-between">
          <div className="text-2xl font-bold text-neu-900">
            {app.price === 0 ? 'Free' : `$${app.price}`}
          </div>
          <div className="flex gap-2">
            <button
              onClick={handlePreview}
              className="neu-button p-2 hover:scale-105 transition-transform"
            >
              <SafeIcon icon={FiEye} className="w-4 h-4 text-neu-600" />
            </button>
            <button
              onClick={handlePurchase}
              className="neu-button px-4 py-2 hover:scale-105 transition-transform"
            >
              <div className="flex items-center gap-2">
                <SafeIcon icon={app.price === 0 ? FiDownload : FiDollarSign} className="w-4 h-4 text-neu-600" />
                <span className="text-neu-700 font-medium">
                  {app.price === 0 ? 'Get' : 'Buy'}
                </span>
              </div>
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default AppStore;