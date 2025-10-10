// backend/models/bookingModel.js
const mongoose = require('mongoose');

const bookingSchema = mongoose.Schema(
  {
    // The user who is providing the service
    serviceProvider: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User',
    },
    // The user who is requesting the service
    serviceSeeker: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User',
    },
    // The current state of the booking request
    status: {
      type: String,
      required: true,
      enum: ['pending', 'accepted', 'completed', 'cancelled'],
      default: 'pending',
    },
    // The requested date for the service
    bookingDate: {
      type: Date,
      required: true,
    },
    // Any notes or specific details from the seeker
    notes: {
      type: String,
      maxlength: 500,
    },
  },
  {
    timestamps: true,
  }
);

const Booking = mongoose.model('Booking', bookingSchema);
module.exports = Booking;