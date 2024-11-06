const Notification=require('../models/Notification')

// Function to create a notification for the user
exports.createNotification = async (userId, message) => {
  try {
    const notification = new Notification({
      user: userId,
      message,
    });
    await notification.save();
    return notification;
  } catch (err) {
    console.error('Error creating notification:', err);
    throw new Error('Failed to create notification');
  }
};

// Function to get notifications for a specific user
exports.getUserNotifications = async (userId) => {
  try {
    const notifications = await Notification.find({ user: userId });
    return notifications;
  } catch (err) {
    console.error('Error fetching notifications:', err);
    throw new Error('Failed to fetch notifications');
  }
};
