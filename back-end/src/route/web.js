import express from "express";
import cors from "cors";
import { getProducts, getProductById } from "../controllers/productController.js";

let router = express.Router();

let initWebRoutes = (app) => {
    app.use(cors()); // Enable CORS
    router.get('/api/game', getProducts);
    router.get('/api/game/:productId', getProductById); // Add this line
    return app.use("/", router);
}

module.exports = initWebRoutes;