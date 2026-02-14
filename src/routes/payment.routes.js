import express from 'express';
import { createPaymentOrder } from '../controllers/payment.controller.js';

const router = express.Router();

router.post('/create-payment', createPaymentOrder);

export default router;