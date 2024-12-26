import express from "express";
import { connectDB } from "./config/connectDB";
import router from "./route/web";
import { errorHandler, notFound } from "./middleware/errorMiddleware";

const app = express();
const port = 6969;

app.use(express.json());
app.use(router);
app.use(notFound);
app.use(errorHandler);

app.listen(port, async () => {
  await connectDB();
  console.log(`Server is running on http://localhost:${port}`);
});

// Export all necessary functions
export { app, port };
