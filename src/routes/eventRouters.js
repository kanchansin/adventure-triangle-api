const express = require('express');
const { 
  registerForEvent, 
  getAllRegistrations, 
  getEventStats, 
  cancelRegistration 
} = require('../controllers/eventController');
const { validate } = require('../middleware/validator');
const { eventRegistrationSchema } = require('../utils/validators');

const router = express.Router();

/**
 * @swagger
 * /api/v1/events/register:
 *   post:
 *     summary: Register for launch event
 *     tags: [Events]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - fullName
 *               - email
 *               - phone
 *               - attendeeType
 *             properties:
 *               fullName:
 *                 type: string
 *               email:
 *                 type: string
 *               phone:
 *                 type: string
 *               attendeeType:
 *                 type: string
 *               dietaryRestrictions:
 *                 type: string
 *     responses:
 *       201:
 *         description: Event registration successful
 *       409:
 *         description: Already registered
 */
router.post('/register', validate(eventRegistrationSchema), registerForEvent);

/**
 * @swagger
 * /api/v1/events/registrations:
 *   get:
 *     summary: Get all event registrations
 *     tags: [Events]
 *     parameters:
 *       - in: query
 *         name: attendeeType
 *         schema:
 *           type: string
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Registrations retrieved successfully
 */
router.get('/registrations', getAllRegistrations);

/**
 * @swagger
 * /api/v1/events/stats:
 *   get:
 *     summary: Get event statistics
 *     tags: [Events]
 *     responses:
 *       200:
 *         description: Event statistics retrieved successfully
 */
router.get('/stats', getEventStats);

/**
 * @swagger
 * /api/v1/events/registrations/{id}:
 *   delete:
 *     summary: Cancel event registration
 *     tags: [Events]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Registration cancelled successfully
 *       404:
 *         description: Registration not found
 */
router.delete('/registrations/:id', cancelRegistration);

module.exports = router;