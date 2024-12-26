import express from "express";
import bodyParser from "body-parser";
import viewEngine from "./config/viewEngine";
import initWebRoutes from './route/web';
import {connectDB, queryDemo} from "./config/connectDB";
import cors from 'cors';

// Authentication with Passport
// import session from 'express-session';
// import passport from 'passport';
// import './config/passportConfig'; // Import passport configuration

require('dotenv').config();

let app = express();

//config app
app.use(cors()); // Enable CORS
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }))

// app.use(session({
//   secret: 'your_secret_key',
//   resave: false,
//   saveUninitialized: true
// }));

// app.use(passport.initialize());
// app.use(passport.session());

viewEngine(app);
initWebRoutes(app);

let port = process.env.PORT || 6969;
//Port === undefined => port = 6969


app.listen(port, () => {
    //callback
    console.log("Backend Nodejs is runing on the port : " + port)
})

connectDB();