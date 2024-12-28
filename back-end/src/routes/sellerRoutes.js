const express = require("express");
const router = express.Router();
const { submitSellerRequest } = require("../controllers/sellerController");
const { verifyToken } = require("../middleware/authMiddleware");

router.post("/api/seller/request", verifyToken, submitSellerRequest);

module.exports = router;
