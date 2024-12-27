import express from "express";
import { connectDB } from "./config/connectDB.js";
import router from "./route/web.js";

const app = express();
const port = 6969;

app.use(express.json());

// Use the router
app.use(router);

app.listen(port, async () => {
  await connectDB();
  console.log(`Server is running on http://localhost:${port}`);
});
