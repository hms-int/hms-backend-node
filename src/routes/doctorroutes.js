const express = require('express'); 
const router = express.Router();
const doctorController = require('../controllers/doctorController');
const { protect, authorize } = require('../middleware/authMiddleware');

router.post('/', protect, authorize('admin'), doctorController.createDoctor);

router.get('/', protect, authorize('admin', 'doctor'), doctorController.getDoctors);

router.put('/:id', protect, authorize('admin'), doctorController.updateDoctor);

//router.put('/change-password', protect, authorize('doctor'), doctorController.changePassword);

//router.delete('/:id', protect, authorize('admin'), doctorController.deleteDoctor);

module.exports = router;
