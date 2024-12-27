import sql from 'mssql';
import { connectDB } from '../config/connectDB.js';

export const validateSignUp = async (req, res, next) => {
  const { username, password, email } = req.body;
  try {
    const pool = await connectDB();
    const request = new sql.Request(pool);
    request.input('username', sql.VarChar, username);
    request.input('email', sql.VarChar, email);

    if (!username || !password || !email) {
      return res.status(400).json({
        error: true,
        message: "Username, password and email are required",
      });
    }
  
    if (password.length < 6) {
      return res.status(400).json({
        error: true,
        message: "Password must be at least 6 characters long",
      });
    }
  
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({
        error: true,
        message: "Please provide a valid email address",
      });
    }

    // Kiểm tra username
    const usernameResult = await request.query('SELECT * FROM Account WHERE username = @username');
    if (usernameResult.recordset.length > 0) {
      return res.status(400).json({
        error: true,
        message: "Username is already taken",
      });
    }

    // Kiểm tra email
    const emailResult = await request.query('SELECT * FROM Users WHERE email = @email');
    if (emailResult.recordset.length > 0) {
      return res.status(400).json({
        error: true,
        message: "Email is already taken",
      });
    }

    next();
  } catch (err) {
    console.error("Database error: ", err);
    res.status(500).json({
      error: true,
      message: "Internal Server Error",
    });
  }
};

export const validateSignIn = (req, res, next) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({
      error: true,
      message: "Username and password are required",
    });
  }

  next();
};