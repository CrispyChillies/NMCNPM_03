import axios from 'axios';
import CryptoJS from 'crypto-js';
import moment from 'moment';
import { zalopayConfig as config } from '../config/zalopayConfig.js';

async function createZaloPayOrder(amount, orderId, userId) {
    try {
        const transID = Math.floor(Math.random() * 1000000);
        const embed_data = {
            redirecturl: 'http://localhost:5173/user/order-confirm'
        };
        const items = [];

        const order = {
            app_id: config.app_id,
            app_trans_id: `${moment().format('YYMMDD')}_${transID}`,
            app_user: `user_${userId}_order${orderId}`,
            app_time: Date.now(),
            item: JSON.stringify(items),
            embed_data: JSON.stringify(embed_data),
            amount: amount,
            callback_url: 'https://6e57-2402-9d80-38b-e255-406d-182a-9dc5-6442.ngrok-free.app/api/payment/callback',
            description: `Payment for Order #${orderId}`,
            bank_code: ''
        };

        // Convert data to string before hashing
        const dataStr = `${config.app_id}|${order.app_trans_id}|${order.app_user}|${order.amount}|${order.app_time}|${order.embed_data}|${order.item}`;
        order.mac = CryptoJS.HmacSHA256(dataStr, config.key1).toString(CryptoJS.enc.Hex);

        const result = await axios.post(config.endpoint, null, { 
            params: order,
            timeout: 10000
        });
        
        console.log('ZaloPay API Response:', result.data);
        return result.data;
    } catch (error) {
        console.error('ZaloPay API Error:', error);
        throw error;
    }
}

export { createZaloPayOrder };