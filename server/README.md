# Adventure Triangle API

## 🏔️ Overview

Official backend API for Adventure Triangle's pre-launch platform. This API powers user registrations, partner onboarding, event management, and comprehensive logging for the world's first global adventure ecosystem.

**Live API:** `https://your-deployment-url.railway.app`  
**Documentation:** `https://your-deployment-url.railway.app/api/docs`

## ✨ Features

- **User Registration System** - Beta user signups with email verification
- **Partner Onboarding** - Adventure partner application management
- **Event Registration** - Launch event RSVP system
- **Advanced Logging** - Comprehensive request/error tracking and analytics
- **Email Notifications** - Automated confirmations via SendGrid
- **Rate Limiting** - DDoS protection (100 requests/hour per IP)
- **Input Validation** - Zod schemas with detailed error messages
- **Database Persistence** - PostgreSQL with Prisma ORM
- **API Documentation** - Interactive Swagger UI
- **Health Monitoring** - Status endpoints for uptime tracking
- **CORS Enabled** - Secure cross-origin resource sharing
- **Error Handling** - Standardized error responses
- **Security Headers** - Helmet.js protection

## 🛠️ Tech Stack

- **Runtime:** Node.js 20+
- **Framework:** Express.js
- **Database:** PostgreSQL 15+
- **ORM:** Prisma
- **Validation:** Zod
- **Documentation:** Swagger/OpenAPI
- **Email:** SendGrid
- **Security:** Helmet, CORS, express-rate-limit
- **Logging:** Winston
- **Testing:** Jest + Supertest
- **Deployment:** Railway / Render

## 📁 Project Structure

```
adventure-triangle-api/
├── src/
│   ├── config/
│   │   ├── database.js       # Database configuration
│   │   ├── email.js          # Email service config
│   │   └── swagger.js        # API documentation config
│   ├── controllers/
│   │   ├── userController.js
│   │   ├── partnerController.js
│   │   ├── eventController.js
│   │   └── logController.js
│   ├── middleware/
│   │   ├── errorHandler.js   # Global error handling
│   │   ├── logger.js         # Request logging
│   │   ├── rateLimiter.js    # Rate limiting
│   │   └── validator.js      # Input validation
│   ├── models/               # Prisma schema
│   ├── routes/
│   │   ├── userRoutes.js
│   │   ├── partnerRoutes.js
│   │   ├── eventRoutes.js
│   │   └── logRoutes.js
│   ├── services/
│   │   ├── emailService.js   # Email templates & sending
│   │   └── logService.js     # Logging business logic
│   ├── utils/
│   │   ├── validators.js     # Zod schemas
│   │   └── helpers.js        # Utility functions
│   └── app.js                # Express app setup
├── prisma/
│   ├── schema.prisma         # Database schema
│   └── migrations/           # Database migrations
├── tests/
│   ├── users.test.js
│   ├── partners.test.js
│   └── events.test.js
├── logs/                     # Application logs
├── postman/
│   └── Adventure_Triangle.postman_collection.json
├── .env.example
├── .gitignore
├── docker-compose.yml
├── Dockerfile
├── package.json
└── README.md
```

## 🚀 Quick Start

### Prerequisites

- Node.js 20+ installed
- PostgreSQL 15+ installed
- SendGrid account (free tier works)
- Git installed

### Installation

```bash
# Clone the repository
git clone https://github.com/yourusername/adventure-triangle-api.git
cd adventure-triangle-api

# Install dependencies
npm install

# Setup environment variables
cp .env.example .env
# Edit .env with your configurations

# Setup database
npx prisma migrate dev
npx prisma generate

# Seed sample data (optional)
npm run seed

# Start development server
npm run dev
```

The API will be running at `http://localhost:3000`

## 🔧 Environment Variables

Create a `.env` file in the root directory:

```env
# Server
NODE_ENV=development
PORT=3000
API_VERSION=v1

# Database
DATABASE_URL="postgresql://username:password@localhost:5432/adventure_triangle?schema=public"

# SendGrid Email
SENDGRID_API_KEY=your_sendgrid_api_key
FROM_EMAIL=noreply@adventuretriangle.com
FROM_NAME="Adventure Triangle"

# Security
RATE_LIMIT_WINDOW_MS=3600000
RATE_LIMIT_MAX_REQUESTS=100

# Frontend URL (for CORS)
FRONTEND_URL=http://localhost:3001

# Logging
LOG_LEVEL=info
```

## 📡 API Endpoints

### Base URL: `/api/v1`

### User Registration

```http
POST /api/v1/users/register
Content-Type: application/json

{
  "fullName": "John Doe",
  "email": "john@example.com",
  "phone": "+1234567890",
  "adventureInterests": ["water", "air"],
  "experienceLevel": "intermediate",
  "location": "California, USA",
  "hearAboutUs": "Social Media"
}

Response: 201 Created
{
  "success": true,
  "message": "Registration successful! Check your email for verification.",
  "data": {
    "userId": "clx123...",
    "email": "john@example.com",
    "fullName": "John Doe"
  }
}
```

### Partner Onboarding

```http
POST /api/v1/partners/register
Content-Type: application/json

{
  "companyName": "Ocean Adventures Co",
  "contactPerson": "Jane Smith",
  "email": "jane@oceanadventures.com",
  "phone": "+1234567890",
  "businessType": "tour_operator",
  "adventureTypes": ["water"],
  "location": "Miami, FL",
  "website": "https://oceanadventures.com",
  "description": "Premier water sports operator"
}

Response: 201 Created
{
  "success": true,
  "message": "Partner application submitted successfully!",
  "data": {
    "partnerId": "clx456...",
    "status": "pending"
  }
}
```

