// backend/routes/bookingRoutes.js
const express = require('express');
const router = express.Router();
const { createBooking, getMyBookings } = require('../controllers/bookingController');
const { protect } = require('../middleware/authMiddleware');

// All booking routes are protected
router.use(protect);

// GET /api/bookings/mybookings - Get all bookings for the logged-in user
router.get('/mybookings', getMyBookings);

// POST /api/bookings/:providerId - Create a new booking with a specific provider
router.post('/:providerId', createBooking);

module.exports = router;