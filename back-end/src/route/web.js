import express from "express";
import cors from "cors";
import { getProducts, getProductById } from "../controllers/productController.js";
import { handleSignUp, handleSignIn } from "../controllers/userController";
import { addToCart, viewCart, removeFromCart, updateCartQuantity, checkUserRole } from '../controllers/cartController.js';
import { verifyToken } from "../middleware/authMiddleware.js";
import {
  validateSignUp,
  validateSignIn,
} from "../middleware/validationMiddleware";
import { createOrder,  getLatestUserOrder} from "../controllers/orderController.js";
import { handlePaymentCallback } from "../controllers/paymentController.js";

let router = express.Router();

let initWebRoutes = (app) => {
    app.use(cors()); // Enable CORS
    router.get('/api/game', getProducts);
    router.get('/api/game/:productId', getProductById); // Add this line
    router.post("/api/signup", validateSignUp, handleSignUp);
    router.post("/api/signin", validateSignIn, handleSignIn);
    router.post("/api/cart", verifyToken, checkUserRole, addToCart); // Add this line
    router.get("/api/cart", verifyToken, checkUserRole, viewCart); // Add this line
    router.delete("/api/cart/:productId", verifyToken, checkUserRole, removeFromCart); // Update this line
    router.put("/api/cart/:productId", verifyToken, checkUserRole, updateCartQuantity); // Update this line
    router.post("/api/order", verifyToken, checkUserRole, createOrder);
    router.post("/api/payment/callback", handlePaymentCallback);
    router.get("/api/latest_order", verifyToken, checkUserRole, getLatestUserOrder); // Changed from POST to GET
    return app.use("/", router);
}

module.exports = initWebRoutes;