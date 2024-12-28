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
import { createOrder, getLatestUserOrder} from "../controllers/orderController.js";
import { handlePaymentCallback } from "../controllers/paymentController.js";
import { checkRole } from "../middleware/authMiddleware.js";

let router = express.Router();

let initWebRoutes = (app) => {
    app.use(cors()); // Enable CORS
    router.get('/api/game', getProducts);
    router.get('/api/game/:productId', getProductById);
    router.post("/api/signup", validateSignUp, handleSignUp);
    router.post("/api/signin", validateSignIn, handleSignIn);
    router.post("/api/cart", verifyToken, checkRole(['user']), addToCart);
    router.get("/api/cart", verifyToken, checkRole(['user']), viewCart);
    router.delete("/api/cart/:productId", verifyToken, checkRole(['user']), removeFromCart);
    router.put("/api/cart/:productId", verifyToken, checkRole(['user']), updateCartQuantity);
    router.post("/api/order", verifyToken, checkRole(['user']), createOrder);
    router.post("/api/payment/callback", handlePaymentCallback);
    router.get("/api/latest_order", verifyToken, checkRole(['user']), getLatestUserOrder);
    
    return app.use("/", router);
}

module.exports = initWebRoutes;