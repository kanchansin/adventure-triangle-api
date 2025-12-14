const winston = require('winston');
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

// Winston logger configuration
const logger = winston.createLogger({
  level: process.env.LOG_LEVEL || 'info',
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.json()
  ),
  transports: [
    new winston.transports.File({ filename: 'logs/error.log', level: 'error' }),
    new winston.transports.File({ filename: 'logs/combined.log' })
  ]
});

if (process.env.NODE_ENV !== 'production') {
  logger.add(new winston.transports.Console({
    format: winston.format.simple()
  }));
}

// Request logging middleware
const requestLogger = async (req, res, next) => {
  const start = Date.now();

  res.on('finish', async () => {
    const responseTime = Date.now() - start;

    // Log to console
    logger.info({
      method: req.method,
      endpoint: req.originalUrl,
      statusCode: res.statusCode,
      responseTime: `${responseTime}ms`,
      ip: req.ip
    });

    // Log to database (async, don't block response)
    try {
      await prisma.apiLog.create({
        data: {
          endpoint: req.originalUrl,
          method: req.method,
          statusCode: res.statusCode,
          responseTime,
          ipAddress: req.ip,
          userAgent: req.get('user-agent') || 'unknown'
        }
      });
    } catch (error) {
      logger.error('Failed to log to database:', error);
    }
  });

  next();
};

module.exports = { logger, requestLogger };