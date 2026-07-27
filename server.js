const express = require('express');
const dotenv = require('dotenv');
dotenv.config();
const session = require('express-session');
const passport = require('./config/passport');

const app = express();
const db = require('./db/connect');
const errorHandler = require('./middleware/errorHandler');

app.use(express.json());

// Sessions must be set up before passport.session()
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false
  })
);

app.use(passport.initialize());
app.use(passport.session());

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