import sql from 'mssql';
import { connectDB } from '../config/connectDB.js';

export async function getProducts(req, res) {
  const { query, tag } = req.query;
  try {
    const pool = await connectDB();
    let result;
    if (query) {
      result = await pool.request()
        .input('query', sql.VarChar, `%${query}%`)
        .query(`
          SELECT * FROM Product 
          WHERE (LOWER(name) LIKE LOWER(@query) OR SOUNDEX(name) = SOUNDEX(@query))
          AND status = 'available'
        `);
    } else if (tag) {
      result = await pool.request()
        .input('tag', sql.VarChar, tag)
        .query('SELECT * FROM Product WHERE tag = @tag AND status = \'available\'');
    } else {
      result = await pool.request().query('SELECT * FROM Product WHERE status = \'available\'');
    }
    res.json(result.recordset);
  } catch (err) {
    console.error('Error fetching products:', err);
    res.status(500).send('Failed to fetch products');
  }
}

export async function getProductById(req, res) {
  const { productId } = req.params;
  try {
    const pool = await connectDB();
    const result = await pool.request()
      .input('productId', sql.Int, productId)
      .query('SELECT * FROM Product WHERE productId = @productId AND status = \'available\'');
    res.json(result.recordset[0]);
  } catch (err) {
    console.error('Error fetching product:', err);
    res.status(500).send('Failed to fetch product');
  }
}

export async function getAllProducts(req, res) {
  try {
      await connectDB();
      const result = await sql.query`SELECT productId, name, genre, price, releaseDay, status FROM Product`;
      res.json(result);
  } catch (err) {
      console.error('Failed to fetch games: ', err);
      res.status(500).send('Failed to fetch games');
  }
}

export const deleteProductById = async (req, res) => {
  let { id } = req.params;
  console.log(id);
  try {
    await connectDB();
    await sql.query`
      DELETE FROM Cart
      WHERE productId = ${id}
      DELETE FROM ProductRequest
      WHERE productId = ${id}
      DELETE FROM OrderDetail
      WHERE productId = ${id}
      DELETE FROM Product 
      WHERE productId = ${id}
    `;
    res.send("Product deleted successfully");
    console.log("Product deleted successfully");
  } catch (err) {
    console.error("Failed to delete product: ", err);
    res.status(500).send("Failed to ban user");
    console.log("Failed to delete product: ", err);
  }
};

export const getTotalProducts = async (req, res) => {
  try {
      await connectDB();
      const result = await sql.query`SELECT COUNT(*) as numbProducts FROM Product`;
      res.json(result);
  } catch (err) {
      console.error('Failed to fetch total games: ', err);
      res.status(500).send('Failed to fetch total games');
  }
}