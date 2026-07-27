const express = require('express');
const router = express.Router();
const moviesController = require('../controllers/movies');
const { movieValidationRules, validateMovie } = require('../validators/movieValidator');
const { isAuthenticated } = require('../middleware/authenticate');

// GET all movies - public
router.get('/', moviesController.getAllMovies);

// GET a single movie by id - public
router.get('/:id', moviesController.getSingleMovie);

// POST - create a new movie - requires login
router.post(
    '/',
    isAuthenticated,
    movieValidationRules,
    validateMovie,
    moviesController.createMovie
);

// PUT - update a movie by id - requires login
router.put(
    '/:id',
    isAuthenticated,
    movieValidationRules,
    validateMovie,
    moviesController.updateMovie
);

// DELETE a movie by id - requires login
router.delete('/:id', isAuthenticated, moviesController.deleteMovie);

module.exports = router;