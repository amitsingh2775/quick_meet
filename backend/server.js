const http = require('http');
const app = require('./app');
const { initializeSocket } = require('./utils/socket');
require('dotenv').config();

// Create the HTTP server and pass the Express app
const server = http.createServer(app);

// Initialize WebSocket (Socket.io) with the HTTP server
initializeSocket(server);

// Start the server
const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
