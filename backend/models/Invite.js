const mongoose = require('mongoose');

// Invite Schema
const inviteSchema = new mongoose.Schema({
  webinar: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Webinar',
    required: true,
  },
  sender: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  receiver: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  status: {
    type: String,
    enum: ['pending', 'accepted', 'rejected'],
    default: 'pending',
  },
}, {
  timestamps: true, // Adds createdAt and updatedAt fields
});

const Invite = mongoose.model('Invite', inviteSchema);

module.exports = Invite;
