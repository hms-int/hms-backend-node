import { createOrder } from '../services/payment.service.js';

export const createPaymentOrder = async (req, res, next) => {
  try {
    const { amount } = req.body;

    const order = await createOrder(amount);

    res.status(200).json({
      success: true,
      order
    });

  } catch (error) {
    next(error);
  }
};