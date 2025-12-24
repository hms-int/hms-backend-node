import express from 'express';
import { protect, authorize } from '../middleware/authmiddleware.js';
import * as nurseController from '../controllers/nurse.controller.js';

const router = express.Router();

router.get('/', protect, authorize('admin'), nurseController.createNurse);

router.get('/', protect, authorize('admin', 'nurse'), nurseController.getNurses);

router.put('/:id', protect, authorize('admin'), nurseController.updateNurse);

router.put('/change-password', protect, authorize('nurse'), nurseController.changePassword);

router.delete('/:id', protect, authorize('nurse'), nurseController.delete)