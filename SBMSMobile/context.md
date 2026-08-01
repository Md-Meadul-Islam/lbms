# SBMS (Smart Business Management System) - Backend Context for React Native Development

## Project Overview

I am building a production-ready **multi-tenant Smart Business Management System (SBMS)**.

The backend is implemented using:

- Node.js
- Express.js
- MongoDB
- Mongoose
- Socket.IO
- BullMQ
- Redis
- Firebase Cloud Messaging (architecture ready)
- Nodemailer
- JWT Authentication

The frontend will be:

- React Native (Android first)
- JavaScript (not TypeScript)
- React Navigation
- Axios
- Socket.IO Client
- Firebase Messaging

---

# Goal

One application should support multiple business types.

Examples:

- Salon
- Barbershop
- Restaurant
- Grocery Store
- Pharmacy
- Small Shop
- Spa
- Clinic (future)

Every business has completely isolated data.

The backend is already designed as a multi-tenant system.

---

# Backend Architecture

The backend follows a layered architecture.

```
Routes

↓

Controller

↓

Service

↓

Repository

↓

MongoDB
```

There are also shared layers.

```
shared/

base/

constants/

helpers/

validators/

middlewares/

events/

queues/

templates/

config/

calculators/
```

---

# Module Architecture

Every module follows this structure.

```
module/

model.js

repository.js

service.js

controller.js

validator.js

routes.js

messages.js

index.js
```

Repositories never contain business logic.

Services contain all business rules.

Controllers only handle request/response.

---

# Implemented Modules

## Authentication

Completed.

JWT based authentication.

---

## Business

Completed.

Each user belongs to one or more businesses.

Everything is business scoped.

---

## Service

Completed.

Supports:

- Categories
- Services
- Duration
- Status
- Images

---

## Service Price

Completed.

Supports:

- Cost Price
- Selling Price
- Discount
- Tax
- Commission
- Profit

Uses shared calculators.

---

## Service Addon

Completed.

Supports optional service add-ons.

Example:

Hair Cut

-

Hair Wash

-

Beard Trim

---

## Service Addon Price

Completed.

Each addon has independent pricing.

---

## Service Assignment

Completed.

Assigns employees to services.

Supports:

- Commission
- Priority
- Active status

---

## Appointment

Completed.

Supports:

- Customer
- Services
- Addons
- Employees
- Notes
- Status
- Totals
- Duration

Price calculation is handled through shared calculators.

---

# Price Calculation

There is a shared calculator.

```
shared/calculators/
```

Includes:

- DiscountCalculator
- TaxCalculator
- CommissionCalculator
- PriceCalculator

Appointment module uses these calculators.

No pricing logic exists inside controllers.

---

# Notification Module

Fully implemented.

Architecture:

```
NotificationService

↓

EventBus

↓

NotificationQueue (BullMQ)

↓

NotificationWorker

↓

NotificationDispatcher

↓

Notification Channels
```

Notification channels:

- Socket
- Firebase (architecture ready)
- Email
- SMS
- WhatsApp

---

# Socket Architecture

Socket.IO is already implemented.

Supports:

```
Multiple Devices

Multiple Browsers

Multiple Tabs
```

Connection storage:

```
Map<UserId, Set<SocketId>>
```

Socket responsibilities:

- Register
- Disconnect
- Online users
- Send notification

Notification delivery is separated from socket lifecycle.

---

# Email Channel

Implemented.

Architecture:

```
EmailClient

↓

EmailService

↓

EmailGateway
```

Templates are stored in:

```
shared/templates/email/
```

SMTP configuration is centralized.

---

# Firebase

Architecture ready.

Supports push notification.

Device token module will be implemented later.

---

# SMS

Architecture ready.

Provider will be integrated later.

---

# WhatsApp

Architecture ready.

Provider will be integrated later.

---

# Queue System

BullMQ + Redis.

Architecture:

```
NotificationQueue

↓

Redis

↓

NotificationWorker

↓

Dispatcher
```

Supports:

- Retry
- Delay
- Priority
- Scheduling

---

# Event System

Shared EventBus.

Notifications are event-driven.

Business modules never communicate directly with channels.

---

# Configuration

```
shared/config/

mail.config.js

redis.config.js

jwt.config.js

database.config.js

...
```

---

# Templates

```
shared/templates/

email/

sms/

whatsapp/
```

---

# API Style

REST API.

JSON responses.

Pagination.

Filtering.

Searching.

Sorting.

Soft delete.

Validation before service execution.

---

# Authentication

JWT.

Every authenticated request includes:

```
Authorization:

Bearer <token>
```

---

# Multi Tenant

Every business data contains:

```
businessId
```

Every query is scoped using:

```
businessId
```

No cross-business access.

---

# Coding Style

Use:

- ES Modules
- async/await
- Class-based Services
- Repository Pattern
- Dependency separation
- Single Responsibility Principle

Avoid:

- Business logic inside controllers
- Database access inside controllers
- Duplicate logic

---

# Error Handling

Uses centralized error middleware.

Services throw errors.

Controllers do not contain try/catch unless necessary.

---

# React Native Application Requirements

Now I want to build the Android application.

Requirements:

## Technology

- React Native (JavaScript)
- React Navigation
- Axios
- React Query (TanStack Query)
- React Hook Form
- AsyncStorage
- Socket.IO Client
- Firebase Cloud Messaging
- React Native Paper (or another professional UI library if more suitable)

## Application Architecture

Use a scalable, production-ready architecture.

Example:

```
src/

api/

assets/

components/

config/

constants/

contexts/

hooks/

navigation/

screens/

features/

services/

store/

theme/

utils/

validators/

App.js
```

Use feature-based organization where appropriate.

---

# Mobile Features

The app should support:

- Login
- Business selection (if user belongs to multiple businesses)
- Dashboard
- Services
- Service Categories
- Service Prices
- Addons
- Employees
- Customers
- Appointments
- Calendar
- Notifications
- Profile
- Settings

---

# Real-time Features

Integrate:

Socket.IO

- Notification received
- Appointment updates
- Online status (future)

Firebase

- Push notifications
- Background notifications
- Notification click handling

---

# Offline Support

Plan for offline capability.

Use local caching.

Synchronize when internet returns.

---

# State Management

Recommend the most suitable solution for this project.

Explain why.

---

# Navigation

Design a scalable navigation architecture.

Support:

- Authentication flow
- Main application
- Nested navigation
- Deep linking (future)

---

# UI

Professional business application.

Minimal.

Fast.

Reusable components.

Dark mode ready.

Responsive.

---

# My Request

Act as a senior React Native architect.

Build the mobile application step by step.

Do not skip architecture.

Always keep scalability, maintainability, and clean architecture in mind.

Each step should include:

1. Folder structure
2. Explanation
3. Complete code
4. Best practices
5. Production recommendations
6. Why a specific approach is chosen

I want to build the application from scratch in the correct order, one module at a time.
