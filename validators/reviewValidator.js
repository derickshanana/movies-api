const { body, validationResult } = require('express-validator');

// Validation rules for creating/updating a review.
const reviewValidationRules = [
  body('movieId')
    .trim()
    .notEmpty()
    .withMessage('movieId is required')
    .isMongoId()
    .withMessage('movieId must be a valid MongoDB ObjectId'),
  body('reviewerName')
    .trim()
    .notEmpty()
    .withMessage('reviewerName is required')
    .isString()
    .withMessage('reviewerName must be a string'),
  body('rating')
    .notEmpty()
    .withMessage('rating is required')
    .isFloat({ min: 0, max: 10 })
    .withMessage('rating must be a number between 0 and 10'),
  body('comment')
    .trim()
    .notEmpty()
    .withMessage('comment is required')
    .isString()
    .withMessage('comment must be a string'),
  body('datePosted')
    .trim()
    .notEmpty()
    .withMessage('datePosted is required')
    .isString()
    .withMessage('datePosted must be a string (e.g. MM/DD/YYYY)')
];

// Middleware that checks the validation rules above and returns a 400
// with details if any of them failed.
const validateReview = (req, res, next) => {
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
  reviewValidationRules,
  validateReview
};
