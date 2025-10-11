// backend/routes/userRoutes.js
const express = require('express');
const router = express.Router();
const { registerUser, loginUser, getMe } = require('../controllers/userController');
const { protect } = require('../middleware/authMiddleware'); // <-- Import middleware

router.post('/register', registerUser);
router.post('/login', loginUser);

// This is our new PROTECTED route
// When a request hits this URL, it will first go through the 'protect' middleware.
// If the middleware is successful, it will then call the 'getMe' controller.
router.get('/me', protect, getMe);

module.exports = router;