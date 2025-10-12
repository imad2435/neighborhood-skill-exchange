
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import { createBooking, resetBookingSuccess, resetBookingError } from "../redux/bookingsSlice";
import { motion } from "framer-motion";

const BookingForm = () => {
  const { providerId } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { userToken } = useSelector((state) => state.profile); // Assuming userToken is stored here
  const { loading, error, success } = useSelector((state) => state.bookings);

  const [bookingDate, setBookingDate] = useState("");
  const [notes, setNotes] = useState("");
  const [budget, setBudget] = useState(""); // Adding budget field

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!userToken) {
      alert("You must be logged in to create a booking.");
      navigate("/login"); // Redirect to login
      return;
    }

    const bookingData = { bookingDate, notes, budget };
    await dispatch(createBooking({ providerId, bookingData, token: userToken }));
  };

  React.useEffect(() => {
    if (success) {
      alert("Booking request sent successfully!");
      dispatch(resetBookingSuccess());
      navigate("/my-bookings"); // Redirect to my bookings page
    }
    if (error) {
      alert(`Error: ${error}`);
      dispatch(resetBookingError());
    }
  }, [success, error, navigate, dispatch]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="container mx-auto p-4 max-w-lg"
    >
      <h1 className="text-3xl font-bold text-purple-800 mb-6 text-center">
        Book a Service
      </h1>

      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-lg shadow-md border border-gray-100 space-y-5"
      >
        <div>
          <label
            htmlFor="bookingDate"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Requested Date & Time
          </label>
          <input
            type="datetime-local"
            id="bookingDate"
            value={bookingDate}
            onChange={(e) => setBookingDate(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-purple-500 focus:border-purple-500"
            required
          />
        </div>

        <div>
          <label
            htmlFor="budget"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Budget (Optional)
          </label>
          <input
            type="text"
            id="budget"
            value={budget}
            onChange={(e) => setBudget(e.target.value)}
            placeholder="e.g., $100 - $200, or 'negotiable'"
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-purple-500 focus:border-purple-500"
          />
        </div>

        <div>
          <label
            htmlFor="notes"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Additional Notes
          </label>
          <textarea
            id="notes"
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            rows="4"
            placeholder="Describe your request in more detail..."
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-purple-500 focus:border-purple-500"
          ></textarea>
        </div>

        <button
          type="submit"
          className={`w-full py-3 px-4 rounded-lg text-white font-semibold transition-colors ${
            loading
              ? "bg-purple-400 cursor-not-allowed"
              : "bg-purple-700 hover:bg-purple-800"
          }`}
          disabled={loading}
        >
          {loading ? "Sending Request..." : "Send Booking Request"}
        </button>
      </form>
    </motion.div>
  );
};

export default BookingForm;