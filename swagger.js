const swaggerAutogen = require('swagger-autogen')();

const doc = {
  info: {
    title: 'Movies & Reviews API',
    description:
      'CSE 341 Project 2 - CRUD API for movies and their reviews, backed by MongoDB, with validation and centralized error handling.'
  },
  // Replace this with your actual Render domain once deployed (no https:// prefix).
  host: 'movies-api-vw64.onrender.com',
  schemes: ['https']
};

const outputFile = './swagger-output.json';
const endpointsFiles = ['./routes/index.js'];

// Run with: node swagger.js
// This generates/updates swagger-output.json based on your routes.
swaggerAutogen(outputFile, endpointsFiles, doc);
