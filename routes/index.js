const express = require('express');
const router = express.Router();
const passport = require('passport');
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('../swagger.json');

router.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// Starts the GitHub OAuth login flow. Passport redirects to GitHub,
// GitHub redirects back to /github/callback (handled in server.js).
router.get('/login', passport.authenticate('github'), (req, res) => { });

router.get('/logout', function (req, res, next) {
  req.logout(function (err) {
    if (err) {
      return next(err);
    }
    req.session.user = undefined;
    res.redirect('/');
  });
});

router.use('/movies', require('./movies'));
router.use('/reviews', require('./reviews'));

module.exports = router;