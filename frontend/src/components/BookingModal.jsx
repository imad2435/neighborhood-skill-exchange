// frontend/src/components/BookingModal.jsx
import React, { useState } from 'react';

const BookingModal = ({ isOpen, onClose, onSubmit, providerName }) => {
  const [bookingDate, setBookingDate] = useState('');
  const [notes, setNotes] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!bookingDate) {
      alert('Please select a date.');
      return;
    }
    onSubmit({ bookingDate, notes });
  };

  return (
    // Modal Overlay
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      {/* Modal Content */}
      <div className="bg-white rounded-lg shadow-xl p-6 w-full max-w-md">
        <h2 className="text-2xl font-bold mb-4">Book {providerName}</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="bookingDate" className="block text-sm font-medium text-gray-700">
              Requested Date
            </label>
            <input
              type="date"
              id="bookingDate"
              value={bookingDate}
              onChange={(e) => setBookingDate(e.target.value)}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-purple-500 focus:border-purple-500"
              required
            />
          </div>
          <div className="mb-6">
            <label htmlFor="notes" className="block text-sm font-medium text-gray-700">
              Notes for the provider (optional)
            </label>
            <textarea
              id="notes"
              rows="4"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-purple-500 focus:border-purple-500"
              placeholder="e.g., 'Please call upon arrival. My apartment is on the 2nd floor.'"
            ></textarea>
          </div>
          <div className="flex justify-end space-x-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700"
            >
              Send Request
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default BookingModal;