import express from "express";
import { getProductDetail } from "../controllers/productDetailController"; // Ensure correct import

const router = express.Router();

const testRoute = (app) => {
    // Define the test route
    router.get("/api/product/:productID", getProductDetail);

    // Attach the router to the app
    app.use("/", router);

    return app;
};

export default testRoute; // Use ES6 export syntax
