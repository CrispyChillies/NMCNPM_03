import express from "express";
import cors from "cors";
import { verifyToken, checkRole } from "../middleware/authMiddleware.js";
import { validateSignUp, validateSignIn } from "../middleware/validationMiddleware";
import { getProducts, getProductById, getAllProducts, deleteProductById, getTotalProducts } from "../controllers/productController.js";
import { getAllOrders, createOrder, getLatestUserOrder, getTotalOrderCount, getTotalSales, getTotalPendingOrders } from "../controllers/orderController.js";
import { addToCart, viewCart, removeFromCart, updateCartQuantity } from '../controllers/cartController.js';
import { getUserPendingBecomeSellerRequests, acceptUserRequestBecomeSeller, declineUserRequestBecomeSeller, getUserRequests, acceptUserRequestProductUpload, declineUserRequestProductUpload, handleSignUp, handleSignIn, getTotalUsers, getAllUsers, banUser, unbanUser, deleteUserById } from "../controllers/userController";
import { handlePaymentCallback } from "../controllers/paymentController.js";

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
    router.get("/api/admin/orders/count", verifyToken, checkRole(['admin']), getTotalOrderCount);
    router.get("/api/admin/orders/sales", verifyToken, checkRole(['admin']), getTotalSales);
    router.get("/api/admin/orders/pending", verifyToken, checkRole(['admin']), getTotalPendingOrders);
    router.get("/api/admin/users/count", verifyToken, checkRole(['admin']), getTotalUsers);
    router.get("/api/admin/products", verifyToken, checkRole(['admin']), getAllProducts);
    router.get("/api/admin/products/count", verifyToken, checkRole(['admin']), getTotalProducts);
    router.delete("/api/admin/products/:id", verifyToken, checkRole(['admin']), deleteProductById);
    router.get('/api/admin/users', verifyToken, checkRole(['admin']), getAllUsers);
    router.post('/api/admin/users/:id/ban', verifyToken, checkRole(['admin']), banUser);
    router.post('/api/admin/users/:id/unban', verifyToken, checkRole(['admin']), unbanUser);
    router.delete('/api/admin/users/:id', verifyToken, checkRole(['admin']), deleteUserById);
    router.get('/api/admin/orders', verifyToken, checkRole(['admin']), getAllOrders);
    router.get('/api/admin/game-requests', verifyToken, checkRole(['admin']), getUserRequests);
    router.post('/api/admin/game-requests/:id/accept', verifyToken, checkRole(['admin']), acceptUserRequestProductUpload);
    router.post('/api/admin/game-requests/:id/decline', verifyToken, checkRole(['admin']), declineUserRequestProductUpload);
    router.get('/api/admin/become-seller-requests', verifyToken, checkRole(['admin']), getUserPendingBecomeSellerRequests);
    router.post('/api/admin/become-seller-requests/:id/accept', verifyToken, checkRole(['admin']), acceptUserRequestBecomeSeller);
    router.post('/api/admin/become-seller-requests/:id/decline', verifyToken, checkRole(['admin']), declineUserRequestBecomeSeller);
    app.use("/", router);
}

module.exports = initWebRoutes;