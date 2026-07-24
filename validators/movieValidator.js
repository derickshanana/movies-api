const { body, validationResult } = require('express-validator');

// Validation rules for creating/updating a movie.
// A movie document needs 7+ fields: title, director, releaseYear, genre,
// rating, runtimeMinutes, synopsis
const movieValidationRules = [
  body('title')
    .trim()
    .notEmpty()
    .withMessage('title is required')
    .isString()
    .withMessage('title must be a string'),
  body('director')
    .trim()
    .notEmpty()
    .withMessage('director is required')
    .isString()
    .withMessage('director must be a string'),
  body('releaseYear')
    .notEmpty()
    .withMessage('releaseYear is required')
    .isInt({ min: 1888, max: 2100 })
    .withMessage('releaseYear must be a valid year'),
  body('genre')
    .trim()
    .notEmpty()
    .withMessage('genre is required')
    .isString()
    .withMessage('genre must be a string'),
  body('rating')
    .notEmpty()
    .withMessage('rating is required')
    .isFloat({ min: 0, max: 10 })
    .withMessage('rating must be a number between 0 and 10'),
  body('runtimeMinutes')
    .notEmpty()
    .withMessage('runtimeMinutes is required')
    .isInt({ min: 1 })
    .withMessage('runtimeMinutes must be a positive number'),
  body('synopsis')
    .trim()
    .notEmpty()
    .withMessage('synopsis is required')
    .isString()
    .withMessage('synopsis must be a string')
];

// Middleware that checks the validation rules above and returns a 400
// with details if any of them failed.
const validateMovie = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      success: false,
      status: 400,
      message: 'Validation failed',
      errors: errors.array()
    });
  }
  next();
};

module.exports = {
  movieValidationRules,
  validateMovie
};
