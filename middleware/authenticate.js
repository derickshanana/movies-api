// Checks whether a user is logged in by looking at req.session.user,
// which we set manually in the /github/callback route in server.js.
// If it's not set, the request is rejected before it reaches the controller.
const isAuthenticated = (req, res, next) => {
    if (req.session.user === undefined) {
        return res.status(401).json('You do not have access.');
    }
    next();
};

module.exports = { isAuthenticated };