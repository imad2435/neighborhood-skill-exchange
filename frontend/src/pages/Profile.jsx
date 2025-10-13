// frontend/src/pages/Profile.jsx

import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import profileApi from '../api/profileApi'; // We'll use this

const ProfilePage = () => {
  const { user } = useAuth(); // Get the basic user info (name, email, role) from context
  const navigate = useNavigate();

  const [profile, setProfile] = useState(null); // This will hold the detailed provider profile
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Only try to fetch a professional profile if the user is a provider
    if (user?.role === 'provider') {
      const fetchProviderProfile = async () => {
        try {
          const data = await profileApi.getMyProfile();
          setProfile(data);
        } catch (err) {
          // If a 404 happens, it means they are a provider but haven't created a profile yet
          if (err.response && err.response.status === 404) {
            setProfile(null); // Explicitly set profile to null
          } else {
            setError('Failed to load your profile.');
          }
        } finally {
          setLoading(false);
        }
      };
      fetchProviderProfile();
    } else {
      // If the user is a seeker, we don't need to fetch anything else.
      setLoading(false);
    }
  }, [user]);

  if (loading) {
    return <div className="text-center p-10">Loading profile...</div>;
  }

  if (error) {
    return <div className="text-center p-10 text-red-500">{error}</div>;
  }

  // --- RENDER DIFFERENT UI BASED ON ROLE ---
  return (
    <div className="container mx-auto p-4 md:p-8">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">My Profile</h1>
      
      {/* Basic User Info (for everyone) */}
      <div className="bg-white rounded-lg shadow-md p-6 border border-gray-200 mb-8">
        <h2 className="text-xl font-semibold text-gray-800">{user?.name}</h2>
        <p className="text-gray-600">{user?.email}</p>
        <span className="mt-2 inline-block bg-gray-200 text-gray-800 text-xs font-semibold px-2.5 py-0.5 rounded-full capitalize">
          {user?.role}
        </span>
      </div>

      {/* Provider-Specific Section */}
      {user?.role === 'provider' && (
        <>
          {profile ? (
            // If profile exists, show it
            <div className="bg-white rounded-lg shadow-md p-6 border border-gray-200">
              <h3 className="text-lg font-semibold text-purple-700 mb-2">Provider Details</h3>
              <p><strong>Headline:</strong> {profile.headline}</p>
              <p><strong>Location:</strong> {profile.location}</p>
              <p><strong>Rate:</strong> {profile.rate}</p>
              <div className="mt-4">
                <strong>Skills:</strong>
                <div className="flex flex-wrap gap-2 mt-1">
                  {profile.skills.map((skill, index) => <span key={index} className="...">{skill}</span>)}
                </div>
              </div>
              <button onClick={() => navigate('/edit-profile')} className="mt-6 ...">Edit Provider Profile</button>
            </div>
          ) : (
            // If user is a provider but has NO profile yet
            <div className="bg-yellow-100 text-yellow-800 p-4 rounded-lg">
              <p className="font-semibold">Your provider profile is not complete!</p>
              <p>Please add your skills and location to appear in search results.</p>
              <button onClick={() => navigate('/edit-profile')} className="mt-4 ...">Complete Profile Now</button>
            </div>
          )}
        </>
      )}

      {/* Seeker-Specific Section */}
      {user?.role === 'seeker' && (
         <div className="bg-blue-100 text-blue-800 p-4 rounded-lg">
            <p>Ready to find help? Browse our list of skilled providers.</p>
            <button onClick={() => navigate('/providers')} className="mt-4 ...">Find Providers</button>
         </div>
      )}
    </div>
  );
};

export default ProfilePage;