import bcrypt from 'bcrypt';
import ErrorResponse from '../utils/error.js';

// hash password
export const hashPassword = async (password) => {
  try {
    const saltRound = 10;
    const hashedPassword = await bcrypt.hash(password, saltRound);
    return hashedPassword;
  } catch (err) {
    return new ErrorResponse(err?.message, 500);
  }
};

// compare password
export const comparePassword = async (hashedPassword, password) => {
  return await bcrypt.compare(password, hashedPassword);
};
