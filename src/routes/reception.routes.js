import express from 'express';
import { protect, authorize } from '../middleware/authmiddleware.js';
import * as receptionController from '../controllers/reception.controller.js';

const router = express.Router();

router.post('/', protect, authorize('admin'), receptionController.creatReceptionist);

router.get('/', protect, authorize('admin', 'receptionist'), receptionController.getReceptionists);

router.put('/change-password', protect, authorize('receptionist'), receptionController.changePassword);

router.put('/:id', protect, authorize('admin'), receptionController.updateReceptionist);

router.delete('/:id', protect, authorize('admin'), receptionController.deleteReceptionist);

export default router;