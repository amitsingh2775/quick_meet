const Webinar = require('../models/Webinar');
const { generateQRCode } = require('../services/qrService');
const { generateWebinarLink } = require('../services/webinarLinkService')

// Create a new webinar
const createWebinar = async (req, res) => {
  const { title, description, scheduledTime, meetingLink } = req.body;
  const instructorId = req.user.user.id;

  try {
    // Log incoming data for debugging
    //console.log('Request Body:', req.body);
    //.log('Instructor ID:', req.user);

    // Generate the webinar link using the generated ID
    const webinarLink = generateWebinarLink(instructorId);
   // console.log('Generated Webinar Link:', webinarLink);

    // Generate the QR code containing the link to the webinar page
    const qrCode = await generateQRCode(webinarLink);
  //  console.log('Generated QR Code:', qrCode);

    const webinar = await Webinar.create({
      instructor: instructorId,
      title,
      description,
      meetingLink,
      scheduledTime,
      qrCode,
    });

    res.status(201).json(webinar);
  } catch (error) {
    console.error('Error Creating Webinar:', error);
    res.status(500).json({ message: 'Error creating webinar' });
  }
};

// Get all webinars for the logged-in instructor
const getWebinars = async (req, res) => {
  try {
    const webinars = await Webinar.find({ instructor: req.user._id });
    res.json(webinars);
  } catch (error) {
    console.error('Error Fetching Webinars:', error);
    res.status(500).json({ message: 'Error fetching webinars' });
  }
};

// Get webinar details by ID
const getWebinarDetails = async (req, res) => {
  try {
    const { id } = req.params;
    const webinar = await Webinar.findById(id);

    if (!webinar) {
      return res.status(404).json({ message: 'Webinar not found' });
    }

    res.json(webinar);
  } catch (error) {
    console.error('Error Fetching Webinar Details:', error);
    res.status(500).json({ message: 'Error fetching webinar details' });
  }
};

module.exports = {
  createWebinar,
  getWebinars,
  getWebinarDetails,
};
