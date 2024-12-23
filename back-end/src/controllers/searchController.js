import sql from 'mssql';
import { connectDB } from '../config/connectDB.js';

export async function handleSearch(req, res) {
  const { query } = req.query;
  try {
    const pool = await connectDB();
    const result = await pool.request()
      .input('query', sql.VarChar, `%${query}%`)
      .query(`
        SELECT * FROM Product 
        WHERE LOWER(name) LIKE LOWER(@query)
        OR SOUNDEX(name) = SOUNDEX(@query)
        AND status LIKE 'available'
      `);
    res.json(result.recordset);
  } catch (err) {
    console.error('Search error:', err);
    res.status(500).send('Search failed');
  }
}

module.exports = {
    handleSearch
}