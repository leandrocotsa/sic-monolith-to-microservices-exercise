const moviesModel = require("../models/movies.models");
const axios = require("axios");

const getMovies = async () => {
  return await moviesModel.getMovies();
};

const getMovieById = async (id) => {
  const movie = await moviesModel.getMovieById(id);

  if (!movie) {
    const error = new Error("Movie not found");
    error.status = 404;
    throw error;
  }

  // Fetch reviews from the reviews service
  const movieReviews = await axios.get(
    `http://localhost:5002/reviews?movieId=${id}`
  );
  console.log(movieReviews.data);
  movie.reviews = movieReviews.data;

  return movie;
};

const createMovie = async (movieData) => {
  return await moviesModel.createMovie(movieData);
};

const updateMovie = async (id, movieData) => {
  const movie = await moviesModel.getMovieById(id);
  
  if (!movie) {
    const error = new Error("Movie not found");
    error.status = 404;
    throw error;
  }

  return await moviesModel.updateMovie(id, movieData);
};

const deleteMovie = async (id) => {
  const movie = await moviesModel.getMovieById(id);
  
  if (!movie) {
    const error = new Error("Movie not found");
    error.status = 404;
    throw error;
  }

  return await moviesModel.deleteMovie(id);
};

module.exports = { getMovies, getMovieById, createMovie, updateMovie, deleteMovie };
