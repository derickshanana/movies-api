const { ObjectId } = require('mongodb');
const { getDb } = require('../db/connect');
const asyncHandler = require('../middleware/asyncHandler');

// GET all reviews
const getAllReviews = asyncHandler(async (req, res) => {
  const db = getDb();
  const reviews = await db.db().collection('reviews').find().toArray();
  res.setHeader('Content-Type', 'application/json');
  res.status(200).json(reviews);
});

// GET a single review by id
const getSingleReview = asyncHandler(async (req, res) => {
  if (!ObjectId.isValid(req.params.id)) {
    const err = new Error('Invalid review id');
    err.statusCode = 400;
    throw err;
  }

  const db = getDb();
  const review = await db
    .db()
    .collection('reviews')
    .findOne({ _id: new ObjectId(req.params.id) });

  if (!review) {
    const err = new Error('Review not found');
    err.statusCode = 404;
    throw err;
  }

  res.setHeader('Content-Type', 'application/json');
  res.status(200).json(review);
});

// POST - create a new review
const createReview = asyncHandler(async (req, res) => {
  const { movieId, reviewerName, rating, comment, datePosted } = req.body;

  const newReview = {
    movieId,
    reviewerName,
    rating,
    comment,
    datePosted
  };

  const db = getDb();
  const response = await db.db().collection('reviews').insertOne(newReview);

  if (!response.acknowledged) {
    const err = new Error('Failed to create review');
    err.statusCode = 500;
    throw err;
  }

  res.status(201).json({ id: response.insertedId });
});

// PUT - update an existing review
const updateReview = asyncHandler(async (req, res) => {
  if (!ObjectId.isValid(req.params.id)) {
    const err = new Error('Invalid review id');
    err.statusCode = 400;
    throw err;
  }

  const { movieId, reviewerName, rating, comment, datePosted } = req.body;

  const updatedReview = {
    movieId,
    reviewerName,
    rating,
    comment,
    datePosted
  };

  const db = getDb();
  const response = await db
    .db()
    .collection('reviews')
    .replaceOne({ _id: new ObjectId(req.params.id) }, updatedReview);

  if (response.matchedCount === 0) {
    const err = new Error('Review not found');
    err.statusCode = 404;
    throw err;
  }

  res.status(204).send();
});

// DELETE a review
const deleteReview = asyncHandler(async (req, res) => {
  if (!ObjectId.isValid(req.params.id)) {
    const err = new Error('Invalid review id');
    err.statusCode = 400;
    throw err;
  }

  const db = getDb();
  const response = await db
    .db()
    .collection('reviews')
    .deleteOne({ _id: new ObjectId(req.params.id) });

  if (response.deletedCount === 0) {
    const err = new Error('Review not found');
    err.statusCode = 404;
    throw err;
  }

  res.status(200).json({ message: 'Review deleted successfully' });
});

module.exports = {
  getAllReviews,
  getSingleReview,
  createReview,
  updateReview,
  deleteReview
};
