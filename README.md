HMS Backend – Node.js (Open Source)

This repository contains the **open-source Node.js backend** for a **production-grade Hospital Management System (HMS)**.

The system is designed with **real hospital workflows**, **security**, and **scalability** in mind, suitable for on-premise deployment (LAN) as well as future cloud scaling.

---

## Scope of This Repository

**Included (Open Source)**

* Node.js backend (Express-based)
* Authentication & Authorization (JWT + RBAC)
* Core HMS APIs (OPD, IPD, Billing, Rooms, Pharmacy, Lab)
* Security, validation, and middleware layer
* Caching integration (Redis)
* Database integration (MongoDB + PostgreSQL)
* Production-ready architecture patterns

**Not Included (Closed Source)**

* Java Spring Boot backend (used for heavy reports & analytics)
* Proprietary hospital-specific business logic
* Any internal or paid modules

> **Important**
> Any interaction references to a Java Spring Boot service are **external integrations only**.
> That backend is **closed source** and **not part of this repository**.

---

## Tech Stack

### Core

* **Node.js**
* **Express.js**

### Security

* `bcrypt` – password hashing
* `jsonwebtoken` – JWT-based authentication
* `helmet` – HTTP security headers
* `cors` – controlled cross-origin access

### Databases

* **MongoDB** – flexible medical & patient records
* **PostgreSQL** – transactional data (billing, rooms, relations)

### Caching & Performance

* **Redis** – real-time cache (bed status, dashboards)

### Utilities

* `dotenv` – environment configuration
* `morgan` – request logging
* `express-validator` – request validation

---

## Project Structure (Planned)

```
hms-backend-node/
│
├── src/
│   ├── config/          # DB, Redis, env configuration
│   ├── controllers/     # Request handlers
│   ├── services/        # Business logic
│   ├── routes/          # API routes
│   ├── models/          # MongoDB / PostgreSQL models
│   ├── middlewares/     # Auth, RBAC, validation
│   ├── utils/           # Helpers, constants
│   └── app.js           # App bootstrap
│
├── .env.example
├── package.json
└── README.md
```

---

## Authentication & RBAC

The system uses:

* **JWT (HttpOnly Cookies)**
* **Role-Based Access Control (RBAC)**

Supported roles:

* Admin
* Doctor
* Nurse
* Reception
* Pharmacy
* Lab

RBAC is enforced at the middleware level for every protected route.

---

## Getting Started

### Clone the Repository

```bash
git clone https://github.com/hms-int/hms-backend-node.git
cd hms-backend-node
```

### Install Dependencies

```bash
npm install
```

### Configure Environment

Create `.env` from example:

```bash
cp .env.example .env
```

Update values:

```
PORT=5000
JWT_SECRET=your_secret
MONGO_URI=your_mongodb_connection
POSTGRES_URI=your_postgres_connection
REDIS_URL=___
```

### Run the Server

```bash
node server.js
```

Server will start on:

```
http://localhost:5000
```

---

## API Philosophy

* REST-based APIs
* Stateless services
* Validation at entry point
* Business logic isolated in services
* Database logic abstracted from controllers

This ensures:

* Maintainability
* Testability
* Scalability

---

## Architecture Principles

* **Separation of concerns**
* **Security-first**
* **Production realism over tutorials**
* **Designed for long-term hospital data (10+ years)**

This is **not a demo project** — it is architected to reflect real industry systems.

---

## Open Source Contributions

Contributions are **welcome and encouraged**.

You can help with:

* API improvements
* Security hardening
* Performance optimization
* Documentation
* Testing
* Refactoring

### How to Contribute

1. Fork the repository
2. Create a feature branch
3. Make clear, atomic commits
4. Open a Pull Request with explanation

Please keep contributions **clean, professional, and documented**.

---

## License

This project is released under an **open-source license**.
Closed-source components (Java Spring Boot backend) are **explicitly excluded**.

---

## Disclaimer

This repository provides **core backend infrastructure only**.
Deployment, customization, and hospital-specific workflows must comply with **local medical data laws and regulations**.

---

### Final Note

This project aims to bridge the gap between **academic projects** and **real-world production systems**.

If you are serious about backend engineering, scalability, and system design — you are in the right place.

