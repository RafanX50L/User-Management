import express from 'express';
import { verifyToken, checkRole } from '../middleWare/auth';
import { addUser, deleteUser, fetchUsers, updateUser } from '../controllers/adminController';

const router = express.Router();

router.get('/fetch', verifyToken, checkRole(["admin"]), fetchUsers);
router.post('/addUser', verifyToken, checkRole(["admin"]), addUser)
router.post('/updateUser', verifyToken, checkRole(["admin"]), updateUser)
router.post('/deleteUser/:id', verifyToken, checkRole(["admin"]), deleteUser)

export default router;