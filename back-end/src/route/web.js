import express from "express";
import cors from "cors";
import {
  getProducts,
  getProductById,
} from "../controllers/productController.js";
import { handleSignUp, handleSignIn } from "../controllers/userController";
import {
  validateSignUp,
  validateSignIn,
} from "../middleware/validationMiddleware.js";

let router = express.Router();

let initWebRoutes = (app) => {
  app.use(cors()); // Enable CORS
  router.get("/api/game", getProducts);
  router.get("/api/game/:productId", getProductById); // Add this line
  router.post("/api/signup", validateSignUp, handleSignUp);
  router.post("/api/signin", validateSignIn, handleSignIn);
  return app.use("/", router);
};

module.exports = initWebRoutes;
