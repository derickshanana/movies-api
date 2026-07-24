const express = require('express');
const router = express.Router();
const reviewsController = require('../controllers/reviews');
const { reviewValidationRules, validateReview } = require('../validators/reviewValidator');

// GET all reviews
router.get('/', reviewsController.getAllReviews);

// GET a single review by id
router.get('/:id', reviewsController.getSingleReview);

// POST - create a new review (validated)
router.post('/', reviewValidationRules, validateReview, reviewsController.createReview);

// PUT - update a review by id (validated)
router.put('/:id', reviewValidationRules, validateReview, reviewsController.updateReview);

// DELETE a review by id
router.delete('/:id', reviewsController.deleteReview);

module.exports = router;
