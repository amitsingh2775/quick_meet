// session.js
const session = require('express-session');
const RedisStore = require('connect-redis')(session);
const redis = require('redis');

// Create Redis client
const redisClient = redis.createClient({
  host: process.env.REDIS_HOST,
  port: process.env.REDIS_PORT,
  password: process.env.REDIS_PASSWORD,
});

module.exports = session({
  store: new RedisStore({ client: redisClient }),
  secret: process.env.SESSION_SECRET || 'supersecretkey',
  resave: false,
  saveUninitialized: false,
  cookie: {
    secure: process.env.NODE_ENV === 'production', // Secure in production
    httpOnly: true,
    maxAge: 1000 * 60 * 60 * 2, // 2 hours session expiry
  },
});
