// backend/routes/profileRoutes.js
const express = require('express');
const router = express.Router();
const { 
  getMyProfile, 
  createOrUpdateProfile, 
  getAllProfiles,         // <-- Import
  getProfileByUserId      // <-- Import
} = require('../controllers/profileController');
const { protect } = require('../middleware/authMiddleware');

// --- Public Routes ---
router.route('/').get(getAllProfiles); // GET to /api/profiles
router.route('/user/:user_id').get(getProfileByUserId); // GET to /api/profiles/user/some_id

// --- Private Routes ---
router.route('/me').get(protect, getMyProfile);
router.route('/').post(protect, createOrUpdateProfile);

module.exports = router;