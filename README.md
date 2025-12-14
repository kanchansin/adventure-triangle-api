# Adventure Triangle - Full Stack Adventure Platform

**The World's First Global Unified Ecosystem for Adventure Seekers.**

Adventure Triangle is a comprehensive full-stack application connecting thrill-seekers with extraordinary experiences across **Water**, **Air**, and **Land**. This repository houses the complete **MERN (MongoDB, Express, React/Next.js, Node.js)** architecture.

![Architecture](https://img.shields.io/badge/Architecture-Full%20Stack-blue)
![Frontend](https://img.shields.io/badge/Frontend-Next.js%2014-black)
![Backend](https://img.shields.io/badge/Backend-Express%20%2B%20MongoDB-green)

---

## Full Stack Architecture

This application is built using a modern **Full Stack MERN** architecture, ensuring seamless communication between the client and server.

- **Frontend (Client)**: Built with **Next.js 14** (React) and **TypeScript** for a responsive, type-safe, and high-performance user interface.
- **Backend (Server)**: Powered by **Node.js** and **Express**, providing a robust RESTful API.
- **Database**: **MongoDB** stores all user, partner, and event data, managed via **Mongoose**.
- **DevOps**: Integrated linting, rigorous type checking, and modern development tooling.

## Project Overview

This project implements a high-performance pre-launch landing page and a robust backend API to manage user interest, partner onboarding, and event registrations.

### Core Features

- ** immersive User Interface**:
  - Dynamic Hero section with particle animations.
  - Interactive "Mission" section exploring the three elements (Water, Air, Land).
  - Glassmorphism design aesthetics using vanilla CSS and modules.
  - responsive layout for all devices.

- **Registration Systems**:
  - **Beta Access**: Multi-step form capturing user adventure interests and experience levels.
  - **Partner Portal**: Onboarding flow for tour operators and guides.
  - **Launch Event**: RSVP system for upcoming physical events.

- **Backend API**:
  - RESTful architecture using Node.js & Express.
  - **Security**: Implemented with Helmet, CORS, and Rate Limiting.
  - **Validation**: Strict request validation using Zod.
  - **Logging**: Comprehensive system logging with Winston.
  - **Database**: MongoDB integration via Mongoose.
  - **Documentation**: Swagger/OpenAPI integration.

---

## Technology Stack

### Client (`/client`)
- **Framework**: [Next.js 16](https://nextjs.org/) (App Router)
- **Language**: TypeScript
- **Styling**: CSS Modules, Global CSS variables
- **State Management**: React Hooks (`useState`, `useEffect`)

### Server (`/server`)
- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: MongoDB (Mongoose ODM)
- **Validation**: Zod
- **Logging**: Winston
- **API Docs**: Swagger UI Express

---

## Getting Started

Follow these instructions to set up the project locally.

### Prerequisites
- Node.js (v20+ recommended)
- MongoDB (Local instance or Atlas connection string)
- npm or yarn

### 1. Server Setup

Navigate to the server directory and install dependencies:

```bash
cd server
npm install
```

Create a `.env` file in the `server` directory:

```env
PORT=5000
MONGO_URI=mongodb://localhost:27017/adventure_triangle
NODE_ENV=development
# Optional: SENDGRID_API_KEY=your_key_here
```

Start the development server:

```bash
npm run dev
```
*The server will start on `http://localhost:5000`.*

### 2. Client Setup

Open a new terminal, navigate to the client directory, and install dependencies:

```bash
cd client
npm install
```

Start the frontend development server:

```bash
npm run dev
```
*The application will be accessible at `http://localhost:3000`.*

---

## Project Structure

```
adventure-triangle-api/
├── client/                 # Next.js Frontend
│   ├── app/
│   │   ├── components/     # Reusable UI components (Hero, About, Forms)
│   │   ├── globals.css     # Global styles & variables
│   │   ├── layout.tsx      # Root layout
│   │   └── page.tsx        # Main entry page
│   └── public/             # Static assets
├── server/                 # Express Backend
│   ├── src/
│   │   ├── controllers/    # Request logic
│   │   ├── models/         # Mongoose schemas
│   │   ├── routes/         # API routes
│   │   └── server.js       # Entry point
│   ├── logs/               # Application logs
│   └── Adventure_Triangle.postman_collection.json # API Tests
└── README.md
```

## API Documentation & Testing

### Swagger UI
Once the server is running, you can access the interactive API documentation at:
`http://localhost:5000/api-docs`

### Postman
A Postman collection is included in `server/Adventure_Triangle.postman_collection.json`. Import this file into Postman to test all endpoints (User Register, Partner Register, Stats, etc.).

---

## Contribution

This project is part of the Adventure Triangle initiative.
**Author**: Kanchan Singh

---

*Built with ❤️ for adventurers worldwide.*