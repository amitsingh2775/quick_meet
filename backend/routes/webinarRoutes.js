const express = require('express');
const { createWebinar, getWebinars,updateWebinar } = require('../controllers/webinarController');
const { authMiddleware } = require('../middlewares/authMiddleware');
const router = express.Router();

router.post('/create', authMiddleware, createWebinar);
router.get('/all', authMiddleware, getWebinars);
//router.get('/:id', getWebinarDetails); // Public route for webinar details
router.put('/:id',authMiddleware, updateWebinar);

module.exports = router;
