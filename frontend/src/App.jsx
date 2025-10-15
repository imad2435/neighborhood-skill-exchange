import React, { useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import { useAuth } from './context/AuthContext';
import socket from './socket/socket';

// Import Layout & Page Components
import Layout from './components/Layout';
import HomePage from './pages/HomePage';
import ProvidersListPage from './pages/ProvidersListPage';
import ProviderDetailPage from './pages/ProviderDetailPage';
import DashboardPage from './pages/DashboardPage';
import Profile from './pages/Profile';
import EditProfile from './pages/EditProfile';
import Messages from './pages/Messages';
import RegisterPage from './pages/RegisterPage';
import LoginPage from './pages/LoginPage';

function App() {
  const { user } = useAuth(); // Get the current logged-in user

  // This effect handles connecting and disconnecting the socket based on login status.
  useEffect(() => {
    if (user) {
      // If a user is logged in, connect the socket.
      socket.connect();
    }

    // This is a cleanup function. It runs when the user logs out or the app closes.
    return () => {
      socket.disconnect();
    };
  }, [user]); // This dependency array ensures the effect re-runs whenever the user state changes.

  return (
    <Routes>
      {/* --- Main Application Routes (with Navbar) --- */}
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
      <Route path="*" element={<Layout><HomePage /></Layout>} />
    </Routes>
  );
}

export default App;