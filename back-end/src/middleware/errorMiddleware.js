// Error handling middleware for catching any unhandled errors
export const errorHandler = (err, req, res, next) => {
  console.error("Error:", err);

  // Check if headers have already been sent
  if (res.headersSent) {
    return next(err);
  }

  res.status(500).json({
    success: false,
    message: "Internal Server Error",
    error: process.env.NODE_ENV === "development" ? err.message : undefined,
  });
};

// Middleware for handling 404 Not Found errors
export const notFound = (req, res, next) => {
  const error = new Error(`Not Found - ${req.originalUrl}`);
  res.status(404);
  next(error);
};
