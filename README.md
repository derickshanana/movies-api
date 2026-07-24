# CSE 341 — Project 2: Movies & Reviews API (Part 1)

A CRUD API with two MongoDB collections:
- **movies** — 7 fields: title, director, releaseYear, genre, rating, runtimeMinutes, synopsis
- **reviews** — references a movie by id: movieId, reviewerName, rating, comment, datePosted

Both collections have full GET/POST/PUT/DELETE routes, `express-validator` input validation, and centralized error-handling middleware. Swagger docs are auto-generated and served at `/api-docs`.

## Folder structure
```
movies-api/
  server.js
  swagger.js
  seed.js
  package.json
  .env.example
  .gitignore
  movies.rest
  db/
    connect.js
  middleware/
    errorHandler.js      <- centralized error handler
    asyncHandler.js       <- wraps controllers so thrown errors reach errorHandler
  validators/
    movieValidator.js
    reviewValidator.js
  controllers/
    movies.js
    reviews.js
  routes/
    index.js
    movies.js
    reviews.js
```

## 1. MongoDB setup
1. In MongoDB Atlas, use your existing cluster but create a **new database** (e.g. `movies_reviews_db`) — don't reuse your Contacts database.
2. You don't need to manually create the `movies` or `reviews` collections — they're created automatically the first time you insert data (via the seed script or a POST request).

## 2. Local setup
1. Copy `.env.example` to `.env` and paste in your MongoDB connection string.
2. Install dependencies:
   ```
   npm install
   ```
3. Seed sample data (5 movies + 3 reviews):
   ```
   npm run seed
   ```
4. Generate Swagger docs (do this any time you change routes):
   ```
   npm run swagger
   ```
   Before running this, open `swagger.js` and replace `YOUR-APP-NAME.onrender.com` with your real Render domain.
5. Start the server:
   ```
   npm start
   ```

## 3. Test locally
- Open `movies.rest` in VS Code (REST Client extension) and run through the requests — includes both valid requests and intentionally invalid ones (missing fields, bad ObjectId) so you can demo validation returning 400 errors.
- Visit `http://localhost:3000/api-docs` to confirm the interactive Swagger UI loads and lists all 10 endpoints (5 for movies, 5 for reviews).

## 4. How validation + error handling work here
- `validators/movieValidator.js` and `validators/reviewValidator.js` define field rules using `express-validator` (required fields, correct types, valid ranges, valid MongoDB ObjectId for `movieId`).
- Each POST/PUT route runs the validation rules, then a `validate...` middleware checks the result — if anything failed, it immediately returns a `400` with details, before ever touching the controller or database.
- `middleware/asyncHandler.js` wraps every controller function. If a controller throws (e.g., "Movie not found" as a 404, or a real DB error as 500), the thrown error is automatically passed to `next(err)`.
- `middleware/errorHandler.js` is registered last in `server.js` (`app.use(errorHandler)`), so it catches everything forwarded via `next(err)` from anywhere in the app and returns a consistent JSON error response with the right status code.

## 5. Push to GitHub
```
git init
git add .
git commit -m "Project 2 Part 1 - CRUD, validation, error handling"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO.git
git push -u origin main
```
Double-check `.env` and `node_modules` are NOT on GitHub afterward.

## 6. Deploy to Render
1. New Web Service → connect this GitHub repo.
2. Build command: `npm install`
3. Start command: `npm start`
4. Add environment variable in Render: `MONGODB_URI` = your connection string.
5. Deploy, wait for the build, then re-run `npm run swagger` locally with your real Render URL in `swagger.js`, commit `swagger-output.json` again, and push so your live `/api-docs` reflects the correct host.
6. Test the live URLs in `movies.rest` (production section) and at `https://YOUR-APP-NAME.onrender.com/api-docs`.

## 7. Record your video and submit
See the video script provided separately. Submit in Canvas:
- GitHub repo link
- Render site link
- YouTube video link
