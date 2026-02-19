## Base URL

```
http://localhost:5000/api
```

All protected routes require:

```
Authorization: Bearer <JWT_TOKEN>
```

---

# 🔐 Authentication

## Login

**POST** `/auth/login`

### Request Body

```json
{
  "email": "admin@example.com",
  "password": "password123"
}
```

### Success Response

```json
{
  "success": true,
  "data": {
    "token": "jwt_token_here",
    "user": {
      "id": "user_id",
      "role": "admin",
      "email": "admin@example.com"
    }
  }
}
```

---

# 👨‍⚕️ Doctors

## Get All Doctors

**GET** `/users/doctors`

**Roles:** admin

### Response

```json
{
  "success": true,
  "data": {
    "doctors": [],
    "total": 15, //didn't add pagination yet.
    "page": 1,
    "pages": 2
  }
}
```

---

## Create Doctor

**POST** `/users/doctors`

**Roles:** admin

### Body

```json
{
  "name": "Dr. Smith",
  "email": "smith@hospital.com",
  "department": "cardiology"
}
```

---

# 👤 Patients

## Get All Patients

**GET** `/patients`

**Roles:** admin, receptionist

---

## Create Patient

**POST** `/patients`

**Roles:** admin, receptionist

### Body

```json
{
  "name": "John Doe",
  "age": 30,
  "gender": "male",
  "phone": "9999999999"
}
```

---

# 📅 Appointments

## Create Appointment

**POST** `/appointments`

**Roles:** admin, receptionist

### Body

```json
{
  "doctor": "doctor_id",
  "patient": "patient_id",
  "date": "2026-02-20T10:00:00Z"
}
```

### Failure (Conflict)

```json
{
  "success": false,
  "message": "Doctor already has an appointment at this time"
}
```

---

## Update Appointment Status

**PATCH** `/appointments/:id/status`

**Roles:** admin, doctor

### Body

```json
{
  "status": "completed"
}
```

---

# 💰 Billing

## Create Billing

**POST** `/billing`

**Roles:** admin

### Body

```json
{
  "patient": "patient_id",
  "amount": 1500
}
```

---

## Update Billing Status

**PATCH** `/billing/:id/status`

**Roles:** admin, billing

### Body

```json
{
  "status": "paid",
  "paymentMethod": "cash"
}
```

---

# 📊 Dashboard

## Admin Summary

**GET** `/admin/dashboard/summary`

**Roles:** admin

### Response

```json
{
  "success": true,
  "data": {
    "totalDoctors": 5,
    "totalPatients": 40,
    "totalAppointments": 100,
    "totalRevenue": 45000,
    "pendingRevenue": 5000,
    "todayAppointments": 8
  }
}
```

---

# 📈 Reports

## Revenue Report

**GET** `/reports/revenue`

**Roles:** admin, billing

### Query Params

```
?startDate=2026-01-01
&endDate=2026-01-31
```

---

## Appointment Report

**GET** `/reports/appointments`

**Roles:** admin

---

## Doctor Summary

**GET** `/reports/my-summary`

**Roles:** doctor

---

# 🔐 RBAC Summary Table

| Route            | Admin | Doctor  | Reception | Billing        |
| ---------------- | ----- | ------- | --------- | -------------- |
| /users/doctors   | ✔     | ❌       | ❌         | ❌              |
| /patients        | ✔     | ❌       | ✔         | ❌              |
| /appointments    | ✔     | ✔ (own) | ✔         | ❌              |
| /billing         | ✔     | ❌       | ❌         | ✔              |
| /reports         | ✔     | Limited | ❌         | Financial Only |
| /admin/dashboard | ✔     | ❌       | ❌         | ❌              |

---

# ⚠ Standard Response Format

Success:

```json
{
  "success": true,
  "data": {},
  "message": "Optional message"
}
```

Error:

```json
{
  "success": false,
  "message": "Error description"
}
```

---

# 📌 Frontend Integration Notes

* Always send JWT in Authorization header
* Role-based UI must match backend RBAC
* Do not trust frontend-only role checks
* Use pagination parameters for large datasets