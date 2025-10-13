// frontend/src/pages/ProvidersListPage.jsx

import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import profileApi from '../api/profileApi';

const ProvidersListPage = () => {
  const [providers, setProviders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // --- 1. ADD STATE FOR SEARCH TERMS ---
  const [skillSearch, setSkillSearch] = useState('');
  const [locationSearch, setLocationSearch] = useState('');

  // --- 2. MODIFY useEffect TO RE-FETCH ON SEARCH ---
  useEffect(() => {
    const fetchProviders = async () => {
      try {
        setLoading(true);
        // Create the query object to pass to the API
        const queryParams = {};
        if (skillSearch) queryParams.skill = skillSearch;
        if (locationSearch) queryParams.location = locationSearch;

        // Pass the query params to the API call
        const data = await profileApi.getAllProfiles(queryParams);
        setProviders(data);
        setError(null); // Clear previous errors
      } catch (err) {
        setError('Failed to fetch providers. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchProviders();
    // This dependency array tells React to re-run the effect
    // whenever skillSearch or locationSearch changes.
  }, [skillSearch, locationSearch]); 

  // Loading, error, and main return structure remain the same...

  // frontend/src/pages/ProvidersListPage.jsx

// ... (keep all the React hooks and logic at the top of the file the same)

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">Find Local Service Providers</h1>
      
      <div className="mb-8 p-6 bg-white rounded-lg shadow-md border border-gray-200">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label htmlFor="skill" className="block text-sm font-medium text-gray-700">
              What skill are you looking for?
            </label>
            <input
              type="text"
              id="skill"
              value={skillSearch}
              onChange={(e) => setSkillSearch(e.target.value)}
              placeholder="e.g., painting, plumbing..."
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-purple-500 focus:border-purple-500"
            />
          </div>
          <div>
            <label htmlFor="location" className="block text-sm font-medium text-gray-700">
              Location
            </label>
            <input
              type="text"
              id="location"
              value={locationSearch}
              onChange={(e) => setLocationSearch(e.target.value)}
              placeholder="e.g., Gulshan, Clifton..."
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-purple-500 focus:border-purple-500"
            />
          </div>
        </div>
      </div>

      {loading ? (
        <div className="text-center p-10 text-gray-500">Searching...</div>
      ) : error ? (
        <div className="text-center p-10 text-red-500">{error}</div>
      ) : providers.length === 0 ? (
        <div className="text-center text-gray-500 p-10">
            <p className="text-lg">No service providers found with your criteria.</p>
        </div>
      ) : (
        // --- THIS IS THE CORRECTLY STYLED GRID OF CARDS ---
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {providers.map((profile) => (
            <div key={profile._id} className="bg-white rounded-lg shadow-md p-6 border border-gray-200 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col">
              {/* Card Content */}
              <div className="flex-grow">
                <h2 className="text-xl font-bold text-gray-900">{profile.user.name}</h2>
                <p className="text-md text-purple-600 font-semibold mt-1">{profile.headline}</p>
                <p className="text-sm text-gray-500 mt-2">Location: {profile.location}</p>
                
                <div className="mt-4">
                  <h4 className="font-semibold text-sm text-gray-800 mb-2">Skills:</h4>
                  <div className="flex flex-wrap gap-2">
                    {profile.skills.slice(0, 3).map((skill, index) => ( // Show up to 3 skills
                      <span key={index} className="bg-purple-100 text-purple-800 text-xs font-semibold px-2.5 py-1 rounded-full">
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Card Footer with Link */}
              <div className="mt-6 text-right border-t pt-4">
                <Link 
                  to={`/provider/${profile.user._id}`} 
                  className="text-purple-600 hover:text-purple-800 font-semibold transition-colors"
                >
                  View Profile &rarr;
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ProvidersListPage;