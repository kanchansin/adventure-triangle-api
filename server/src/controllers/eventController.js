const EventRegistration = require('../models/EventRegistration');
const { sendEmail } = require('../services/emailService');
const { logger } = require('../middleware/logger');

const registerForEvent = async (req, res, next) => {
  try {
    const {
      fullName,
      email,
      phone,
      attendeeType,
      dietaryRestrictions
    } = req.body;

    const existingRegistration = await EventRegistration.findOne({ email });

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

    const registration = await EventRegistration.create({
      fullName,
      email,
      phone,
      attendeeType,
      dietaryRestrictions,
      confirmed: true
    });

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

const getAllRegistrations = async (req, res, next) => {
  try {
    const { attendeeType, page = 1, limit = 20 } = req.query;

    const where = {};
    if (attendeeType) where.attendeeType = attendeeType;

    const skip = (parseInt(page) - 1) * parseInt(limit);

    const [registrations, total] = await Promise.all([
      EventRegistration.find(where)
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(parseInt(limit)),
      EventRegistration.countDocuments(where)
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

const getEventStats = async (req, res, next) => {
  try {
    const totalRegistrations = await EventRegistration.countDocuments();
    const confirmedRegistrations = await EventRegistration.countDocuments({
      confirmed: true
    });

    const registrationsByType = await EventRegistration.aggregate([
      {
        $group: {
          _id: '$attendeeType',
          count: { $sum: 1 }
        }
      }
    ]);

    const recentRegistrations = await EventRegistration.find()
      .sort({ createdAt: -1 })
      .limit(10)
      .select('fullName attendeeType createdAt');

    const withDietary = await EventRegistration.countDocuments({
      dietaryRestrictions: { $ne: null }
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

const cancelRegistration = async (req, res, next) => {
  try {
    const { id } = req.params;

    const registration = await EventRegistration.findByIdAndDelete(id);

    if (!registration) {
      return res.status(404).json({
        success: false,
        error: {
          code: 'REGISTRATION_NOT_FOUND',
          message: 'Registration not found'
        }
      });
    }

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
    next(error);
  }
};

module.exports = {
  registerForEvent,
  getAllRegistrations,
  getEventStats,
  cancelRegistration
};