const Invite = require('../models/Invite');
const nodemailer = require('nodemailer');
require('dotenv').config();

// Configure the email transporter
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD,
  },
});

// Send an invite (save to DB and send email)
const sendInvite = async (req, res) => {
  const { webinarId, receiverId, inviteeEmail, webinarDetails } = req.body;

  try {
    // Save invite to the database
    const invite = await Invite.create({
      webinar: webinarId,
      sender: req.user._id,
      receiver: receiverId,
    });

    // Sending email invite
    const { instructorName, topic, time, webinarLink } = webinarDetails;
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: inviteeEmail,
      subject: `You are invited to a webinar: ${topic}`,
      text: `Hello,

You have been invited by ${instructorName} to join the webinar on the topic: "${topic}".
Scheduled time: ${time}

You can join the webinar using the following link: ${webinarLink}

Best regards,
Webinar Platform Team`,
    };

    await transporter.sendMail(mailOptions);

    res.status(201).json({ message: 'Invite sent successfully', invite });
  } catch (error) {
    res.status(500).json({ message: 'Error sending invite', error });
  }
};

// Get invites for the instructor
const getInvites = async (req, res) => {
  try {
    const invites = await Invite.find({ receiver: req.user._id });
    res.json(invites);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching invites', error });
  }
};

module.exports = { sendInvite, getInvites };
