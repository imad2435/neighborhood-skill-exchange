// backend/models/profileModel.js
const mongoose = require('mongoose');

const profileSchema = mongoose.Schema(
  {
    // This creates a direct link between a Profile and a User
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User', // This tells Mongoose the ObjectId refers to the 'User' collection
      unique: true, // Each user can only have one profile
    },
    // The main skill or title, e.g., "Electrician", "Graphic Designer"
    headline: {
      type: String,
      required: [true, 'Please add a headline or title'],
    },
    // An array of specific skills
    skills: {
      type: [String],
      required: [true, 'Please add at least one skill'],
    },
    // A more detailed description of the services offered
    description: {
      type: String,
    },
    // Hourly rate or a description like "Per Project"
    rate: {
      type: String,
      default: 'Contact for pricing',
    },
    // A link to an external portfolio or website (optional)
    portfolioUrl: {
      type: String,
    },
    // For location-based search in the future
    location: {
      type: String,
      required: [true, 'Please add your city or neighborhood'],
    },
  },
  {
    timestamps: true,
  }
);

const Profile = mongoose.model('Profile', profileSchema);

module.exports = Profile;