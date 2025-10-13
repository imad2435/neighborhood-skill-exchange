const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const connectDB = require('./config/db');
const userRoutes = require('./routes/userRoutes');
const profileRoutes = require('./routes/profileRoutes');
const bookingRoutes = require('./routes/bookingRoutes');
const reviewRoutes = require('./routes/reviewRoutes');
const { errorHandler } = require('./middleware/errorMiddleware'); // Recommended for better error handling

// Load environment variables from .env file
dotenv.config();

// Connect to MongoDB database
connectDB();

const app = express();

// --- Production-Ready CORS Configuration ---
// This creates a "whitelist" of URLs that are allowed to make requests to your API.
const allowedOrigins = [
  'http://localhost:5173', // Your local frontend for development
  // Add your Vercel/Netlify frontend URL here after you deploy it
  // Example: 'https://ucds-neighborhood-platform.vercel.app' 
];

app.use(cors({
  origin: function (origin, callback) {
    // Allow requests with no origin (like mobile apps or Postman)
    if (!origin) return callback(null, true);
    
    if (allowedOrigins.indexOf(origin) === -1) {
      const msg = 'The CORS policy for this site does not allow access from the specified Origin.';
      return callback(new Error(msg), false);
    }
    
    return callback(null, true);
  }
}));
// --- End CORS Configuration ---


// --- Core Middleware ---
// This allows your server to accept and parse JSON in the body of requests.
app.use(express.json());


// --- API Routes ---
// This is where you connect your different feature routes to the main app.
app.use('/api/users', userRoutes);
app.use('/api/profiles', profileRoutes); 
app.use('/api/bookings', bookingRoutes);
app.use('/api/reviews', reviewRoutes);


// --- Simple Welcome Route ---
// A basic route to confirm the server is running.
app.get('/', (req, res) => {
  res.send('Neighborhood Skill & Service Exchange API is running...');
});


// --- Custom Error Handling Middleware ---
// This should be the last piece of middleware. It catches errors from your controllers.
app.use(errorHandler);


// --- Server Initialization ---
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));