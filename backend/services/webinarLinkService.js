// services/linkService.js
require('dotenv').config();

exports.generateWebinarLink = (webinarId) => {
  try {
    return `${process.env.BASE_URL}/webinar/${webinarId}`;
  } catch (err) {
    console.error('Error generating webinar link:', err);
    throw new Error('Failed to generate webinar link');
  }
};
