import sql from "mssql";
import bcrypt from "bcrypt";
import { connectDB } from "../config/connectDB";
import jwt from "jsonwebtoken";
import dotenv from 'dotenv';

dotenv.config();

export const handleSignUp = async (req, res) => {
  let { username, password, email } = req.body;
  try {
    let dbConn = await connectDB();
    const transaction = new sql.Transaction(dbConn);
    await transaction.begin();
    try {
      const hashedPassword = await bcrypt.hash(password, 10);
      const request = new sql.Request(transaction);
      request.input("username", sql.VarChar, username);
      request.input("password", sql.VarChar, hashedPassword);
      const accountResult = await request.query(`
        INSERT INTO Account (username, password)
        VALUES (@username, @password);
        SELECT id FROM Account WHERE username = @username;`);
      const accountId = accountResult.recordset[0].id;
      request.input("accountId", sql.Int, accountId);
      request.input("email", sql.VarChar, email);
      const uniqueCitizenId = `CID${accountId}`; // Generate a unique citizenId based on accountId
      request.input("citizenId", sql.VarChar, uniqueCitizenId);
      await request.query(`
        INSERT INTO Users (
          id, role, firstName, lastName, citizenId, 
          email, phoneNumber, userAddress, userStatus, cartId
        )
        VALUES (
          @accountId, 
          'user', 
          'DEFAULT_FIRST_NAME', 
          'DEFAULT_LAST_NAME',
          @citizenId, 
          @email, 
          'DEFAULT_PHONE', 
          'DEFAULT_ADDRESS', 
          'active',
          @accountId
        )`);
      await transaction.commit();
      res.json({ success: true, message: "User signed up successfully" });
    } catch (err) {
      await transaction.rollback();
      console.error("Transaction error: ", err);
      res.status(500).json({
        success: false,
        message: "Sign-up failed",
        error: err.message,
      });
    }
  } catch (err) {
    console.error("Sign-up failed: ", err);
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
    let dbConn = await connectDB();
    const request = new sql.Request(dbConn);
    request.input("username", sql.VarChar, username);
    const result = await request.query(`
      SELECT Account.id, Account.password, Users.role 
      FROM Account 
      JOIN Users ON Account.id = Users.id 
      WHERE Account.username = @username
    `);
    if (result.recordset.length === 0) {
      return res.status(401).json({ success: false, message: "Invalid username or password" });
    }
    const user = result.recordset[0];
    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return res.status(401).json({ success: false, message: "Invalid username or password" });
    }
    const token = jwt.sign({ id: user.id, username: username, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.json({ success: true, message: "Sign-in successful", token: token });
    console.log(token);
    const decode = jwt.verify(token, process.env.JWT_SECRET);
    console.log(decode);
  } catch (err) {
    console.error("Sign-in failed: ", err);
    res.status(500).json({ success: false, message: "Sign-in failed", error: err.message });
  }
};

export const getTotalUsers = async (req, res) => {
  try {
    let dbConn = await connectDB();
    console.log("Database connection established");

    const request = new sql.Request(dbConn);
    const result = await request.query(`
      SELECT COUNT(*) as totalUsers 
      FROM Users
    `);
    console.log("Query executed successfully");

    const totalUsers = result.recordset[0].totalUsers;
    console.log("Total users:", totalUsers);

    res.json({ success: true, totalUsers: totalUsers });
  } catch (err) {
    console.error("Failed to get total users:", err);
    res.status(500).json({ success: false, message: "Failed to get total users", error: err.message });
  }
};

export const getAllUsers = async (req, res) => {
  try {
    let dbConn = await connectDB();
    const request = new sql.Request(dbConn);
    const result = await request.query(`
      SELECT id, firstName + ' ' + lastName AS name, phoneNumber, email, role, userStatus as status FROM Users
    `);
    res.json({ success: true, users: result.recordset });
  } catch (err) {
    console.error("Failed to get users:", err);
    res.status(500).json({ success: false, message: "Failed to get users", error: err.message });
  }
};

export const banUser = async (req, res) => {
  let { id } = req.params;
  try {
    let dbConn = await connectDB();
    const request = new sql.Request(dbConn);
    request.input("id", sql.Int, id);
    await request.query(`
      UPDATE Users 
      SET userStatus = 'banned' 
      WHERE id = @id
    `);
    res.send("User banned successfully");
    console.log("User banned successfully");
  } catch (err) {
    console.error("Failed to ban user: ", err);
    res.status(500).send("Failed to ban user");
  }
};

export const unbanUser = async (req, res) => {
  let { id } = req.params;
  try {
    let dbConn = await connectDB();
    const request = new sql.Request(dbConn);
    request.input("id", sql.Int, id);
    await request.query(`
      UPDATE Users 
      SET userStatus = 'active' 
      WHERE id = @id
    `);
    res.send("User unbanned successfully");
    console.log("User unbanned successfully");
  } catch (err) {
    console.error("Failed to unban user: ", err);
    res.status(500).send("Failed to unban user");
  }
};

export const deleteUserById = async (req, res) => {
  let { id } = req.params;
  try {
    let dbConn = await connectDB();
    const transaction = new sql.Transaction(dbConn);
    await transaction.begin();
    try {
      const request = new sql.Request(transaction);
      request.input("id", sql.Int, id);
      await request.query(`
        DELETE FROM BecomeSellerRequest WHERE userId = @id;
        DELETE FROM [Order] WHERE userId = @id;
        DELETE FROM Cart WHERE productId IN (SELECT productId FROM Product WHERE sellerId = @id);
        DELETE FROM ProductRequest WHERE productId IN (SELECT productId FROM Product WHERE sellerId = @id);
        DELETE FROM OrderDetail WHERE productId IN (SELECT productId FROM Product WHERE sellerId = @id);
        DELETE FROM Product WHERE sellerId = @id;
        DELETE FROM ProductRequest WHERE userId = @id;
        DELETE FROM Users WHERE id = @id;
        DELETE FROM Account WHERE id = @id;
      `);
      await transaction.commit();
      res.send("User deleted successfully");
      console.log("User deleted successfully");
    } catch (err) {
      await transaction.rollback();
      console.error("Transaction error: ", err);
      res.status(500).send("Failed to delete user");
    }
  } catch (err) {
    console.error("Failed to delete user: ", err);
    res.status(500).send("Failed to delete user");
  }
};

export const getUserRequests = async (req, res) => {
  try {
    const pool = await connectDB();
    const result = await pool.request().query(`
      SELECT gameRequestId, Users.firstName + ' ' + Users.lastName as userId, requestDate, ProductRequest.[status], [name], [description], price, genre, [image]
      FROM ProductRequest
      JOIN Product ON ProductRequest.productId = Product.productId
      JOIN Users ON ProductRequest.userId = Users.id
    `);
    res.json({ success: true, recordset: result.recordset });
  } catch (err) {
    console.error('Failed to fetch user requests: ', err);
    res.status(500).send('Failed to fetch user requests');
  }
};

export const acceptUserRequestProductUpload = async (req, res) => {
  let { id } = req.params;
  try {
    const pool = await connectDB();
    const transaction = new sql.Transaction(pool);
    await transaction.begin();

    try {
      const request = new sql.Request(transaction);
      request.input('id', sql.Int, id);
      await request.query(`
        UPDATE ProductRequest SET status = 'accepted' WHERE gameRequestId = @id;
        UPDATE Product SET status = 'available' WHERE productId = (SELECT productId FROM ProductRequest WHERE gameRequestId = @id);
      `);
      await transaction.commit();
      res.send('Product request accepted and product status updated successfully');
    } catch (err) {
      await transaction.rollback();
      console.error('Transaction error: ', err);
      res.status(500).send('Failed to accept product request');
    }
  } catch (err) {
    console.error('Failed to accept product request: ', err);
    res.status(500).send('Failed to accept product request');
  }
};

export const declineUserRequestProductUpload = async (req, res) => {
  let { id } = req.params;
  try {
    const pool = await connectDB();
    const transaction = new sql.Transaction(pool);
    await transaction.begin();

    try {
      const request = new sql.Request(transaction);
      request.input('id', sql.Int, id);
      await request.query(`
        UPDATE ProductRequest SET status = 'rejected' WHERE gameRequestId = @id;
      `);
      await transaction.commit();
      res.send('Product request declined successfully');
    } catch (err) {
      await transaction.rollback();
      console.error('Transaction error: ', err);
      res.status(500).send('Failed to decline product request');
    }
  } catch (err) {
    console.error('Failed to decline product request: ', err);
    res.status(500).send('Failed to decline product request');
  }
};

export const getUserPendingBecomeSellerRequests = async (req, res) => {
  try {
    const pool = await connectDB();
    const result = await pool.request().query(`
      SELECT requestId, Users.firstName + ' ' + Users.lastName as name, Users.email, Users.phoneNumber, BecomeSellerRequest.businessName, BecomeSellerRequest.productDescription, BecomeSellerRequest.address, [date], [status]
      FROM BecomeSellerRequest
      JOIN Users ON BecomeSellerRequest.userId = Users.id
    `);
    res.json({ success: true, recordset: result.recordset });
  } catch (err) {
    console.error('Failed to fetch user requests: ', err);
    res.status(500).send('Failed to fetch user requests');
  }
};

export const acceptUserRequestBecomeSeller = async (req, res) => {
  let { id } = req.params;
  try {
    const pool = await connectDB();
    const transaction = new sql.Transaction(pool);
    await transaction.begin();

    try {
      const request = new sql.Request(transaction);
      request.input('id', sql.Int, id);
      await request.query(`
        UPDATE BecomeSellerRequest SET status = 'accepted' WHERE requestId = @id;
        UPDATE Users SET role = 'provider' WHERE id = (SELECT userId FROM BecomeSellerRequest WHERE requestId = @id);
      `);
      await transaction.commit();
      res.send('Become seller request accepted and user role updated successfully');
    } catch (err) {
      await transaction.rollback();
      console.error('Transaction error: ', err);
      res.status(500).send('Failed to accept become seller request');
    }
  } catch (err) {
    console.error('Failed to accept become seller request: ', err);
    res.status(500).send('Failed to accept become seller request');
  }
};

export const declineUserRequestBecomeSeller = async (req, res) => {
  let { id } = req.params;
  try {
    const pool = await connectDB();
    const transaction = new sql.Transaction(pool);
    await transaction.begin();

    try {
      const request = new sql.Request(transaction);
      request.input('id', sql.Int, id);
      await request.query(`
        UPDATE BecomeSellerRequest SET status = 'declined' WHERE requestId = @id;
      `);
      await transaction.commit();
      res.send('Become seller request declined successfully');
    } catch (err) {
      await transaction.rollback();
      console.error('Transaction error: ', err);
      res.status(500).send('Failed to decline become seller request');
    }
  } catch (err) {
    console.error('Failed to decline become seller request: ', err);
    res.status(500).send('Failed to decline become seller request');
  }
};