// frontend/src/api/profileApi.js
import apiClient from './apiClient';

// Get all profiles (with optional search)
// queryParams is an object like { skill: 'painting', location: 'downtown' }
const getAllProfiles = async (queryParams = {}) => {
  const response = await apiClient.get('/profiles', { params: queryParams });
  return response.data;
};

// Get a single profile by user ID
const getProfileByUserId = async (userId) => {
  const response = await apiClient.get(`/profiles/user/${userId}`);
  return response.data;
};

// Get the profile for the currently logged-in user
const getMyProfile = async () => {
  const response = await apiClient.get('/profiles/me');
  return response.data;
};

// Create or update the logged-in user's profile
const createOrUpdateProfile = async (profileData) => {
  const response = await apiClient.post('/profiles', profileData);
  return response.data;
};

const profileApi = {
  getAllProfiles,
  getProfileByUserId,
  getMyProfile,
  createOrUpdateProfile,
};

export default profileApi;