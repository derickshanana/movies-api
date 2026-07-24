// Wraps an async route handler so any thrown error or rejected promise
// automatically gets forwarded to the centralized error handler via next(err),
// instead of needing a try/catch in every single controller function.
const asyncHandler = (fn) => (req, res, next) => {
  Promise.resolve(fn(req, res, next)).catch(next);
};

module.exports = asyncHandler;
