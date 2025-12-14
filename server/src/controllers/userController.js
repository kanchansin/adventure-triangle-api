const User = require('../models/User');
const { v4: uuidv4 } = require('uuid');
const { sendEmail } = require('../services/emailService');
const { logger } = require('../middleware/logger');

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

    const existingUser = await User.findOne({ email });

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

    const user = await User.create({
      fullName,
      email,
      phone,
      adventureInterests,
      experienceLevel,
      location,
      hearAboutUs,
      verificationToken
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

const verifyEmail = async (req, res, next) => {
  try {
    const { token } = req.params;

    const user = await User.findOne({ verificationToken: token });

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

    user.emailVerified = true;
    user.verificationToken = null;
    await user.save();

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

const getUserStats = async (req, res, next) => {
  try {
    const totalUsers = await User.countDocuments();
    const verifiedUsers = await User.countDocuments({ emailVerified: true });

    const usersByExperience = await User.aggregate([
      {
        $group: {
          _id: '$experienceLevel',
          count: { $sum: 1 }
        }
      }
    ]);

    const recentUsers = await User.find()
      .sort({ createdAt: -1 })
      .limit(5)
      .select('fullName location experienceLevel createdAt');

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