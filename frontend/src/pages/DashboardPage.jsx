// frontend/src/pages/DashboardPage.jsx

import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import bookingApi from '../api/bookingApi';

const DashboardPage = () => {
  const { user } = useAuth();
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchBookings = async () => {
    try {
      setLoading(true);
      const data = await bookingApi.getMyBookings();
      setBookings(data);
    } catch (err) {
      setError('Failed to load your bookings.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user) {
      fetchBookings();
    }
  }, [user]);

  // --- NEW HANDLER FUNCTION ---
  const handleStatusUpdate = async (bookingId, status) => {
    try {
      // Optimistically update the UI first for a better user experience
      setBookings(currentBookings => 
        currentBookings.map(b => 
          b._id === bookingId ? { ...b, status } : b
        )
      );
      // Make the API call
      await bookingApi.updateBookingStatus(bookingId, { status });
    } catch (err) {
      alert('Failed to update status. Please try again.');
      // If the API call fails, refresh the data to revert the optimistic update
      fetchBookings(); 
    }
  };

  if (loading) return <div className="text-center p-10">Loading your dashboard...</div>;
  if (error) return <div className="text-center p-10 text-red-500">{error}</div>;

  const isProvider = user?.role === 'provider';

  return (
    <div className="container mx-auto p-4 md:p-8">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">My Dashboard</h1>

      <div className="bg-white rounded-lg shadow-md p-6 border border-gray-200">
        <h2 className="text-2xl font-semibold text-purple-700 mb-4">
          {isProvider ? 'My Service Requests' : 'My Bookings'}
        </h2>
        
        {bookings.length === 0 ? (
          <p className="text-gray-500">You have no bookings or requests yet.</p>
        ) : (
          <ul className="divide-y divide-gray-200">
            {bookings.map((booking) => (
              <li key={booking._id} className="py-4 flex flex-col sm:flex-row justify-between sm:items-center">
                {/* Booking Details */}
                <div className="mb-4 sm:mb-0">
                  <p className="font-semibold">
                    {isProvider ? `Request from: ${booking.serviceSeeker.name}` : `Booking with: ${booking.serviceProvider.name}`}
                  </p>
                  <p className="text-sm text-gray-600">
                    Date: {new Date(booking.bookingDate).toLocaleDateString()}
                  </p>
                  {booking.notes && <p className="text-sm text-gray-500 mt-1">Notes: {booking.notes}</p>}
                </div>

                {/* Status and Actions */}
                <div className="flex items-center space-x-4">
                  <span className={`px-3 py-1 text-xs font-semibold rounded-full capitalize ...`}>
                    {booking.status}
                  </span>

                  {/* --- NEW ACTION BUTTONS --- */}
                  {isProvider && booking.status === 'pending' && (
                    <>
                      <button 
                        onClick={() => handleStatusUpdate(booking._id, 'accepted')}
                        className="px-3 py-1 text-sm font-medium text-white bg-green-500 rounded-md hover:bg-green-600"
                      >
                        Accept
                      </button>
                      <button 
                        onClick={() => handleStatusUpdate(booking._id, 'cancelled')}
                        className="px-3 py-1 text-sm font-medium text-white bg-red-500 rounded-md hover:bg-red-600"
                      >
                        Decline
                      </button>
                    </>
                  )}
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default DashboardPage;