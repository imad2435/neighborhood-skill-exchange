// backend/controllers/reviewController.js
const Review = require('../models/reviewModel');
const Booking = require('../models/bookingModel');

// --- FUNCTION 1: CREATE A REVIEW ---
// @desc    Create a new review for a booking
// @route   POST /api/reviews/:bookingId
// @access  Private (for Seekers)
const createReview = async (req, res) => {
  const { rating, comment } = req.body;
  const bookingId = req.params.bookingId;
  const seekerId = req.user.id;

  try {
    const booking = await Booking.findById(bookingId);

    if (!booking) {
      return res.status(404).json({ message: 'Booking not found' });
    }
    if (booking.serviceSeeker.toString() !== seekerId) {
      return res.status(401).json({ message: 'User not authorized to review this booking' });
    }
    if (booking.status !== 'completed') {
      return res.status(400).json({ message: 'Booking must be completed before it can be reviewed' });
    }
    const existingReview = await Review.findOne({ booking: bookingId });
    if (existingReview) {
      return res.status(400).json({ message: 'This booking has already been reviewed' });
    }

    const review = await Review.create({
      booking: bookingId,
      provider: booking.serviceProvider,
      seeker: seekerId,
      rating,
      comment,
    });

    res.status(201).json(review);
  } catch (error) {
    console.error(error);
    res.status(500).send('Server Error');
  }
};


// --- FUNCTION 2: GET REVIEWS FOR A PROVIDER (THIS IS THE MISSING PART) ---
// @desc    Get all reviews for a specific provider
// @route   GET /api/reviews/provider/:providerId
// @access  Public
const getReviewsForProvider = async (req, res) => {
  try {
    const reviews = await Review.find({ provider: req.params.providerId })
      .populate('seeker', 'name') // Show the name of the seeker who left the review
      .sort({ createdAt: -1 }); // Show the newest reviews first

    res.status(200).json(reviews);
  } catch (error) {
    console.error(error);
    res.status(500).send('Server Error');
  }
};


// --- EXPORTS BLOCK (NOW BOTH FUNCTIONS ARE DEFINED ABOVE) ---
module.exports = {
  createReview,
  getReviewsForProvider,
};