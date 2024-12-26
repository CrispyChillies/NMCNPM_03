import express from "express";
import { connectDB } from "./config/connectDB";
import router from "./route/web";
import { errorHandler, notFound } from "./middleware/errorMiddleware";

const app = express();
const port = 6969;

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use(router);

// Error Handling
app.use(notFound); // Handle 404 errors
app.use(errorHandler); // Handle all other errors

// Start server
app.listen(port, async () => {
  try {
    await connectDB();
    console.log(`Server is running on http://localhost:${port}`);
  } catch (error) {
    console.error("Failed to start server:", error);
    process.exit(1);
  }
});

export default app;
