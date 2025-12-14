const express = require('express');
const { registerUser, verifyEmail, getUserStats } = require('../controllers/userController');
const { validate } = require('../middleware/validator');
const { userRegistrationSchema } = require('../utils/validators');

const router = express.Router();

/**
 * @swagger
 * /api/v1/users/register:
 *   post:
 *     summary: Register a new user
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - fullName
 *               - email
 *               - adventureInterests
 *               - experienceLevel
 *               - location
 *               - hearAboutUs
 *             properties:
 *               fullName:
 *                 type: string
 *               email:
 *                 type: string
 *               phone:
 *                 type: string
 *               adventureInterests:
 *                 type: array
 *                 items:
 *                   type: string
 *               experienceLevel:
 *                 type: string
 *               location:
 *                 type: string
 *               hearAboutUs:
 *                 type: string
 *     responses:
 *       201:
 *         description: User registered successfully
 *       409:
 *         description: User already exists
 */
router.post('/register', validate(userRegistrationSchema), registerUser);

/**
 * @swagger
 * /api/v1/users/verify/{token}:
 *   get:
 *     summary: Verify user email
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: token
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Email verified successfully
 *       404:
 *         description: Invalid token
 */
router.get('/verify/:token', verifyEmail);

/**
 * @swagger
 * /api/v1/users/stats:
 *   get:
 *     summary: Get user statistics
 *     tags: [Users]
 *     responses:
 *       200:
 *         description: User statistics retrieved successfully
 */
router.get('/stats', getUserStats);

module.exports = router;