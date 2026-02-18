# RBAC Specification – HMS Backend

This document defines the Role-Based Access Control (RBAC) model for the HMS Backend system.

The objective of this specification is to clearly define:

* System modules
* Allowed actions per module
* Access boundaries per role
* Enforcement expectations at middleware level

---

# 1. Roles

The system currently supports the following roles:

* **Admin**
* **Doctor**
* **Reception**
* **Billing Staff**

Each role has defined authority boundaries to ensure operational control and data protection.

---

# 2. System Modules

The backend exposes the following logical modules:

1. Dashboard
2. Doctor Management
3. Patient Management
4. Department Management
5. Schedule Management
6. Appointment Management
7. Billing / Payment
8. Reports
9. Human Resources
10. System Settings & Security

---

# 3. Action Definitions

Standard action types used across modules:

* **View** – Read access
* **Create** – Add new records
* **Update** – Modify existing records
* **Delete** – Remove records
* **Approve** – Authorize specific actions (if applicable)
* **Export** – Generate downloadable data

---

# 4. Role Permission Matrix

## 4.1 Admin

Administrative superuser with full system authority.

Permissions:

* Full access (View / Create / Update / Delete) across all modules
* Manage user roles and permissions
* Access system configuration and security settings
* View and export all reports
* Manage HR records
* Verify and review billing/payment records

Admin has unrestricted operational and configuration-level control.

---

## 4.2 Doctor

Clinical authority with access restricted to assigned operational data.

Permissions:

Dashboard:

* View personal dashboard

Patient Management:

* View assigned patients
* Update consultation notes
* Cannot delete patient records
* Cannot create new patient profiles (unless explicitly allowed)

Appointment Management:

* View assigned appointments
* Update appointment status (e.g., Completed, Cancelled)

Schedule:

* View own schedule

Reports:

* View reports related to own patients
* Cannot access system-wide financial reports

Restrictions:

* No access to HR module
* No access to system settings
* No authority to manage other doctors

---

## 4.3 Reception

Front-desk workflow management role.

Permissions:

Patient Management:

* Create patient registration
* Update patient demographic details
* View patient records
* Cannot delete patient records

Appointment Management:

* Create appointments
* Assign doctors
* Update appointment details
* Cancel appointments

Schedule:

* View and manage available slots

Billing:

* Create initial billing entries
* View payment status
* Cannot finalize or override billing records (if Billing Staff exists)

Reports:

* View basic operational reports

Restrictions:

* No access to HR
* No access to system configuration
* No access to medical consultation notes editing

---

## 4.4 Billing Staff

Financial operations authority.

Permissions:

Billing:

* Create billing records
* Update billing records
* Mark payment status
* Generate invoices
* Export billing reports

Patient Management:

* View patient billing-related data
* Cannot modify medical or demographic information

Reports:

* View and export financial reports

Restrictions:

* No access to HR
* No access to system settings
* No access to medical consultation editing

---

# 5. Consolidated Permission Matrix

| Module              | Admin | Doctor          | Reception       | Billing Staff       |
| ------------------- | ----- | --------------- | --------------- | ------------------- |
| Dashboard           | Full  | Own             | Limited         | Limited             |
| Doctor Management   | CRUD  | Self            | View            | No Access           |
| Patient Management  | CRUD  | View Assigned   | Create / Update | View (Billing Only) |
| Appointment         | CRUD  | Update Assigned | Create / Update | View                |
| Schedule            | CRUD  | View Own        | Manage Slots    | No Access           |
| Billing             | Full  | View            | Create          | CRUD                |
| Reports             | Full  | Own Patients    | Operational     | Financial Only      |
| Human Resources     | CRUD  | No Access       | No Access       | No Access           |
| Settings & Security | Full  | No Access       | No Access       | No Access           |

Legend:

* **Full / CRUD** = View, Create, Update, Delete
* **Own** = Limited to assigned records
* **Limited** = Restricted data view
* **No Access** = Access denied

---

# 6. Enforcement Strategy

RBAC enforcement must occur at:

* Middleware level (route protection)
* Service-level ownership validation (e.g., doctor accessing only assigned patients)

Example enforcement layers:

1. Authentication middleware (JWT verification)
2. Role validation middleware
3. Resource ownership validation inside services

Security must not rely solely on frontend role checks.

---

# 7. Future Expansion

The RBAC model is designed to support:

* Fine-grained permission mapping (role → permissions table)
* Permission-based system instead of hardcoded roles
* Audit logging per action
* Multi-hospital tenant architecture (if required)

---

# 8. Design Principles

* Least privilege access
* Clear authority boundaries
* Separation between operational and financial control
* Role enforcement independent of UI

---

This document serves as the official access contract between backend and frontend teams.

All new features must align with this specification unless formally updated.

---

