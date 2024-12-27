import sql from 'mssql';
import { connectDB } from '../config/connectDB.js';
import { checkRole } from "../middleware/authMiddleware.js";

// Add product to cart
export const addToCart = async (req, res) => {
  const { productId, quantity } = req.body;
  const userId = req.user.id;
  console.log(req.user.id);

  try {
    const pool = await connectDB();

    // Find the user's cart
    const userResult = await pool.request()
      .input('userId', sql.Int, userId)
      .query('SELECT cartId FROM Users WHERE id = @userId');

    if (userResult.recordset.length === 0) {
      return res.status(404).json({ error: true, message: "User not found" });
    }

    const cartId = userResult.recordset[0].cartId;

    // Check if the product is already in the cart
    const cartItemResult = await pool.request()
      .input('cartId', sql.Int, cartId)
      .input('productId', sql.Int, productId)
      .query('SELECT * FROM Cart WHERE cartId = @cartId AND productId = @productId');

    if (cartItemResult.recordset.length > 0) {
      // Update the quantity if the product is already in the cart
      await pool.request()
        .input('cartId', sql.Int, cartId)
        .input('productId', sql.Int, productId)
        .input('quantity', sql.Int, cartItemResult.recordset[0].quantity + quantity)
        .query('UPDATE Cart SET quantity = @quantity WHERE cartId = @cartId AND productId = @productId');
    } else {
      // Add the product to the cart
      await pool.request()
        .input('cartId', sql.Int, cartId)
        .input('productId', sql.Int, productId)
        .input('quantity', sql.Int, quantity)
        .query('INSERT INTO Cart (cartId, productId, quantity) VALUES (@cartId, @productId, @quantity)');
    }

    return res.status(200).json({ success: true, message: "Product added to cart" });
  } catch (error) {
    return res.status(500).json({ error: true, message: "Internal server error" });
  }
};

// View cart
export const viewCart = async (req, res) => {
  const userId = req.user.id;

  try {
    const pool = await connectDB();

    // Find the user's cart
    const userResult = await pool.request()
      .input('userId', sql.Int, userId)
      .query('SELECT cartId FROM Users WHERE id = @userId');

    if (userResult.recordset.length === 0) {
      return res.status(404).json({ error: true, message: "User not found" });
    }

    const cartId = userResult.recordset[0].cartId;

    // Get the cart items
    const cartItemsResult = await pool.request()
      .input('cartId', sql.Int, cartId)
      .query(`
        SELECT Cart.productId, Cart.quantity, Product.name, Product.price, Product.image
        FROM Cart
        JOIN Product ON Cart.productId = Product.productId
        WHERE Cart.cartId = @cartId
      `);

    return res.status(200).json({ success: true, cartItems: cartItemsResult.recordset });
  } catch (error) {
    return res.status(500).json({ error: true, message: "Internal server error" });
  }
};

// Remove product from cart
export const removeFromCart = async (req, res) => {
  const { productId } = req.params;
  const userId = req.user.id;

  try {
    const pool = await connectDB();

    // Find the user's cart
    const userResult = await pool.request()
      .input('userId', sql.Int, userId)
      .query('SELECT cartId FROM Users WHERE id = @userId');

    if (userResult.recordset.length === 0) {
      return res.status(404).json({ error: true, message: "User not found" });
    }

    const cartId = userResult.recordset[0].cartId;

    // Remove the product from the cart
    await pool.request()
      .input('cartId', sql.Int, cartId)
      .input('productId', sql.Int, productId)
      .query('DELETE FROM Cart WHERE cartId = @cartId AND productId = @productId');

    return res.status(200).json({ success: true, message: "Product removed from cart" });
  } catch (error) {
    return res.status(500).json({ error: true, message: "Internal server error" });
  }
};

// Update product quantity in cart
export const updateCartQuantity = async (req, res) => {
  const { productId } = req.params;
  const { quantity } = req.body;
  const userId = req.user.id;

  try {
    const pool = await connectDB();

    // Find the user's cart
    const userResult = await pool.request()
      .input('userId', sql.Int, userId)
      .query('SELECT cartId FROM Users WHERE id = @userId');

    if (userResult.recordset.length === 0) {
      return res.status(404).json({ error: true, message: "User not found" });
    }

    const cartId = userResult.recordset[0].cartId;

    // Update the product quantity in the cart
    await pool.request()
      .input('cartId', sql.Int, cartId)
      .input('productId', sql.Int, productId)
      .input('quantity', sql.Int, quantity)
      .query('UPDATE Cart SET quantity = @quantity WHERE cartId = @cartId AND productId = @productId');

    return res.status(200).json({ success: true, message: "Product quantity updated" });
  } catch (error) {
    return res.status(500).json({ error: true, message: "Internal server error" });
  }
};

// Middleware to check if the user has the role 'user'
export const checkUserRole = checkRole(['user']);