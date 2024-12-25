import express from "express";
import bodyParser from "body-parser";
import viewEngine from "./config/viewEngine";
import initWebRoutes from './route/web';
import { connectDB, queryDemo } from "./config/connectDB";
import cors from 'cors';
require('dotenv').config();

let app = express();

// Config app
app.use(cors()); // Enable CORS
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

viewEngine(app);
initWebRoutes(app);

let port = process.env.PORT || 6969;

app.get('/test-query', async (req, res) => {
  try {
    await queryDemo();
    res.send('Query executed successfully. Check the console for results.');
  } catch (err) {
    res.status(500).send('Query failed.');
  }
});

app.post('/signup', (req, res) => {
  // Implement sign-up logic here
  try {
    res.send('Sign-up endpoint');
  } catch (err) {
    res.status(500).send(err);
  }
});

app.post('/signin', (req, res) => {
  // Implement sign-in logic here
  res.send('Sign-in endpoint');
});

app.listen(port, () => {
  // Callback
  console.log("Backend Nodejs is running on the port: " + port);
});

connectDB();