import express from "express";
import bodyParser from "body-parser";
import viewEngine from "./config/viewEngine";
import initWebRoutes from './route/web';
import testRoute from './route/producttest';
import {connectDB, queryDemo} from "./config/connectDB";
import { handleSearch } from './controllers/searchController';
import { getProductDetail } from "./controllers/productDetailController";

import cors from 'cors';
require('dotenv').config();

let app = express();

//config app
app.use(cors({
  origin: 'http://localhost:5173', // Allow requests from the frontend URL
  methods: 'GET,POST,PUT,DELETE', // Allowed HTTP methods
  credentials: true, // Allow cookies if necessary
})); // Enable CORS
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }))
app.use(express.json());

testRoute(app);
viewEngine(app);
initWebRoutes(app);


let port = process.env.PORT || 6969;
//Port === undefined => port = 6969


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
  try{
    res.send('Sign-up endpoint');
  }catch(err){
    res.status(500).send(err);
  }
});

app.post('/signin', (req, res) => {
  // Implement sign-in logic here
  res.send('Sign-in endpoint');
});

app.get('/api/search', handleSearch);

app.get('/api/product/:productID', async (req, res) => {
  try {
    await getProductDetail(req, res); // Call the controller function with req and res
  } catch (err) {
    res.status(500).json({ message: "Internal Server Error", error: err.message });
  }
});

app.listen(port, () => {
    //callback
    console.log("Backend Nodejs is runing on the port : " + port)
})

connectDB();