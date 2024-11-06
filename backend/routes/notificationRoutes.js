const express = require('express');
const { notifyUser, getNotifications, markAsRead } = require('../controllers/notificationController');
const { authMiddleware } = require('../middlewares/authMiddleware');

const router = express.Router();

// Route to create a notification for a user
router.post('/', authMiddleware, notifyUser);

// Route to get notifications for the logged-in user
router.get('/', authMiddleware, getNotifications);

// Route to mark a notification as read
router.post('/read', authMiddleware, markAsRead);

module.exports = router;
