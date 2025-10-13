// frontend/src/pages/HomePage.jsx

import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const HomePage = () => {
  const { user } = useAuth();

  return (
    <div className="flex flex-col items-center justify-center text-center py-20 px-4">
      <h1 className="text-4xl md:text-5xl font-extrabold text-gray-800">
        Welcome to <span className="text-purple-600">SkillSwap</span>
      </h1>
      <p className="mt-4 text-lg text-gray-600 max-w-2xl">
        Your neighborhood platform for connecting skills with needs. Find trusted local providers or offer your own services to the community.
      </p>

      <div className="mt-10 flex flex-col sm:flex-row gap-4">
        {user ? (
          // If the user is logged in, guide them to the main app features
          <>
            <Link
              to="/providers"
              className="px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-purple-600 hover:bg-purple-700 md:py-4 md:text-lg md:px-10"
            >
              Find Providers
            </Link>
            <Link
              to="/dashboard"
              className="px-8 py-3 border border-transparent text-base font-medium rounded-md text-purple-700 bg-purple-100 hover:bg-purple-200 md:py-4 md:text-lg md:px-10"
            >
              Go to Your Dashboard
            </Link>
          </>
        ) : (
          // If the user is logged out, guide them to sign up or log in
          <>
            <Link
              to="/register"
              className="px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-purple-600 hover:bg-purple-700 md:py-4 md:text-lg md:px-10"
            >
              Get Started (Sign Up)
            </Link>
            <Link
              to="/login"
              className="px-8 py-3 border border-transparent text-base font-medium rounded-md text-purple-700 bg-purple-100 hover:bg-purple-200 md:py-4 md:text-lg md:px-10"
            >
              Login
            </Link>
          </>
        )}
      </div>
    </div>
  );
};

export default HomePage;