const User = require('../models/User');
const Partner = require('../models/Partner');
const EventRegistration = require('../models/EventRegistration');
const ApiLog = require('../models/ApiLog');

const getStats = async (req, res, next) => {
  try {
    const [totalUsers, totalPartners, totalEventRegistrations, totalApiCalls] = await Promise.all([
      User.countDocuments(),
      Partner.countDocuments(),
      EventRegistration.countDocuments(),
      ApiLog.countDocuments()
    ]);

    const avgResponseTimeResult = await ApiLog.aggregate([
      {
        $group: {
          _id: null,
          avgResponseTime: { $avg: '$responseTime' }
        }
      }
    ]);
    const avgResponseTime = avgResponseTimeResult[0] ? avgResponseTimeResult[0].avgResponseTime : 0;

    const errorCount = await ApiLog.countDocuments({
      statusCode: { $gte: 400 }
    });

    const recentLogs = await ApiLog.find()
      .sort({ createdAt: -1 })
      .limit(10)
      .select('endpoint method statusCode responseTime createdAt');

    const endpointStats = await ApiLog.aggregate([
      {
        $group: {
          _id: '$endpoint',
          count: { $sum: 1 }
        }
      },
      {
        $sort: { count: -1 }
      },
      {
        $limit: 10
      }
    ]);

    res.status(200).json({
      success: true,
      data: {
        overview: {
          totalUsers,
          totalPartners,
          totalEventRegistrations,
          totalApiCalls
        },
        performance: {
          avgResponseTime: Math.round(avgResponseTime),
          errorRate: totalApiCalls > 0 ? ((errorCount / totalApiCalls) * 100).toFixed(2) : 0,
          successRate: totalApiCalls > 0 ? (((totalApiCalls - errorCount) / totalApiCalls) * 100).toFixed(2) : 100
        },
        recentActivity: recentLogs,
        topEndpoints: endpointStats
      }
    });

  } catch (error) {
    next(error);
  }
};

const getErrors = async (req, res, next) => {
  try {
    const { page = 1, limit = 20 } = req.query;
    const skip = (parseInt(page) - 1) * parseInt(limit);

    const [errors, total] = await Promise.all([
      ApiLog.find({ statusCode: { $gte: 400 } })
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(parseInt(limit)),
      ApiLog.countDocuments({ statusCode: { $gte: 400 } })
    ]);

    res.status(200).json({
      success: true,
      data: {
        errors,
        pagination: {
          total,
          page: parseInt(page),
          limit: parseInt(limit),
          pages: Math.ceil(total / parseInt(limit))
        }
      }
    });

  } catch (error) {
    next(error);
  }
};

const trackEvent = async (req, res, next) => {
  try {
    const { event, data } = req.body;

    if (!event) {
      return res.status(400).json({
        success: false,
        error: {
          code: 'MISSING_EVENT',
          message: 'Event name is required'
        }
      });
    }

    const log = await ApiLog.create({
      endpoint: `/track/${event}`,
      method: 'TRACK',
      statusCode: 200,
      responseTime: 0,
      ipAddress: req.ip,
      userAgent: req.get('user-agent'),
      errorMessage: JSON.stringify(data)
    });

    res.status(200).json({
      success: true,
      message: 'Event tracked successfully',
      data: {
        eventId: log.id,
        event
      }
    });

  } catch (error) {
    next(error);
  }
};

const getLogs = async (req, res, next) => {
  try {
    const {
      endpoint,
      method,
      statusCode,
      startDate,
      endDate,
      page = 1,
      limit = 50
    } = req.query;

    const where = {};
    if (endpoint) where.endpoint = { $regex: endpoint, $options: 'i' };
    if (method) where.method = method;
    if (statusCode) where.statusCode = parseInt(statusCode);
    if (startDate || endDate) {
      where.createdAt = {};
      if (startDate) where.createdAt.$gte = new Date(startDate);
      if (endDate) where.createdAt.$lte = new Date(endDate);
    }

    const skip = (parseInt(page) - 1) * parseInt(limit);

    const [logs, total] = await Promise.all([
      ApiLog.find(where)
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(parseInt(limit)),
      ApiLog.countDocuments(where)
    ]);

    res.status(200).json({
      success: true,
      data: {
        logs,
        pagination: {
          total,
          page: parseInt(page),
          limit: parseInt(limit),
          pages: Math.ceil(total / parseInt(limit))
        }
      }
    });

  } catch (error) {
    next(error);
  }
};

module.exports = {
  getStats,
  getErrors,
  trackEvent,
  getLogs
};