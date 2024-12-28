import express from "express";
import { verifyToken } from "../middleware/authMiddleware.js";
import {
  updatePersonalInfo,
  getUserProfile,
  // ... other controller imports
} from "../controllers/userController.js";

const router = express.Router();

// Add these routes
router.get("/api/users/profile/:id", verifyToken, getUserProfile);
router.put("/api/users/profile/:id", verifyToken, updatePersonalInfo);

export default router;
