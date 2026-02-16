import crypto from "crypto";
import Otp from "../models/otp.model.js";

const OTP_EXPIRY_MINUTES = 5;
const MAX_ATTEMPTS = 5;

const generateOtp = () => {
  return Math.floor(100000 + Math.random() * 900000).toString();
};

const hashOtp = (otp) => {
  return crypto.createHash("sha256").update(otp).digest("hex");
};

export const createAndStoreOtp = async (email) => {
  const otp = generateOtp();
  const otpHash = hashOtp(otp);

  const expiresAt = new Date(Date.now() + OTP_EXPIRY_MINUTES * 60 * 1000);

  await Otp.findOneAndUpdate(
    { email },
    { otpHash, expiresAt, attempts: 0 },
    { upsert: true, new: true }
  );

  return otp;
};

export const verifyStoredOtp = async (email, otp) => {
  const record = await Otp.findOne({ email });

  if (!record) {
    throw new Error("OTP not found");
  }

  if (record.attempts >= MAX_ATTEMPTS) {
    throw new Error("Too many attempts");
  }

  const hashedInput = hashOtp(otp);

  if (hashedInput !== record.otpHash) {
    record.attempts += 1;
    await record.save();
    throw new Error("Invalid OTP");
  }

  await Otp.deleteOne({ email });
  return true;
};