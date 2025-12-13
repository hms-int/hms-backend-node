const express = require('express');
const router = express.Router();
const patientController = require('../controllers/patient'); 
const { protect, authorize } = require('../middleware/authmiddleware');

router.get('/', protect, authorize('admin', 'doctor'), patientController.getPatients);

router.post('/patient', protect, authorize('admin', 'doctor'), patientController.createPatient);

router.put('/:id', protect, authorize('admin', 'doctor'), patientController.updatePatient);

//router.delete('/:id', protect, authorize('admin'), patientController.deletePatient);

module.exports = router;
