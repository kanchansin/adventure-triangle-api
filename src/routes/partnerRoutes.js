const express = require('express');
const { 
  registerPartner, 
  getAllPartners, 
  getPartnerStats, 
  updatePartnerStatus 
} = require('../controllers/partnerController');
const { validate } = require('../middleware/validator');
const { partnerRegistrationSchema } = require('../utils/validators');

const router = express.Router();

/**
 * @swagger
 * /api/v1/partners/register:
 *   post:
 *     summary: Register a new partner
 *     tags: [Partners]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - companyName
 *               - contactPerson
 *               - email
 *               - phone
 *               - businessType
 *               - adventureTypes
 *               - location
 *               - description
 *     responses:
 *       201:
 *         description: Partner registered successfully
 *       409:
 *         description: Partner already exists
 */
router.post('/register', validate(partnerRegistrationSchema), registerPartner);

/**
 * @swagger
 * /api/v1/partners:
 *   get:
 *     summary: Get all partners
 *     tags: [Partners]
 *     parameters:
 *       - in: query
 *         name: status
 *         schema:
 *           type: string
 *       - in: query
 *         name: businessType
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
 *         description: Partners retrieved successfully
 */
router.get('/', getAllPartners);

/**
 * @swagger
 * /api/v1/partners/stats:
 *   get:
 *     summary: Get partner statistics
 *     tags: [Partners]
 *     responses:
 *       200:
 *         description: Partner statistics retrieved successfully
 */
router.get('/stats', getPartnerStats);

/**
 * @swagger
 * /api/v1/partners/{id}/status:
 *   patch:
 *     summary: Update partner status
 *     tags: [Partners]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               status:
 *                 type: string
 *     responses:
 *       200:
 *         description: Partner status updated successfully
 *       404:
 *         description: Partner not found
 */
router.patch('/:id/status', updatePartnerStatus);

module.exports = router;