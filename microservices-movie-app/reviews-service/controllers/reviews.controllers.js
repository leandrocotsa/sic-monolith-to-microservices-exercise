const reviewsService = require("../services/reviews.services");

const getReviews = async (req, res, next) => {
  try {
    const { movieId } = req.query;
    if (movieId) {
      const reviews = await reviewsService.getReviewsByMovieId(movieId);
      return res.json(reviews);
    }
    const reviews = await reviewsService.getReviews();
    res.status(200).json(reviews);
  } catch (error) {
    next(error);
  }
};

const getReviewById = async (req, res, next) => {
  try {
    const review = await reviewsService.getReviewById(req.params.id);
    res.status(200).json(review);
  } catch (error) {
    next(error);
  }
};

const createReview = async (req, res, next) => {
  try {
    const newReview = await reviewsService.createReview(req.body);
    res.status(201).json(newReview);
  } catch (error) {
    next(error);
  }
};

const deleteReview = async (req, res, next) => {
  try {
    await reviewsService.deleteReview(req.params.id);
    res.status(204).send();
  } catch (error) {
    next(error);
  }
};

const updateReview = async (req, res, next) => {
  try {
    const updatedReview = await reviewsService.updateReview(req.params.id, req.body);
    res.status(200).json(updatedReview);
  } catch (error) {
    next(error);
  }
};

module.exports = { getReviews, getReviewById, createReview, deleteReview, updateReview };
