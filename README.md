<div align="center">

# 🔧 FixItNow Backend API

A scalable and secure **Home Service Marketplace REST API** built with **Node.js**, **Express.js**, **TypeScript**, **PostgreSQL**, **Prisma ORM**, **JWT Authentication**, and **SSLCommerz Payment Gateway**.

### Programming Hero | Level-2 Web Development | Assignment 4

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

FixItNow is a secure and scalable Home Service Marketplace backend where customers can book home services, technicians can manage services and bookings, and administrators can manage the overall platform.

---

# 🚀 Live API

### 🌍 https://fixitnow-backend-gamma.vercel.app/

### 👉 **[Open Live API](https://fixitnow-backend-gamma.vercel.app/)**

---

# 💻 GitHub Repository

### 👉 **[GitHub Repository](https://github.com/Ahmed-Nakib/B7A4)**

---

# 📬 Postman Documentation

### 👉 **[View Postman Collection](https://office-nakib-1196023.postman.co/workspace/Personal-Workspace~c9aada3b-7dea-4669-95da-04ee8c845410/collection/48128323-7ffb42ba-d353-4c23-9bb7-86875f194d22?action=share&source=copy-link&creator=48128323)**

---

# 📹 Video Demonstration

### 👉 **[Watch Project Demo](https://drive.google.com/file/d/15taS_u3LKgliB8JUsB8GACx7ConJ1mbx/view?usp=sharing)**

---

# ✨ Features

- JWT Authentication
- Refresh Token Authentication
- Cookie Based Authentication
- Role Based Authorization
- Customer Registration & Login
- Technician Registration & Profile Management
- Category Management
- Home Service Management
- Booking System
- Booking Status Management
- SSLCommerz Payment Integration
- Payment History
- Review & Rating System
- Availability Management
- Prisma ORM
- PostgreSQL Database
- Password Hashing with bcrypt
- Global Error Handling
- Structured API Responses
- TypeScript Support

---

# 🛠 Tech Stack

| Technology | Description |
|------------|-------------|
| Node.js | JavaScript Runtime |
| Express.js | Backend Framework |
| TypeScript | Type Safety |
| PostgreSQL | Relational Database |
| Prisma ORM | ORM |
| JWT | Authentication |
| bcrypt | Password Hashing |
| Cookie Parser | Cookie Handling |
| CORS | Cross Origin |
| SSLCommerz | Payment Gateway |

---

# 👥 User Roles

## 👤 Customer

- Register
- Login
- Browse Services
- Book Services
- Cancel Booking
- Make Payment
- View Payment History
- Submit Reviews

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

Protected APIs require an Access Token.

```http
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
│   ├── modules
│   ├── routes
│   ├── utils
│   └── lib
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
git clone https://github.com/Ahmed-Nakib/B7A4.git
```

Go to project

```bash
cd B7A4
```

Install packages

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

Start Development Server

```bash
npm run dev
```

---

# ✅ API Response

### Success

```json
{
  "success": true,
  "statusCode": 200,
  "message": "Operation successful",
  "data": {}
}
```

### Error

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
Email: admin@gmail.com
Password: Admin@123
```

---

# 🧪 Tested With

- Postman
- Prisma Studio

---

# 👨‍💻 Author

## Ahmed Nakib

Programming Hero - Backend Assignment 4

### 🌐 GitHub

https://github.com/Ahmed-Nakib

### 💼 LinkedIn

https://linkedin.com/in/your-linkedin

---

<div align="center">

### ⭐ If you like this project, don't forget to Star this repository.

Made with ❤️ by Ahmed Nakib

</div>