const { PrismaClient } = require('@prisma/client');
const { v4: uuidv4 } = require('uuid');
const { sendEmail } = require('../services/emailService');
const { logger } = require('../middleware/logger');

const prisma = new PrismaClient();

/**
 * @desc    Register a new user
 * @route   POST /api/v1/users/register
 * @access  Public
 */
const registerUser = async (req, res, next) => {
  try {
    const {
      fullName,
      email,
      phone,
      adventureInterests,
      experienceLevel,
      location,
      hearAboutUs
    } = req.body;

    
    const existingUser = await prisma.user.findUnique({
      where: { email }
    });

    if (existingUser) {
      return res.status(409).json({
        success: false,
        error: {
          code: 'DUPLICATE_EMAIL',
          message: 'A user with this email already exists',
          field: 'email'
        }
      });
    }

    
    const verificationToken = uuidv4();

    
    const user = await prisma.user.create({
      data: {
        fullName,
        email,
        phone,
        adventureInterests,
        experienceLevel,
        location,
        hearAboutUs,
        verificationToken
      }
    });

    
    try {
      await sendEmail({
        to: email,
        subject: 'Welcome to Adventure Triangle! 🏔️',
        template: 'userWelcome',
        data: {
          name: fullName,
          verificationToken,
          adventureInterests: adventureInterests.join(', ')
        }
      });
    } catch (emailError) {
      logger.error('Failed to send welcome email:', emailError);
      
    }

    logger.info(`New user registered: ${email}`);

    res.status(201).json({
      success: true,
      message: 'Registration successful! Check your email for verification.',
      data: {
        userId: user.id,
        email: user.email,
        fullName: user.fullName,
        experienceLevel: user.experienceLevel
      }
    });

  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Verify user email
 * @route   GET /api/v1/users/verify/:token
 * @access  Public
 */
const verifyEmail = async (req, res, next) => {
  try {
    const { token } = req.params;

    const user = await prisma.user.findUnique({
      where: { verificationToken: token }
    });

    if (!user) {
      return res.status(404).json({
        success: false,
        error: {
          code: 'INVALID_TOKEN',
          message: 'Invalid or expired verification token'
        }
      });
    }

    if (user.emailVerified) {
      return res.status(400).json({
        success: false,
        error: {
          code: 'ALREADY_VERIFIED',
          message: 'Email has already been verified'
        }
      });
    }

    
    await prisma.user.update({
      where: { id: user.id },
      data: {
        emailVerified: true,
        verificationToken: null
      }
    });

    logger.info(`Email verified for user: ${user.email}`);

    res.status(200).json({
      success: true,
      message: 'Email verified successfully! Welcome to Adventure Triangle.',
      data: {
        userId: user.id,
        email: user.email
      }
    });

  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Get user statistics
 * @route   GET /api/v1/users/stats
 * @access  Public
 */
const getUserStats = async (req, res, next) => {
  try {
    const totalUsers = await prisma.user.count();
    const verifiedUsers = await prisma.user.count({
      where: { emailVerified: true }
    });

    const usersByExperience = await prisma.user.groupBy({
      by: ['experienceLevel'],
      _count: true
    });

    const recentUsers = await prisma.user.findMany({
      take: 5,
      orderBy: { createdAt: 'desc' },
      select: {
        fullName: true,
        location: true,
        experienceLevel: true,
        createdAt: true
      }
    });

    res.status(200).json({
      success: true,
      data: {
        totalUsers,
        verifiedUsers,
        unverifiedUsers: totalUsers - verifiedUsers,
        usersByExperience,
        recentUsers
      }
    });

  } catch (error) {
    next(error);
  }
};

module.exports = {
  registerUser,
  verifyEmail,
  getUserStats
};