// backend/models/messageModel.js
const mongoose = require('mongoose');

const messageSchema = new mongoose.Schema(
  {
    // The conversation this message belongs to
    conversationId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Conversation',
      required: true,
    },
    // The user who sent the message
    sender: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    // The actual text content of the message
    content: {
      type: String,
      required: true,
      trim: true,
    },
    // We could add 'readBy' for read receipts later
  },
  { timestamps: true }
);

const Message = mongoose.model('Message', messageSchema);
module.exports = Message;