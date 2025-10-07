// backend/controllers/bookingController.js
const Booking = require('../models/bookingModel');
const Profile = require('../models/profileModel');

// @desc    Create a new booking
// @route   POST /api/bookings/:providerId
// @access  Private (for Seekers)
const createBooking = async (req, res) => {
  const { bookingDate, notes } = req.body;
  const providerId = req.params.providerId;
  const seekerId = req.user.id; // Logged-in user is the seeker

  try {
    // Check if the provider exists
    const providerProfile = await Profile.findOne({ user: providerId });
    if (!providerProfile) {
      return res.status(404).json({ message: 'Service provider not found' });
    }

    // A user cannot book their own service
    if (providerId === seekerId) {
      return res.status(400).json({ message: 'You cannot book your own service' });
    }

    const booking = new Booking({
      serviceProvider: providerId,
      serviceSeeker: seekerId,
      bookingDate,
      notes,
      // Status defaults to 'pending'
    });

    const createdBooking = await booking.save();
    res.status(201).json(createdBooking);
  } catch (error) {
    console.error(error);
    res.status(500).send('Server Error');
  }
};

// @desc    Get bookings for the logged-in user
// @route   GET /api/bookings/mybookings
// @access  Private (for both Seekers and Providers)
const getMyBookings = async (req, res) => {
  const userId = req.user.id;
  const userRole = req.user.role;

  try {
    let bookings;
    if (userRole === 'provider') {
      // If the user is a provider, find bookings where they are the provider
      bookings = await Booking.find({ serviceProvider: userId })
        .populate('serviceSeeker', 'name email'); // Show seeker's details
    } else {
      // If the user is a seeker, find bookings where they are the seeker
      bookings = await Booking.find({ serviceSeeker: userId })
        .populate('serviceProvider', 'name email'); // Show provider's details
    }

    res.status(200).json(bookings);
  } catch (error) {
    console.error(error);
    res.status(500).send('Server Error');
  }
};

module.exports = {
  createBooking,
  getMyBookings,
};