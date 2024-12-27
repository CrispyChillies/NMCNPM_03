import express from "express";
import { handleSignUp, handleSignIn } from "../controllers/userController.js";
import {
  validateSignUp,
  validateSignIn,
} from "../middleware/validationMiddleware.js";

const router = express.Router();

router.post("/api/signup", validateSignUp, handleSignUp);
router.post("/api/signin", validateSignIn, handleSignIn);

export default router;
