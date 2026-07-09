<div align="center">

# 🔧 FixItNow Backend API

A scalable Home Service Marketplace Backend built with **Node.js, Express.js, TypeScript, PostgreSQL, Prisma ORM, JWT Authentication, and SSLCommerz Payment Gateway**.

Programming Hero - Assignment 4

![Node.js](https://img.shields.io/badge/Node.js-22.x-green?logo=node.js)
![Express](https://img.shields.io/badge/Express.js-Backend-black?logo=express)
![TypeScript](https://img.shields.io/badge/TypeScript-5.x-blue?logo=typescript)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-Database-blue?logo=postgresql)
![Prisma](https://img.shields.io/badge/Prisma-ORM-2D3748?logo=prisma)
![JWT](https://img.shields.io/badge/JWT-Authentication-orange)
![SSLCommerz](https://img.shields.io/badge/SSLCommerz-Payment-success)

</div>

---

# 📌 Overview

FixItNow is a RESTful backend API for a home service marketplace where customers can book services from technicians, technicians can manage their services and bookings, and administrators can manage users, categories, and the overall system.

---

# 🚀 Live API

```
https://your-api.vercel.app
```

---

# 📂 GitHub Repository

```
https://github.com/your-username/fixitnow-backend
```

---

# 📑 API Documentation

Postman Documentation

```
https://documenter.getpostman.com/view/xxxxxxxx
```

---

# 🎯 Features

- JWT Authentication
- Refresh Token Authentication
- Role-Based Authorization
- Customer Booking System
- Technician Service Management
- Category Management
- Review System
- SSLCommerz Payment Gateway
- Booking Payment Tracking
- Prisma ORM
- PostgreSQL Database
- Cookie Authentication
- Password Hashing (bcrypt)
- Structured Error Handling
- Input Validation
- TypeScript

---

# 🛠 Tech Stack

| Technology | Purpose |
|------------|----------|
| Node.js | Runtime |
| Express.js | REST API |
| TypeScript | Type Safety |
| PostgreSQL | Database |
| Prisma ORM | ORM |
| JWT | Authentication |
| bcrypt | Password Hashing |
| Cookie Parser | Cookie Management |
| CORS | Cross-Origin Support |
| SSLCommerz | Payment Gateway |

---

# 👥 User Roles

## 👤 Customer

- Register/Login
- Browse Services
- Book Services
- Cancel Booking
- Pay Online
- Give Review

---

## 👨‍🔧 Technician

- Update Profile
- Update Availability
- Create Service
- Update Service
- Delete Service
- Manage Bookings

---

## 👑 Admin

- View All Users
- Ban / Unban Users
- View All Bookings
- View Categories
- Manage Categories

---

# 📁 API Endpoints

## 🔐 Authentication

| Method | Endpoint | Access |
|---------|----------|--------|
| POST | /api/auth/register | Public |
| POST | /api/auth/login | Public |
| POST | /api/auth/refresh-token | Public |
| GET | /api/auth/me | Authenticated |

---

## 📂 Categories

| Method | Endpoint | Access |
|---------|----------|--------|
| GET | /api/categories | Public |
| POST | /api/categories | Admin |
| PATCH | /api/categories/:id | Admin |
| DELETE | /api/categories/:id | Admin |

---

## 🔧 Services

| Method | Endpoint | Access |
|---------|----------|--------|
| GET | /api/services | Public |
| GET | /api/services/:id | Public |
| GET | /api/services/my-services | Technician |
| POST | /api/services | Technician |
| PATCH | /api/services/:id | Technician |
| DELETE | /api/services/:id | Technician |

---

## 👨‍🔧 Technician

| Method | Endpoint | Access |
|---------|----------|--------|
| PUT | /api/technician/profile | Technician |
| PUT | /api/technician/availability | Technician |
| GET | /api/technician/bookings | Technician |
| PATCH | /api/technician/bookings/:id | Technician |

---

## 📅 Bookings

| Method | Endpoint | Access |
|---------|----------|--------|
| POST | /api/bookings | Customer |
| GET | /api/bookings | Customer |
| GET | /api/bookings/:id | Customer / Technician / Admin |
| PATCH | /api/bookings/:id/cancel | Customer |

---

## 💳 Payments

| Method | Endpoint | Access |
|---------|----------|--------|
| POST | /api/payments/create | Customer |
| POST | /api/payments/confirm | Public |
| POST | /api/payments/success | SSLCommerz Callback |
| POST | /api/payments/fail | SSLCommerz Callback |
| GET | /api/payments | Customer |
| GET | /api/payments/:id | Customer |

---

## ⭐ Reviews

| Method | Endpoint | Access |
|---------|----------|--------|
| POST | /api/reviews | Customer |

---

## 👑 Admin

| Method | Endpoint | Access |
|---------|----------|--------|
| GET | /api/admin/users | Admin |
| PATCH | /api/admin/users/:id | Admin |
| GET | /api/admin/bookings | Admin |
| GET | /api/admin/categories | Admin |

---

# 🔐 Authentication

Protected routes require JWT Access Token.

```
Authorization: Bearer <access_token>
```

---

# 💳 Payment Workflow

```
Customer
      │
      ▼
Create Booking
      │
      ▼
Create Payment
      │
      ▼
SSLCommerz Checkout
      │
 ┌────┴────┐
 │         │
 ▼         ▼
Success   Failed
 │
 ▼
Booking Status → PAID
 │
 ▼
Payment Status → COMPLETED
```

---

# 📂 Folder Structure

```
src
│
├── app
│   ├── config
│   ├── middleware
│   ├── modules
│   │
│   ├── Auth
│   ├── Admin
│   ├── Booking
│   ├── Category
│   ├── Payment
│   ├── Review
│   ├── Service
│   └── Technician
│
├── prisma
│
├── server.ts
└── app.ts
```

---

# ⚙️ Environment Variables

Create a `.env` file

```env
PORT=5000

DATABASE_URL=

JWT_ACCESS_SECRET=
JWT_ACCESS_EXPIRES_IN=1d

JWT_REFRESH_SECRET=
JWT_REFRESH_EXPIRES_IN=7d

BCRYPT_SALT_ROUNDS=10

SSLCOMMERZ_STORE_ID=
SSLCOMMERZ_STORE_PASSWORD=

BACKEND_URL=
APP_URL=
```

---

# 📦 Installation

Clone Repository

```bash
git clone https://github.com/your-username/fixitnow-backend.git
```

Go to Project

```bash
cd fixitnow-backend
```

Install Dependencies

```bash
npm install
```

Generate Prisma Client

```bash
npx prisma generate
```

Run Migration

```bash
npx prisma migrate dev
```

Run Development Server

```bash
npm run dev
```

---

# 📌 Response Format

## Success Response

```json
{
  "success": true,
  "message": "Operation successful",
  "data": {}
}
```

## Error Response

```json
{
  "success": false,
  "message": "Validation Error",
  "errorDetails": {}
}
```

---

# 👤 Admin Credentials

```
Email:
admin@gmail.com

Password:
Admin@123
```

---

# 🧪 Tested With

- Postman
- Prisma Studio

---

# 📹 Demo Video

```
https://drive.google.com/your-video-link
```

---

# 👨‍💻 Author

## Ahmed Nakib

Programming Hero Backend Assignment 4

GitHub:

```
https://github.com/your-username
```

---

## ⭐ If you like this project, don't forget to give it a Star.