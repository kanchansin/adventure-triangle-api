const express = require('express');
const { getStats, getErrors, trackEvent, getLogs } = require('../controllers/logController');

const router = express.Router();

/**
 * @swagger
 * /api/v1/logs/stats:
 *   get:
 *     summary: Get comprehensive statistics
 *     tags: [Logs]
 *     responses:
 *       200:
 *         description: Statistics retrieved successfully
 */
router.get('/stats', getStats);

/**
 * @swagger
 * /api/v1/logs/errors:
 *   get:
 *     summary: Get error logs
 *     tags: [Logs]
 *     parameters:
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
 *         description: Error logs retrieved successfully
 */
router.get('/errors', getErrors);

/**
 * @swagger
 * /api/v1/logs/track:
 *   post:
 *     summary: Track custom analytics event
 *     tags: [Logs]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               event:
 *                 type: string
 *               data:
 *                 type: object
 *     responses:
 *       200:
 *         description: Event tracked successfully
 */
router.post('/track', trackEvent);

/**
 * @swagger
 * /api/v1/logs:
 *   get:
 *     summary: Get API logs with filters
 *     tags: [Logs]
 *     parameters:
 *       - in: query
 *         name: endpoint
 *         schema:
 *           type: string
 *       - in: query
 *         name: method
 *         schema:
 *           type: string
 *       - in: query
 *         name: statusCode
 *         schema:
 *           type: integer
 *       - in: query
 *         name: startDate
 *         schema:
 *           type: string
 *       - in: query
 *         name: endDate
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
 *         description: Logs retrieved successfully
 */
router.get('/', getLogs);

module.exports = router;