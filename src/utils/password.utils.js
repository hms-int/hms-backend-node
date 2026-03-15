import crypto from 'crypto';

export const generateRandomPassword = (length = 10) => {
  return crypto
    .randomBytes(length)
    .toString('base64')
    .slice(0, length);
};