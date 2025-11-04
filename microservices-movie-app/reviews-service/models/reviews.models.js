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

const createReview = async (reviewData) => {
  const newReview = {
    id: reviews.length + 1,
    movieId: reviewData.movieId,
    userId: reviewData.userId,
    text: reviewData.text,
  };
  reviews.push(newReview);
  return newReview;
};

const deleteReview = async (id) => {
  const index = reviews.findIndex((r) => r.id === parseInt(id));
  if (index !== -1) {
    reviews.splice(index, 1);
    return true;
  }
  return false;
};

const updateReview = async (id, reviewData) => {
  const index = reviews.findIndex((r) => r.id === parseInt(id));
  if (index !== -1) {
    reviews[index] = {
      ...reviews[index],
      movieId: reviewData.movieId ?? reviews[index].movieId,
      userId: reviewData.userId ?? reviews[index].userId,
      text: reviewData.text ?? reviews[index].text,
    };
    return reviews[index];
  }
  return null;
};

module.exports = { getReviews, getReviewById, getReviewsByMovieId, createReview, deleteReview, updateReview};
