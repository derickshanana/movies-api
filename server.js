const express = require('express');
const dotenv = require('dotenv');
dotenv.config();

const app = express();
const db = require('./db/connect');
const errorHandler = require('./middleware/errorHandler');

app.use(express.json());

// Routes
app.use('/', require('./routes'));

// Centralized error handling middleware.
// This MUST be registered after all routes so it can catch errors
// passed via next(err) from anywhere in the app.
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
