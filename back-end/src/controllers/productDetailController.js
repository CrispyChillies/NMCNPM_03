import sql from 'mssql';
import { connectDB } from '../config/connectDB';
import { productData } from '../config/product';

export async function getProductDetail(req, res) {
    const ID = req.params.ID || "1"; // Use a dynamic ID or fallback to "1"
    try {
        const db = await connectDB();

        // Fetch product details from the database
        const result = await db.request()
            .input('productID', sql.VarChar, ID) // Pass ID directly
            .query(`
                SELECT * FROM Product
                WHERE productId = @productID
            `);

        if (result.recordset.length === 0) {
            // Return 404 if no product found
            return res.status(404).json({ message: `Product with ID ${ID} not found` });
        }

        // Extract product details from the result
        const info = result.recordset[0];

        // Populate `productData` object
        productData.productId = String(info.productId);
        productData.sellerId = info.sellerId;
        productData.name = info.name;
        productData.price = info.price;
        productData.description = info.description;
        productData.platform = info.platform;
        productData.image = info.image;
        productData.condition = info.condition;
        productData.genre = info.genre;
        productData.releaseDate = info.releaseDate;
        productData.status = info.status;
        productData.stock = info.stock;
        productData.tag = info.tag;
        productData.rating = info.rating;

        // Respond with the updated product data
        res.status(200).json(productData);
    } catch (err) {
        console.error('Failed to fetch data:', err);
        res.status(500).json({ message: 'Internal Server Error' });
    }
}

export default {
    getProductDetail,
};
