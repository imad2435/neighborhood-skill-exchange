// frontend/src/api/bookingApi.js
import apiClient from './apiClient';

// A logged-in user creates a booking request for a provider
const createBooking = async (providerId, bookingData) => {
  // bookingData should be an object like { bookingDate, notes }
  const response = await apiClient.post(`/bookings/${providerId}`, bookingData);
  return response.data;
};
const getMyBookings = async () => {
  const response = await apiClient.get('/bookings/mybookings');
  return response.data;
};
const updateBookingStatus = async (bookingId, newStatus) => {
  // newStatus should be an object like { status: 'accepted' }
  const response = await apiClient.patch(`/bookings/${bookingId}`, newStatus);
  return response.data;
};


// We will add more functions here later (e.g., getMyBookings, updateBookingStatus)

const bookingApi = {
  createBooking,
   getMyBookings,
   updateBookingStatus
};

export default bookingApi;