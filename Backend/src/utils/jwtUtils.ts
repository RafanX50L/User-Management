import jwt from 'jsonwebtoken';
import { IUser } from '../models/User';

const JWT_SECRET = process.env.JWT_SECRET || 'your_jwt_secret_key';

export const generateToken = (user: IUser) => {
  return jwt.sign({ id: user._id, role: user.role }, JWT_SECRET, {
    expiresIn: '1h',
  });
};

export const verifyToken = (token: string) => {
  return jwt.verify(token, JWT_SECRET);
};