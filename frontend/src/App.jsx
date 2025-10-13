// frontend/src/App.jsx

import React from 'react';
import { Routes, Route } from 'react-router-dom';

// Import Layout Component
import Layout from './components/Layout';

// Import Page Components
import HomePage from './pages/HomePage'; // <-- IMPORT
import Profile from './pages/Profile';
import EditProfile from './pages/EditProfile';
import Messages from './pages/Messages';
import RegisterPage from './pages/RegisterPage';
import LoginPage from './pages/LoginPage';
import ProvidersListPage from './pages/ProvidersListPage';
import ProviderDetailPage from './pages/ProviderDetailPage';
import DashboardPage from './pages/DashboardPage';

function App() {
  return (
    <Routes>
      {/* --- Main Application Routes (with Navbar) --- */}
      
      {/* The new Homepage is now the main entry point */}
      <Route path="/" element={<Layout><HomePage /></Layout>} />
      
      <Route path="/providers" element={<Layout><ProvidersListPage /></Layout>} />
      <Route path="/provider/:userId" element={<Layout><ProviderDetailPage /></Layout>} />
      <Route path="/dashboard" element={<Layout><DashboardPage /></Layout>} />
      <Route path="/profile" element={<Layout><Profile /></Layout>} />
      <Route path="/edit-profile" element={<Layout><EditProfile /></Layout>} />
      <Route path="/messages" element={<Layout><Messages /></Layout>} />

      {/* --- Authentication Routes (without Navbar) --- */}
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/login" element={<LoginPage />} />

      {/* --- Fallback Route --- */}
      {/* If no other route matches, redirect to the homepage */}
      <Route path="*" element={<Layout><HomePage /></Layout>} />
    </Routes>
  );
}

export default App;