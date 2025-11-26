const mongoose = require("mongoose");

const Review = mongoose.model("Review", new mongoose.Schema({
    id: Number,
    movieId: Number,
    userId: Number,
    text: String
}));

const getReviews = async () => {
    return await Review.find();
};

const getReviewById = async (id) => {
    return await Review.findOne({ id: parseInt(id) });
};

const getReviewsByMovieId = async (movieId) => {
    return await Review.find({ movieId: parseInt(movieId) });
};

const createReview = async (reviewData, userId) => {
    const lastReview = await Review.findOne().sort({ id: -1 });
    const newReview = new Review({
        id: lastReview ? lastReview.id + 1 : 1,
        movieId: reviewData.movieId,
        userId: userId,
        text: reviewData.text,
    });
    return await newReview.save();
};

const updateReview = async (id, reviewData) => {
    return await Review.findOneAndUpdate({ id: parseInt(id) }, reviewData, { new: true });
};

const deleteReview = async (id) => {
    const result = await Review.deleteOne({ id: parseInt(id) });
    return result.deletedCount > 0;
};

module.exports = { getReviews, getReviewById, getReviewsByMovieId, createReview, updateReview, deleteReview };
