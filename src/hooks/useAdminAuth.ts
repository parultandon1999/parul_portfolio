import { useState, useEffect } from 'react';

const ADMIN_PASSWORD = 'admin123'; // Change this to your desired password
const AUTH_KEY = 'admin_auth_token';
const AUTH_EXPIRY = 24 * 60 * 60 * 1000; // 24 hours

export const useAdminAuth = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check if user is already authenticated
    const token = localStorage.getItem(AUTH_KEY);
    const expiry = localStorage.getItem(`${AUTH_KEY}_expiry`);

    if (token && expiry) {
      const expiryTime = parseInt(expiry);
      if (Date.now() < expiryTime) {
        setIsAuthenticated(true);
      } else {
        // Token expired
        localStorage.removeItem(AUTH_KEY);
        localStorage.removeItem(`${AUTH_KEY}_expiry`);
      }
    }
    setIsLoading(false);
  }, []);

  const login = (password: string): boolean => {
    if (password === ADMIN_PASSWORD) {
      const token = Math.random().toString(36).substring(2);
      const expiry = Date.now() + AUTH_EXPIRY;
      localStorage.setItem(AUTH_KEY, token);
      localStorage.setItem(`${AUTH_KEY}_expiry`, expiry.toString());
      setIsAuthenticated(true);
      return true;
    }
    return false;
  };

  const logout = () => {
    localStorage.removeItem(AUTH_KEY);
    localStorage.removeItem(`${AUTH_KEY}_expiry`);
    setIsAuthenticated(false);
  };

  return { isAuthenticated, isLoading, login, logout };
};
