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


// Get all webinars for the logged-in instructor with status
const getWebinars = async (req, res) => {
  try {
    const instructorId = req.user.user.id;
    
    

    // Find all webinars for the instructor
    const webinars = await Webinar.find({ instructor: instructorId }).populate('instructor', 'name').lean();
    //console.log("all webinars",webinars);
    

    // Map each webinar to format as per the image's requirements
    const webinarsWithStatus = webinars.map((webinar) => {
      // Calculate the status of the webinar based on its scheduled time
      const currentTime = new Date();
      const startTime = new Date(webinar.scheduledTime);
      const endTime = new Date(webinar.scheduledTime);
      endTime.setHours(endTime.getHours() + 1); // Assume webinars last 1 hour

      let status;
      if (currentTime < startTime) {
        status = 'Upcoming';
      } else if (currentTime >= startTime && currentTime <= endTime) {
        status = 'Ongoing';
      } else {
        status = 'Completed';
      }

      // Format the webinar data as per requirements
      return {
        id: webinar._id,
        title: webinar.title,
        name:webinar.instructor?.name,
        scheduledTime: webinar.scheduledTime,
        status
      };
    });

    // Respond with the formatted data
    res.json({
      success: true,
      webinars: webinarsWithStatus,
    });
  } catch (error) {
    console.error('Error Fetching Webinars:', error);
    res.status(500).json({ success: false, message: 'Error fetching webinars' });
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
