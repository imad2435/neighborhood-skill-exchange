// backend/server.js
const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const connectDB = require('./config/db');
const userRoutes = require('./routes/userRoutes');
const profileRoutes = require('./routes/profileRoutes');
const bookingRoutes = require('./routes/bookingRoutes');

// Load env vars
dotenv.config();

// Connect to database
connectDB();

const app = express();

// Middleware
app.use(express.json()); // To parse JSON bodies
app.use(cors());         // To allow cross-origin requests

// API Routes
app.use('/api/users', userRoutes);
app.use('/api/profiles', profileRoutes); 
app.use('/api/bookings', bookingRoutes);

// A simple welcome route
app.get('/', (req, res) => {
  res.send('Neighborhood Skill & Service Exchange API is running...');
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));