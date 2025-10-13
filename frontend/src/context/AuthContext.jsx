// frontend/src/context/AuthContext.jsx
import React, { createContext, useState, useContext, useEffect } from 'react';
import authApi from '../api/authApi';
import apiClient from '../api/apiClient';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Check for a user on initial load
  useEffect(() => {
    const checkLoggedIn = async () => {
      const token = localStorage.getItem('authToken');
      if (token) {
        try {
          // You already have an interceptor, but we need the user data itself
          const response = await apiClient.get('/users/me');
          setUser(response.data);
        } catch (error) {
          // Token is invalid or expired
          authApi.logout();
        }
      }
      setLoading(false);
    };
    checkLoggedIn();
  }, []);

  const login = async (credentials) => {
    const userData = await authApi.login(credentials);
    setUser(userData);
  };

  const register = async (credentials) => {
    const userData = await authApi.register(credentials);
    setUser(userData);
  };

  const logout = () => {
    authApi.logout();
    setUser(null);
  };

  const value = {
    user,
    loading,
    login,
    register,
    logout,
  };

  return <AuthContext.Provider value={value}>{!loading && children}</AuthContext.Provider>;
};