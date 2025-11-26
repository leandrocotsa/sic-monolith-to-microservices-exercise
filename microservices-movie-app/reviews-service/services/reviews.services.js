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

const createReview = async (reviewData, userId) => {
  return await reviewsModel.createReview(reviewData, userId);
};

const deleteReview = async (id) => {
  const result = await reviewsModel.deleteReview(id);
  if (!result) {
    const error = new Error("Review not found");
    error.status = 404;
    throw error;
  }
};

const updateReview = async (id, reviewData) => {
  const updatedReview = await reviewsModel.updateReview(id, reviewData);
  
  if (!updatedReview) {
    const error = new Error("Review not found");
    error.status = 404;
    throw error;
  }
  
  return updatedReview;
};

module.exports = { getReviews, getReviewById, getReviewsByMovieId, createReview, deleteReview, updateReview };
