const mongoose = require('mongoose');

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
  meetingLink: {
    type: String,
    required: true,
  },
  qrCode: {
    type: String,
    required: true,
  },
}, { toJSON: { virtuals: true }, toObject: { virtuals: true } });

// Status virtual field
webinarSchema.virtual('status').get(function () {
  const currentTime = new Date();
  const startTime = new Date(this.scheduledTime);
  const endTime = new Date(this.scheduledTime);
  endTime.setHours(endTime.getHours() + 1); // Assume webinars last 1 hour

  if (currentTime < startTime) return 'Upcoming';
  if (currentTime >= startTime && currentTime <= endTime) return 'Ongoing';
  return 'Completed';
});

module.exports = mongoose.model('Webinar', webinarSchema);
