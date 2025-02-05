import express from "express";
import { verifyToken, checkRole } from "../middleWare/auth";
import { fetchData, updateData } from "../controllers/userController";

const router = express.Router();
const funcitonlog = ()=>{
    console.log('fsdfsdfda');
}

router.post("/update",funcitonlog, verifyToken, checkRole(["user"]), updateData);
router.get("/fetch", verifyToken, checkRole(["user"]), fetchData)

export default router;
