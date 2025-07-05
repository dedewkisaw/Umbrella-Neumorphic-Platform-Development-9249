import React,{useState,useEffect} from 'react';
import {motion} from 'framer-motion';
import {useNavigate} from 'react-router-dom';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../common/SafeIcon';

const {FiSearch,FiFilter,FiStar,FiDownload,FiDollarSign,FiEye,FiHeart,FiExternalLink,FiShoppingCart,FiTrendingUp,FiZap,FiShield,FiCheck,FiArrowLeft,FiGrid,FiList,FiAward,FiClock,FiUsers,FiGlobe,FiEdit,FiGamepad2,FiBookOpen,FiTarget,FiLayers,FiTrendingDown,FiActivity,FiBarChart,FiDatabase,FiCode,FiBox,FiPackage}=FiIcons;

const AppStore=()=> {
const navigate=useNavigate();
const [apps,setApps]=useState([]);
const [searchTerm,setSearchTerm]=useState('');
const [selectedCategory,setSelectedCategory]=useState('all');
const [sortBy,setSortBy]=useState('popular');
const [viewMode,setViewMode]=useState('grid');
const [priceFilter,setPriceFilter]=useState('all');

const categories=[
{id: 'all',name: 'All Apps',count: 127,icon: FiGlobe},
{id: 'ecommerce',name: 'E-commerce',count: 23,icon: FiShoppingCart},
{id: 'portfolio',name: 'Portfolio',count: 18,icon: FiUsers},
{id: 'blog',name: 'Blog',count: 15,icon: FiEdit},
{id: 'landing',name: 'Landing Page',count: 31,icon: FiZap},
{id: 'saas',name: 'SaaS Tools',count: 12,icon: FiTrendingUp},
{id: 'games',name: 'Games',count: 8,icon: FiGamepad2},
{id: 'education',name: 'Education',count: 20,icon: FiBookOpen}
];

const priceFilters=[
{id: 'all',name: 'All Prices'},
{id: 'free',name: 'Free'},
{id: 'under50',name: 'Under $50'},
{id: 'under100',name: '$50 - $100'},
{id: 'premium',name: '$100+'}
];

const mockApps=[
{id: 1,name: 'ShopFlow Pro',description: 'Complete e-commerce solution with inventory management and analytics dashboard',price: 49.99,category: 'ecommerce',rating: 4.8,downloads: 1250,preview: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=400&h=300&fit=crop',developer: 'TechStudio',featured: true,tags: ['react','stripe','inventory','analytics'],lastUpdate: '2024-01-15',version: '2.1.0',compatibility: ['React','Node.js','MongoDB'],highlights: ['Real-time inventory','Payment processing','Analytics dashboard']},
{id: 2,name: 'Creative Portfolio',description: 'Stunning portfolio template for designers and creative professionals',price: 29.99,category: 'portfolio',rating: 4.9,downloads: 890,preview: 'https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?w=400&h=300&fit=crop',developer: 'DesignLab',featured: false,tags: ['design','responsive','animations','portfolio'],lastUpdate: '2024-01-10',version: '1.5.2',compatibility: ['React','CSS3','Framer Motion'],highlights: ['Responsive design','Smooth animations','Portfolio showcase']},
{id: 3,name: 'BlogMaster',description: 'Professional blogging platform with SEO optimization and content management',price: 39.99,category: 'blog',rating: 4.7,downloads: 650,preview: 'https://images.unsplash.com/photo-1486312338219-ce68e2c6b3b8?w=400&h=300&fit=crop',developer: 'ContentPro',featured: true,tags: ['seo','cms','markdown','blog'],lastUpdate: '2024-01-12',version: '3.0.1',compatibility: ['React','Next.js','Markdown'],highlights: ['SEO optimized','Content management','Markdown support']},
{id: 4,name: 'StartupLand',description: 'High-converting landing page template perfect for startups and product launches',price: 19.99,category: 'landing',rating: 4.6,downloads: 2100,preview: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&h=300&fit=crop',developer: 'GrowthHackers',featured: false,tags: ['conversion','analytics','a/b-testing','landing'],lastUpdate: '2024-01-18',version: '1.2.0',compatibility: ['React','Tailwind CSS','Analytics'],highlights: ['High conversion','A/B testing','Analytics integration']},
{id: 5,name: 'TaskFlow',description: 'Comprehensive project management tool designed for small to medium teams',price: 79.99,category: 'saas',rating: 4.9,downloads: 420,preview: 'https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=400&h=300&fit=crop',developer: 'ProductivityCorp',featured: true,tags: ['productivity','teams','kanban','project-management'],lastUpdate: '2024-01-20',version: '1.8.3',compatibility: ['React','Node.js','PostgreSQL'],highlights: ['Team collaboration','Kanban boards','Time tracking']},
{id: 6,name: 'EduPlatform',description: 'Complete online learning management system with video streaming and assessments',price: 0,category: 'education',rating: 4.5,downloads: 3400,preview: 'https://images.unsplash.com/photo-1501504905252-473c47e087f8?w=400&h=300&fit=crop',developer: 'EduTech',featured: false,tags: ['education','lms','video','assessments'],lastUpdate: '2024-01-08',version: '2.3.1',compatibility: ['React','Video.js','Firebase'],highlights: ['Video streaming','Assessment tools','Progress tracking']}
];

useEffect(()=> {
setApps(mockApps);
},[]);

const filteredApps=apps.filter(app=> {
const matchesSearch=app.name.toLowerCase().includes(searchTerm.toLowerCase()) || app.description.toLowerCase().includes(searchTerm.toLowerCase());
const matchesCategory=selectedCategory==='all' || app.category===selectedCategory;
let matchesPrice=true;
if (priceFilter==='free') matchesPrice=app.price===0;
else if (priceFilter==='under50') matchesPrice=app.price > 0 && app.price < 50;
else if (priceFilter==='under100') matchesPrice=app.price >=50 && app.price < 100;
else if (priceFilter==='premium') matchesPrice=app.price >=100;

return matchesSearch && matchesCategory && matchesPrice;
});

const sortedApps=[...filteredApps].sort((a,b)=> {
switch (sortBy) {
case 'popular': return b.downloads - a.downloads;
case 'rating': return b.rating - a.rating;
case 'price-low': return a.price - b.price;
case 'price-high': return b.price - a.price;
case 'newest': return new Date(b.lastUpdate) - new Date(a.lastUpdate);
default: return 0;
}
});

return (
<div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 p-6">
<div className="max-w-7xl mx-auto">
{/* Enhanced Header */}
<motion.div
initial={{opacity: 0,y: -20}}
animate={{opacity: 1,y: 0}}
className="neu-card p-8 mb-8 bg-gradient-to-r from-blue-50 to-purple-50"
>
<div className="flex items-center justify-between">
<div className="flex items-center gap-6">
<button
onClick={()=> navigate('/')}
className="neu-button p-4 hover:scale-105 transition-transform group"
>
<SafeIcon icon={FiArrowLeft} className="w-6 h-6 text-neu-600 group-hover:-translate-x-1 transition-transform" />
</button>
<div>
<h1 className="text-4xl lg:text-5xl font-bold text-neu-900 mb-2">
App <span className="gradient-text">Marketplace</span>
</h1>
<p className="text-xl text-neu-600">
Discover and purchase premium web applications built by talented developers
</p>
</div>
</div>
<div className="flex items-center gap-4">
<div className="neu-button px-6 py-3 bg-green-100">
<div className="flex items-center gap-2">
<SafeIcon icon={FiShield} className="w-5 h-5 text-green-600" />
<span className="text-green-700 font-medium">Secure Payments</span>
</div>
</div>
<button
onClick={()=> navigate('/dashboard')}
className="neu-button px-6 py-3 hover:scale-105 transition-transform group"
>
<div className="flex items-center gap-2">
<SafeIcon icon={FiUsers} className="w-5 h-5 text-neu-600 group-hover:scale-110 transition-transform" />
<span className="text-neu-700 font-medium">My Library</span>
</div>
</button>
</div>
</div>
</motion.div>

{/* Enhanced Search and Filters */}
<motion.div
initial={{opacity: 0,y: 20}}
animate={{opacity: 1,y: 0}}
className="neu-card p-8 mb-8 bg-gradient-to-br from-white to-blue-50"
>
<div className="space-y-6">
{/* Search Bar */}
<div className="relative">
<SafeIcon icon={FiSearch} className="absolute left-4 top-1/2 transform -translate-y-1/2 text-neu-500 w-5 h-5" />
<input
type="text"
placeholder="Search apps,developers,or technologies..."
value={searchTerm}
onChange={(e)=> setSearchTerm(e.target.value)}
className="w-full neu-input pl-12 pr-4 py-4 text-neu-700 text-lg"
/>
</div>

{/* Filters Row */}
<div className="flex flex-wrap gap-4 items-center">
{/* Category Filter */}
<select
value={selectedCategory}
onChange={(e)=> setSelectedCategory(e.target.value)}
className="neu-input px-4 py-3 text-neu-700 min-w-[200px]"
>
{categories.map(category=> (
<option key={category.id} value={category.id}>
{category.name} ({category.count})
</option>
))}
</select>

{/* Price Filter */}
<select
value={priceFilter}
onChange={(e)=> setPriceFilter(e.target.value)}
className="neu-input px-4 py-3 text-neu-700 min-w-[150px]"
>
{priceFilters.map(filter=> (
<option key={filter.id} value={filter.id}>
{filter.name}
</option>
))}
</select>

{/* Sort */}
<select
value={sortBy}
onChange={(e)=> setSortBy(e.target.value)}
className="neu-input px-4 py-3 text-neu-700 min-w-[200px]"
>
<option value="popular">Most Popular</option>
<option value="rating">Highest Rated</option>
<option value="price-low">Price: Low to High</option>
<option value="price-high">Price: High to Low</option>
<option value="newest">Recently Updated</option>
</select>

{/* View Mode Toggle */}
<div className="flex gap-2 ml-auto">
<button
onClick={()=> setViewMode('grid')}
className={`neu-button p-3 hover:scale-105 transition-transform ${viewMode==='grid' ? 'bg-blue-500 text-white' : ''}`}
>
<SafeIcon icon={FiGrid} className="w-5 h-5" />
</button>
<button
onClick={()=> setViewMode('list')}
className={`neu-button p-3 hover:scale-105 transition-transform ${viewMode==='list' ? 'bg-blue-500 text-white' : ''}`}
>
<SafeIcon icon={FiList} className="w-5 h-5" />
</button>
</div>
</div>

{/* Quick Stats */}
<div className="flex items-center justify-between pt-4 border-t border-neu-200">
<div className="text-neu-600">
Showing <span className="font-semibold text-neu-800">{sortedApps.length}</span> of{' '}
<span className="font-semibold text-neu-800">{apps.length}</span> apps
</div>
<div className="flex items-center gap-6 text-sm text-neu-600">
<div className="flex items-center gap-2">
<SafeIcon icon={FiDownload} className="w-4 h-4" />
<span>50k+ Downloads</span>
</div>
<div className="flex items-center gap-2">
<SafeIcon icon={FiStar} className="w-4 h-4" />
<span>4.7 Avg Rating</span>
</div>
<div className="flex items-center gap-2">
<SafeIcon icon={FiUsers} className="w-4 h-4" />
<span>100+ Developers</span>
</div>
</div>
</div>
</div>
</motion.div>

{/* Featured Apps Section */}
<motion.div
initial={{opacity: 0,y: 20}}
animate={{opacity: 1,y: 0}}
className="mb-12"
>
<div className="neu-card p-8 bg-gradient-to-br from-purple-50 to-blue-50">
<div className="flex items-center justify-between mb-8">
<div>
<h2 className="text-3xl font-bold text-neu-900 mb-2">
<SafeIcon icon={FiStar} className="w-8 h-8 text-yellow-500 inline mr-3" />
Featured Apps
</h2>
<p className="text-neu-600 text-lg">Hand-picked premium applications by our expert team</p>
</div>
<div className="neu-button px-6 py-3 bg-yellow-100">
<div className="flex items-center gap-2">
<SafeIcon icon={FiAward} className="w-5 h-5 text-yellow-600" />
<span className="text-yellow-700 font-medium">Editor's Choice</span>
</div>
</div>
</div>
<div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
{sortedApps.filter(app=> app.featured).map((app,index)=> (
<motion.div
key={app.id}
initial={{opacity: 0,y: 20}}
animate={{opacity: 1,y: 0}}
transition={{delay: index * 0.1}}
>
<EnhancedAppCard app={app} featured />
</motion.div>
))}
</div>
</div>
</motion.div>

{/* Enhanced All Applications Section */}
<motion.div
initial={{opacity: 0,y: 20}}
animate={{opacity: 1,y: 0}}
className="neu-card p-8 lg:p-12 bg-gradient-to-br from-white to-blue-50"
>
{/* Enhanced Header with Premium Design */}
<motion.div
initial={{opacity: 0,y: 20}}
animate={{opacity: 1,y: 0}}
className="text-center mb-12"
>
<div className="neu-button inline-flex items-center gap-2 px-6 py-3 mb-6 bg-blue-100">
<SafeIcon icon={FiPackage} className="w-5 h-5 text-blue-600" />
<span className="text-blue-700 font-medium">Complete Collection</span>
</div>
<h2 className="text-3xl lg:text-4xl font-bold text-neu-900 mb-4">
Professional Applications
<span className="gradient-text block" style={{lineHeight: '1.2',paddingBottom: '0.1em'}}>
Built by Experts
</span>
</h2>
<p className="text-lg text-neu-600 max-w-2xl mx-auto">
Discover our complete collection of premium web applications. Each app is professionally crafted,thoroughly tested,and ready to deploy instantly.
</p>
</motion.div>

{/* Enhanced Stats Section */}
<motion.div
initial={{opacity: 0,y: 20}}
animate={{opacity: 1,y: 0}}
className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-12"
>
{[
{icon: FiTarget,label: 'Quality Score',value: '4.8/5',color: 'text-green-600',bg: 'bg-green-100'},
{icon: FiLayers,label: 'Total Apps',value: `${sortedApps.length}`,color: 'text-blue-600',bg: 'bg-blue-100'},
{icon: FiTrendingUp,label: 'Success Rate',value: '98%',color: 'text-purple-600',bg: 'bg-purple-100'},
{icon: FiShield,label: 'Security',value: 'A+',color: 'text-yellow-600',bg: 'bg-yellow-100'}
].map((stat,index)=> (
<motion.div
key={stat.label}
initial={{opacity: 0,y: 20}}
animate={{opacity: 1,y: 0}}
transition={{delay: index * 0.1}}
className="neu-card-inset p-6 hover:scale-105 transition-transform text-center"
>
<div className={`neu-button p-4 inline-flex mx-auto mb-4 ${stat.bg}`}>
<SafeIcon icon={stat.icon} className={`w-6 h-6 ${stat.color}`} />
</div>
<div className="text-2xl font-bold text-neu-900 mb-2">{stat.value}</div>
<div className="text-sm text-neu-600">{stat.label}</div>
</motion.div>
))}
</motion.div>

{/* Enhanced Filter Bar */}
<motion.div
initial={{opacity: 0,y: 20}}
animate={{opacity: 1,y: 0}}
className="flex items-center justify-between mb-8 p-6 neu-card-inset bg-gradient-to-r from-blue-50 to-purple-50"
>
<div className="flex items-center gap-4">
<div className="neu-button px-6 py-3 bg-blue-500 text-white">
<div className="flex items-center gap-2">
<SafeIcon icon={FiTrendingUp} className="w-5 h-5" />
<span className="font-medium">Trending Now</span>
</div>
</div>
<div className="neu-button px-6 py-3 bg-green-100">
<div className="flex items-center gap-2">
<SafeIcon icon={FiActivity} className="w-5 h-5 text-green-600" />
<span className="text-green-700 font-medium">Recently Updated</span>
</div>
</div>
</div>
<div className="flex items-center gap-4">
<div className="neu-button px-4 py-2 bg-yellow-100">
<div className="flex items-center gap-2">
<div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
<span className="text-yellow-700 font-medium text-sm">Live Updates</span>
</div>
</div>
<select className="neu-input px-4 py-2 text-neu-700 text-sm">
<option>Sort by Relevance</option>
<option>Most Popular</option>
<option>Highest Rated</option>
<option>Recently Added</option>
</select>
</div>
</motion.div>

{/* Enhanced Content with Professional Layout */}
{sortedApps.length===0 ? (
<motion.div
initial={{opacity: 0,scale: 0.9}}
animate={{opacity: 1,scale: 1}}
className="text-center py-20"
>
<div className="neu-card-inset p-16 max-w-lg mx-auto bg-gradient-to-br from-blue-50 to-purple-50">
<div className="neu-button p-8 inline-flex mx-auto mb-8 bg-blue-100">
<SafeIcon icon={FiSearch} className="w-16 h-16 text-blue-600" />
</div>
<h3 className="text-3xl font-bold text-neu-900 mb-6">No Applications Found</h3>
<p className="text-neu-600 mb-8 text-lg leading-relaxed">
We couldn't find any applications matching your current search criteria. Try adjusting your filters or browse our featured collections.
</p>
<div className="flex flex-col sm:flex-row gap-4 justify-center">
<button
onClick={()=> {
setSearchTerm('');
setSelectedCategory('all');
setPriceFilter('all');
}}
className="neu-button px-8 py-4 bg-blue-500 text-white hover:scale-105 transition-transform"
>
<div className="flex items-center gap-3">
<SafeIcon icon={FiZap} className="w-5 h-5" />
<span className="font-semibold">Clear All Filters</span>
</div>
</button>
<button
onClick={()=> setSelectedCategory('featured')}
className="neu-button px-8 py-4 hover:scale-105 transition-transform"
>
<div className="flex items-center gap-3">
<SafeIcon icon={FiStar} className="w-5 h-5 text-neu-600" />
<span className="text-neu-700 font-medium">Browse Featured</span>
</div>
</button>
</div>
</div>
</motion.div>
) : (
<>
{/* Enhanced Category Overview */}
<motion.div
initial={{opacity: 0,y: 20}}
animate={{opacity: 1,y: 0}}
className="mb-12"
>
<div className="neu-card-inset p-8 bg-gradient-to-r from-green-50 to-blue-50">
<div className="text-center mb-8">
<h3 className="text-2xl font-bold text-neu-900 mb-4">
{selectedCategory==='all' ? 'Complete Collection' : categories.find(cat=> cat.id===selectedCategory)?.name || 'Applications'}
</h3>
<p className="text-neu-600 text-lg">
{selectedCategory==='all' ? 'Explore our entire marketplace of professional applications across all categories' : `Specialized ${categories.find(cat=> cat.id===selectedCategory)?.name.toLowerCase()} solutions for your business needs`}
</p>
</div>
{/* Category Stats */}
<div className="grid grid-cols-2 md:grid-cols-4 gap-6">
{[
{label: 'Applications',value: sortedApps.length,icon: FiBox},
{label: 'Avg Rating',value: (sortedApps.reduce((sum,app)=> sum + app.rating,0) / sortedApps.length).toFixed(1),icon: FiStar},
{label: 'Total Downloads',value: sortedApps.reduce((sum,app)=> sum + app.downloads,0).toLocaleString(),icon: FiDownload},
{label: 'Price Range',value: `$${Math.min(...sortedApps.map(app=> app.price))} - $${Math.max(...sortedApps.map(app=> app.price))}`,icon: FiDollarSign}
].map((stat,index)=> (
<div key={stat.label} className="text-center">
<div className="neu-button p-3 inline-flex mx-auto mb-3 bg-white">
<SafeIcon icon={stat.icon} className="w-5 h-5 text-neu-600" />
</div>
<div className="font-bold text-neu-900 text-lg">{stat.value}</div>
<div className="text-sm text-neu-600">{stat.label}</div>
</div>
))}
</div>
</div>
</motion.div>

{/* Enhanced Apps Grid */}
<div className={`grid gap-8 ${viewMode==='grid' ? 'md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4' : 'grid-cols-1'}`}>
{sortedApps.map((app,index)=> (
<motion.div
key={app.id}
initial={{opacity: 0,y: 20}}
animate={{opacity: 1,y: 0}}
transition={{delay: index * 0.05}}
>
<EnhancedAppCard app={app} viewMode={viewMode} />
</motion.div>
))}
</div>

{/* Enhanced Load More Section */}
<motion.div
initial={{opacity: 0,y: 20}}
animate={{opacity: 1,y: 0}}
className="text-center mt-16"
>
<div className="neu-card-inset p-8 bg-gradient-to-r from-purple-50 to-blue-50">
<h3 className="text-xl font-bold text-neu-900 mb-4">
Discover More Applications
</h3>
<p className="text-neu-600 mb-6">
New applications are added weekly. Stay updated with the latest professional tools.
</p>
<div className="flex flex-col sm:flex-row gap-4 justify-center">
<button className="neu-button px-8 py-4 bg-purple-500 text-white hover:scale-105 transition-transform">
<div className="flex items-center gap-3">
<SafeIcon icon={FiTrendingUp} className="w-5 h-5" />
<span className="font-semibold">Load More Apps</span>
</div>
</button>
<button className="neu-button px-8 py-4 hover:scale-105 transition-transform">
<div className="flex items-center gap-3">
<SafeIcon icon={FiBarChart} className="w-5 h-5 text-neu-600" />
<span className="text-neu-700 font-medium">View Analytics</span>
</div>
</button>
</div>
</div>
</motion.div>
</>
)}
</motion.div>
</div>
</div>
);
};

// Enhanced App Card Component - Updated Background Color
const EnhancedAppCard=({app,featured=false,viewMode='grid'})=> {
const [isLiked,setIsLiked]=useState(false);
const [showPreview,setShowPreview]=useState(false);

const handlePurchase=()=> {
console.log('Purchasing app:',app.name);
};

const handlePreview=()=> {
window.open(`/preview/${app.id}`,'_blank');
};

if (viewMode==='list') {
return (
<motion.div
initial={{opacity: 0,scale: 0.9}}
animate={{opacity: 1,scale: 1}}
whileHover={{scale: 1.01}}
className={`neu-card p-6 hover:shadow-lg transition-all duration-300 ${featured ? 'ring-2 ring-yellow-400' : ''}`}
style={{backgroundColor: 'white'}}
>
<div className="flex items-center gap-6">
{/* Preview Image */}
<div className="neu-card-inset p-2 bg-gradient-to-br from-blue-50 to-purple-50 rounded-lg flex-shrink-0">
<div className="w-32 h-24 bg-white rounded-lg overflow-hidden">
<img src={app.preview} alt={app.name} className="w-full h-full object-cover" />
</div>
</div>

{/* App Info */}
<div className="flex-1 space-y-3">
<div className="flex items-start justify-between">
<div>
<div className="flex items-center gap-3">
<h3 className="font-semibold text-neu-900 text-xl">{app.name}</h3>
{featured && (
<div className="neu-button px-3 py-1 bg-yellow-100">
<SafeIcon icon={FiStar} className="w-4 h-4 text-yellow-600" />
</div>
)}
</div>
<p className="text-neu-600">{app.description}</p>
<div className="text-sm text-neu-500 mt-1">by {app.developer}</div>
</div>
<button
onClick={()=> setIsLiked(!isLiked)}
className="neu-button p-2 hover:scale-110 transition-transform"
>
<SafeIcon icon={FiHeart} className={`w-5 h-5 ${isLiked ? 'text-red-500' : 'text-neu-500'}`} />
</button>
</div>

{/* Tags */}
<div className="flex flex-wrap gap-2">
{app.tags.slice(0,4).map(tag=> (
<span key={tag} className="neu-card-inset px-3 py-1 text-xs text-neu-600 rounded-full">
{tag}
</span>
))}
</div>

{/* Stats and Actions */}
<div className="flex items-center justify-between">
<div className="flex items-center gap-6 text-sm">
<div className="flex items-center gap-1">
<SafeIcon icon={FiStar} className="w-4 h-4 text-yellow-500" />
<span className="text-neu-700 font-medium">{app.rating}</span>
</div>
<div className="flex items-center gap-1">
<SafeIcon icon={FiDownload} className="w-4 h-4 text-neu-500" />
<span className="text-neu-600">{app.downloads}</span>
</div>
<div className="text-2xl font-bold text-neu-900">
{app.price===0 ? 'Free' : `$${app.price}`}
</div>
</div>
<div className="flex gap-3">
<button
onClick={handlePreview}
className="neu-button px-4 py-2 hover:scale-105 transition-transform"
>
<SafeIcon icon={FiEye} className="w-4 h-4 text-neu-600" />
</button>
<button
onClick={handlePurchase}
className="neu-button px-6 py-2 bg-blue-500 text-white hover:scale-105 transition-transform"
>
<div className="flex items-center gap-2">
<SafeIcon icon={app.price===0 ? FiDownload : FiDollarSign} className="w-4 h-4" />
<span className="font-medium">{app.price===0 ? 'Get' : 'Buy'}</span>
</div>
</button>
</div>
</div>
</div>
</div>
</motion.div>
);
}

return (
<motion.div
initial={{opacity: 0,scale: 0.9}}
animate={{opacity: 1,scale: 1}}
whileHover={{scale: 1.02}}
className={`neu-card p-6 hover:shadow-lg transition-all duration-300 group ${featured ? 'ring-2 ring-yellow-400' : ''}`}
onMouseEnter={()=> setShowPreview(true)}
onMouseLeave={()=> setShowPreview(false)}
style={{backgroundColor: 'white'}}
>
{featured && (
<div className="absolute -top-3 -right-3 neu-button p-2 bg-yellow-500 text-white">
<SafeIcon icon={FiStar} className="w-4 h-4" />
</div>
)}

<div className="space-y-4">
{/* Preview Image */}
<div className="neu-card-inset p-2 bg-gradient-to-br from-blue-50 to-purple-50 rounded-lg group-hover:scale-105 transition-transform">
<div className="aspect-video bg-white rounded-lg overflow-hidden relative">
<img src={app.preview} alt={app.name} className="w-full h-full object-cover" />
{showPreview && (
<motion.div
initial={{opacity: 0}}
animate={{opacity: 1}}
className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center"
>
<button
onClick={handlePreview}
className="neu-button p-3 bg-white hover:scale-110 transition-transform"
>
<SafeIcon icon={FiEye} className="w-6 h-6 text-neu-600" />
</button>
</motion.div>
)}
</div>
</div>

{/* App Info */}
<div className="space-y-3">
<div className="flex items-start justify-between">
<div className="flex-1">
<h3 className="font-semibold text-neu-900 text-lg">{app.name}</h3>
<p className="text-neu-600 text-sm line-clamp-2">{app.description}</p>
<div className="text-xs text-neu-500 mt-1">by {app.developer}</div>
</div>
<button
onClick={()=> setIsLiked(!isLiked)}
className="neu-button p-2 hover:scale-110 transition-transform"
>
<SafeIcon icon={FiHeart} className={`w-4 h-4 ${isLiked ? 'text-red-500' : 'text-neu-500'}`} />
</button>
</div>

{/* Enhanced Features */}
<div className="neu-card-inset p-3 space-y-2">
<div className="text-xs text-neu-500 font-medium">Key Features:</div>
<div className="space-y-1">
{app.highlights.map((highlight,index)=> (
<div key={index} className="flex items-center gap-2 text-xs">
<SafeIcon icon={FiCheck} className="w-3 h-3 text-green-600" />
<span className="text-neu-600">{highlight}</span>
</div>
))}
</div>
</div>

{/* Tags */}
<div className="flex flex-wrap gap-1">
{app.tags.slice(0,3).map(tag=> (
<span key={tag} className="neu-card-inset px-2 py-1 text-xs text-neu-600 rounded-full">
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
<div className="flex items-center gap-1">
<SafeIcon icon={FiClock} className="w-4 h-4 text-neu-500" />
<span className="text-neu-600 text-xs">{app.lastUpdate}</span>
</div>
</div>

{/* Price and Actions */}
<div className="flex items-center justify-between pt-2">
<div className="text-2xl font-bold text-neu-900">
{app.price===0 ? 'Free' : `$${app.price}`}
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
className="neu-button px-4 py-2 bg-blue-500 text-white hover:scale-105 transition-transform"
>
<div className="flex items-center gap-2">
<SafeIcon icon={app.price===0 ? FiDownload : FiDollarSign} className="w-4 h-4" />
<span className="font-medium">{app.price===0 ? 'Get' : 'Buy'}</span>
</div>
</button>
</div>
</div>
</div>
</div>
</motion.div>
);
};

export default AppStore;