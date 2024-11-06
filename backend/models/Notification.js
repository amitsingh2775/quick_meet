const mongoose = require('mongoose');

const notificationSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId, // Reference to the User model
    required: true,
    ref: 'User', // Link to the User model
  },
  message: {
    type: String,
    required: true,
  },
  read: {
    type: Boolean,
    default: false, // Notifications are unread by default
  },
}, { timestamps: true }); // Automatically manage createdAt and updatedAt timestamps

module.exports = mongoose.model('Notification', notificationSchema);
