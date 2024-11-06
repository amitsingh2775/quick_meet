const morgan = require('morgan');
const { createLogger, format, transports } = require('winston');

// Create a Winston logger instance
const logger = createLogger({
  level: 'info',
  format: format.combine(
    format.timestamp({
      format: 'YYYY-MM-DD HH:mm:ss',
    }),
    format.printf(({ timestamp, level, message }) => `${timestamp} ${level}: ${message}`)
  ),
  transports: [
    new transports.Console(),
    new transports.File({ filename: 'logs/error.log', level: 'error' }),
    new transports.File({ filename: 'logs/combined.log' }),
  ],
});

// Morgan middleware for HTTP request logging
const morganMiddleware = morgan('combined', {
  stream: {
    write: (message) => logger.info(message.trim()), // Write HTTP logs to Winston
  },
});

// Export the logger and Morgan middleware
module.exports = {
  logger,
  morganMiddleware,
};
