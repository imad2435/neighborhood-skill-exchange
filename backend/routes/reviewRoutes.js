// backend/routes/reviewRoutes.js

const express = require('express');
const router = express.Router();
const { createReview, getReviewsForProvider } = require('../controllers/reviewController'); // Make sure you have both imported
const { protect } = require('../middleware/authMiddleware');

// --- PUBLIC ROUTE ---
// This route does NOT have the 'protect' middleware. Anyone can access it.
router.get('/provider/:providerId', getReviewsForProvider);

// --- PRIVATE ROUTE ---
// This route has the 'protect' middleware applied directly to it.
// Only a logged-in user can access it.
router.post('/:bookingId', protect, createReview);

module.exports = router;