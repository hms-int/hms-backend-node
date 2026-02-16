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
    subject: 'Your One-Time Password (OTP) – Secure Verification',
    htmlContent: `
      <div style="font-family: Arial, sans-serif; background-color: #f4f6f8; padding: 20px;">
        <div style="max-width: 600px; margin: 0 auto; background-color: #ffffff; padding: 30px; border-radius: 8px; box-shadow: 0 2px 8px rgba(0,0,0,0.05);">
          
          <h2 style="color: #333333; margin-bottom: 10px;">Verification Required</h2>
          
          <p style="color: #555555; font-size: 14px; line-height: 1.6;">
            Dear User,
          </p>
          
          <p style="color: #555555; font-size: 14px; line-height: 1.6;">
            We received a request to verify your identity. Please use the One-Time Password (OTP) below to proceed:
          </p>
          
          <div style="text-align: center; margin: 25px 0;">
            <span style="display: inline-block; font-size: 28px; font-weight: bold; letter-spacing: 4px; color: #1a73e8; background-color: #f1f3f4; padding: 12px 24px; border-radius: 6px;">
              ${otp}
            </span>
          </div>
          
          <p style="color: #555555; font-size: 14px; line-height: 1.6;">
            This OTP is valid for <strong>${process.env.OTP_EXPIRE_MINUTES} minutes</strong>. 
            For security reasons, please do not share this code with anyone.
          </p>
          
          <p style="color: #555555; font-size: 14px; line-height: 1.6;">
            If you did not request this verification, you may safely ignore this email.
          </p>
          
          <hr style="border: none; border-top: 1px solid #eeeeee; margin: 30px 0;" />
          
          <p style="color: #888888; font-size: 12px; line-height: 1.5;">
            This is an automated message. Please do not reply to this email.
          </p>
          
          <p style="color: #888888; font-size: 12px;">
            © ${new Date().getFullYear()} HMS Team. All rights reserved.
          </p>
          
        </div>
      </div>
    `
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