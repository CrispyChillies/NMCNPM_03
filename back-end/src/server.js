import express from "express";
import bodyParser from "body-parser";
import viewEngine from "./config/viewEngine";
import initWebRoutes from "./routes/web";
import { connectDB, queryDemo } from "./config/connectDB";
import { errorHandler, notFound } from "./middleware/errorMiddleware";
import cors from "cors";
require("dotenv").config();

let app = express();

// Config app
app.use(cors()); // Enable CORS
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

viewEngine(app);
initWebRoutes(app);
app.use(notFound);
app.use(errorHandler);

let port = process.env.PORT || 6969;

app.listen(port, () => {
  // Callback
  console.log("Backend Nodejs is running on the port: " + port);
});

connectDB();
