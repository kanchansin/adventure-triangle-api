const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

/**
 * @desc    Get comprehensive statistics
 * @route   GET /api/v1/logs/stats
 * @access  Public
 */
const getStats = async (req, res, next) => {
  try {
    
    const [totalUsers, totalPartners, totalEventRegistrations, totalApiCalls] = await Promise.all([
      prisma.user.count(),
      prisma.partner.count(),
      prisma.eventRegistration.count(),
      prisma.apiLog.count()
    ]);

    
    const avgResponseTime = await prisma.apiLog.aggregate({
      _avg: {
        responseTime: true
      }
    });

    
    const errorCount = await prisma.apiLog.count({
      where: {
        statusCode: {
          gte: 400
        }
      }
    });

    
    const recentLogs = await prisma.apiLog.findMany({
      take: 10,
      orderBy: { createdAt: 'desc' },
      select: {
        endpoint: true,
        method: true,
        statusCode: true,
        responseTime: true,
        createdAt: true
      }
    });

    
    const endpointStats = await prisma.apiLog.groupBy({
      by: ['endpoint'],
      _count: true,
      orderBy: {
        _count: {
          endpoint: 'desc'
        }
      },
      take: 10
    });

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
          avgResponseTime: Math.round(avgResponseTime._avg.responseTime || 0),
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

/**
 * @desc    Get error logs
 * @route   GET /api/v1/logs/errors
 * @access  Public
 */
const getErrors = async (req, res, next) => {
  try {
    const { page = 1, limit = 20 } = req.query;
    const skip = (parseInt(page) - 1) * parseInt(limit);

    const [errors, total] = await Promise.all([
      prisma.apiLog.findMany({
        where: {
          statusCode: {
            gte: 400
          }
        },
        skip,
        take: parseInt(limit),
        orderBy: { createdAt: 'desc' }
      }),
      prisma.apiLog.count({
        where: {
          statusCode: {
            gte: 400
          }
        }
      })
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

/**
 * @desc    Track custom analytics event
 * @route   POST /api/v1/logs/track
 * @access  Public
 */
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

    
    const log = await prisma.apiLog.create({
      data: {
        endpoint: `/track/${event}`,
        method: 'TRACK',
        statusCode: 200,
        responseTime: 0,
        ipAddress: req.ip,
        userAgent: req.get('user-agent'),
        errorMessage: JSON.stringify(data)
      }
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

/**
 * @desc    Get API logs with filters
 * @route   GET /api/v1/logs
 * @access  Public
 */
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
    if (endpoint) where.endpoint = { contains: endpoint };
    if (method) where.method = method;
    if (statusCode) where.statusCode = parseInt(statusCode);
    if (startDate || endDate) {
      where.createdAt = {};
      if (startDate) where.createdAt.gte = new Date(startDate);
      if (endDate) where.createdAt.lte = new Date(endDate);
    }

    const skip = (parseInt(page) - 1) * parseInt(limit);

    const [logs, total] = await Promise.all([
      prisma.apiLog.findMany({
        where,
        skip,
        take: parseInt(limit),
        orderBy: { createdAt: 'desc' }
      }),
      prisma.apiLog.count({ where })
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