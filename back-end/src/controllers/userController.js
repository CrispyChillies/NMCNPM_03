import sql from "mssql2";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { connectDB } from "../config/connectDB.js";

export const handleSignUp = async (req, res) => {
  const { username, password, email } = req.body;

  try {
    const pool = await connectDB();

    // 1) Check if username exists
    const existingUserResult = await pool
      .request()
      .input("username", sql.VarChar, username).query(`
        SELECT id FROM dbo.Account 
        WHERE username = @username
      `);

    if (existingUserResult.recordset?.length > 0) {
      return res.status(400).json({
        success: false,
        message: "Username already exists",
      });
    }

    // 2) Check if email exists
    const existingEmailResult = await pool
      .request()
      .input("email", sql.VarChar, email).query(`
        SELECT id FROM dbo.Users 
        WHERE email = @email
      `);

    if (existingEmailResult.recordset?.length > 0) {
      return res.status(400).json({
        success: false,
        message: "Email already exists",
      });
    }

    // 3) Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // 4) Begin transaction
    const transaction = new sql.Transaction(pool);
    await transaction.begin();

    try {
      // 4a) Insert into Account table
      const accountResult = await transaction
        .request()
        .input("username", sql.VarChar, username)
        .input("password", sql.VarChar, hashedPassword).query(`
          INSERT INTO dbo.Account (username, password)
          VALUES (@username, @password);
          SELECT CAST(SCOPE_IDENTITY() as int) AS id;
        `);

      if (!accountResult.recordset?.[0]?.id) {
        throw new Error("Failed to create account");
      }
      const userId = accountResult.recordset[0].id;

      // 4b) Insert into Users table using same id
      // Because the Users table is also IDENTITY, turn IDENTITY_INSERT ON
      await transaction.request().query(`
        SET IDENTITY_INSERT dbo.Users ON;
      `);

      await transaction
        .request()
        .input("userId", sql.Int, userId)
        .input("email", sql.VarChar, email).query(`
          INSERT INTO dbo.Users (
            id, role, firstName, lastName, 
            citizenId, email, phoneNumber, 
            userAddress, userStatus
          )
          VALUES (
            @userId, 
            'buyer', 
            'Default', 
            'User', 
            CONCAT('CID', @userId), 
            @email, 
            'Not Set', 
            'Not Set', 
            'active'
          );
        `);

      await transaction.request().query(`
        SET IDENTITY_INSERT dbo.Users OFF;
      `);

      // 4c) Commit transaction
      await transaction.commit();

      // 5) Respond with success
      res.status(201).json({
        success: true,
        message: "User registered successfully",
        userId: userId,
      });
    } catch (err) {
      // Rollback on error
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

export const handleSignIn = async (req, res) => {
  const { username, password } = req.body;

  try {
    const pool = await connectDB();

    // 1) Get user from Account table
    const userResult = await pool
      .request()
      .input("username", sql.VarChar, username).query(`
        SELECT a.id, a.username, a.password, u.role, u.userStatus
        FROM dbo.Account a
        LEFT JOIN dbo.Users u ON a.id = u.id
        WHERE a.username = @username
      `);

    if (!userResult.recordset || userResult.recordset.length === 0) {
      return res.status(401).json({
        success: false,
        message: "Invalid username or password",
      });
    }

    const user = userResult.recordset[0];

    // 2) Check if user is banned or inactive
    if (user.userStatus === "banned" || user.userStatus === "inactive") {
      return res.status(403).json({
        success: false,
        message: "Account is not active",
      });
    }

    // 3) Verify password
    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
      return res.status(401).json({
        success: false,
        message: "Invalid username or password",
      });
    }

    // 4) Generate JWT token
    const token = jwt.sign(
      {
        id: user.id,
        username: user.username,
        role: user.role,
      },
      process.env.JWT_SECRET,
      { expiresIn: "24h" }
    );

    // 5) Respond with success
    res.status(200).json({
      success: true,
      message: "Sign-in successful",
      token: token,
      user: {
        id: user.id,
        username: user.username,
        role: user.role,
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
