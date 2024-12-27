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
      SELECT id, password FROM Account WHERE username = @username
    `);
    if (result.recordset.length === 0) {
      return res.status(401).json({ success: false, message: "Invalid username or password" });
    }
    const user = result.recordset[0];
    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return res.status(401).json({ success: false, message: "Invalid username or password" });
    }
    const token = jwt.sign({ id: user.id, username: username }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.json({ success: true, message: "Sign-in successful", token: token });
  } catch (err) {
    console.error("Sign-in failed: ", err);
    res.status(500).json({ success: false, message: "Sign-in failed", error: err.message });
  }
};

export const getAllUsers = async (req, res) => {
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

export const getTotalUsers = async (req, res) => {
  try {
    await connectDB();
    const result = await sql.query`SELECT COUNT(*) as totalUsers FROM Users`;
    res.json(result.recordset[0]);
    console.log(result);
  } catch (err) {
    console.error("Failed to fetch total users: ", err);
    res.status(500).send("Failed to fetch total users");
  }
}

export const banUser = async (req, res) => {
  let { id } = req.params;
  try {
    await connectDB();
    await sql.query`UPDATE Users SET userStatus = 'banned' WHERE id = ${id}`;
    res.send("User banned successfully");
    console.log("User banned successfully");
  } catch (err) {
    console.error("Failed to ban user: ", err);
    res.status(500).send("Failed to ban user");
    console.log("Failed to ban user");
  }
};

export const unbanUser = async (req, res) => {
  let { id } = req.params;
  try {
    await connectDB();
    await sql.query`UPDATE Users SET userStatus = 'active' WHERE id = ${id}`;
    res.send("User unbanned successfully");
    console.log("User unbanned successfully");
  } catch (err) {
    console.error("Failed to unban user: ", err);
    res.status(500).send("Failed to unban user");
    console.log("Failed to unban user");
  }
}

export const getAllOrders = async (req, res) => {
  try {
      await connectDB();
      const result = await sql.query`SELECT orderId, name, address, date, status FROM [Order]`;
      res.json(result);
      console.log(result);
  } catch (err) {
      console.error('Failed to fetch orders: ', err);
      res.status(500).send('Failed to fetch orders');
  }
}


export const getUserRequests = async (req, res) => {
  try {
    await connectDB();
    const result = await sql.query`
    select gameRequestId, Users.firstName + ' ' + Users.lastName as userId , requestDate, ProductRequest.[status], [name],[description],price, genre, [image]   from ProductRequest
    JOIN Product
    on ProductRequest.productId = Product.productId
    JOIN Users
    on ProductRequest.userId = Users.id`;
    res.json(result);
  } catch (err) {
    console.error('Failed to fetch user requests: ', err);
    res.status(500).send('Failed to fetch user requests');
  }
}

export const acceptUserRequestProductUpload = async (req, res) => {
  let { id } = req.params;
  try {
    await connectDB();
    
    // Update the ProductRequest table
    await sql.query`UPDATE ProductRequest SET status = 'accepted' WHERE gameRequestId = ${id}`;
    
    // Get the productId from the ProductRequest table
    const result = await sql.query`SELECT productId FROM ProductRequest WHERE gameRequestId = ${id}`;
    const productId = result.recordset[0].productId;
    console.log('productId: ', productId);
    
    // Update the Product table
    await sql.query`UPDATE Product SET status = 'available' WHERE productId = ${productId}`;
    
    res.send('Product request accepted and product status updated successfully');
  } catch (err) {
    console.error('Failed to accept product request: ', err);
    res.status(500).send('Failed to accept product request');
  }
}

export const declineUserRequestProductUpload = async (req, res) => {
  let { id } = req.params;
  try {
    await connectDB();
    
    // Update the ProductRequest table
    await sql.query`UPDATE ProductRequest SET status = 'rejected' WHERE gameRequestId = ${id}`;
    
    res.send('Product request declined successfully');
    console.log('Product request declined successfully');
  } catch (err) {
    console.error('Failed to decline product request: ', err);
    res.status(500).send('Failed to decline product request');
    console.log('Failed to decline product request');
  }
}

export const getUserPendingBecomeSellerRequests = async (req, res) => {
  try {
    await connectDB();
    const result = await sql.query`
    select requestId, Users.firstName + ' ' + Users.lastName as name, Users.email, Users.phoneNumber, BecomeSellerRequest.businessName, BecomeSellerRequest.productDescription, BecomeSellerRequest.address, [date], [status]  from BecomeSellerRequest
    JOIN Users
    On BecomeSellerRequest.userId = Users.id`;
    res.json(result);
  } catch (err) {
    console.error('Failed to fetch user requests: ', err);
    res.status(500).send('Failed to fetch user requests');
  }
}

export const acceptUserRequestBecomeSeller = async (req, res) => {
  let { id } = req.params;
  try {
    await connectDB();
    
    // Update the BecomeSellerRequest table
    await sql.query`UPDATE BecomeSellerRequest SET status = 'accepted' WHERE requestId = ${id}`;
    
    // Get the userId from the BecomeSellerRequest table
    const result = await sql.query`SELECT userId FROM BecomeSellerRequest WHERE requestId = ${id}`;
    const userId = result.recordset[0].userId;
    console.log('userId: ', userId);
    
    // Update the Users table
    await sql.query`UPDATE Users SET role = 'provider' WHERE id = ${userId}`;
    
    res.send('Become seller request accepted and user role updated successfully');
    console.log('Become seller request accepted and user role updated successfully');
  } catch (err) {
    console.error('Failed to accept become seller request: ', err);
    res.status(500).send('Failed to accept become seller request');
    console.log('Failed to accept become seller request');
  }
}

export const declineUserRequestBecomeSeller = async (req, res) => {
  let { id } = req.params;
  try {
    await connectDB();
    
    // Update the BecomeSellerRequest table
    await sql.query`UPDATE BecomeSellerRequest SET status = 'declined' WHERE requestId = ${id}`;
    
    res.send('Become seller request declined successfully');
    console.log('Become seller request declined successfully');
  } catch (err) {
    console.error('Failed to decline become seller request: ', err);
    res.status(500).send('Failed to decline become seller request');
    console.log('Failed to decline become seller request');
  }
}

// let deleteUser = async (req, res) => {
//   let { id } = req.params;

//   try {
//       await connectDB();
      
//       // Disable foreign key constraints
//       await sql.query`ALTER TABLE Users NOCHECK CONSTRAINT fk_user_cart`;
//       await sql.query`ALTER TABLE ProductRequest NOCHECK CONSTRAINT fk_productrequest_product`;
//       await sql.query`ALTER TABLE OrderDetail NOCHECK CONSTRAINT fk_orderdetail_product`;
//       await sql.query`ALTER TABLE [Order] NOCHECK CONSTRAINT fk_order_user`;

//       // Delete related records in the Cart table where the user is referenced
//       await sql.query`DELETE FROM Cart WHERE userId = ${id}`;
      
//       // Delete related records in the Cart table where the product is referenced
//       await sql.query`DELETE FROM Cart WHERE productId IN (SELECT id FROM Product WHERE sellerId = ${id})`;
      
//       // Delete related records in the ProductRequest table
//       await sql.query`DELETE FROM ProductRequest WHERE userId = ${id}`;
      
//       // Delete related records in the Product table
//       await sql.query`DELETE FROM Product WHERE sellerId = ${id}`;
      
//       // Delete related records in the Account table
//       await sql.query`DELETE FROM Account WHERE userId = ${id}`;
      
//       // Delete the user
//       await sql.query`DELETE FROM Users WHERE id = ${id}`;

//       // Enable foreign key constraints
//       await sql.query`ALTER TABLE Users CHECK CONSTRAINT fk_user_cart`;
//       await sql.query`ALTER TABLE ProductRequest CHECK CONSTRAINT fk_productrequest_product`;
//       await sql.query`ALTER TABLE OrderDetail CHECK CONSTRAINT fk_orderdetail_product`;
//       await sql.query`ALTER TABLE [Order] CHECK CONSTRAINT fk_order_user`;
      
//       res.send('User deleted successfully');
//   } catch (err) {
//       console.error('Failed to delete user: ', err);
//       res.status(500).send('Failed to delete user');
//   }
// }

export const updatePersonalInfo = async (req, res) => {
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


