const express = require('express');
const router = express.Router();
const reviewsController = require('../controllers/reviews');
const { reviewValidationRules, validateReview } = require('../validators/reviewValidator');
const isLoggedIn = require('../middleware/isLoggedIn');

// GET all reviews - public
router.get('/', reviewsController.getAllReviews);

// GET a single review by id - public
router.get('/:id', reviewsController.getSingleReview);

// POST - create a new review
// #swagger.description = 'Requires authentication (GitHub OAuth login).'
router.post(
    '/',
    isLoggedIn,
    reviewValidationRules,
    validateReview,
    reviewsController.createReview
);

// PUT - update a review by id - public (validated)
router.put('/:id', reviewValidationRules, validateReview, reviewsController.updateReview);

// DELETE a review by id
// #swagger.description = 'Requires authentication (GitHub OAuth login).'
router.delete('/:id', isLoggedIn, reviewsController.deleteReview);

module.exports = router;