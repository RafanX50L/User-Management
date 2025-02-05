import express from "express";
import { verifyToken, checkRole } from "../middleWare/auth";
import { fetchData, updateData, uploadProfileImage } from "../controllers/userController";
import upload from "../config/multer";

const router = express.Router();


router.post("/upload",upload.single("profileImage"), uploadProfileImage);


router.post("/update", updateData);
router.get("/fetch/:id", verifyToken, checkRole(["user"]), fetchData);

export default router;
