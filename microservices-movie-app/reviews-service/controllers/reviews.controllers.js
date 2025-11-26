const reviewsService = require("../services/reviews.services");

const getReviews = async (req, res, next) => {
  try {
    const { movieId } = req.query;
    if (movieId) {
      const reviews = await reviewsService.getReviewsByMovieId(movieId);
      return res.json(reviews);
    }
    const reviews = await reviewsService.getReviews();
    res.json(reviews);
  } catch (error) {
    next(error);
  }
};

const getReviewById = async (req, res, next) => {
  try {
    const review = await reviewsService.getReviewById(req.params.id);
    res.json(review);
  } catch (error) {
    next(error);
  }
};

module.exports = { getReviews, getReviewById };
