// backend/controllers/profileController.js
const Profile = require('../models/profileModel');
const User = require('../models/userModel');

// @desc    Get current user's profile
// @route   GET /api/profiles/me
// @access  Private
const getMyProfile = async (req, res) => {
  try {
    // Find the profile linked to the logged-in user's ID
    const profile = await Profile.findOne({ user: req.user.id }).populate(
      'user',
      ['name', 'email'] // Also fetch the user's name and email
    );

    if (!profile) {
      return res.status(404).json({ message: 'There is no profile for this user' });
    }

    res.status(200).json(profile);
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server Error');
  }
};


// @desc    Create or update a user profile
// @route   POST /api/profiles
// @access  Private
const createOrUpdateProfile = async (req, res) => {
  // 1. Destructure all possible fields from the request body
  const { headline, skills, description, rate, portfolioUrl, location } = req.body;

  // 2. Build the profileFields object
  const profileFields = {};
  profileFields.user = req.user.id; // Link to the logged-in user
  if (headline) profileFields.headline = headline;
  if (location) profileFields.location = location;
  if (rate) profileFields.rate = rate;
  if (description) profileFields.description = description;
  if (portfolioUrl) profileFields.portfolioUrl = portfolioUrl;
  
  // The skills field is an array. We need to split the comma-separated string from the form.
  if (skills) {
    profileFields.skills = skills.split(',').map((skill) => skill.trim());
  }

  try {
    // 3. Find and Update (or Create if it doesn't exist)
    let profile = await Profile.findOneAndUpdate(
      { user: req.user.id }, // Find a profile with this user ID
      { $set: profileFields }, // Update it with the new fields
      { new: true, upsert: true } // Options: return the new doc, and create if it doesn't exist
    );

    // After creating the profile, let's update the user's role to 'provider'
    await User.findByIdAndUpdate(req.user.id, { role: 'provider' });


    // 4. Send the profile back as a response
    res.status(200).json(profile);
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server Error');
  }
};
const getAllProfiles = async (req, res) => {
  try {
    // 1. Create a filter object to build our query dynamically
    const filter = {};

    // 2. Check for a 'skill' query parameter
    if (req.query.skill) {
      // If a skill is provided, add it to our filter.
      // We'll search for this skill within the 'skills' array of the profile.
      // The '$options: i' makes the search case-insensitive.
      filter.skills = { $regex: req.query.skill, $options: 'i' };
    }

    // 3. Check for a 'location' query parameter
    if (req.query.location) {
      // If a location is provided, add it to our filter.
      filter.location = { $regex: req.query.location, $options: 'i' };
    }

    // 4. Execute the query using the filter object.
    // If no query params were provided, the filter object will be empty ({}),
    // and `Profile.find({})` correctly returns ALL profiles.
    const profiles = await Profile.find(filter).populate('user', ['name', 'email']);

    res.status(200).json(profiles);
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server Error');
  }
};

// @desc    Get profile by user ID
// @route   GET /api/profiles/user/:user_id
// @access  Public
const getProfileByUserId = async (req, res) => {
  try {
    const profile = await Profile.findOne({
      user: req.params.user_id,
    }).populate('user', ['name', 'email']);

    if (!profile) {
      return res.status(404).json({ message: 'Profile not found' });
    }

    res.status(200).json(profile);
  } catch (error) {
    console.error(error.message);
    // If the ObjectId is not valid, it can throw an error
    if (error.kind == 'ObjectId') {
        return res.status(404).json({ message: 'Profile not found' });
    }
    res.status(500).send('Server Error');
  }
};

// --- MAKE SURE THE EXPORTS ARE STILL CORRECT ---
module.exports = {
  getMyProfile,
  createOrUpdateProfile,
  getAllProfiles,       // This is the function we just replaced
  getProfileByUserId,
};
