import express from "express";
import cors from "cors";
import { getProducts } from "../controllers/productController.js";

let router = express.Router();

let initWebRoutes = (app) => {
    app.use(cors()); // Enable CORS
    router.get('/api/game', getProducts);
    return app.use("/", router);
}

module.exports = initWebRoutes;