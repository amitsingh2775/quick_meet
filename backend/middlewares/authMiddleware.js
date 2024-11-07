const jwt = require('jsonwebtoken');

// Middleware to authenticate user using JWT token from cookies
const authMiddleware = (req, res, next) => {
  // Retrieve token from cookies
  const token = req.cookies.token;

  if (!token) {
    return res.status(401).json({ message: 'Authentication required' });
  }

  try {
    // Verify and decode the token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // Attach user data to the request
    console.log("in middleware", req.user);

    next();
  } catch (err) {
    return res.status(401).json({ message: 'Invalid or expired token' });
  }
};

module.exports = { authMiddleware };
