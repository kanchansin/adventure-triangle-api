const { logger } = require('./logger');

const errorHandler = (err, req, res, next) => {
  logger.error('Error occurred:', {
    message: err.message,
    stack: err.stack,
    path: req.path,
    method: req.method
  });

  if (err.code === 11000) {
    return res.status(409).json({
      success: false,
      error: {
        code: 'DUPLICATE_ENTRY',
        message: 'Duplicate value entered for a unique field',
        details: err.keyValue
      }
    });
  }

  if (err.name === 'ValidationError') {
    return res.status(400).json({
      success: false,
      error: {
        code: 'VALIDATION_ERROR',
        message: Object.values(err.errors).map(val => val.message).join(', ')
      }
    });
  }

  if (err.name === 'ZodError') {
    return res.status(400).json({
      success: false,
      error: {
        code: 'VALIDATION_ERROR',
        message: 'Invalid input data',
        details: err.errors
      }
    });
  }

  res.status(err.statusCode || 500).json({
    success: false,
    error: {
      code: err.code || 'INTERNAL_SERVER_ERROR',
      message: process.env.NODE_ENV === 'production'
        ? 'An unexpected error occurred'
        : err.message
    }
  });
};

module.exports = { errorHandler };