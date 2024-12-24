import sql from 'mssql2';
import { connectDB } from '../config/connectDB';

let getAllGames = async (req, res) => {
    try {
        await connectDB();
        const result = await sql.query`SELECT productId, name, genre, price, releaseDay FROM Product`;
        res.json(result);
    } catch (err) {
        console.error('Failed to fetch games: ', err);
        res.status(500).send('Failed to fetch games');
    }
}

module.exports = {
    getAllGames
}