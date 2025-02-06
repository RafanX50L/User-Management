import express from 'express';
import { verifyToken, checkRole } from '../middleWare/auth';
import { addUser, fetchUsers } from '../controllers/adminController';

const router = express.Router();

router.get('/fetch',  fetchUsers);
router.post('/addUser', addUser)

export default router;