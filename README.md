<div align="center">

# IdeaSpark — Server

### RESTful API Backend for IdeaSpark Platform

A Node.js/Express backend that powers IdeaSpark — handling user authentication, idea management, comments, and community engagement.

[![Server Repo](https://img.shields.io/badge/🖥️_Server_Repo-GitHub-24292e?style=for-the-badge&logo=github)](https://github.com/ziaulhoquepatwary/IdeaSpark-server.git)
[![Client Repo](https://img.shields.io/badge/💻_Client_Repo-GitHub-24292e?style=for-the-badge&logo=github)](https://github.com/ziaulhoquepatwary/IdeaSpark-client.git)
[![Live Demo](https://img.shields.io/badge/🚀_Live_Demo-idea--spark--zeta--wine.vercel.app-4F46E5?style=for-the-badge)](https://idea-spark-zeta-wine.vercel.app)

</div>

---

## 📋 Table of Contents

- [Overview](#-overview)
- [Features](#-features)
- [Tech Stack](#-tech-stack)
- [Getting Started](#-getting-started)
- [Environment Variables](#-environment-variables)
- [Project Structure](#-project-structure)
- [API Endpoints](#-api-endpoints)
- [Middleware](#-middleware)
- [Database Models](#-database-models)
- [Contributing](#-contributing)

---

## 🧩 Overview

IdeaSpark Server is the backend application powering the IdeaSpark platform. It provides secure RESTful APIs for managing users, ideas, and comments — built with Node.js, Express, and MongoDB.

---

## ✨ Features

- **User Authentication** — Secure session-based auth via Better Auth
- **Idea Management** — Full CRUD operations for startup ideas
- **Advanced Filtering** — Filter by category, search by title
- **Sorting & Pagination** — Efficient data handling for large datasets
- **Comments System** — Create and manage comments per idea
- **Protected Routes** — Session-based authorization middleware
- **CORS Support** — Configured for seamless frontend integration

---

## 🛠️ Tech Stack

| Technology | Version | Purpose |
|---|---|---|
| Node.js | v18+ | Runtime environment |
| Express.js | 5.2.1 | Web framework |
| MongoDB + Mongoose | 9.6.2 | Database & ODM |
| Better Auth | 1.6.11 | Authentication |
| Zod | 4.4.3 | Input validation |
| Nodemon | 3.1.14 | Dev auto-reload |
| CORS, Cookie Parser, Dotenv, JWT | — | Utilities |

---

## 🚀 Getting Started

### Prerequisites

- Node.js v18 or higher
- MongoDB instance (local or cloud)
- npm or yarn

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/ziaulhoquepatwary/IdeaSpark-server.git
   cd IdeaSpark-server
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file (see [Environment Variables](#-environment-variables))

### Running the Server

```bash
# Development (with auto-reload)
npm run dev

# Production
npm start
```

The server runs at `http://localhost:5000` by default.

---

## 🔐 Environment Variables

Create a `.env` file in the root directory:

```env
# Server
PORT=5000

# Database
MONGO_URI=mongodb://localhost:27017/ideaspark

# Frontend URL (for CORS)
FRONTEND_URL=https://idea-spark-zeta-wine.vercel.app

# Better Auth secret and any other required auth variables
BETTER_AUTH_SECRET=your_secret_here
```

---

## 📁 Project Structure

```
IdeaSpark-server/
├── src/
│   ├── app.js                        # Express app configuration
│   ├── lib/
│   │   └── auth.js                   # Authentication setup
│   ├── middleware/
│   │   └── requireAuth.js            # Auth middleware
│   └── modules/
│       ├── idea/
│       │   ├── idea.controller.js    # Business logic
│       │   ├── idea.model.js         # Mongoose schema
│       │   ├── idea.routes.js        # Route definitions
│       │   └── idea.validation.js    # Zod validation
│       └── comment/
│           ├── comment.controller.js # Business logic
│           ├── comment.model.js      # Mongoose schema
│           └── comment.routes.js     # Route definitions
├── server.js                         # Entry point
├── package.json
└── README.md
```

---

## 📡 API Endpoints

### Authentication

All auth routes are handled by Better Auth:

```
POST  /api/auth/*    # login, signup, logout, session, etc.
```

---

### Ideas

| Method | Endpoint | Auth | Description |
|---|---|---|---|
| `GET` | `/api/ideas` | Public | Get all ideas (with filters) |
| `POST` | `/api/ideas` | 🔒 Required | Create a new idea |
| `GET` | `/api/ideas/:id` | Public | Get a single idea |
| `PUT` | `/api/ideas/:id` | 🔒 Required | Update an idea |
| `DELETE` | `/api/ideas/:id` | 🔒 Required | Delete an idea |

#### `GET /api/ideas` — Query Parameters

| Parameter | Default | Description |
|---|---|---|
| `page` | `1` | Page number |
| `limit` | `12` | Items per page |
| `search` | — | Search by title |
| `category` | — | Filter by category (e.g. `AI`, `SaaS`, `Web3`) |
| `sortBy` | `createdAt` | Field to sort by |
| `order` | `desc` | Sort order (`asc` / `desc`) |

**Example:**
```
GET /api/ideas?page=1&limit=10&search=AI&category=SaaS&sortBy=createdAt&order=desc
```

#### `POST /api/ideas` — Request Body

```json
{
  "title": "Your Idea Title",
  "description": "Detailed description",
  "category": "AI",
  "tags": "AI, Machine Learning, NLP"
}
```

---

### Comments

| Method | Endpoint | Auth | Description |
|---|---|---|---|
| `GET` | `/api/comments/:ideaId` | Public | Get all comments for an idea |
| `POST` | `/api/comments/:ideaId` | 🔒 Required | Add a comment to an idea |
| `DELETE` | `/api/comments/:id` | 🔒 Required | Delete a comment |

#### `POST /api/comments/:ideaId` — Request Body

```json
{
  "content": "Your comment text"
}
```

---

## 🛡️ Middleware

### `requireAuth`

Validates the user session from:
- `Authorization` header (Bearer token), **or**
- Session cookies

Returns `401 Unauthorized` if session is invalid or missing.

Attaches user info to the request object:

```javascript
req.user = {
  id: "user_id",
  email: "user@example.com",
  name: "User Name"
}
```

---

## 🗃️ Database Models

### Idea Model

| Field | Type | Description |
|---|---|---|
| `title` | String | Title of the idea |
| `description` | String | Detailed description |
| `category` | String | Category classification |
| `tags` | Array | List of tags |
| `authorId` | String | User ID of the creator |
| `authorName` | String | Name of the creator |
| `createdAt` | Date | Creation timestamp |
| `updatedAt` | Date | Last update timestamp |

### Comment Model

| Field | Type | Description |
|---|---|---|
| `content` | String | Comment text |
| `ideaId` | ObjectId | Reference to the idea |
| `ideaTitle` | String | Title of the related idea |
| `authorId` | String | User ID of the commenter |
| `authorName` | String | Name of the commenter |
| `createdAt` | Date | Creation timestamp |

---

## 📄 License

This project is licensed under the **ISC License**.

---

## 👨‍💻 Developer

**Ziaul Hoque**
- GitHub: [@ziaulhoquepatwary](https://github.com/ziaulhoquepatwary)