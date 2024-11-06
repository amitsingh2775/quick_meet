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

// Function to send an invite email
exports.sendInviteEmail = async (inviteeEmail, webinarDetails) => {
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

  try {
    await transporter.sendMail(mailOptions);
    console.log(`Invite email sent to ${inviteeEmail}`);
  } catch (err) {
    console.error('Error sending invite email:', err);
    throw new Error('Failed to send invite email');
  }
};
