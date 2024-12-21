import sql from 'mssql2';
import bcrypt from 'bcrypt';
import { connectDB } from '../config/connectDB';

let handleSignUp = async (req, res) => {
    let { username, password } = req.body;

    try {
        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        await connectDB();
        const result = await sql.query`INSERT INTO Account (username, password) VALUES (${username}, ${hashedPassword})`;
        res.send('User signed up successfully');
    } catch (err) {
        console.error('Sign-up failed: ', err);
        res.status(500).send('Sign-up failed');
    }
}

let handleSignIn = async (req, res) => {
    let { username, password } = req.body;

    try {
        await connectDB();
        const result = await sql.query`SELECT password FROM Account WHERE username = ${username}`;

        if (result && result && result.length > 0) {
            const hashedPassword = result.password;
            const match = await bcrypt.compare(password, hashedPassword);

            if (match) {
                res.send('User signed in successfully');
            } else {
                res.status(401).send('Invalid username or password');
            }
        } else {
            res.status(401).send('Invalid username or password');
        }
    } catch (err) {
        console.error('Sign-in failed: ', err);
        res.status(500).send('Sign-in failed');
    }
}

let getAllUsers = async (req, res) => {
    try {
        await connectDB();
        const result = await sql.query`SELECT id, firstName + ' ' + lastName AS name, email, role, userStatus as status FROM Users`;
        res.json(result);
        console.log(result);
    } catch (err) {
        console.error('Failed to fetch users: ', err);
        res.status(500).send('Failed to fetch users');
    }
}

let banUser = async (req, res) => {
    let { id } = req.params;

    try {
        await connectDB();
        await sql.query`UPDATE Account SET status = 'banned' WHERE id = ${id}`;
        res.send('User banned successfully');
    } catch (err) {
        console.error('Failed to ban user: ', err);
        res.status(500).send('Failed to ban user');
    }
}

let deleteUser = async (req, res) => {
    let { id } = req.params;

    try {
        await connectDB();
        await sql.query`DELETE FROM Account WHERE id = ${id}`;
        res.send('User deleted successfully');
    } catch (err) {
        console.error('Failed to delete user: ', err);
        res.status(500).send('Failed to delete user');
    }
}

module.exports = {
    handleSignUp,
    handleSignIn,
    getAllUsers,
    banUser,
    deleteUser
}