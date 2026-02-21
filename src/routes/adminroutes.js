import express from 'express';
import * as adminController from '../controllers/admincontroller.js';
import { protect, authorize } from '../middleware/authMiddleware.js';
const router = express.Router();

router.post('/login', adminController.login);

router.put(
    '/doctors/:id/working-hours',
    protect,
    authorize(['admin']),
    adminController.updateDoctorWorkingHours
);

export default router;