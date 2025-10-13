// frontend/src/api/authApi.js
import apiClient from './apiClient';

// Register user
const register = async (userData) => {
  const response = await apiClient.post('/users/register', userData);
  if (response.data) {
    localStorage.setItem('authToken', response.data.token);
  }
  return response.data;
};

// Login user
const login = async (userData) => {
  const response = await apiClient.post('/users/login', userData);
  if (response.data) {
    localStorage.setItem('authToken', response.data.token);
  }
  return response.data;
};

// Logout user
const logout = () => {
  localStorage.removeItem('authToken');
};

const authApi = {
  register,
  login,
  logout,
};

export default authApi;