const { ObjectId } = require('mongodb');
const { getDb } = require('../db/connect');
const asyncHandler = require('../middleware/asyncHandler');

// GET all movies
const getAllMovies = asyncHandler(async (req, res) => {
  const db = getDb();
  const movies = await db.db().collection('movies').find().toArray();
  res.setHeader('Content-Type', 'application/json');
  res.status(200).json(movies);
});

// GET a single movie by id
const getSingleMovie = asyncHandler(async (req, res) => {
  if (!ObjectId.isValid(req.params.id)) {
    const err = new Error('Invalid movie id');
    err.statusCode = 400;
    throw err;
  }

  const db = getDb();
  const movie = await db
    .db()
    .collection('movies')
    .findOne({ _id: new ObjectId(req.params.id) });

  if (!movie) {
    const err = new Error('Movie not found');
    err.statusCode = 404;
    throw err;
  }

  res.setHeader('Content-Type', 'application/json');
  res.status(200).json(movie);
});

// POST - create a new movie
const createMovie = asyncHandler(async (req, res) => {
  const { title, director, releaseYear, genre, rating, runtimeMinutes, synopsis } = req.body;

  const newMovie = {
    title,
    director,
    releaseYear,
    genre,
    rating,
    runtimeMinutes,
    synopsis
  };

  const db = getDb();
  const response = await db.db().collection('movies').insertOne(newMovie);

  if (!response.acknowledged) {
    const err = new Error('Failed to create movie');
    err.statusCode = 500;
    throw err;
  }

  res.status(201).json({ id: response.insertedId });
});

// PUT - update an existing movie
const updateMovie = asyncHandler(async (req, res) => {
  if (!ObjectId.isValid(req.params.id)) {
    const err = new Error('Invalid movie id');
    err.statusCode = 400;
    throw err;
  }

  const { title, director, releaseYear, genre, rating, runtimeMinutes, synopsis } = req.body;

  const updatedMovie = {
    title,
    director,
    releaseYear,
    genre,
    rating,
    runtimeMinutes,
    synopsis
  };

  const db = getDb();
  const response = await db
    .db()
    .collection('movies')
    .replaceOne({ _id: new ObjectId(req.params.id) }, updatedMovie);

  if (response.matchedCount === 0) {
    const err = new Error('Movie not found');
    err.statusCode = 404;
    throw err;
  }

  res.status(204).send();
});

// DELETE a movie
const deleteMovie = asyncHandler(async (req, res) => {
  if (!ObjectId.isValid(req.params.id)) {
    const err = new Error('Invalid movie id');
    err.statusCode = 400;
    throw err;
  }

  const db = getDb();
  const response = await db
    .db()
    .collection('movies')
    .deleteOne({ _id: new ObjectId(req.params.id) });

  if (response.deletedCount === 0) {
    const err = new Error('Movie not found');
    err.statusCode = 404;
    throw err;
  }

  res.status(200).json({ message: 'Movie deleted successfully' });
});

module.exports = {
  getAllMovies,
  getSingleMovie,
  createMovie,
  updateMovie,
  deleteMovie
};
