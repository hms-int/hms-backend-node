require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const connectDB = require('./src/config/db');


connectDB();

const app = express();

app.use(cors({
  origin: 'http://localhost:5173', 
  methods: ['GET', 'POST', 'PUT', 'DELETE'], 
  credentials: true, 
}));

app.use(bodyParser.json());

const patientRoutes = require('./src/routes/patient');
const deptRoutes = require('./src/routes/dept');
const doctorRoutes = require('./src/routes/doctorroutes');
const appointmentRoutes = require('./src/routes/appointment');
const authRoutes = require('./src/routes/authroutes');
const signupRoutes = require('./src/routes/signup');
const adminRoutes = require('./src/routes/adminroutes');

app.use('/api/patients', patientRoutes);
app.use('/api/departments', deptRoutes);
app.use('/api/users/doctors', doctorRoutes);
app.use('/api/appointments', appointmentRoutes);
app.use('/api/signup', signupRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/admin', adminRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));