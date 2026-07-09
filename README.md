<div align="center">

# 🔧 FixItNow Backend API

A scalable and secure **Home Service Marketplace REST API** built with **Node.js, Express.js, TypeScript, PostgreSQL, Prisma ORM, JWT Authentication, and SSLCommerz Payment Gateway**.

### Programming Hero - Level 2 Web Development | Assignment 4

![Node.js](https://img.shields.io/badge/Node.js-22.x-green?logo=node.js)
![Express](https://img.shields.io/badge/Express.js-Backend-black?logo=express)
![TypeScript](https://img.shields.io/badge/TypeScript-5.x-blue?logo=typescript)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-Database-blue?logo=postgresql)
![Prisma](https://img.shields.io/badge/Prisma-ORM-2D3748?logo=prisma)
![JWT](https://img.shields.io/badge/JWT-Authentication-orange)
![SSLCommerz](https://img.shields.io/badge/SSLCommerz-Payment-success)

</div>

---

# 📌 Project Overview

**FixItNow** is a complete backend system for a Home Service Marketplace.

Customers can browse services, create bookings, make online payments, and leave reviews.

Technicians can manage their services, update availability, and handle bookings.

Administrators can manage users, bookings, and service categories.

---

# 🚀 Live API

```
https://your-live-api.vercel.app
```

---

# 💻 GitHub Repository

```
https://github.com/your-username/fixitnow-backend
```

---

# 📬 Postman Documentation

```
https://documenter.getpostman.com/view/xxxxxxxx
```

---

# 📹 Video Demonstration

```
https://drive.google.com/your-video-link
```

---

# ✨ Features

- JWT Authentication
- Refresh Token Authentication
- Role Based Authorization
- Customer Registration & Login
- Technician Registration & Profile Management
- Admin Dashboard APIs
- Service Category Management
- Home Service Management
- Booking System
- Booking Status Management
- SSLCommerz Payment Integration
- Review & Rating System
- Availability Management
- Prisma ORM
- PostgreSQL Database
- Password Hashing using bcrypt
- Cookie Based Authentication
- Global Error Handling
- Structured API Response
- TypeScript Support

---

# 🛠 Tech Stack

| Technology | Description |
|------------|-------------|
| Node.js | JavaScript Runtime |
| Express.js | REST API Framework |
| TypeScript | Type Safety |
| PostgreSQL | Relational Database |
| Prisma ORM | Database ORM |
| JWT | Authentication |
| bcrypt | Password Hashing |
| Cookie Parser | Cookie Management |
| CORS | Cross Origin Support |
| SSLCommerz | Online Payment Gateway |

---

# 👥 User Roles

## 👤 Customer

- Register/Login
- Browse Services
- Create Booking
- Cancel Booking
- Make Online Payment
- View Payment History
- Submit Review

---

## 👨‍🔧 Technician

- Update Profile
- Manage Availability
- Create Service
- Update Service
- Delete Service
- View Assigned Bookings
- Update Booking Status

---

## 👑 Admin

- View All Users
- Block / Unblock Users
- View All Bookings
- Manage Categories

---

# 📁 API Endpoints

## 🔐 Authentication

| Method | Endpoint | Access |
|---------|----------|--------|
| POST | `/api/auth/register` | Public |
| POST | `/api/auth/login` | Public |
| POST | `/api/auth/refresh-token` | Public |
| GET | `/api/auth/me` | Authenticated |

---

## 📂 Categories

| Method | Endpoint | Access |
|---------|----------|--------|
| GET | `/api/categories` | Public |
| POST | `/api/categories` | Admin |
| PATCH | `/api/categories/:id` | Admin |
| DELETE | `/api/categories/:id` | Admin |

---

## 🔧 Services

| Method | Endpoint | Access |
|---------|----------|--------|
| GET | `/api/services` | Public |
| GET | `/api/services/:id` | Public |
| GET | `/api/services/my-services` | Technician |
| POST | `/api/services` | Technician |
| PATCH | `/api/services/:id` | Technician |
| DELETE | `/api/services/:id` | Technician |

---

## 👨‍🔧 Technician

| Method | Endpoint | Access |
|---------|----------|--------|
| PUT | `/api/technician/profile` | Technician |
| PUT | `/api/technician/availability` | Technician |
| GET | `/api/technician/bookings` | Technician |
| PATCH | `/api/technician/bookings/:id` | Technician |

---

## 📅 Bookings

| Method | Endpoint | Access |
|---------|----------|--------|
| POST | `/api/bookings` | Customer |
| GET | `/api/bookings` | Customer |
| GET | `/api/bookings/:id` | Customer / Technician / Admin |
| PATCH | `/api/bookings/:id/cancel` | Customer |

---

## 💳 Payments

| Method | Endpoint | Access |
|---------|----------|--------|
| POST | `/api/payments/create` | Customer |
| POST | `/api/payments/success` | SSLCommerz Callback |
| POST | `/api/payments/fail` | SSLCommerz Callback |
| GET | `/api/payments` | Customer |
| GET | `/api/payments/:id` | Customer |

---

## ⭐ Reviews

| Method | Endpoint | Access |
|---------|----------|--------|
| POST | `/api/reviews` | Customer |

---

## 👑 Admin

| Method | Endpoint | Access |
|---------|----------|--------|
| GET | `/api/admin/users` | Admin |
| PATCH | `/api/admin/users/:id` | Admin |
| GET | `/api/admin/bookings` | Admin |
| GET | `/api/admin/categories` | Admin |

---

# 🔐 Authentication

All protected APIs require an Access Token.

```
Authorization: Bearer <access_token>
```

---

# 💳 Payment Workflow

```text
Customer
    │
    ▼
Create Booking
    │
    ▼
Booking Accepted
    │
    ▼
Create Payment
    │
    ▼
SSLCommerz Checkout
    │
 ┌──┴────────────┐
 │               │
 ▼               ▼
Success        Failed
 │
 ▼
Payment Completed
 │
 ▼
Booking Status → PAID
```

---

# 📂 Folder Structure

```text
src
│
├── app
│   ├── config
│   ├── middleware
│   ├── routes
│   ├── utils
│   ├── lib
│   └── modules
│       ├── auth
│       ├── admin
│       ├── booking
│       ├── category
│       ├── payment
│       ├── review
│       ├── service
│       └── technician
│
├── prisma
│
├── app.ts
└── server.ts
```

---

# ⚙️ Environment Variables

Create a `.env` file.

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

APP_URL=
BACKEND_URL=
```

---

# 📦 Installation

Clone Repository

```bash
git clone https://github.com/your-username/fixitnow-backend.git
```

Move to project

```bash
cd fixitnow-backend
```

Install dependencies

```bash
npm install
```

Generate Prisma Client

```bash
npx prisma generate
```

Run Database Migration

```bash
npx prisma migrate dev
```

Start Development Server

```bash
npm run dev
```

---

# ✅ API Response Format

### Success Response

```json
{
  "success": true,
  "statusCode": 200,
  "message": "Operation successful",
  "data": {}
}
```

### Error Response

```json
{
  "success": false,
  "statusCode": 400,
  "message": "Validation Error"
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

# 🧪 Tested Using

- Postman
- Prisma Studio

---

# 👨‍💻 Author

## Ahmed Nakib

Programming Hero - Backend Assignment 4

GitHub

```
https://github.com/your-username
```

LinkedIn

```
https://linkedin.com/in/your-profile
```

---

<div align="center">

### ⭐ If you like this project, please give it a Star on GitHub!

</div>