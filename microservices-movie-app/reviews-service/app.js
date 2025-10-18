const express = require("express");
const app = express();
app.use(express.json());

let reviews = [
  { id: 1, movieId: 1, userId: 2, text: "Very underrated movie!" },
  { id: 2, movieId: 1, userId: 1, text: "Best animated movie ever." },
  { id: 3, movieId: 2, userId: 1, text: "Classic sci-fi." }
];

// Get all reviews, optionally filtered by movieId
app.get("/reviews", (req, res) => {
  const { movieId } = req.query;
  if (movieId) {
    const filteredReviews = reviews.filter(r => r.movieId === parseInt(movieId));
    return res.json(filteredReviews);
  }
  res.json(reviews);
});

// Get a review by ID
app.get("/reviews/:id", (req, res) => {
  const review = reviews.find(r => r.id === parseInt(req.params.id));
  review ? res.json(review) : res.status(404).json({ error: "Review not found" });
});

// Create a new review
app.post("/reviews", (req, res) => {
  const newReview = { id: reviews.length + 1, ...req.body };
  reviews.push(newReview);
  res.status(201).json(newReview);
});

app.listen(3002, () => console.log("Reviews service running on port 3002"));
