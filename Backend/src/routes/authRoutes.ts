import express from 'express';
import { register, login } from '../controllers/authController';
import { verifyToken, checkRole } from '../middleWare/auth';

const router = express.Router();
// verifyToken,checkRole(['user']),

router.post('/register',  register);
router.post('/login',  login);

export default router;