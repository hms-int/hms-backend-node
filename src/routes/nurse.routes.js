import express from 'express';
import { protect, authorize } from '../middleware/authmiddleware.js';
import * as nurseController from '../controllers/nurse.controller.js';

const router = express.Router();

router.post('/', protect, authorize('admin'), nurseController.createNurse);

router.get('/', protect, authorize('admin', 'nurse'), nurseController.getNurses);

router.put('/change-password', protect, authorize('nurse'), nurseController.changePassword);

router.put('/:id', protect, authorize('admin'), nurseController.updateNurse);

router.delete('/:id', protect, authorize('admin'), nurseController.deleteNurse);

export default router;