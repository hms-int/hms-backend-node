# HMS Backend (Node.js)

Open-source Node.js backend for a Hospital Management System (HMS), built for real hospital workflows and production use.

This repository contains **only the Node.js / Express backend**. Any Java Spring Boot services referenced are **external and closed source**.

---

## What’s Included

* Node.js (Express) backend
* JWT-based authentication with RBAC
* Core HMS APIs (OPD, IPD, Billing, Rooms, Pharmacy, Lab)
* MongoDB and PostgreSQL integration
* Redis caching
* Security and validation middleware

## Not Included

* Java Spring Boot backend
* Advanced reporting and analytics
* Proprietary or hospital-specific logic

---

## Tech Stack

* **Node.js**, **Express**
* **MongoDB**, **PostgreSQL**
* **Redis**
* `bcrypt`, `jsonwebtoken`, `helmet`, `cors`
* `dotenv`, `morgan`, `express-validator`

---

## Project Structure

```
src/
 ├── config/
 ├── controllers/
 ├── services/
 ├── routes/
 ├── models/
 ├── middlewares/
 ├── utils/
 └── app.js
```

---

## Authentication

* JWT (HttpOnly cookies)
* Role-Based Access Control

Roles:

* Admin, Doctor, Nurse, Reception, Pharmacy, Lab

RBAC is enforced via middleware.

---

## Setup

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

## API Design

* REST APIs
* Stateless services
* Validation at entry point
* Business logic in services
* Database logic isolated from controllers

---

## Contributions

Contributions are welcome.

* Fork the repo
* Create a feature branch
* Make clear commits
* Open a Pull Request with a brief explanation

Keep changes clean and well-documented.

---

## License & Disclaimer

This repository is open source.
Closed-source components are excluded.

Ensure compliance with local medical data laws before production use.
