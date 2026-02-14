import crypto from 'crypto';
import bcrypt from 'bcrypt';
import OTP from '../models/otp.js';
import { brevoEmailClient } from '../config/brevo.js';

export const generateOTP = () => {
  return crypto.randomInt(100000, 999999).toString();
};

export const sendOTPEmail = async (email, otp) => {
  await brevoEmailClient.sendTransacEmail({
    sender: { email: process.env.BREVO_SENDER_EMAIL },
    to: [{ email }],
    subject: 'Your OTP Code',
    htmlContent: `<h2>Your OTP is: ${otp}</h2><p>Valid for ${process.env.OTP_EXPIRE_MINUTES} minutes.</p>`
  });
};

export const createAndSendOTP = async (email) => {
  const otp = generateOTP();
  const hashedOTP = await bcrypt.hash(otp, 10);

  const expireTime = new Date(Date.now() + process.env.OTP_EXPIRE_MINUTES * 60000);

  await OTP.findOneAndDelete({ email });

  await OTP.create({
    email,
    otp: hashedOTP,
    expiresAt: expireTime
  });

  await sendOTPEmail(email, otp);
};

export const verifyOTP = async (email, enteredOTP) => {
  const record = await OTP.findOne({ email });

  if (!record) {
    throw new Error('OTP expired or not found');
  }

  const isValid = await bcrypt.compare(enteredOTP, record.otp);

  if (!isValid) {
    throw new Error('Invalid OTP');
  }

  await OTP.deleteOne({ email });

  return true;
};