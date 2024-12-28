import sql from "mssql";
import { connectDB } from "../config/connectDB.js";
import { createZaloPayOrder } from '../services/zalopayService.js'; // Change to import

export const createOrder = async (req, res) => {
  const { name, address, phoneNumber, paymentMethod, total } = req.body;
  const userId = req.user.id;

  try {
    const pool = await connectDB();

    // Start transaction
    const transaction = new sql.Transaction(pool);
    await transaction.begin();

    try {
      // Get cart items
      const cartResult = await pool.request()
        .input('userId', sql.Int, userId)
        .query(`
          SELECT c.productId, c.quantity, p.price 
          FROM Cart c
          JOIN Users u ON c.cartId = u.cartId
          JOIN Product p ON c.productId = p.productId
          WHERE u.id = @userId
        `);

      if (cartResult.recordset.length === 0) {
        throw new Error("Cart is empty");
      }

      // Create new order
      const orderIdResult = await pool.request()
        .query("SELECT ISNULL(MAX(orderId), 0) + 1 as newOrderId FROM [Order]");
      const newOrderId = orderIdResult.recordset[0].newOrderId;

      // Insert order
      await pool.request()
        .input("orderId", sql.Int, newOrderId)
        .input("userId", sql.Int, userId)
        .input("status", sql.VarChar, "pending")
        .input("date", sql.DateTime, new Date())
        .input("name", sql.VarChar, name)
        .input("address", sql.Text, address)
        .input("phoneNumber", sql.VarChar, phoneNumber)
        .input("paymentMethod", sql.VarChar, paymentMethod)
        .query(`
          INSERT INTO [Order] (orderId, userId, status, date, orderDetailId, name, address, phoneNumber, paymentMethod)
          VALUES (@orderId, @userId, @status, @date, @orderId, @name, @address, @phoneNumber, @paymentMethod)
        `);


      // Insert order details
      for (const item of cartResult.recordset) {
        await pool.request()
          .input("orderId", sql.Int, newOrderId)
          .input("productId", sql.Int, item.productId)
          .input("quantity", sql.Int, item.quantity)
          .input("price", sql.Decimal, item.price)
          .query(`
            INSERT INTO OrderDetail (orderDetailId, productId, quantity)
            VALUES (@orderId, @productId, @quantity)
          `);
      }

      // Clear cart
      // await pool.request()
      //   .input('userId', sql.Int, userId)
      //   .query(`
      //     DELETE FROM Cart 
      //     WHERE cartId IN (SELECT cartId FROM Users WHERE id = @userId)
      //   `);

      
      try {
          let vnd_total = Math.round(total * 24000)
          // spell-checker: disable
          console.log('Processing ZaloPay payment...', {vnd_total, newOrderId, userId});
          const zaloPayResponse = await createZaloPayOrder(vnd_total, newOrderId, userId);
          console.log('ZaloPay response received:', zaloPayResponse);
          
          if (!zaloPayResponse || !zaloPayResponse.order_url) {
              throw new Error('Invalid ZaloPay response');
          }
          
          await transaction.commit();
          return res.status(201).json({
              orderId: newOrderId,
              paymentUrl: zaloPayResponse.order_url
          // spell-checker: enable
          });
      } catch (error) {
          console.error('ZaloPay payment failed:', error);
          await transaction.rollback();
          return res.status(500).json({ 
              error: true,
              message: 'Payment processing failed',
              details: error.message 
          });
      }
    } catch (err) {
      // Rollback on error
      await transaction.rollback();
      throw err;
    }
  } catch (error) {
    console.error("Error processing order:", error);
    return res.status(500).json({ 
      error: true, 
      message: error.message || "Internal server error" 
    });
  }
};

export const getLatestUserOrder = async (req, res) => {
  try {
    const userId = req.user.id;
    const pool = await connectDB();

    // Get latest order
    const latestOrderResult = await pool.request()
      .input("userId", sql.Int, userId)
      .query(`
        SELECT TOP 1 *
        FROM [Order]
        WHERE userId = @userId
        ORDER BY orderId DESC
      `);

    if (latestOrderResult.recordset.length === 0) {
      return res.status(404).json({ error: true, message: "No orders found" });
    }

    const latestOrder = latestOrderResult.recordset[0];

    // Get order details by orderId
    const orderDetailsResult = await pool.request()
      .input("orderId", sql.Int, latestOrder.orderId)
      .query("SELECT Product.productId, Product.name, Product.description, Product.price, OrderDetail.quantity, Product.image FROM OrderDetail JOIN Product ON Product.productId = OrderDetail.productId WHERE orderDetailId = @orderId");

    const orderDetails = orderDetailsResult.recordset;

    return res.status(200).json({
      success: true,
      order: latestOrder,
      orderDetails
    });
  } catch (error) {
    return res.status(500).json({ error: true, message: "Internal server error" });
  }
};