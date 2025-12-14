const { PrismaClient } = require('@prisma/client');
const { sendEmail } = require('../services/emailService');
const { logger } = require('../middleware/logger');

const prisma = new PrismaClient();

/**
 * @desc    Register for launch event
 * @route   POST /api/v1/events/register
 * @access  Public
 */
const registerForEvent = async (req, res, next) => {
  try {
    const {
      fullName,
      email,
      phone,
      attendeeType,
      dietaryRestrictions
    } = req.body;

    // Check if already registered
    const existingRegistration = await prisma.eventRegistration.findFirst({
      where: { email }
    });

    if (existingRegistration) {
      return res.status(409).json({
        success: false,
        error: {
          code: 'ALREADY_REGISTERED',
          message: 'You have already registered for this event',
          field: 'email'
        }
      });
    }

    // Create event registration
    const registration = await prisma.eventRegistration.create({
      data: {
        fullName,
        email,
        phone,
        attendeeType,
        dietaryRestrictions,
        confirmed: true
      }
    });

    // Send confirmation email
    try {
      await sendEmail({
        to: email,
        subject: '🎉 Launch Event Registration Confirmed - Adventure Triangle',
        template: 'eventConfirmation',
        data: {
          fullName,
          attendeeType,
          eventDate: 'February 15, 2025',
          eventTime: '6:00 PM - 9:00 PM',
          location: 'Virtual Event (Link will be sent closer to date)'
        }
      });
    } catch (emailError) {
      logger.error('Failed to send event confirmation email:', emailError);
    }

    logger.info(`New event registration: ${fullName} (${email})`);

    res.status(201).json({
      success: true,
      message: 'Event registration confirmed! Check your email for details.',
      data: {
        registrationId: registration.id,
        fullName: registration.fullName,
        attendeeType: registration.attendeeType,
        eventDate: '2025-02-15',
        confirmed: registration.confirmed
      }
    });

  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Get all event registrations
 * @route   GET /api/v1/events/registrations
 * @access  Public (should be protected in production)
 */
const getAllRegistrations = async (req, res, next) => {
  try {
    const { attendeeType, page = 1, limit = 20 } = req.query;

    const where = {};
    if (attendeeType) where.attendeeType = attendeeType;

    const skip = (parseInt(page) - 1) * parseInt(limit);

    const [registrations, total] = await Promise.all([
      prisma.eventRegistration.findMany({
        where,
        skip,
        take: parseInt(limit),
        orderBy: { createdAt: 'desc' }
      }),
      prisma.eventRegistration.count({ where })
    ]);

    res.status(200).json({
      success: true,
      data: {
        registrations,
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
 * @desc    Get event statistics
 * @route   GET /api/v1/events/stats
 * @access  Public
 */
const getEventStats = async (req, res, next) => {
  try {
    const totalRegistrations = await prisma.eventRegistration.count();
    const confirmedRegistrations = await prisma.eventRegistration.count({
      where: { confirmed: true }
    });

    const registrationsByType = await prisma.eventRegistration.groupBy({
      by: ['attendeeType'],
      _count: true
    });

    const recentRegistrations = await prisma.eventRegistration.findMany({
      take: 10,
      orderBy: { createdAt: 'desc' },
      select: {
        fullName: true,
        attendeeType: true,
        createdAt: true
      }
    });

    // Calculate dietary restrictions breakdown
    const withDietary = await prisma.eventRegistration.count({
      where: {
        dietaryRestrictions: {
          not: null
        }
      }
    });

    res.status(200).json({
      success: true,
      data: {
        totalRegistrations,
        confirmedRegistrations,
        registrationsByType,
        dietaryRestrictionsCount: withDietary,
        recentRegistrations
      }
    });

  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Cancel event registration
 * @route   DELETE /api/v1/events/registrations/:id
 * @access  Public
 */
const cancelRegistration = async (req, res, next) => {
  try {
    const { id } = req.params;

    const registration = await prisma.eventRegistration.delete({
      where: { id }
    });

    // Send cancellation email
    try {
      await sendEmail({
        to: registration.email,
        subject: 'Event Registration Cancelled - Adventure Triangle',
        template: 'eventCancellation',
        data: {
          fullName: registration.fullName
        }
      });
    } catch (emailError) {
      logger.error('Failed to send cancellation email:', emailError);
    }

    logger.info(`Event registration cancelled: ${registration.email}`);

    res.status(200).json({
      success: true,
      message: 'Event registration cancelled successfully',
      data: {
        registrationId: registration.id
      }
    });

  } catch (error) {
    if (error.code === 'P2025') {
      return res.status(404).json({
        success: false,
        error: {
          code: 'REGISTRATION_NOT_FOUND',
          message: 'Registration not found'
        }
      });
    }
    next(error);
  }
};

module.exports = {
  registerForEvent,
  getAllRegistrations,
  getEventStats,
  cancelRegistration
};