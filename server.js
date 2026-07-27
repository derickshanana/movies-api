const express = require('express');
const dotenv = require('dotenv');
dotenv.config();
const session = require('express-session');
const passport = require('passport');
const GitHubStrategy = require('passport-github2').Strategy;

const app = express();
const db = require('./db/connect');
const errorHandler = require('./middleware/errorHandler');

app.use(express.json());

app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true
  })
);

app.use(passport.initialize());
app.use(passport.session());

passport.use(
  new GitHubStrategy(
    {
      clientID: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
      callbackURL: process.env.CALLBACK_URL
    },
    function (accessToken, refreshToken, profile, done) {
      // We are not saving the GitHub profile to MongoDB for this project.
      // GitHub is only used to confirm who the user is; the profile is
      // then stored on the session (see the /github/callback route below).
      return done(null, profile);
    }
  )
);

passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((user, done) => {
  done(null, user);
});

// Root route - shows whether someone is currently logged in
app.get('/', (req, res) => {
  res.send(
    req.session.user !== undefined
      ? `Logged in as ${req.session.user.displayName || req.session.user.username}`
      : 'Logged Out'
  );
});

// GitHub calls this route back after the user approves/denies access
app.get(
  '/github/callback',
  passport.authenticate('github', { failureRedirect: '/api-docs', session: false }),
  (req, res) => {
    req.session.user = req.user;
    res.redirect('/');
  }
);

app.use('/', require('./routes'));

// Centralized error handling middleware - must be registered last
app.use(errorHandler);

const port = process.env.PORT || 3000;

db.initDb((err) => {
  if (err) {
    console.log(err);
  } else {
    app.listen(port, () => {
      console.log(`Connected to DB and listening on port ${port}`);
    });
  }
});