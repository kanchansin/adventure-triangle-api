const swaggerJsdoc = require('swagger-jsdoc');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Adventure Triangle API',
      version: '1.0.0',
      description: 'Official backend API for Adventure Triangle pre-launch platform. Powers user registrations, partner onboarding, event management, and comprehensive logging for the world\'s first global adventure ecosystem.',
      contact: {
        name: 'Adventure Triangle',
        email: 'support@adventuretriangle.com',
        url: 'https://adventuretriangle.com'
      },
      license: {
        name: 'Proprietary',
        url: 'https://adventuretriangle.com/license'
      }
    },
    servers: [
      {
        url: process.env.NODE_ENV === 'production' 
          ? 'https://your-production-url.railway.app' 
          : 'http://localhost:3000',
        description: process.env.NODE_ENV === 'production' ? 'Production server' : 'Development server'
      }
    ],
    tags: [
      {
        name: 'Users',
        description: 'Beta user registration and management'
      },
      {
        name: 'Partners',
        description: 'Adventure partner onboarding and management'
      },
      {
        name: 'Events',
        description: 'Launch event registration and management'
      },
      {
        name: 'Logs',
        description: 'API logging and analytics'
      }
    ],
    components: {
      schemas: {
        User: {
          type: 'object',
          properties: {
            id: { type: 'string', format: 'uuid' },
            fullName: { type: 'string' },
            email: { type: 'string', format: 'email' },
            phone: { type: 'string' },
            adventureInterests: { 
              type: 'array', 
              items: { type: 'string', enum: ['water', 'air', 'land'] }
            },
            experienceLevel: { 
              type: 'string', 
              enum: ['beginner', 'intermediate', 'advanced'] 
            },
            location: { type: 'string' },
            hearAboutUs: { type: 'string' },
            emailVerified: { type: 'boolean' },
            createdAt: { type: 'string', format: 'date-time' }
          }
        },
        Partner: {
          type: 'object',
          properties: {
            id: { type: 'string', format: 'uuid' },
            companyName: { type: 'string' },
            contactPerson: { type: 'string' },
            email: { type: 'string', format: 'email' },
            phone: { type: 'string' },
            businessType: { 
              type: 'string', 
              enum: ['tour_operator', 'equipment_rental', 'accommodation', 'training_center', 'other'] 
            },
            adventureTypes: { 
              type: 'array', 
              items: { type: 'string', enum: ['water', 'air', 'land'] }
            },
            location: { type: 'string' },
            website: { type: 'string', format: 'uri' },
            description: { type: 'string' },
            status: { 
              type: 'string', 
              enum: ['pending', 'approved', 'rejected'] 
            },
            createdAt: { type: 'string', format: 'date-time' }
          }
        },
        EventRegistration: {
          type: 'object',
          properties: {
            id: { type: 'string', format: 'uuid' },
            fullName: { type: 'string' },
            email: { type: 'string', format: 'email' },
            phone: { type: 'string' },
            attendeeType: { 
              type: 'string', 
              enum: ['user', 'partner', 'investor', 'media'] 
            },
            dietaryRestrictions: { type: 'string' },
            confirmed: { type: 'boolean' },
            createdAt: { type: 'string', format: 'date-time' }
          }
        },
        Error: {
          type: 'object',
          properties: {
            success: { type: 'boolean', example: false },
            error: {
              type: 'object',
              properties: {
                code: { type: 'string' },
                message: { type: 'string' },
                details: { type: 'object' }
              }
            }
          }
        },
        Success: {
          type: 'object',
          properties: {
            success: { type: 'boolean', example: true },
            message: { type: 'string' },
            data: { type: 'object' }
          }
        }
      }
    }
  },
  apis: ['./src/routes/*.js']
};

const swaggerSpec = swaggerJsdoc(options);

module.exports = swaggerSpec;