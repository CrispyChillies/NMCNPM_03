import express from "express";
import cors from "cors";
import { getProducts, getProductById, getAllProducts } from "../controllers/productController.js";
import { handleSignUp, handleSignIn, getAllUsers,banUser, getAllOrders } from "../controllers/userController";
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
    // router.delete('/api/users/:id', deleteUser);

    // Game management routes
    router.get('/api/products', getAllProducts); // Add the new route

    // Order management routes
    router.get('/api/orders', getAllOrders); // Add the new route

    return app.use("/", router);
}

module.exports = initWebRoutes;