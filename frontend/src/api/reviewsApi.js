// frontend/src/api/reviewsApi.js
import apiClient from './apiClient';

// Get all reviews for a specific provider by their user ID
const getReviewsForProvider = async (providerId) => {
  const response = await apiClient.get(`/reviews/provider/${providerId}`);
  return response.data;
};

// Create a new review for a specific booking
const createReview = async (bookingId, reviewData) => {
  const response = await apiClient.post(`/reviews/${bookingId}`, reviewData);
  return response.data;
};

const reviewsApi = {
  getReviewsForProvider,
  createReview,
};

export default reviewsApi;