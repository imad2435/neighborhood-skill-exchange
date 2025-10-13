// frontend/src/pages/EditProfile.jsx
import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import ProfileForm from '../features/profile/components/ProfileForm';
import { saveProfile } from '../redux/profileSlice';
import { useAuth } from '../context/AuthContext'; // Import useAuth
import profileApi from '../api/profileApi'; // Import profileApi

const EditProfile = () => {
  const { user: authUser } = useAuth(); // Basic user from AuthContext
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [profileData, setProfileData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchExistingProfile = async () => {
      try {
        // Try to fetch an existing professional profile
        const existingProfile = await profileApi.getMyProfile();
        setProfileData(existingProfile);
      } catch (error) {
        // If 404, it means no profile exists yet. This is okay.
        // We'll pre-fill the form with basic info from the authUser.
        if (error.response && error.response.status === 404) {
          setProfileData({
            name: authUser.name,
            email: authUser.email,
            role: authUser.role,
          });
        }
      } finally {
        setLoading(false);
      }
    };

    if (authUser) {
      fetchExistingProfile();
    }
  }, [authUser]);

  const handleSave = (updatedData) => {
    dispatch(saveProfile(updatedData));
    navigate('/profile');
  };
  
  if (loading) {
     return <div>Loading...</div>;
  }

  return (
    <main className="min-h-screen py-10 px-4 bg-gray-50">
      <div className="max-w-3xl mx-auto">
        {/* Pass the fetched or default profileData to the form */}
        <ProfileForm
          user={profileData}
          onSave={handleSave}
          onUploadPortfolio={() => {}} // Placeholder for now
        />
      </div>
    </main>
  );
};

export default EditProfile;