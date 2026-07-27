// Protects a route so it can only be accessed by a logged-in user.
// If the request isn't authenticated, forward a 401 error to the
// centralized error handler instead of letting the request continue.
const isLoggedIn = (req, res, next) => {
    if (req.isAuthenticated && req.isAuthenticated()) {
        return next();
    }
    const err = new Error('You must be logged in to access this route');
    err.statusCode = 401;
    next(err);
};

module.exports = isLoggedIn;