// backend/models/conversationModel.js
const mongoose = require('mongoose');

const conversationSchema = new mongoose.Schema(
  
  {
    
    // An array of User IDs who are part of this conversation
    participants: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
      },
    ],
    // A reference to the last message sent in this conversation, for easy previewing
    lastMessage: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Message',
    },
  },
  { timestamps: true }
);


const Conversation = mongoose.model('Conversation', conversationSchema);
console.log('DEBUG: Exporting the Conversation model:', Conversation);
module.exports = Conversation;