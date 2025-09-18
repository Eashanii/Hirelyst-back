// middleware/errorHandler.js

const errorHandler = (err, req, res, next) => {
  // Use existing status code or default to 500
  const statusCode =
    res.statusCode && res.statusCode !== 200 ? res.statusCode : 500;

  // Send JSON response with error message and stack trace
  res.status(statusCode).json({
    message: err.message || "Internal Server Error",
    stack: process.env.NODE_ENV === "production" ? "🥞" : err.stack, // Hide stack trace in production
  });
};

// Export as ESM default export
export default errorHandler;
