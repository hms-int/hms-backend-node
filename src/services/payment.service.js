import razorpay from '../config/razorpay.js';

export const createOrder = async (amount) => {
  const options = {
    amount: amount * 100,
    currency: 'INR',
    receipt: `receipt_${Date.now()}`
  };

  const order = await razorpay.orders.create(options);
  return order;
};