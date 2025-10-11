// backend/models/reviewModel.js
const mongoose = require('mongoose');

const reviewSchema = mongoose.Schema(
  {
    // The specific booking this review is about
    booking: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'Booking',
      unique: true, // A booking can only have one review
    },
    // The provider who received the review
    provider: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User',
    },
    // The seeker who wrote the review
    seeker: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User',
    },
    // The star rating
    rating: {
      type: Number,
      required: true,
      min: 1,
      max: 5,
    },
    // The written comment
    comment: {
      type: String,
      required: true,
      trim: true,
      maxlength: 500,
    },
  },
  {
    timestamps: true,
  }
);

const Review = mongoose.model('Review', reviewSchema);
module.exports = Review;