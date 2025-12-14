# Adventure Triangle

[![Node.js Version](https://img.shields.io/badge/node-%3E%3D20.0.0-brightgreen)](https://nodejs.org/)
[![Next.js Version](https://img.shields.io/badge/next-%5E14.0.0-black)](https://nextjs.org/)
[![Express Version](https://img.shields.io/badge/express-%5E4.18.2-blue)](https://expressjs.com/)
[![MongoDB](https://img.shields.io/badge/MongoDB-%234ea94b.svg?style=flat&logo=mongodb&logoColor=white)](https://www.mongodb.com/)

**Adventure Triangle** is the world's first global adventure ecosystem. This full-stack application includes a modern frontend built with **Next.js** and a robust Node.js backend. It powers user registrations, partner onboarding, launch event management, and system analytics.

---

## Table of Contents

- [Features](#features)
- [Architecture](#architecture)
- [Tech Stack](#tech-stack)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Backend Setup (Server)](#backend-setup-server)
  - [Frontend Setup (Client)](#frontend-setup-client)
- [API Documentation](#api-documentation)
- [Project Structure](#project-structure)


---

## Features

- **User Management**: Beta user registration with validation for adventure interests and experience levels.
- **Partner Onboarding**: Specialized workflows for adventure operators, equipment rentals, and training centers.
- **Interactive UI**: Responsive frontend built with Next.js and TailwindCSS.
- **Event Orchestration**: Management of launch event registrations.
- **Security & Logging**:
    - **Backend**: `Helmet`, `express-rate-limit`, `Winston` logging, `Zod` validation.
    - **Frontend**: Secure API integration and form handling.
- **Email Integration**: Built-in specialized email services using SendGrid.

---

## Architecture

The application follows a Client-Server architecture with a Next.js frontend and Express backend.

```
┌─────────────────────┐      HTTP / REST API      ┌──────────────────────┐
│   Client / Frontend │ ◄──────────────────────►  │   Backend / Server   │
│   (Next.js)         │                           │   (Node.js + Express)│
│   Port: 3000        │                           │   Port: 5000         │
└─────────────────────┘                           └──────────┬───────────┘
                                                             │
                                                             ▼
                                                  ┌──────────────────────┐
                                                  │     MongoDB Atlas    │
                                                  │      (Database)      │
                                                  └──────────────────────┘
```

---

## Tech Stack

### Frontend
- **Framework**: Next.js (React)
- **Styling**: TailwindCSS
- **State Management**: React Hooks
- **HTTP Client**: Axios/Fetch API

### Backend
- **Runtime**: Node.js (v20+)
- **Framework**: Express.js
- **Database**: MongoDB with Mongoose ODM
- **Validation**: Zod
- **Documentation**: Swagger UI & JSDoc
- **Logging**: Winston

---

## Getting Started

To run the full application, you need to set up and run both the **server** and the **client**.

### Prerequisites

| Requirement | Version |
|-------------|---------|
| Node.js     | ≥ 20.0.0 |
| npm         | ≥ 10.0.0 |
| MongoDB     | Atlas or Local |

### Backend Setup (Server)

1.  **Navigate to the server directory:**
    ```bash
    cd server
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    ```

3.  **Configure Environment:**
    Create a `.env` file in the `server/` directory:
    ```bash
    cp .env.example .env
    ```
    **Required Variables:**
    ```env
    PORT=5000
    DATABASE_URL=mongodb+srv://<user>:<password>@<cluster>.mongodb.net/adventure_triangle
    RATE_LIMIT_WINDOW_MS=3600000
    RATE_LIMIT_MAX_REQUESTS=100
    SENDGRID_API_KEY=SG.your_key_here
    ```

4.  **Start the Server:**
    ```bash
    npm run dev
    ```
    *The server runs on [http://localhost:5000](http://localhost:5000)*

### Frontend Setup (Client)

1.  **Open a new terminal and navigate to the client directory:**
    ```bash
    cd client
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    ```

3.  **Configure Environment:**
    Create a `.env.local` file in the `client/` directory if needed.
    *(Note: The Next.js proxy is configured to look for the backend at http://localhost:5000)*

4.  **Start the Client:**
    ```bash
    npm run dev
    ```
    *The frontend runs on [http://localhost:3000](http://localhost:3000)*

---

## API Documentation

The backend includes fully interactive Swagger UI documentation.

*   **Swagger UI**: [http://localhost:5000/api-docs](http://localhost:5000/api-docs)
*   **Postman Collection**: [View Documentation](https://documenter.getpostman.com/view/40737737/2sB3dTs84S)

### Core Endpoints
*   `GET /`: Welcome & API Index
*   `GET /api/v1/health`: System status check
*   `POST /api/v1/users/register`: Register a new adventurer
*   `POST /api/v1/partners/register`: Onboard a new partner
*   `POST /api/v1/events/register`: Sign up for launch events

---

## Project Structure

```
adventure-triangle-api/
├── client/             # Frontend Next.js application
│   ├── app/
│   ├── public/
│   ├── next.config.ts
│   └── package.json
├── server/             # Backend Node.js application
│   ├── src/
│   │   ├── config/     # DB & Swagger config
│   │   ├── routes/     # API routes
│   │   └── server.js   # Entry point
│   ├── .env.example
│   └── package.json
└── README.md           # Main project documentation
```

---
