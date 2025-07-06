import { useState, useEffect } from 'react';

export const useAuth = () => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check for existing session
    const session = localStorage.getItem('user_session');
    if (session) {
      try {
        setUser(JSON.parse(session));
      } catch (error) {
        localStorage.removeItem('user_session');
      }
    }
    setIsLoading(false);
  }, []);

  const login = (userData) => {
    setUser(userData);
    localStorage.setItem('user_session', JSON.stringify(userData));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user_session');
  };

  const requireAuth = (action) => {
    return new Promise((resolve, reject) => {
      if (user) {
        resolve(user);
      } else {
        reject({ requiresAuth: true, action });
      }
    });
  };

  return {
    user,
    isLoading,
    login,
    logout,
    requireAuth,
    isAuthenticated: !!user
  };
};