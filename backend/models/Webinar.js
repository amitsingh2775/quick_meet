const mongoose = require('mongoose');

// Webinar Schema
const webinarSchema = new mongoose.Schema({
  instructor: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  scheduledTime: {
    type: Date,
    required: true,
  },
  qrCode: {
    type: String, // This will store the generated QR code (Base64 or URL)
    required: true,
  },
}, {
  timestamps: true, // Adds createdAt and updatedAt fields
});

const Webinar = mongoose.model('Webinar', webinarSchema);

module.exports = Webinar;
