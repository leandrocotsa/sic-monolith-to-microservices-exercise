const moviesService = require("../services/movies.services");

const getMovies = async (req, res, next) => {
  try {
    const movies = await moviesService.getMovies();
    res.json({
      success: true,
      message: "Movies retrieved successfully",
      data: movies
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error retrieving movies",
      error: error.message
    });
  }
};

const getMovieById = async (req, res, next) => {
  try {
    const movie = await moviesService.getMovieById(req.params.id);
    res.json({
      success: true,
      message: "Movie retrieved successfully",
      data: movie
    });
  } catch (error) {
    const statusCode = error.status || 500;
    res.status(statusCode).json({
      success: false,
      message: error.message || "Error retrieving movie",
      error: error.message
    });
  }
};


const createMovie = async (req, res, next) => {
  try {
    // Validação: title e year são obrigatórios
    if (!req.body.title || !req.body.year) {
      return res.status(400).json({ 
        success: false,
        message: "Validation error",
        error: "Title and year are required fields" 
      });
    }
    
    const createdMovie = await moviesService.createMovie(req.body);
    res.status(201).json({
      success: true,
      message: "Movie created successfully",
      data: createdMovie
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error creating movie",
      error: error.message
    });
  }
};

const updateMovie = async (req, res, next) => {
  try {
    const updatedMovie = await moviesService.updateMovie(req.params.id, req.body);
    res.json({
      success: true,
      message: "Movie updated successfully",
      data: updatedMovie
    });
  } catch (error) {
    const statusCode = error.status || 500;
    res.status(statusCode).json({
      success: false,
      message: error.message || "Error updating movie",
      error: error.message
    });
  }
};

const deleteMovie = async (req, res, next) => {
  try {
    await moviesService.deleteMovie(req.params.id);
    res.status(200).json({
      success: true,
      message: "Movie deleted successfully"
    });
  } catch (error) {
    const statusCode = error.status || 500;
    res.status(statusCode).json({
      success: false,
      message: error.message || "Error deleting movie",
      error: error.message
    });
  }
};

module.exports = { getMovies, getMovieById, createMovie, updateMovie, deleteMovie };
