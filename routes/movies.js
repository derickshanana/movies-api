const express = require('express');
const router = express.Router();
const moviesController = require('../controllers/movies');
const { movieValidationRules, validateMovie } = require('../validators/movieValidator');

// GET all movies
router.get('/', moviesController.getAllMovies);

// GET a single movie by id
router.get('/:id', moviesController.getSingleMovie);

// POST - create a new movie (validated)
router.post('/', movieValidationRules, validateMovie, moviesController.createMovie);

// PUT - update a movie by id (validated)
router.put('/:id', movieValidationRules, validateMovie, moviesController.updateMovie);

// DELETE a movie by id
router.delete('/:id', moviesController.deleteMovie);

module.exports = router;
