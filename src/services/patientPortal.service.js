import bcrypt from 'bcrypt';
import User from '../models/User.js';
import { generateRandomPassword } from '../utils/password.utils.js';
import { sendCredentialsEmail } from './email.service.js';

export const createPatientPortalAccount = async (email) => {

  try {const existingUser = await User.findOne({ email });

  if (existingUser) {
    return;
  }

  const rawPassword = generateRandomPassword(10);

  const hashedPassword = await bcrypt.hash(rawPassword, 10);

  const user = new User({
    email,
    password: hashedPassword,
    role: "patient",
    status: "Active",
    mustChangePassword: true
  });

  await user.save();

  await sendCredentialsEmail(email, rawPassword);
} catch (err) {
  console.error("Patient pirtal account creation failed:", err);
}
};