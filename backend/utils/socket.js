
const socketIO = require('socket.io');
const jwt = require('jsonwebtoken');

// Function to authenticate users connecting to the WebSocket
const authenticateSocket = (socket, next) => {
  const token = socket.handshake.auth.token;

  if (!token) {
    return next(new Error('Authentication error: Token not provided'));
  }

  try {
    // Verify the JWT token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    socket.user = decoded; // Attach user data to the socket instance
    next();
  } catch (err) {
    next(new Error('Authentication error: Invalid token'));
  }
};

// Initialize Socket.IO with WebSocket authentication
const initializeSocket = (server) => {
  const io = socketIO(server, {
    cors: {
      origin: process.env.FRONTEND_URL,
      methods: ['GET', 'POST'],
    },
  });

  // Authenticate every socket connection
  io.use(authenticateSocket);

  // Handle connection events
  io.on('connection', (socket) => {
    console.log(`User ${socket.user.id} connected`);

    // Handle a custom event (e.g., message, notification)
    socket.on('message', (data) => {
      io.emit('message', { user: socket.user.id, message: data });
    });

    // Handle disconnection
    socket.on('disconnect', () => {
      console.log(`User ${socket.user.id} disconnected`);
    });
  });

  return io;
};

module.exports = {
  initializeSocket,
};
