import crypto from 'crypto';
import bcrypt from 'bcrypt';
import OTP from '../models/otp.model.js';
import { sendOTPEmail } from './email.service.js';

const OTP_EXPIRY_MINUTES = 5;

export const generateOTP = () => {
  return crypto.randomInt(100000, 999999).toString();
};

export const createAndSendOTP = async (email) => {
  const otp = generateOTP();
  const hashedOTP = await bcrypt.hash(otp, 10);

  const expiresAt = new Date(Date.now() + OTP_EXPIRY_MINUTES * 60 * 1000);

  await OTP.findOneAndDelete({ email });

  await OTP.create({
    email,
    otp: hashedOTP,
    expiresAt
  });

  await sendOTPEmail(email, otp);
};

export const verifyOTP = async (email, enteredOTP) => {
  const record = await OTP.findOne({ email });

  if (!record) {
    throw new Error('OTP expired or not found');
  }

  const isMatch = await bcrypt.compare(enteredOTP, record.otp);

  if (!isMatch) {
    throw new Error('Invalid OTP');
  }

  await OTP.deleteOne({ email });

  return true;
};