import sql from "mssql";
import { connectDB } from "../config/connectDB.js";
import { zalopayConfig } from "../config/zalopayConfig.js";
import CryptoJS from "crypto-js";

export const handlePaymentCallback = async (req, res) => {
    try {
        console.log('Received callback:', req.body);
        const { data: dataStr, mac: reqMac } = req.body;
        
        if (!zalopayConfig || !zalopayConfig.key2) {
            throw new Error('ZaloPay config not properly initialized');
        }

        const mac = CryptoJS.HmacSHA256(dataStr, zalopayConfig.key2).toString();
        if (reqMac !== mac) {
            return res.status(400).json({ 
                return_code: -1, 
                return_message: 'MAC verification failed' 
            });
        }

        const paymentData = JSON.parse(dataStr);
        const [userId, orderId] = paymentData.app_user.match(/user_(\d+)_order_(\d+)/).slice(1);
        const status = paymentData.status === 1 ? 'cancelled' : 'paid';

        const pool = await connectDB();
        await pool.request()
            .input('orderId', sql.Int, orderId)
            .input('status', sql.VarChar, status)
            .query('UPDATE [Order] SET status = @status WHERE orderId = @orderId');

      // Clear cart
        await pool.request()
            .input('userId', sql.Int, userId)
            .query(`
            DELETE FROM Cart 
            WHERE cartId = @userId
            `);

        await pool.request()
            .input('orderId', sql.Int, orderId)
            .query(`
                SELECT productId, quantity 
                FROM OrderDetail 
                WHERE orderDetailId = @orderId
            `)
            .then(result => {
                const orderDetails = result.recordset;
                const updateStockPromises = orderDetails.map(detail => {
                    return pool.request()
                        .input('productId', sql.Int, detail.productId)
                        .input('quantity', sql.Int, detail.quantity)
                        .query(`
                            UPDATE Product 
                            SET stock = stock - @quantity 
                            WHERE productId = @productId
                        `);
                });
                return Promise.all(updateStockPromises);
            });

        return res.json({ 
            return_code: 1, 
            return_message: 'Success' 
        });
    } catch (error) {
        console.error('Payment callback error:', error);
        return res.status(500).json({ 
            return_code: 0,  // ZaloPay will retry
            return_message: error.message 
        });
    }
};