// auth.js
const jwt = require('jsonwebtoken');

// Generate JWT token
exports.generateToken = (user) => {
  return jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
    expiresIn: '1h',
  });
};

// Middleware to verify token
exports.verifyToken = (req, res, next) => {
  const token = req.header('Authorization')?.split(" ")[1];
  
  if (!token) {
    return res.status(401).json({ message: 'No token provided, authorization denied' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded.id;
    next();
  } catch (err) {
    return res.status(401).json({ message: 'Token is not valid' });
  }
};
