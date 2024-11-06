const express = require('express');
const router = express.Router();
const { sendInvite, getInvites } = require('../controllers/inviteController');

// Route to send an invite (POST)
router.post('/send-invite', sendInvite);

// Route to get invites for the instructor (GET)
router.get('/get-invites', getInvites);

module.exports = router;
