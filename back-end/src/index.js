import express from "express";
import { connectDB } from "./config/connectDB.js";
import { handleSignUp, handleSignIn } from "./controllers/userController.js";
import {
  validateSignUp,
  validateSignIn,
} from "./middleware/validationMiddleware.js";

const app = express();
const port = 6969;

app.use(express.json());

// API Routes
app.post("/api/signup", validateSignUp, handleSignUp);
app.post("/api/signin", validateSignIn, handleSignIn);

app.listen(port, async () => {
  await connectDB();
  console.log(`Server is running on http://localhost:${port}`);
});
