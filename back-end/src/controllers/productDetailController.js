import sql from 'mssql';
import { connectDB } from '../config/connectDB';
import { productData } from '../config/product';

export async function getProductDetail(req, res) {
    const ID = req.params.productID || "0"; // Use a dynamic ID or fallback to "0"
    try {
        const db = await connectDB();

        // Fetch product details from the database
        const result = await db.request()
            .input('productID', sql.VarChar, ID)
            .query(`
                SELECT * FROM Product
                WHERE productId = @productID
            `);

        if (result.recordset.length === 0) {
            // Return 404 if no product is found
            return res.status(404).json({ message: `Product with ID ${ID} not found` });
        }

        // Extract product details from the result
        const info = result.recordset[0];

        // Prepare product data to respond
        const productData = {
            productId: info.productId,
            sellerId: info.sellerId,
            name: info.name,
            price: info.price,
            description: info.description,
            platform: info.platform,
            image: info.image,
            condition: info.condition,
            genre: info.genre,
            releaseDay: info.releaseDay,
            status: info.status,
            stock: info.stock,
            tag: info.tag,
            rating: info.rating,
        };

        // Respond with the product details as JSON
        return res.status(200).json(productData);
    } catch (err) {
        console.error('Failed to fetch product details:', err);
        return res.status(500).json({ message: 'Internal Server Error', error: err.message });
    }
}

