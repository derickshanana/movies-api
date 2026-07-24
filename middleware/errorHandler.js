// Centralized error handling middleware.
// Any route/controller that calls next(err) will end up here.
// This keeps error-response formatting consistent across the whole API.
const errorHandler = (err, req, res, next) => {
  console.error(err.stack);

  const statusCode = err.statusCode || 500;
  const message = err.message || 'Something went wrong on the server';

  res.status(statusCode).json({
    success: false,
    status: statusCode,
    message: message
  });
};

module.exports = errorHandler;
