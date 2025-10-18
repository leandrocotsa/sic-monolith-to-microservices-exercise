const express = require("express");
const axios = require("axios"); // we'll use this to call the review service
const app = express();

app.use(express.json());

// our "database" data
let movies = [
  { id: 1, title: "Treasure Planet", year: 2002 },
  { id: 2, title: "The Matrix", year: 1999 }
];

// GET all movies
app.get("/movies", (req, res) => {
  res.json(movies)});

// GET a movie by ID (and fetch its reviews from the Review Service)
app.get("/movies/:id", async (req, res) => {

  const movie = movies.find(m => m.id === parseInt(req.params.id));
  if (!movie) {
    return res.status(404).json({ error: "Movie not found" });
  }

  try {
    // call the review service
    const response = await axios.get(`http://localhost:3002/reviews?movieId=${movie.id}`);
    const movieReviews = response.data;

    res.json({
      id: movie.id,
      title: movie.title,
      year: movie.year,
      reviews: movieReviews
    });

  } catch (error) {
    res.status(500).json({ error: "Failed to fetch reviews" });
  }
});

app.listen(3001, () => console.log("Movies service running on port 3001"));
