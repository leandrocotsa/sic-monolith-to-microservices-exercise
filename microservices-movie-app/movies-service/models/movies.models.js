const mongoose = require("mongoose");

const Movie = mongoose.model("Movie", new mongoose.Schema({
    id: Number,
    title: String,
    year: Number
}));

const getMovies = async () => {
    return await Movie.find();
};

const getMovieById = async (id) => {
    return await Movie.findOne({ id: parseInt(id) });
};

const createMovie = async (movieData) => {
    const lastMovie = await Movie.findOne().sort({ id: -1 });
    const newMovie = new Movie({
        id: lastMovie ? lastMovie.id + 1 : 1,
        title: movieData.title,
        year: movieData.year,
    });
    return await newMovie.save();
};

const updateMovie = async (id, movieData) => {
    return await Movie.findOneAndUpdate({ id: parseInt(id) }, movieData, { new: true });
};

const deleteMovie = async (id) => {
    return await Movie.deleteOne({ id: parseInt(id) });
};

module.exports = { getMovies, getMovieById, createMovie, updateMovie, deleteMovie };
