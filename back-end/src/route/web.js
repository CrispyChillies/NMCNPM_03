import express from "express";
import searchController from "../controllers/searchController.js";

let router = express.Router();

let initWebRoutes = (app) => {
    router.get('/api/search', searchController.handleSearch);
    return app.use("/", router);
}

module.exports = initWebRoutes;