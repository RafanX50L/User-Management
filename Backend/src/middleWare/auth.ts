import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import User, { IUser } from '../models/User';

declare global {
  namespace Express {
    interface Request {
      user?: IUser;
    }
  }
}

export const verifyToken = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const token = req.headers.authorization?.split(' ')[1];
    
    if (!token) {
      res.status(401).json({ message: 'Authentication required' });
      return
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as {
      id: string;
      role: 'user' | 'admin';
    };

    const user = await User.findById(decoded.id).select('-password');
    
    if (!user) {
        res.status(401).json({ message: 'User not found' });
        return
    }

    req.user = user;
    next();
  } catch (error) {
    res.status(401).json({ message: 'Invalid or expired token' });
    return
  }
};

export const checkRole = (roles: ('admin' | 'user')[]) => {
  return (req: Request, res: Response, next: NextFunction) => {
    if (!roles.includes(req.user!.role)) {
        res.status(403).json({ message: 'Unauthorized access' });
        return
    }
    next();
  };
};