import Patient from '../models/patient.js';
import { createPatientPortalAccount } from '../services/patientPortal.service.js';

const createPatient = async (req, res, next) => {
  try {
    const patient = new Patient(req.body);
    await patient.save();

    const { email, paymentMethod } = req.body;

    if (paymentMethod === "online" && email) {
      await createPatientPortalAccount(email);
    }

    res.status(201).json({
      success: true,
      patient
    });

  } catch (err) {
    next(err);
  }
};

const getPatients = async (req, res, next) => {
  try {
    const patients = await Patient.find();
    res.json(patients);
  } catch (err) {
    next(err);
  }
};

const updatePatient = async (req, res, next) => {
  try {
    const { id } = req.params;

    const patient = await Patient.findByIdAndUpdate(id, req.body, {
      new: true,       
      runValidators: true 
    });

    if (!patient) {
      const error = new Error('Patient not found');
      error.statusCode = 404;
      return next(error);
    }

    res.json(patient);
  } catch (err) {
    next(err);
  }
};

const deletePatient = async (req, res, next) => {
  try {
    const { id } = req.params;

    const patient = await Patient.findByIdAndDelete(id);

    if (!patient) {
      const error = new Error('Patient not found');
      error.statusCode = 404;
      return next(error);
    }

    res.json({ message: 'Patient deleted successfully' });
  } catch (err) {
    next(err);
  }
};

export {
  createPatient,
  getPatients,
  updatePatient,
  deletePatient
};
