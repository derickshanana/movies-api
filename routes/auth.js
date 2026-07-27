const express = require('express');
const router = express.Router();
const passport = require('passport');

// Start the GitHub OAuth login flow
router.get('/github', passport.authenticate('github'));

// GitHub redirects back here after the user approves/denies access
router.get(
    '/github/callback',
    passport.authenticate('github', { failureRedirect: '/auth/login-failure' }),
    (req, res) => {
        res.redirect('/auth/login-success');
    }
);

router.get('/login-success', (req, res) => {
    res.status(200).json({
        success: true,
        message: 'Logged in successfully',
        user: req.user
    });
});

router.get('/login-failure', (req, res) => {
    res.status(401).json({ success: false, message: 'Login failed' });
});

router.get('/logout', (req, res, next) => {
    req.logout((err) => {
        if (err) return next(err);
        res.status(200).json({ success: true, message: 'Logged out successfully' });
    });
});

module.exports = router;