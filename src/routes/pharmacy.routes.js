import express from 'express';
import { protect, authorize } from '../middleware/authmiddleware.js';
import * as pharmacyController from '../controllers/pharmacy.controller.js';

const router = express.Router();

router.post('/', protect, authorize('admin'), pharmacyController.createPharmacist);

router.get('/', protect, authorize('admin', 'pharmacist'), pharmacyController.getPharmacists);

router.put('/change-password', protect, authorize ('pharmacist'), pharmacyController.changePassword);

router.put('/:id', protect, authorize('admin'), pharmacyController.updatePharmacist);

router.delete('/:id', protect, authorize('admin'), pharmacyController.deletePharmacist);

export default router;