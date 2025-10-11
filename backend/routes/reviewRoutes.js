// backend/routes/reviewRoutes.js
const express = require('express');
const router = express.Router();
const { createReview } = require('../controllers/reviewController');
const { protect } = require('../middleware/authMiddleware');

// All review routes are protected
router.use(protect);

// POST /api/reviews/:bookingId - Create a new review for a specific booking
router.post('/:bookingId', createReview);

module.exports = router;