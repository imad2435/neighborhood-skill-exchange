// backend/controllers/reviewController.js
const Review = require('../models/reviewModel');
const Booking = require('../models/bookingModel');

// @desc    Create a new review for a booking
// @route   POST /api/reviews/:bookingId
// @access  Private (for Seekers)
const createReview = async (req, res) => {
  const { rating, comment } = req.body;
  const bookingId = req.params.bookingId;
  const seekerId = req.user.id; // The logged-in user MUST be the seeker

  try {
    // 1. Find the booking
    const booking = await Booking.findById(bookingId);

    if (!booking) {
      return res.status(404).json({ message: 'Booking not found' });
    }

    // 2. Security Check: Make sure the logged-in user is the seeker for this booking
    if (booking.serviceSeeker.toString() !== seekerId) {
      return res.status(401).json({ message: 'User not authorized to review this booking' });
    }

    // 3. Business Logic: Check if the booking status is 'completed'
    if (booking.status !== 'completed') {
      return res.status(400).json({ message: 'Booking must be completed before it can be reviewed' });
    }

    // 4. Business Logic: Check if the booking has already been reviewed
    const existingReview = await Review.findOne({ booking: bookingId });
    if (existingReview) {
      return res.status(400).json({ message: 'This booking has already been reviewed' });
    }

    // 5. If all checks pass, create the new review
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

module.exports = {
  createReview,
};