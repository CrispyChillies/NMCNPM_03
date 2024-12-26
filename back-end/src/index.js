import express from 'express';
import { connectDB, queryDemo } from './config/connectDB.js';

const app = express();
const port = 3000;

app.use(express.json());

app.get('/test-query', async (req, res) => {
  try {
    await queryDemo();
    res.send('Query executed successfully. Check the console for results.');
  } catch (err) {
    res.status(500).send('Query failed.');
  }
});

app.post("/api/signup", validateSignUp, handleSignUp);
app.post("/api/signin", validateSignIn, handleSignIn);

app.listen(port, async () => {
  await connectDB();
  console.log(`Server is running on http://localhost:${port}`);
});