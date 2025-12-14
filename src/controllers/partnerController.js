const { PrismaClient } = require('@prisma/client');
const { sendEmail } = require('../services/emailService');
const { logger } = require('../middleware/logger');

const prisma = new PrismaClient();

/**
 * @desc    Register a new partner
 * @route   POST /api/v1/partners/register
 * @access  Public
 */
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

    
    const existingPartner = await prisma.partner.findUnique({
      where: { email }
    });

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

    
    const partner = await prisma.partner.create({
      data: {
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
      }
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

/**
 * @desc    Get all partners (for admin dashboard)
 * @route   GET /api/v1/partners
 * @access  Public (should be protected in production)
 */
const getAllPartners = async (req, res, next) => {
  try {
    const { status, businessType, page = 1, limit = 10 } = req.query;

    const where = {};
    if (status) where.status = status;
    if (businessType) where.businessType = businessType;

    const skip = (parseInt(page) - 1) * parseInt(limit);

    const [partners, total] = await Promise.all([
      prisma.partner.findMany({
        where,
        skip,
        take: parseInt(limit),
        orderBy: { createdAt: 'desc' }
      }),
      prisma.partner.count({ where })
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

/**
 * @desc    Get partner statistics
 * @route   GET /api/v1/partners/stats
 * @access  Public
 */
const getPartnerStats = async (req, res, next) => {
  try {
    const totalPartners = await prisma.partner.count();
    
    const partnersByStatus = await prisma.partner.groupBy({
      by: ['status'],
      _count: true
    });

    const partnersByType = await prisma.partner.groupBy({
      by: ['businessType'],
      _count: true
    });

    const recentPartners = await prisma.partner.findMany({
      take: 5,
      orderBy: { createdAt: 'desc' },
      select: {
        companyName: true,
        location: true,
        businessType: true,
        status: true,
        createdAt: true
      }
    });

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

/**
 * @desc    Update partner status (for admin)
 * @route   PATCH /api/v1/partners/:id/status
 * @access  Public (should be protected in production)
 */
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

    const partner = await prisma.partner.update({
      where: { id },
      data: { status }
    });

    
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
    if (error.code === 'P2025') {
      return res.status(404).json({
        success: false,
        error: {
          code: 'PARTNER_NOT_FOUND',
          message: 'Partner not found'
        }
      });
    }
    next(error);
  }
};

module.exports = {
  registerPartner,
  getAllPartners,
  getPartnerStats,
  updatePartnerStatus
};