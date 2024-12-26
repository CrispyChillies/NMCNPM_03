import sql from "mssql2";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { connectDB } from "../config/connectDB";

export const handleSignIn = async (req, res) => {
  const { username, password } = req.body;

  try {
    const pool = await connectDB();

    // First check if the account exists and get the password
    const accountResult = await pool
      .request()
      .input("username", sql.VarChar, username).query(`
                SELECT a.id, a.password, u.role, u.userStatus
                FROM Account a
                JOIN Users u ON a.id = u.id
                WHERE a.username = @username
            `);

    const user = accountResult.recordset[0];

    if (!user) {
      return res.status(401).json({
        success: false,
        message: "Invalid credentials",
      });
    }

    // Check if user is banned
    if (user.userStatus === "banned") {
      return res.status(403).json({
        success: false,
        message: "Account has been banned",
      });
    }

    // Verify password
    const isValid = await bcrypt.compare(password, user.password);

    if (!isValid) {
      return res.status(401).json({
        success: false,
        message: "Invalid credentials",
      });
    }

    // Generate JWT token
    const token = jwt.sign(
      {
        id: user.id,
        role: user.role,
      },
      process.env.JWT_SECRET,
      { expiresIn: "24h" }
    );

    res.json({
      success: true,
      token,
      user: {
        id: user.id,
        role: user.role,
        status: user.userStatus,
      },
    });
  } catch (err) {
    console.error("Sign-in error:", err);
    res.status(500).json({
      success: false,
      message: "Sign-in failed",
      error: err.message,
    });
  }
};

export const handleSignUp = async (req, res) => {
  const { username, password, email } = req.body;

  try {
    const pool = await connectDB();
    const transaction = new sql.Transaction(pool);

    await transaction.begin();

    try {
      // Check if username already exists
      const existingUser = await transaction
        .request()
        .input("username", sql.VarChar, username).query(`
          SELECT id FROM Account WHERE username = @username
        `);

      if (existingUser.recordset.length > 0) {
        return res.status(400).json({
          success: false,
          message: "Username already exists",
        });
      }

      // Hash password
      const hashedPassword = await bcrypt.hash(password, 10);

      // Insert into Account table
      const accountResult = await transaction
        .request()
        .input("username", sql.VarChar, username)
        .input("password", sql.VarChar, hashedPassword).query(`
          INSERT INTO Account (username, password)
          OUTPUT INSERTED.id
          VALUES (@username, @password)
        `);

      const userId = accountResult.recordset[0].id;

      // Insert into Users table with minimal information
      await transaction
        .request()
        .input("id", sql.Int, userId)
        .input("email", sql.VarChar, email).query(`
          INSERT INTO Users (
            id, role, email, userStatus
          )
          VALUES (
            @id, 'buyer', @email, 'active'
          )
        `);

      await transaction.commit();

      res.status(201).json({
        success: true,
        message: "User registered successfully",
      });
    } catch (err) {
      await transaction.rollback();
      throw err;
    }
  } catch (err) {
    console.error("Sign-up error:", err);
    res.status(500).json({
      success: false,
      message: "Sign-up failed",
      error: err.message,
    });
  }
};
