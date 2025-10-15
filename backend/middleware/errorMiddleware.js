// backend/middleware/errorMiddleware.js
const errorHandler = (err, req, res, next) => {
  // Sometimes an error comes with a status code, otherwise default to 500 (Server Error)
  const statusCode = res.statusCode ? res.statusCode : 500;

  res.status(statusCode);

  // Send back a JSON response with the error message
  res.json({
    message: err.message,
    // Only show the detailed stack trace if we are in development mode
    stack: process.env.NODE_ENV === 'production' ? null : err.stack,
  });
};

module.exports = {
  errorHandler,
};