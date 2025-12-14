const Partner = require('../models/Partner');
const { sendEmail } = require('../services/emailService');
const { logger } = require('../middleware/logger');

const registerPartner = async (req, res, next) => {
  try {
    const {
      companyName,
      contactPerson,
      email,
      phone,
      businessType,
      adventureTypes,
      location,
      website,
      description
    } = req.body;

    const existingPartner = await Partner.findOne({ email });

    if (existingPartner) {
      return res.status(409).json({
        success: false,
        error: {
          code: 'DUPLICATE_EMAIL',
          message: 'A partner with this email already exists',
          field: 'email'
        }
      });
    }

    const partner = await Partner.create({
      companyName,
      contactPerson,
      email,
      phone,
      businessType,
      adventureTypes,
      location,
      website,
      description,
      status: 'pending'
    });

    try {
      await sendEmail({
        to: email,
        subject: 'Partner Application Received - Adventure Triangle',
        template: 'partnerConfirmation',
        data: {
          companyName,
          contactPerson,
          businessType,
          adventureTypes: adventureTypes.join(', ')
        }
      });
    } catch (emailError) {
      logger.error('Failed to send partner confirmation email:', emailError);
    }

    logger.info(`New partner registered: ${companyName} (${email})`);

    res.status(201).json({
      success: true,
      message: 'Partner application submitted successfully! We will review and contact you soon.',
      data: {
        partnerId: partner.id,
        companyName: partner.companyName,
        status: partner.status,
        submittedAt: partner.createdAt
      }
    });

  } catch (error) {
    next(error);
  }
};

const getAllPartners = async (req, res, next) => {
  try {
    const { status, businessType, page = 1, limit = 10 } = req.query;

    const where = {};
    if (status) where.status = status;
    if (businessType) where.businessType = businessType;

    const skip = (parseInt(page) - 1) * parseInt(limit);

    const [partners, total] = await Promise.all([
      Partner.find(where)
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(parseInt(limit)),
      Partner.countDocuments(where)
    ]);

    res.status(200).json({
      success: true,
      data: {
        partners,
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

const getPartnerStats = async (req, res, next) => {
  try {
    const totalPartners = await Partner.countDocuments();

    const partnersByStatus = await Partner.aggregate([
      {
        $group: {
          _id: '$status',
          count: { $sum: 1 }
        }
      }
    ]);

    const partnersByType = await Partner.aggregate([
      {
        $group: {
          _id: '$businessType',
          count: { $sum: 1 }
        }
      }
    ]);

    const recentPartners = await Partner.find()
      .sort({ createdAt: -1 })
      .limit(5)
      .select('companyName location businessType status createdAt');

    res.status(200).json({
      success: true,
      data: {
        totalPartners,
        partnersByStatus,
        partnersByType,
        recentPartners
      }
    });

  } catch (error) {
    next(error);
  }
};

const updatePartnerStatus = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    if (!['pending', 'approved', 'rejected'].includes(status)) {
      return res.status(400).json({
        success: false,
        error: {
          code: 'INVALID_STATUS',
          message: 'Status must be pending, approved, or rejected'
        }
      });
    }

    const partner = await Partner.findByIdAndUpdate(
      id,
      { status },
      { new: true }
    );

    if (!partner) {
      return res.status(404).json({
        success: false,
        error: {
          code: 'PARTNER_NOT_FOUND',
          message: 'Partner not found'
        }
      });
    }

    try {
      await sendEmail({
        to: partner.email,
        subject: `Partner Application ${status.toUpperCase()} - Adventure Triangle`,
        template: 'partnerStatusUpdate',
        data: {
          companyName: partner.companyName,
          status
        }
      });
    } catch (emailError) {
      logger.error('Failed to send status update email:', emailError);
    }

    logger.info(`Partner ${id} status updated to ${status}`);

    res.status(200).json({
      success: true,
      message: `Partner status updated to ${status}`,
      data: {
        partnerId: partner.id,
        companyName: partner.companyName,
        status: partner.status
      }
    });

  } catch (error) {
    next(error);
  }
};

module.exports = {
  registerPartner,
  getAllPartners,
  getPartnerStats,
  updatePartnerStatus
};