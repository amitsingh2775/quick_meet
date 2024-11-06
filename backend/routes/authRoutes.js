const express = require('express');
const { register, login,logout } = require('../controllers/authController');

const router = express.Router();

// Registration route
router.post('/register', register);

// Login route
router.post('/login', login);
router.post('/logout',logout)

module.exports = router;
