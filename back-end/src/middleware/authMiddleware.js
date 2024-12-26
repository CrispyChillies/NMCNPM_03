import jwt from "jsonwebtoken";
import sql from "mssql2";
import { connectDB } from "../config/connectDB";

export const verifyToken = async (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];

    if (!token) {
      return res.status(401).json({ error: "No token provided" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.userId = decoded.id; // Match the Account.id field
    next();
  } catch (error) {
    return res.status(401).json({ error: "Invalid token" });
  }
};

export const isAdmin = async (req, res, next) => {
  try {
    const pool = await connectDB();
    const result = await pool.request().input("userId", sql.Int, req.userId)
      .query(`
                SELECT role 
                FROM Users 
                WHERE id = @userId AND role = 'admin' AND userStatus = 'active'
            `);

    if (!result.recordset[0]) {
      return res.status(403).json({ error: "Access denied" });
    }

    next();
  } catch (error) {
    console.error("Error checking admin status:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const isActive = async (req, res, next) => {
  try {
    const pool = await connectDB();
    const result = await pool.request().input("userId", sql.Int, req.userId)
      .query(`
                SELECT userStatus 
                FROM Users 
                WHERE id = @userId AND userStatus = 'active'
            `);

    if (!result.recordset[0]) {
      return res.status(403).json({ error: "Account is not active" });
    }

    next();
  } catch (error) {
    console.error("Error checking user status:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};
