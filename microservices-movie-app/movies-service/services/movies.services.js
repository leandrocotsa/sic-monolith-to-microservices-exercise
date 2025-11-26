const moviesModel = require("../models/movies.models");
const axios = require("axios");

const REVIEWS_SERVICE_HOST = process.env.REVIEWS_SERVICE_HOST || "localhost";

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

  // Convert Mongoose document to plain object
  const movieObj = movie.toObject ? movie.toObject() : movie;

  // Fetch reviews from the reviews service
  try {
    const movieReviews = await axios.get(
      `http://${REVIEWS_SERVICE_HOST}:5002/reviews?movieId=${id}`
    );
    console.log(movieReviews.data);
    movieObj.reviews = movieReviews.data;
  } catch (error) {
    console.log("Could not fetch reviews from reviews service:", error.message);
    movieObj.reviews = [];
  }

  return movieObj;
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
