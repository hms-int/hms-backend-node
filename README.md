Production-oriented Node.js backend for a Hospital Management System (HMS), built with structured role-based access control and real operational workflows in mind.

This repository contains **only the backend API layer** built using Express and MongoDB.

---

## Overview

The system supports:

* Authentication with JWT
* Role-Based Access Control (RBAC)
* Doctor, Patient, Appointment management
* Billing and Payment lifecycle
* Admin analytics dashboard
* Role-based reporting
* Docker-based deployment

The architecture follows a layered approach:

```
Routes → Controllers → Services → Models → MongoDB
```

---

## Roles

The system supports the following roles:

* **Admin (Superuser)**
* **Doctor**
* **Receptionist**
* **Billing Staff**

Access control is enforced at middleware level.

Detailed RBAC specification is available in:

```
RBAC_SPEC.md
```

---

## Core Modules

* Authentication
* User Management
* Doctors
* Patients
* Departments
* Appointments (with conflict prevention)
* Billing (pending → paid lifecycle)
* Payments
* Admin Dashboard
* Reports

## Tech Stack

* Node.js
* Express
* MongoDB (Mongoose)
* JWT Authentication
* express-validator
* Razorpay integration
* Docker & Docker Compose

## Project Structure

```
src/
 ├── config/
 ├── controllers/
 ├── services/
 ├── routes/
 ├── models/
 ├── middleware/
 ├── utils/
 └── app.js
```

---

## Key Features

### Authentication

* JWT-based authentication
* Bearer token authorization
* Role enforcement middleware

### Appointment Safety

* Double-booking prevention
* Status lifecycle enforcement

### Billing System

* Amount tracking
* Payment status (pending / paid)
* Revenue aggregation
* Financial reporting

### Admin Dashboard

Provides:

* Total doctors
* Total patients
* Total appointments
* Total revenue
* Pending revenue
* Today’s appointments

---

## Running the Project

### Local Setup

```bash
git clone https://github.com/hms-int/hms-backend-node.git
cd hms-backend-node
npm install
cp .env.example .env
node server.js
```

Server runs at:

```
http://localhost:5000
```

---

### Docker Setup

```bash
docker compose up --build
```

This starts:

* Node.js backend
* MongoDB

To stop:

```bash
docker compose down
```

---

## API Principles

* REST-based
* Stateless
* Structured response format
* Centralized error handling
* Role-based route protection

---

## Health Check

```
GET /health
```

---

## License

Open-source.

Ensure compliance with medical data regulations before production deployment.