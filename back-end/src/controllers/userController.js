import sql from "mssql";
import bcrypt from "bcrypt";
import { connectDB } from "../config/connectDB";
import jwt from "jsonwebtoken";

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
        OUTPUT INSERTED.id
        VALUES (@username, @password)`);

      const accountId = accountResult.recordset[0].id;

      request.input("accountId", sql.Int, accountId);
      request.input("email", sql.VarChar, email);

      await request.query(`
        INSERT INTO Users (
          id, role, firstName, lastName, citizenId, 
          email, phoneNumber, userAddress, userStatus
        )
        VALUES (
          @accountId, 
          'buyer', 
          @username, 
          'User', 
          'DEFAULT_ID', 
          @email, 
          'DEFAULT_PHONE', 
          'DEFAULT_ADDRESS', 
          'active'
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
  // Implement sign-in logic here
};

let getAllUsers = async (req, res) => {
  try {
    await connectDB();
    const result =
      await sql.query`SELECT id, firstName + ' ' + lastName AS name, email, role, userStatus as status FROM Users`;
    res.json(result);
    console.log(result);
  } catch (err) {
    console.error("Failed to fetch users: ", err);
    res.status(500).send("Failed to fetch users");
  }
};

let banUser = async (req, res) => {
  let { id } = req.params;

  try {
    await connectDB();
    await sql.query`UPDATE Account SET status = 'banned' WHERE id = ${id}`;
    res.send("User banned successfully");
  } catch (err) {
    console.error("Failed to ban user: ", err);
    res.status(500).send("Failed to ban user");
  }
};

let deleteUser = async (req, res) => {
  let { id } = req.params;

  try {
    await connectDB();
    await sql.query`DELETE FROM Account WHERE id = ${id}`;
    res.send("User deleted successfully");
  } catch (err) {
    console.error("Failed to delete user: ", err);
    res.status(500).send("Failed to delete user");
  }
};

let updatePersonalInfo = async (req, res) => {
  const { firstName, lastName, citizenId, email, phoneNumber, userAddress } =
    req.body;
  const userId = req.body.userId; // Should come from auth token in production

  try {
    await connectDB();
    const result = await sql.query`
            UPDATE Users 
            SET firstName = ${firstName},
                lastName = ${lastName},
                citizenId = ${citizenId},
                email = ${email},
                phoneNumber = ${phoneNumber},
                userAddress = ${userAddress}
            WHERE id = ${userId}
        `;

    if (result.rowsAffected[0] === 0) {
      return res.status(404).json({ error: "User not found" });
    }

    res.json({ message: "Profile updated successfully" });
  } catch (err) {
    console.error("Failed to update profile: ", err);
    if (err.message.includes("UNIQUE")) {
      res.status(400).json({ error: "Email or Citizen ID already exists" });
    } else {
      res.status(500).json({ error: "Failed to update profile" });
    }
  }
};