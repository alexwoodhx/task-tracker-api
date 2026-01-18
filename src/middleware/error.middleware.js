import AppError from "../utils/AppError.js";

export const errorHandler = (err, req, res, next) => {
  // If it's an AppError (operational error), use its statusCode
  // Otherwise, it's a programming error, return 500
  const statusCode = err.statusCode || 500;

  // For non-operational errors (programming errors), don't leak details
  const message =
    err.isOperational
      ? err.message
      : "Something went wrong";

  res.status(statusCode).json({
    status: statusCode >= 500 ? "error" : "fail",
    message,
    ...(process.env.NODE_ENV === "development" && { stack: err.stack }),
  });
};
