export const errorHandler = (err, req, res, next) => {
  console.error("Error:", err);
  res.status(500).json({
    error: true,
    message: "Internal Server Error",
  });
};

export const notFound = (req, res, next) => {
  const error = new Error(`Not Found - ${req.originalUrl}`);
  res.status(404);
  next(error);
};