### Event Registration

```http
POST /api/v1/events/register
Content-Type: application/json

{
  "fullName": "Mike Johnson",
  "email": "mike@example.com",
  "phone": "+1234567890",
  "attendeeType": "user",
  "dietaryRestrictions": "Vegetarian"
}

Response: 201 Created
{
  "success": true,
  "message": "Event registration confirmed!",
  "data": {
    "registrationId": "clx789...",
    "eventDate": "2025-02-15"
  }
}
```

### Get Registration Statistics

```http
GET /api/v1/logs/stats

Response: 200 OK
{
  "success": true,
  "data": {
    "totalUsers": 150,
    "totalPartners": 25,
    "totalEventRegistrations": 80,
    "apiCalls": 1250,
    "avgResponseTime": 145
  }
}
```

### Health Check

```http
GET /api/v1/health

Response: 200 OK
{
  "status": "healthy",
  "timestamp": "2025-01-15T10:30:00Z",
  "database": "connected",
  "uptime": 3600
}
```

## 📊 Database Schema

### Users Table
- `id` - UUID primary key
- `fullName` - User's full name
- `email` - Unique email address
- `phone` - Optional phone number
- `adventureInterests` - Array of interests
- `experienceLevel` - beginner/intermediate/advanced
- `location` - Geographic location
- `hearAboutUs` - Marketing channel
- `emailVerified` - Boolean verification status
- `verificationToken` - Email verification token
- `createdAt` - Registration timestamp
- `updatedAt` - Last update timestamp

### Partners Table
- `id` - UUID primary key
- `companyName` - Business name
- `contactPerson` - Primary contact
- `email` - Unique business email
- `phone` - Contact number
- `businessType` - Type of adventure business
- `adventureTypes` - Array of adventure categories
- `location` - Business location
- `website` - Optional website URL
- `description` - Business description
- `status` - pending/approved/rejected
- `createdAt` - Application timestamp
- `updatedAt` - Last update timestamp

### Event Registrations Table
- `id` - UUID primary key
- `fullName` - Attendee name
- `email` - Contact email
- `phone` - Contact number
- `attendeeType` - user/partner/investor/media
- `dietaryRestrictions` - Optional dietary needs
- `confirmed` - Confirmation status
- `createdAt` - Registration timestamp

### API Logs Table
- `id` - UUID primary key
- `endpoint` - API endpoint called
- `method` - HTTP method
- `statusCode` - Response status
- `responseTime` - Response time in ms
- `ipAddress` - Client IP
- `userAgent` - Client user agent
- `errorMessage` - Optional error details
- `createdAt` - Log timestamp

## 🧪 Testing

```bash
# Run all tests
npm test

# Run tests with coverage
npm run test:coverage

# Run tests in watch mode
npm run test:watch
```

## 🐳 Docker Deployment

```bash
# Build and run with Docker Compose
docker-compose up -d

# Stop containers
docker-compose down

# View logs
docker-compose logs -f api
```

## 🚢 Deployment

### Railway.app (Recommended)

1. Create account at railway.app
2. Install Railway CLI: `npm install -g @railway/cli`
3. Login: `railway login`
4. Initialize: `railway init`
5. Add PostgreSQL: `railway add postgresql`
6. Deploy: `railway up`
7. Set environment variables in Railway dashboard

### Render.com

1. Connect GitHub repository
2. Create Web Service
3. Add PostgreSQL database
4. Set environment variables
5. Deploy automatically on push

## 📝 API Documentation

Interactive API documentation available at:
- Development: `http://localhost:3000/api/docs`
- Production: `https://your-app.railway.app/api/docs`

## 🔐 Security Features

- **Rate Limiting:** 100 requests/hour per IP
- **CORS:** Configured for frontend domain
- **Helmet:** Security headers enabled
- **Input Validation:** Zod schema validation
- **SQL Injection:** Protected via Prisma ORM
- **XSS Prevention:** Input sanitization
- **Error Masking:** Generic errors in production

## 📈 Monitoring & Logs

Logs are stored in:
- `logs/combined.log` - All logs
- `logs/error.log` - Error logs only

Log format:
```json
{
  "timestamp": "2025-01-15T10:30:00Z",
  "level": "info",
  "message": "Request processed",
  "endpoint": "/api/v1/users/register",
  "method": "POST",
  "statusCode": 201,
  "responseTime": 145
}
```

## 🎯 Performance

- Average response time: < 200ms
- Database queries optimized with Prisma
- Connection pooling enabled
- Graceful shutdown handling

## 🤝 Contributing

This is an assignment project. For questions:
- Email: support@adventuretriangle.com
- Slack: #adventure-triangle (coming soon)

## 📄 License

Proprietary - Adventure Triangle 2025

## 👨‍💻 Author

**Your Name**  
Email: your.email@example.com  
GitHub: github.com/yourusername  
LinkedIn: linkedin.com/in/yourprofile

---

## 🎉 Why I Want to Join Adventure Triangle

I'm passionate about building technology that enables real-world experiences. Growing up, I always dreamed of exploring the world but lacked access to organized adventure opportunities. Adventure Triangle's mission to democratize access to water, air, and land adventures resonates deeply with me.

This assignment excited me because it's not just about building an API—it's about creating the foundation for a global movement. Every line of code I wrote represents a future adventurer discovering their passion, a partner growing their business, or a community coming together.

I bring technical excellence, ownership mentality, and genuine enthusiasm for Adventure Triangle's vision. I'm ready to help build the infrastructure that will power thousands of life-changing adventures worldwide. #FeelTheAdventure

---

**Built with ❤️ for Adventure Triangle**