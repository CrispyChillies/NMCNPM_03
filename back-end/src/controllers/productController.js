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