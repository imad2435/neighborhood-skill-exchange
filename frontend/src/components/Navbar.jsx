// frontend/src/components/Navbar.jsx

import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login'); // Redirect to login page after logout
  };

  return (
    <nav className="bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo or App Name */}
          <div className="flex-shrink-0">
            <Link to="/" className="text-2xl font-bold text-purple-600">
              SkillSwap
            </Link>
          </div>

          {/* Navigation Links */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-4">
              <Link to="/providers" className="text-gray-700 hover:bg-gray-100 px-3 py-2 rounded-md text-sm font-medium">
                Find Providers
              </Link>
              {/* You can add other links here like "About", "Contact", etc. */}
            </div>
          </div>

          {/* Right side of Navbar (Auth links) */}
          <div className="ml-4 flex items-center md:ml-6">
            {user ? (
              // --- If user is logged in ---
              <>
                <span className="text-gray-800 mr-4">Welcome, {user.name}!</span>
                <Link to="/dashboard" className="text-gray-700 hover:bg-gray-100 px-3 py-2 rounded-md text-sm font-medium">
    Dashboard
  </Link>
                <Link to="/profile" className="text-gray-700 hover:bg-gray-100 px-3 py-2 rounded-md text-sm font-medium">
                  My Profile
                </Link>
                <button
                  onClick={handleLogout}
                  className="ml-4 bg-purple-600 text-white hover:bg-purple-700 px-3 py-2 rounded-md text-sm font-medium"
                >
                  Logout
                </button>
              </>
            ) : (
              // --- If user is logged out ---
              <>
                <Link to="/login" className="text-gray-700 hover:bg-gray-100 px-3 py-2 rounded-md text-sm font-medium">
                  Login
                </Link>
                <Link to="/register" className="ml-4 bg-purple-600 text-white hover:bg-purple-700 px-3 py-2 rounded-md text-sm font-medium">
                  Register
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;