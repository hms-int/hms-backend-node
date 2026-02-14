import express from 'express';
import cors from 'cors';
import morgan from 'morgan';

import authRoutes from './routes/auth.routes.js';
import paymentRoutes from './routes/payment.routes.js';
import signupRoutes from './routes/signup.js';
import adminRoutes from './routes/adminroutes.js';

import doctorRoutes from './routes/doctor.routes.js';
import nurseRoutes from './routes/nurse.routes.js';
import receptionRoutes from './routes/reception.routes.js';
import labTechnicianRoutes from './routes/lab.routes.js';
import pharmacyRoutes from './routes/pharmacy.routes.js';

import patientRoutes from './routes/patient.js';
import deptRoutes from './routes/dept.js';
import appointmentRoutes from './routes/appointment.js';

const app = express();

// Global middleware
app.use(cors({
  origin: "*",
  credentials: true
}));
app.use(express.json());

app.use(morgan('dev', {
  skip: (req) => req.url === '/health'
  })
);

app.get('/', (_req, res) => {
  res.status(200).json({
    message: "Backend is online"
  })
});

app.get('/health', (_req, res) => {
  res.status(200).json({
    status: "ok",
    service: "hms-backend",
    uptime: process.uptime(),
    timestamp: new Date().toISOString()
  });
});

app.use('/api/auth', authRoutes);
app.use('/api/payment', paymentRoutes);
app.use('/api/signup', signupRoutes);
app.use('/api/admin', adminRoutes);

app.use('/api/users/doctors', doctorRoutes);
app.use('/api/users/nurses', nurseRoutes);
app.use('/api/users/receptionist', receptionRoutes);
app.use('/api/users/lab-technician', labTechnicianRoutes);
app.use('/api/users/pharmacist', pharmacyRoutes);

app.use('/api/patients', patientRoutes);
app.use('/api/departments', deptRoutes);
app.use('/api/appointments', appointmentRoutes);

app.use((err, _req, res, _next) => {
  console.error(err);
  res.status(err.status || 500).json({
    error: err.message || 'Internal Server Error'
  });
});

export default app;
