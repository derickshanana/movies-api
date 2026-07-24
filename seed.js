// Run this once with: node seed.js
// Inserts sample movies and reviews into your MongoDB database.
const { MongoClient } = require('mongodb');
require('dotenv').config();

const movies = [
  {
    title: 'The Silent Horizon',
    director: 'Maria Chen',
    releaseYear: 2019,
    genre: 'Sci-Fi',
    rating: 8.2,
    runtimeMinutes: 128,
    synopsis: 'A crew on a deep-space mission uncovers a signal that shouldn\'t exist.'
  },
  {
    title: 'Coastal Roads',
    director: 'James Okafor',
    releaseYear: 2021,
    genre: 'Drama',
    rating: 7.5,
    runtimeMinutes: 104,
    synopsis: 'Two estranged siblings reconnect on a road trip down the California coast.'
  },
  {
    title: 'Midnight Ledger',
    director: 'Priya Nair',
    releaseYear: 2017,
    genre: 'Thriller',
    rating: 7.9,
    runtimeMinutes: 116,
    synopsis: 'An accountant discovers her firm has been laundering money for a decade.'
  },
  {
    title: 'Paper Lanterns',
    director: 'Daniel Kim',
    releaseYear: 2023,
    genre: 'Animation',
    rating: 8.6,
    runtimeMinutes: 95,
    synopsis: 'A young inventor builds lanterns that can carry wishes to the stars.'
  },
  {
    title: 'The Long Winter',
    director: 'Elena Petrova',
    releaseYear: 2015,
    genre: 'Historical',
    rating: 7.1,
    runtimeMinutes: 142,
    synopsis: 'A village struggles to survive the harshest winter in a century.'
  }
];

async function seed() {
  const client = new MongoClient(process.env.MONGODB_URI);
  try {
    await client.connect();
    const db = client.db();

    const movieResult = await db.collection('movies').insertMany(movies);
    console.log(`${movieResult.insertedCount} movies inserted`);

    const insertedIds = Object.values(movieResult.insertedIds);

    const reviews = [
      {
        movieId: insertedIds[0].toString(),
        reviewerName: 'Alex Turner',
        rating: 9,
        comment: 'Gorgeous visuals and a genuinely surprising third act.',
        datePosted: '01/12/2024'
      },
      {
        movieId: insertedIds[1].toString(),
        reviewerName: 'Sam Rivera',
        rating: 7,
        comment: 'Slow in the middle but the ending really lands.',
        datePosted: '02/03/2024'
      },
      {
        movieId: insertedIds[2].toString(),
        reviewerName: 'Jordan Lee',
        rating: 8,
        comment: 'Tense from start to finish, great performances.',
        datePosted: '03/19/2024'
      }
    ];

    const reviewResult = await db.collection('reviews').insertMany(reviews);
    console.log(`${reviewResult.insertedCount} reviews inserted`);
  } catch (err) {
    console.error('Seed error:', err);
  } finally {
    await client.close();
  }
}

seed();
