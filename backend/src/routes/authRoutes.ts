import { Router } from "express";
import { registerUser, loginUser, getProfile, verifyToken } from "../controllers/authController";
import { protect } from "../middlerware/authMiddleware";

const router = Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/profile", protect, getProfile);
router.post("/verify", verifyToken)

export default router;