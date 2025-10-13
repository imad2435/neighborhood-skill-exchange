// backend/routes/bookingRoutes.js
const express = require('express');
const router = express.Router();
const { createBooking, getMyBookings, updateBookingStatus } = require('../controllers/bookingController');
const { protect } = require('../middleware/authMiddleware');

// --- PRIVATE ROUTES ---

// GET /api/bookings/mybookings - Must be logged in
router.get('/mybookings', protect, getMyBookings);

// POST /api/bookings/:providerId - Must be logged in to create a booking
router.post('/:providerId', protect, createBooking);

// PATCH /api/bookings/:id - Must be logged in to update a booking
router.patch('/:id', protect, updateBookingStatus);

module.exports = router;