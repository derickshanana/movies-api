const express = require('express');
const router = express.Router();
const reviewsController = require('../controllers/reviews');
const { reviewValidationRules, validateReview } = require('../validators/reviewValidator');
const { isAuthenticated } = require('../middleware/authenticate');

// GET all reviews - public
router.get('/', reviewsController.getAllReviews);

// GET a single review by id - public
router.get('/:id', reviewsController.getSingleReview);

// POST - create a new review - requires login
router.post(
    '/',
    isAuthenticated,
    reviewValidationRules,
    validateReview,
    reviewsController.createReview
);

// PUT - update a review by id - requires login
router.put(
    '/:id',
    isAuthenticated,
    reviewValidationRules,
    validateReview,
    reviewsController.updateReview
);

// DELETE a review by id - requires login
router.delete('/:id', isAuthenticated, reviewsController.deleteReview);

module.exports = router;