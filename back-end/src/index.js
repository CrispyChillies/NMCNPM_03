import express from "express";
import { connectDB, queryDemo } from "./config/connectDB.js";
import userRoutes from "./routes/userRoutes.js";

const app = express();
const port = 6969;

app.use(express.json());

app.use("/api", userRoutes);

app.post("/api/signup", validateSignUp, handleSignUp);
app.post("/api/signin", validateSignIn, handleSignIn);

app.listen(port, async () => {
  await connectDB();
  console.log(`Server is running on http://localhost:${port}`);
});
