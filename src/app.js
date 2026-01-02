import express from 'express';
import cors from 'cors';
import morgan from 'morgan';

import authRoutes from './routes/auth.routes.js';
import signupRoutes from './routes/signup.js';
import adminRoutes from './routes/adminroutes.js';

import doctorRoutes from './routes/doctor.routes.js';
import nurseRoutes from './routes/nurse.routes.js';
import receptionRoutes from './routes/reception.routes.js';

import patientRoutes from './routes/patient.js';
import deptRoutes from './routes/dept.js';
import appointmentRoutes from './routes/appointment.js';

const app = express();

// Global middleware
app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

app.get('/', (req, res) => {
  res.json({ ok: true });
});

app.use('/api/auth', authRoutes);
app.use('/api/signup', signupRoutes);
app.use('/api/admin', adminRoutes);

app.use('/api/users/doctors', doctorRoutes);
app.use('/api/users/nurses', nurseRoutes);
app.use('/api/users/receptionist', receptionRoutes);

app.use('/api/patients', patientRoutes);
app.use('/api/departments', deptRoutes);
app.use('/api/appointments', appointmentRoutes);

app.use((err, req, res, next) => {
  console.error(err);
  res.status(err.status || 500).json({
    error: err.message || 'Server error'
  });
});

export default app;
