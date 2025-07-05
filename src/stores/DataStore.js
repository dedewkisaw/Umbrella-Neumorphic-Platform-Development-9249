import { create } from 'zustand';
import { subscribeWithSelector } from 'zustand/middleware';

// Centralized data store for the entire application
const useDataStore = create(
  subscribeWithSelector((set, get) => ({
    // Users data
    users: [
      {
        id: 1,
        name: 'John Smith',
        email: 'john@example.com',
        status: 'active',
        joinDate: '2024-01-15',
        lastActivity: new Date().toISOString(),
        totalSpent: 149.97,
        purchases: 3,
        plan: 'Pro',
        location: 'United States',
        avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop&crop=face',
        ipAddress: '192.168.1.100',
        browser: 'Chrome 120'
      },
      {
        id: 2,
        name: 'Jane Doe',
        email: 'jane@example.com',
        status: 'active',
        joinDate: '2024-01-10',
        lastActivity: new Date(Date.now() - 3600000).toISOString(),
        totalSpent: 89.98,
        purchases: 2,
        plan: 'Free',
        location: 'Canada',
        avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=400&h=400&fit=crop&crop=face',
        ipAddress: '192.168.1.101',
        browser: 'Firefox 119'
      },
      {
        id: 3,
        name: 'Mike Johnson',
        email: 'mike@example.com',
        status: 'inactive',
        joinDate: '2023-12-20',
        lastActivity: new Date(Date.now() - 86400000).toISOString(),
        totalSpent: 199.95,
        purchases: 5,
        plan: 'Business',
        location: 'United Kingdom',
        avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=face',
        ipAddress: '192.168.1.102',
        browser: 'Safari 17'
      },
      {
        id: 4,
        name: 'Sarah Wilson',
        email: 'sarah@example.com',
        status: 'suspended',
        joinDate: '2024-01-08',
        lastActivity: new Date(Date.now() - 7200000).toISOString(),
        totalSpent: 59.99,
        purchases: 1,
        plan: 'Free',
        location: 'Australia',
        avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop&crop=face',
        ipAddress: '192.168.1.103',
        browser: 'Edge 120'
      },
      {
        id: 5,
        name: 'David Brown',
        email: 'david@example.com',
        status: 'active',
        joinDate: '2024-01-12',
        lastActivity: new Date().toISOString(),
        totalSpent: 299.94,
        purchases: 6,
        plan: 'Enterprise',
        location: 'Germany',
        avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop&crop=face',
        ipAddress: '192.168.1.104',
        browser: 'Chrome 120'
      }
    ],

    // Applications data
    applications: [
      {
        id: 1,
        name: 'ShopFlow Pro',
        developer: 'TechStudio',
        category: 'E-commerce',
        price: 49.99,
        status: 'published',
        downloads: 1250,
        revenue: 11699.66,
        rating: 4.8,
        reviews: 234,
        publishDate: '2023-12-01',
        lastUpdate: '2024-01-15',
        version: '2.1.0',
        size: '15.2 MB',
        tags: ['react', 'stripe', 'inventory', 'analytics'],
        description: 'Complete e-commerce solution with inventory management',
        featured: true
      },
      {
        id: 2,
        name: 'Creative Portfolio',
        developer: 'DesignLab',
        category: 'Portfolio',
        price: 29.99,
        status: 'published',
        downloads: 890,
        revenue: 5664.11,
        rating: 4.9,
        reviews: 189,
        publishDate: '2023-11-15',
        lastUpdate: '2024-01-10',
        version: '1.5.2',
        size: '8.4 MB',
        tags: ['design', 'responsive', 'animations', 'portfolio'],
        description: 'Stunning portfolio template for creative professionals',
        featured: true
      },
      {
        id: 3,
        name: 'BlogMaster',
        developer: 'ContentPro',
        category: 'Blog',
        price: 39.99,
        status: 'published',
        downloads: 650,
        revenue: 5716.57,
        rating: 4.7,
        reviews: 143,
        publishDate: '2023-10-20',
        lastUpdate: '2024-01-12',
        version: '3.0.1',
        size: '12.1 MB',
        tags: ['seo', 'cms', 'markdown', 'blog'],
        description: 'Professional blogging platform with SEO optimization',
        featured: false
      },
      {
        id: 4,
        name: 'StartupLand',
        developer: 'GrowthHackers',
        category: 'Landing',
        price: 19.99,
        status: 'published',
        downloads: 2100,
        revenue: 3398.30,
        rating: 4.6,
        reviews: 170,
        publishDate: '2023-09-10',
        lastUpdate: '2024-01-18',
        version: '1.2.0',
        size: '5.8 MB',
        tags: ['conversion', 'analytics', 'a/b-testing', 'landing'],
        description: 'High-converting landing page template for startups',
        featured: false
      },
      {
        id: 5,
        name: 'TaskFlow',
        developer: 'ProductivityCorp',
        category: 'SaaS',
        price: 79.99,
        status: 'published',
        downloads: 420,
        revenue: 12474.44,
        rating: 4.9,
        reviews: 156,
        publishDate: '2023-08-05',
        lastUpdate: '2024-01-20',
        version: '1.8.3',
        size: '22.5 MB',
        tags: ['productivity', 'teams', 'kanban', 'project-management'],
        description: 'Comprehensive project management tool for teams',
        featured: true
      }
    ],

    // Sales/Transactions data
    transactions: [
      {
        id: 1,
        userId: 1,
        appId: 1,
        amount: 49.99,
        type: 'purchase',
        status: 'completed',
        timestamp: new Date().toISOString(),
        paymentMethod: 'credit_card',
        currency: 'USD',
        fees: 2.45,
        netAmount: 47.54
      },
      {
        id: 2,
        userId: 2,
        appId: 2,
        amount: 29.99,
        type: 'purchase',
        status: 'completed',
        timestamp: new Date(Date.now() - 1800000).toISOString(),
        paymentMethod: 'paypal',
        currency: 'USD',
        fees: 1.47,
        netAmount: 28.52
      },
      {
        id: 3,
        userId: 3,
        appId: 3,
        amount: 39.99,
        type: 'purchase',
        status: 'completed',
        timestamp: new Date(Date.now() - 3600000).toISOString(),
        paymentMethod: 'credit_card',
        currency: 'USD',
        fees: 1.96,
        netAmount: 38.03
      },
      {
        id: 4,
        userId: 4,
        appId: 4,
        amount: 19.99,
        type: 'refund',
        status: 'processed',
        timestamp: new Date(Date.now() - 7200000).toISOString(),
        paymentMethod: 'credit_card',
        currency: 'USD',
        fees: -0.98,
        netAmount: -19.01
      },
      {
        id: 5,
        userId: 5,
        appId: 5,
        amount: 79.99,
        type: 'purchase',
        status: 'completed',
        timestamp: new Date(Date.now() - 10800000).toISOString(),
        paymentMethod: 'bank_transfer',
        currency: 'USD',
        fees: 3.92,
        netAmount: 76.07
      }
    ],

    // Real-time activity logs
    activityLogs: [
      {
        id: 1,
        type: 'user_signup',
        userId: 1,
        details: 'New user registration',
        timestamp: new Date(Date.now() - 120000).toISOString(),
        ipAddress: '192.168.1.100'
      },
      {
        id: 2,
        type: 'app_purchase',
        userId: 1,
        appId: 1,
        details: 'Purchased ShopFlow Pro',
        timestamp: new Date(Date.now() - 300000).toISOString(),
        ipAddress: '192.168.1.100'
      },
      {
        id: 3,
        type: 'app_download',
        userId: 2,
        appId: 2,
        details: 'Downloaded Creative Portfolio',
        timestamp: new Date(Date.now() - 480000).toISOString(),
        ipAddress: '192.168.1.101'
      }
    ],

    // Actions to modify data
    addUser: (user) => set((state) => ({
      users: [...state.users, { ...user, id: Date.now() }]
    })),

    updateUser: (userId, updates) => set((state) => ({
      users: state.users.map(user => 
        user.id === userId ? { ...user, ...updates } : user
      )
    })),

    addTransaction: (transaction) => set((state) => {
      const newTransaction = { 
        ...transaction, 
        id: Date.now(),
        timestamp: new Date().toISOString()
      };
      
      // Update user's total spent and purchases
      const updatedUsers = state.users.map(user => {
        if (user.id === transaction.userId) {
          return {
            ...user,
            totalSpent: transaction.type === 'refund' 
              ? user.totalSpent - Math.abs(transaction.amount)
              : user.totalSpent + transaction.amount,
            purchases: transaction.type === 'refund' 
              ? Math.max(0, user.purchases - 1)
              : user.purchases + 1,
            lastActivity: new Date().toISOString()
          };
        }
        return user;
      });

      // Update app downloads and revenue
      const updatedApps = state.applications.map(app => {
        if (app.id === transaction.appId) {
          return {
            ...app,
            downloads: transaction.type === 'refund' 
              ? Math.max(0, app.downloads - 1)
              : app.downloads + 1,
            revenue: transaction.type === 'refund'
              ? app.revenue - Math.abs(transaction.amount)
              : app.revenue + transaction.amount
          };
        }
        return app;
      });

      return {
        transactions: [newTransaction, ...state.transactions],
        users: updatedUsers,
        applications: updatedApps
      };
    }),

    addActivityLog: (log) => set((state) => ({
      activityLogs: [
        { ...log, id: Date.now(), timestamp: new Date().toISOString() },
        ...state.activityLogs.slice(0, 49) // Keep only last 50 logs
      ]
    })),

    // Simulate real-time updates
    simulateActivity: () => {
      const state = get();
      const users = state.users.filter(u => u.status === 'active');
      const apps = state.applications;
      
      if (users.length === 0 || apps.length === 0) return;

      const randomUser = users[Math.floor(Math.random() * users.length)];
      const randomApp = apps[Math.floor(Math.random() * apps.length)];
      
      const activities = [
        {
          type: 'app_view',
          userId: randomUser.id,
          appId: randomApp.id,
          details: `Viewed ${randomApp.name}`,
          ipAddress: randomUser.ipAddress
        },
        {
          type: 'app_purchase',
          userId: randomUser.id,
          appId: randomApp.id,
          details: `Purchased ${randomApp.name}`,
          ipAddress: randomUser.ipAddress
        },
        {
          type: 'user_login',
          userId: randomUser.id,
          details: `User logged in from ${randomUser.location}`,
          ipAddress: randomUser.ipAddress
        }
      ];

      const randomActivity = activities[Math.floor(Math.random() * activities.length)];
      
      // Add activity log
      state.addActivityLog(randomActivity);

      // If it's a purchase, add transaction
      if (randomActivity.type === 'app_purchase' && Math.random() > 0.7) {
        state.addTransaction({
          userId: randomUser.id,
          appId: randomApp.id,
          amount: randomApp.price,
          type: 'purchase',
          status: 'completed',
          paymentMethod: ['credit_card', 'paypal', 'bank_transfer'][Math.floor(Math.random() * 3)],
          currency: 'USD',
          fees: randomApp.price * 0.029,
          netAmount: randomApp.price * 0.971
        });
      }

      // Update user last activity
      state.updateUser(randomUser.id, {
        lastActivity: new Date().toISOString()
      });
    },

    // Get computed statistics
    getStats: () => {
      const state = get();
      const totalRevenue = state.transactions
        .filter(t => t.type === 'purchase' && t.status === 'completed')
        .reduce((sum, t) => sum + t.amount, 0);
      
      const totalRefunds = Math.abs(state.transactions
        .filter(t => t.type === 'refund')
        .reduce((sum, t) => sum + t.amount, 0));

      const activeUsers = state.users.filter(u => u.status === 'active').length;
      const totalUsers = state.users.length;
      const totalApps = state.applications.length;
      const totalDownloads = state.applications.reduce((sum, app) => sum + app.downloads, 0);
      const avgRating = state.applications.reduce((sum, app) => sum + app.rating, 0) / state.applications.length;

      return {
        totalRevenue,
        totalRefunds,
        netRevenue: totalRevenue - totalRefunds,
        totalUsers,
        activeUsers,
        totalApps,
        totalDownloads,
        avgRating: avgRating.toFixed(1),
        conversionRate: ((state.transactions.filter(t => t.type === 'purchase').length / totalUsers) * 100).toFixed(1)
      };
    }
  }))
);

export default useDataStore;