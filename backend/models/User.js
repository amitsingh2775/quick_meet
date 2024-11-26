const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

// User Schema
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    enum: ['instructor', 'student'],
    default: 'student',
  },
  // Optional fields for instructor
  experience: {
    type: Number,
    default: null,
  },
  badges: {
    type: [String],
    default: [],
  },
  rating: {
    type: Number,
    default: null,
  },
  bio: {
    type: String,
    default: "",
  },
  // Optional fields for student
  joinedWebinars: {
    type: Number,
    default: 0,
  },
  techstack: {
    type: [String],
    default: [],
  },

}, {
  timestamps: true,
});

// Password hashing
userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

// Password matching method
userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

const User = mongoose.model('User', userSchema);

module.exports = User;
