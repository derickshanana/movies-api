const express = require('express');
const router = express.Router();
const moviesController = require('../controllers/movies');
const { movieValidationRules, validateMovie } = require('../validators/movieValidator');
const isLoggedIn = require('../middleware/isLoggedIn');

// GET all movies - public
router.get('/', moviesController.getAllMovies);

// GET a single movie by id - public
router.get('/:id', moviesController.getSingleMovie);

// POST - create a new movie
// #swagger.description = 'Requires authentication (GitHub OAuth login).'
router.post(
    '/',
    isLoggedIn,
    movieValidationRules,
    validateMovie,
    moviesController.createMovie
);

// PUT - update a movie by id - public (validated)
router.put('/:id', movieValidationRules, validateMovie, moviesController.updateMovie);

// DELETE a movie by id
// #swagger.description = 'Requires authentication (GitHub OAuth login).'
router.delete('/:id', isLoggedIn, moviesController.deleteMovie);

module.exports = router;