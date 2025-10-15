const Conversation = require('../models/conversationModel');
const Message = require('../models/messageModel');
console.log('DEBUG: The imported Conversation variable is:', Conversation);

const getConversations = async (req, res) => {
  try {
    const conversations = await Conversation.find({ participants: req.user._id })
      .populate('participants', 'name')
      .populate({
        path: 'lastMessage',
        select: 'content sender',
        populate: { path: 'sender', select: 'name' }
      })
      .sort({ updatedAt: -1 });
    res.status(200).json(conversations);
  } catch (error) {
    console.error(error);
    res.status(500).send('Server Error');
  }
};

const getMessagesForConversation = async (req, res) => {
  try {
    const conversation = await Conversation.findById(req.params.conversationId);
    if (!conversation || !conversation.participants.includes(req.user._id)) {
      return res.status(404).json({ message: 'Conversation not found or you are not a participant.' });
    }
    const messages = await Message.find({ conversationId: req.params.conversationId })
      .populate('sender', 'name')
      .sort({ createdAt: 'asc' });
    res.status(200).json(messages);
  } catch (error) {
    console.error(error);
    res.status(500).send('Server Error');
  }
};

const createOrGetConversation = async (req, res) => {
  const { receiverId } = req.body;
  const senderId = req.user._id;

  if (!receiverId) {
    return res.status(400).json({ message: 'Receiver ID is required.' });
  }

  try {
    // THIS is the line that was failing (line 61 in your file)
    let conversation = await Conversation.findOne({
      participants: { $all: [senderId, receiverId] },
    });

    if (!conversation) {
      conversation = await Conversation.create({
        participants: [senderId, receiverId],
      });
    }
    res.status(200).json(conversation);
  } catch (error) {
    // Pass the error to the errorHandler middleware
    console.error(error); // Log the error for debugging
    res.status(500).send('Server Error');
  }
};

module.exports = {
  getConversations,
  getMessagesForConversation,
  createOrGetConversation,
};