const { createNotification, getUserNotifications } = require('../services/notificationService');

// Controller to create a notification for a user
const notifyUser = async (req, res) => {
  const { userId, message } = req.body;

  try {
    const notification = await createNotification(userId, message);
    res.status(201).json({ message: 'Notification created successfully', notification });
  } catch (error) {
    res.status(500).json({ message: 'Error creating notification', error: error.message });
  }
};

// Controller to get notifications for the logged-in user
const getNotifications = async (req, res) => {
  const userId = req.user._id; // Assuming user ID is available in req.user

  try {
    const notifications = await getUserNotifications(userId);
    res.status(200).json(notifications);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching notifications', error: error.message });
  }
};

// Controller to mark a notification as read (optional)
const markAsRead = async (req, res) => {
  const { notificationId } = req.body;

  try {
    const notification = await Notification.findByIdAndUpdate(
      notificationId,
      { read: true },
      { new: true }
    );

    if (!notification) {
      return res.status(404).json({ message: 'Notification not found' });
    }

    res.status(200).json({ message: 'Notification marked as read', notification });
  } catch (error) {
    res.status(500).json({ message: 'Error marking notification as read', error: error.message });
  }
};

module.exports = { notifyUser, getNotifications, markAsRead };
