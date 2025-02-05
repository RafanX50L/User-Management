import { Request, Response } from 'express';
import User from '../models/User';
import jwt from 'jsonwebtoken';

const generateToken = (user: any) => {
  return jwt.sign(
    { id: user._id, role: user.role },
    process.env.JWT_SECRET!,
    { expiresIn: '1d' }
  );
};

export const register = async (req: Request, res: Response) => {
  try {
    const { name, email, password, role } = req.body;
    console.log(req.body)

    // Check if user exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
       res.status(400).json({ message: 'User already exists' });
       return
    }

    // Create new user
    const user = await User.create({ name, email, password, role });

    // Generate JWT
    const token = generateToken(user);

    res.status(201).json({ token, role: user.role, id: user.id });
    return
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

export const login = async (req: Request, res: Response) => {
  try {
    console.log('logaof')
    const { email, password } = req.body;

    // Find user
    const user = await User.findOne({ email });
    if (!user) {
      res.status(400).json({ message: 'Invalid credentials' });
      return
    }

    // Check password
    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      res.status(400).json({ message: 'Invalid credentials' });
      return
    }
 
    // Generate JWT
    const token = generateToken(user);

    res.json({ token, role: user.role, id: user.id });
    return
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};