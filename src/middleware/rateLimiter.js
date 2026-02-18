import rateLimit from 'express-rate-limit';

export const globalLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100, //100 requests per IP
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    success: false,
    message: 'Too many requests. Please try again later.'
  }
});

export const otpLimiter = rateLimit({
  windowMs: 10 * 60 * 1000,
  max: 3, // only 3 Otp requests
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    success: false,
    message: 'Too many OTP requests. Try again after 10 minutes.'
  }
});