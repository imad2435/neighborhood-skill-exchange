// backend/routes/conversationRoutes.js
const express = require('express');
const router = express.Router();
const { getConversations, getMessagesForConversation } = require('../controllers/conversationController');
const { protect } = require('../middleware/authMiddleware');
const { createOrGetConversation } = require('../controllers/conversationController');

// All conversation routes are protected
router.use(protect);

// GET /api/conversations -> Get all of the user's conversations
router.get('/', getConversations);
router.post('/', createOrGetConversation);

// GET /api/conversations/:conversationId -> Get all messages for one conversation
router.get('/:conversationId', getMessagesForConversation);

module.exports = router;