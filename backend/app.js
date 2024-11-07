const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const { morganMiddleware } = require('./utils/logger');
require('dotenv').config(); // Load environment variables from .env
const cookieParser = require("cookie-parser");

const app = express();

// Middleware
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.use(express.json()); // Parse JSON requests
app.use(morganMiddleware); // Log HTTP requests
app.use(cors({
  origin: 'http://localhost:5173',  // Frontend URL
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true,
})); // CORS for your frontend

// Database connection
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log('MongoDB connected'))
  .catch((err) => console.error('MongoDB connection error:', err));

// Routes
const authRoutes = require('./routes/authRoutes');
const webinarRoutes = require('./routes/webinarRoutes');
const inviteRoutes = require('./routes/inviteRoutes');
const notificationRoutes = require('./routes/notificationRoutes');



app.use('/api/auth', authRoutes);
app.use('/api/webinars', webinarRoutes);
app.use('/api/invites', inviteRoutes);
app.use('/api/notifications', notificationRoutes);

module.exports = app;
