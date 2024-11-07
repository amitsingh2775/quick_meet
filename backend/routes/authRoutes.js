const express = require('express');
const { register, login,logout,profile } = require('../controllers/authController');
const { authMiddleware } = require('../middlewares/authMiddleware');
const router = express.Router();

// Registration route
router.post('/register', register);

// Login route
router.post('/login', login);
router.post('/logout',logout)
router.get('/profile',authMiddleware,profile)

module.exports = router;
