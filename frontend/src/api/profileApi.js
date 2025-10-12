import axios from "axios"; // Using axios for consistent error handling and interceptors

const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:5001/api";

export const profileApi = {
  async fetchProfile(token) {
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };
    const res = await axios.get(`${API_BASE_URL}/profiles/me`, config);
    return res.data;
  },

  async updateProfile(data, token) {
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };
    const res = await axios.post(`${API_BASE_URL}/profiles`, data, config); // Use POST as per backend
    return res.data;
  },

  async uploadPortfolioItem(file, token) {
    const formData = new FormData();
    formData.append("file", file); // Ensure 'file' matches backend's expected field name

    const config = {
      headers: {
        "Content-Type": "multipart/form-data", // Important for file uploads
        Authorization: `Bearer ${token}`,
      },
    };
    // This endpoint is missing in the backend. Assuming /api/uploads/portfolio will be added.
    const res = await axios.post(`${API_BASE_URL}/uploads/portfolio`, formData, config);
    return res.data;
  },

  // Placeholder for avatar upload - backend route is needed
  async updateAvatar(fileUrl, token) {
    console.warn("`updateAvatar` in profileApi: Backend endpoint for avatar upload is not implemented.");
    // In a real application, you would upload the file and get a URL back.
    // For now, it's just returning the provided URL.
    return fileUrl;
  }
};