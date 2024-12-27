import express from "express";
import cors from "cors";
import { getProducts, getProductById, getAllProducts, getTotalProducts, getCountPendingOrder, getTotalSales, deleteProductById } from "../controllers/productController.js";
import { handleSignUp, handleSignIn, getAllUsers, banUser, unbanUser, getAllOrders, acceptUserRequestProductUpload, getUserRequests, declineUserRequestProductUpload, getUserPendingBecomeSellerRequests, acceptUserRequestBecomeSeller, declineUserRequestBecomeSeller, getTotalUsers, deleteUser, deleteUserById } from "../controllers/userController";
import {
  validateSignUp,
  validateSignIn,
} from "../middleware/validationMiddleware";


let router = express.Router();

let initWebRoutes = (app) => {
    app.use(cors()); // Enable CORS
    router.get('/api/game', getProducts);
    router.get('/api/game/:productId', getProductById); // Add this line
    router.post("/api/signup", validateSignUp, handleSignUp);
    router.post("/api/signin", validateSignIn, handleSignIn);

    // User management routes
    router.get('/api/users', getAllUsers);
    router.put('/api/users/ban/:id', banUser);
    router.put('/api/users/unban/:id', unbanUser);
    router.get('/api/users/total', getTotalUsers);
    router.delete('/api/users/delete/:id', deleteUserById);

    // Product Upload Request management routes
    router.get('/api/users/request-pending', getUserRequests)
    router.put('/api/users/request-product-upload/:id', acceptUserRequestProductUpload);
    router.put('/api/users/decline-request-product-upload/:id', declineUserRequestProductUpload);
    
    // Become Seller Request management routes
    router.get('/api/users/become-seller-requests', getUserPendingBecomeSellerRequests);
    router.put('/api/users/become-seller-requests/:id', acceptUserRequestBecomeSeller);
    router.put('/api/users/decline-become-seller-requests/:id', declineUserRequestBecomeSeller);
    
    // Game management routes
    router.get('/api/products', getAllProducts); // Add the new route
    router.get('/api/products/total', getTotalProducts); // Add this line
    router.put('/api/products/delete/:id', deleteProductById); // Add this line

    // Order management routes
    router.get('/api/orders', getAllOrders); // Add the new route
    router.get('/api/orders/pending', getCountPendingOrder); // Add this line

    // Get sales data
    router.get('/api/sales', getTotalSales); // Add this line

    return app.use("/", router);
}

module.exports = initWebRoutes;