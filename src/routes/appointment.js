const express = require('express');
const { protect, authorize } = require('../middleware/authmiddleware');
const appointmentController = require('../controllers/aptcontrol');

const router = express.Router();

router.post(
  '/',
  protect,
  authorize('admin', 'doctor'),
  appointmentController.createAppointment
);

router.get(
  '/',
  protect,
  authorize('admin', 'doctor'),
  appointmentController.getAppointments
);

router.get(
  '/:id',
  protect,
  authorize('admin', 'doctor'),
  appointmentController.getAppointmentById
);

router.put(
  '/:id',
  protect,
  authorize('admin', 'doctor'),
  appointmentController.updateAppointment
);

/*router.delete(
  '/:id',
  protect,
  authorize('admin', 'doctor'),
  appointmentController.deleteAppointment
);*/

module.exports = router;
