const Webinar = require('../models/Webinar');
const {generateQRCode}=require('../services/qrService')
// Create a new webinar
const createWebinar = async (req, res) => {
  const { title, description, scheduledTime } = req.body;
  const instructorId = req.user.user.id;

  try {
    // Generate the webinar link using the generated ID
    const webinarLink = generateWebinarLink(instructorId);

    // Generate the QR code containing the link to the webinar page
    const qrCode = await generateQRCode(webinarLink);

    const webinar = await Webinar.create({
      instructor: instructorId,
      title,
      description,
      scheduledTime,
      qrCode,
    });

    res.status(201).json(webinar);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error creating webinar' });
  }
};


// Get all webinars for the logged-in instructor
const getWebinars = async (req, res) => {
  try {
    const webinars = await Webinar.find({ instructor: req.user._id });
    res.json(webinars);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error fetching webinars' });
  }
};
const getWebinarDetails = async (req, res) => {
  try {
    const { id } = req.params;
    const webinar = await Webinar.findById(id);

    if (!webinar) {
      return res.status(404).json({ message: 'Webinar not found' });
    }

    res.json(webinar);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error fetching webinar details' });
  }
};
// Export the functions
module.exports = {
  createWebinar,
  getWebinars,
  getWebinarDetails,
};
