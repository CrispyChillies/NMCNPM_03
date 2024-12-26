import express from "express";
import { handleSignUp, handleSignIn } from "../controllers/userController";
import {
  validateSignUp,
  validateSignIn,
} from "../middleware/validationMiddleware";

const router = express.Router();

router.post("/api/signup", validateSignUp, handleSignUp);
router.post("/api/signin", validateSignIn, handleSignIn);

export default router;
