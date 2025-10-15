// --- 1. Core Module Imports ---
const express = require('express');
const http = require('http');
const { Server } = require("socket.io");
const dotenv = require('dotenv');
const cors = require('cors');

// --- 2. Custom Module Imports ---
const connectDB = require('./config/db');
// const { errorHandler } = require('./middleware/errorMiddleware');

// Route imports
const userRoutes = require('./routes/userRoutes');
const profileRoutes = require('./routes/profileRoutes');
const bookingRoutes = require('./routes/bookingRoutes');
const reviewRoutes = require('./routes/reviewRoutes');
const conversationRoutes = require('./routes/conversationRoutes');

// Model imports for socket logic
const Message = require('./models/messageModel');
const Conversation = require('./models/conversationModel');


// --- 3. Initial Configuration ---
dotenv.config();
connectDB();

const app = express();
// IMPORTANT: Create the HTTP server from the Express app
const server = http.createServer(app);


// --- 4. Express Middleware ---
// Apply CORS and JSON parsing to the Express app.
// Note: This CORS setup is for the REST API. Socket.IO has its own CORS config.
app.use(cors());
app.use(express.json());


// --- 5. API Routes ---
// Mount all your REST API routes. These will have URLs like /api/users, /api/profiles, etc.
app.use('/api/users', userRoutes);
app.use('/api/profiles', profileRoutes);
app.use('/api/bookings', bookingRoutes);
app.use('/api/reviews', reviewRoutes);
app.use('/api/conversations', conversationRoutes);


// --- 6. Socket.IO Configuration (The Real-time Part) ---
const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173", // Must match your frontend URL
    methods: ["GET", "POST"]
  }
});

io.on('connection', (socket) => {
  console.log('✅ SOCKET.IO: A user connected with socket ID:', socket.id);

  socket.on('joinRoom', (conversationId) => {
    socket.join(conversationId);
    console.log(`SOCKET.IO: User ${socket.id} joined room: ${conversationId}`);
  });

  socket.on('sendMessage', async ({ conversationId, senderId, content }) => {
    try {
      const newMessage = await Message.create({ conversationId, sender: senderId, content });
      await newMessage.populate('sender', 'name');
      await Conversation.findByIdAndUpdate(conversationId, { lastMessage: newMessage._id });
      // Broadcast the new message to all clients in the specific room
      io.to(conversationId).emit('receiveMessage', newMessage);
    } catch (error) {
      console.error('SOCKET.IO Error (sendMessage):', error);
      socket.emit('messageError', 'Failed to send message.');
    }
  });

  socket.on('disconnect', () => {
    console.log('❌ SOCKET.IO: User disconnected:', socket.id);
  });
});


// --- 7. Final Middleware and Server Start ---
// Custom error handler for the REST API (must be last)
// app.use(errorHandler);

const PORT = process.env.PORT || 5001;
// CRITICAL: You must listen on the 'server' variable, not the 'app' variable.
server.listen(PORT, () => console.log(`🚀 HTTP Server (with Socket.IO) running on port ${PORT}`));