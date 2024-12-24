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
        await sql.query`UPDATE Users SET userStatus = 'banned' WHERE id = ${id}`;
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
        
        // Disable foreign key constraints
        await sql.query`ALTER TABLE Users NOCHECK CONSTRAINT fk_user_cart`;
        await sql.query`ALTER TABLE ProductRequest NOCHECK CONSTRAINT fk_productrequest_product`;
        await sql.query`ALTER TABLE OrderDetail NOCHECK CONSTRAINT fk_orderdetail_product`;
        await sql.query`ALTER TABLE [Order] NOCHECK CONSTRAINT fk_order_user`;

        // Delete related records in the Cart table where the user is referenced
        await sql.query`DELETE FROM Cart WHERE userId = ${id}`;
        
        // Delete related records in the Cart table where the product is referenced
        await sql.query`DELETE FROM Cart WHERE productId IN (SELECT id FROM Product WHERE sellerId = ${id})`;
        
        // Delete related records in the ProductRequest table
        await sql.query`DELETE FROM ProductRequest WHERE userId = ${id}`;
        
        // Delete related records in the Product table
        await sql.query`DELETE FROM Product WHERE sellerId = ${id}`;
        
        // Delete related records in the Account table
        await sql.query`DELETE FROM Account WHERE userId = ${id}`;
        
        // Delete the user
        await sql.query`DELETE FROM Users WHERE id = ${id}`;

        // Enable foreign key constraints
        await sql.query`ALTER TABLE Users CHECK CONSTRAINT fk_user_cart`;
        await sql.query`ALTER TABLE ProductRequest CHECK CONSTRAINT fk_productrequest_product`;
        await sql.query`ALTER TABLE OrderDetail CHECK CONSTRAINT fk_orderdetail_product`;
        await sql.query`ALTER TABLE [Order] CHECK CONSTRAINT fk_order_user`;
        
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