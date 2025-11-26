let reviews = [
  { id: 1, movieId: 1, userId: 2, text: "Very underrated movie!" },
  { id: 2, movieId: 1, userId: 1, text: "Best animated movie ever." },
  { id: 3, movieId: 2, userId: 1, text: "Classic sci-fi." },
];

const getReviews = async () => {
  return reviews;
};

const getReviewById = async (id) => {
  return reviews.find((m) => m.id === parseInt(id));
};

const getReviewsByMovieId = async (movieId) => {
  return reviews.filter((r) => r.movieId === parseInt(movieId));
};

module.exports = { getReviews, getReviewById, getReviewsByMovieId };
