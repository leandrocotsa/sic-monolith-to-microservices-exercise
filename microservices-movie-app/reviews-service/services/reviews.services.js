const reviewsModel = require("../models/reviews.models");

const getReviews = async () => {
  return await reviewsModel.getReviews();
};

const getReviewById = async (id) => {
  const review = await reviewsModel.getReviewById(id);

  if (!review) {
    const error = new Error("Review not found");
    error.status = 404;
    throw error;
  }

  return review;
};

const getReviewsByMovieId = async (movieId) => {
  return await reviewsModel.getReviewsByMovieId(movieId);
};

module.exports = { getReviews, getReviewById, getReviewsByMovieId };
