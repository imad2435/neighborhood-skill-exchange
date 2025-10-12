
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchMyBookings } from "../redux/bookingsSlice";
import { motion } from "framer-motion";
import { format } from "date-fns"; // For date formatting

const MyBookings = () => {
  const dispatch = useDispatch();
  const { user, userToken } = useSelector((state) => state.profile);
  const { seekerBookings, providerRequests, loading, error } = useSelector((state) => state.bookings);

  useEffect(() => {
    if (userToken) {
      // Pass user ID or role to potentially help the slice filter, though the backend already does this.
      dispatch(fetchMyBookings({ userId: user._id }));
    }
  }, [dispatch, userToken, user._id]);

  const displayBookings = user?.role === "seeker" ? seekerBookings : providerRequests;
  const title = user?.role === "seeker" ? "My Sent Bookings" : "My Received Requests";
  const noBookingsMessage = user?.role === "seeker"
    ? "You haven't made any booking requests yet."
    : "You haven't received any service requests yet.";

  if (loading) return <div className="text-center text-gray-600">Loading bookings...</div>;
  if (error) return <div className="text-center text-red-600">Error: {error}</div>;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="container mx-auto p-4"
    >
      <h1 className="text-3xl font-bold text-purple-800 mb-6 text-center">{title}</h1>

      {displayBookings.length === 0 ? (
        <p className="text-center text-gray-500">{noBookingsMessage}</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {displayBookings.map((booking) => (
            <div
              key={booking._id}
              className="bg-white p-6 rounded-lg shadow-md border border-gray-100 flex flex-col justify-between"
            >
              <div>
                <h2 className="text-xl font-semibold text-gray-800 mb-2">
                  {user?.role === "seeker"
                    ? `Request to ${booking.serviceProvider?.name || 'Unknown Provider'}`
                    : `Request from ${booking.serviceSeeker?.name || 'Unknown Seeker'}`}
                </h2>
                <p className="text-gray-600 mb-1">
                  <span className="font-medium">Date:</span>{" "}
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
                  {booking.status}
                </span>
                {/* Add actions for providers here if this page is also for providers
                    or redirect to a separate ProviderRequests page. */}
                {user?.role === "provider" && booking.status === "pending" && (
                  <div className="mt-3 flex gap-2">
                    {/* These buttons will be more prominent on ProviderRequests.jsx */}
                    {/* For now, just a placeholder */}
                    <button className="text-purple-600 hover:underline text-sm">Review Request</button>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </motion.div>
  );
};

export default MyBookings;