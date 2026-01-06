import express from 'express';
import { protect, authorize } from '../middleware/authmiddleware.js';
import * as labTechnicianController from '../controllers/lab.controller.js';

const router = express.Router();

router.post('/', protect, authorize('admin'), labTechnicianController.createLabtechnician);

router.get('/', protect, authorize('admin', 'lab-technician'), labTechnicianController.getLabtechnicians);

router.put('/change-password', protect, authorize('lab-technician'), labTechnicianController.changePassword);

router.put('/:id', protect, authorize('admin'), labTechnicianController.updateLabtechnician);

router.delete('/:id', protect, authorize('admin'), labTechnicianController.deleteLabtechnician);

export default router;