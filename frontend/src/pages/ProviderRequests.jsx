
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchMyBookings, updateBookingStatus, resetBookingSuccess, resetBookingError } from "../redux/bookingsSlice";
import { motion } from "framer-motion";
import { format } from "date-fns";

const ProviderRequests = () => {
  const dispatch = useDispatch();
  const { user, userToken } = useSelector((state) => state.profile);
  const { providerRequests, loading, error, success } = useSelector((state) => state.bookings);

  useEffect(() => {
    if (userToken && user?.role === "provider") {
      dispatch(fetchMyBookings({ userId: user._id }));
    }
  }, [dispatch, userToken, user]);

  useEffect(() => {
    if (success) {
      alert("Booking status updated successfully!");
      dispatch(resetBookingSuccess());
      // Re-fetch bookings to ensure UI is up-to-date
      dispatch(fetchMyBookings({ userId: user._id }));
    }
    if (error) {
      alert(`Error: ${error}`);
      dispatch(resetBookingError());
    }
  }, [success, error, dispatch, user?._id]);

  const handleStatusUpdate = (bookingId, status) => {
    if (userToken) {
      dispatch(updateBookingStatus({ bookingId, status, token: userToken }));
    } else {
      alert("You must be logged in to update booking status.");
    }
  };

  const pendingRequests = providerRequests.filter(booking => booking.status === 'pending');
  const acceptedRequests = providerRequests.filter(booking => booking.status === 'accepted');
  const completedRequests = providerRequests.filter(booking => booking.status === 'completed');
  const cancelledRequests = providerRequests.filter(booking => booking.status === 'cancelled');


  if (loading) return <div className="text-center text-gray-600 mt-8">Loading requests...</div>;
  if (error) return <div className="text-center text-red-600 mt-8">Error: {error}</div>;
  if (!user || user.role !== "provider") {
    return (
      <div className="text-center text-red-600 mt-8">
        Access Denied: Only providers can view this page.
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="container mx-auto p-4"
    >
      <h1 className="text-3xl font-bold text-purple-800 mb-8 text-center">
        My Service Requests
      </h1>

      {providerRequests.length === 0 ? (
        <p className="text-center text-gray-500">
          You have not received any service requests yet.
        </p>
      ) : (
        <div className="space-y-8">
          {renderBookingSection("Pending Requests", pendingRequests, handleStatusUpdate, true)}
          {renderBookingSection("Accepted Bookings", acceptedRequests, handleStatusUpdate)}
          {renderBookingSection("Completed Bookings", completedRequests, handleStatusUpdate)}
          {renderBookingSection("Cancelled Bookings", cancelledRequests, handleStatusUpdate)}
        </div>
      )}
    </motion.div>
  );
};

const renderBookingSection = (title, bookings, handleStatusUpdate, showActions = false) => {
  if (bookings.length === 0) return null;

  return (
    <div className="mb-8">
      <h2 className="text-2xl font-semibold text-purple-700 mb-5 border-b pb-3">{title}</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {bookings.map((booking) => (
          <div
            key={booking._id}
            className="bg-white p-6 rounded-lg shadow-md border border-gray-100 flex flex-col justify-between"
          >
            <div>
              <h3 className="text-lg font-bold text-gray-800 mb-2">
                Request from: {booking.serviceSeeker?.name || 'Unknown Seeker'}
              </h3>
              <p className="text-gray-600 mb-1">
                <span className="font-medium">Email:</span>{" "}
                {booking.serviceSeeker?.email || 'N/A'}
              </p>
              <p className="text-gray-600 mb-1">
                <span className="font-medium">Requested Date:</span>{" "}
                {format(new Date(booking.bookingDate), "PPpp")}
              </p>
              {booking.notes && (
                <p className="text-gray-600 mb-1">
                  <span className="font-medium">Notes:</span> {booking.notes}
                </p>
              )}
              {booking.budget && (
                <p className="text-gray-600 mb-1">
                  <span className="font-medium">Budget:</span> {booking.budget}
                </p>
              )}
            </div>
            <div className="mt-4 pt-4 border-t border-gray-100">
              <span
                className={`px-3 py-1 text-sm font-semibold rounded-full capitalize ${
                  booking.status === "pending"
                    ? "bg-yellow-100 text-yellow-800"
                    : booking.status === "accepted"
                    ? "bg-green-100 text-green-800"
                    : booking.status === "completed"
                    ? "bg-blue-100 text-blue-800"
                    : "bg-red-100 text-red-800" // cancelled
                }`}
              >
                Status: {booking.status}
              </span>
              {showActions && (
                <div className="mt-3 flex flex-wrap gap-2">
                  <button
                    onClick={() => handleStatusUpdate(booking._id, "accepted")}
                    className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg text-sm transition"
                    disabled={booking.status !== 'pending'}
                  >
                    Accept
                  </button>
                  <button
                    onClick={() => handleStatusUpdate(booking._id, "rejected")}
                    className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg text-sm transition"
                    disabled={booking.status !== 'pending'}
                  >
                    Reject
                  </button>
                  <button
                    onClick={() => handleStatusUpdate(booking._id, "completed")}
                    className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg text-sm transition"
                    disabled={booking.status !== 'accepted'} // Can only complete accepted
                  >
                    Mark Completed
                  </button>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProviderRequests;