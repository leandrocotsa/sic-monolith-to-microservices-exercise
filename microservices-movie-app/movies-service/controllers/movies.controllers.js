const moviesService = require("../services/movies.services");
const logger = require("../logger");

/*
 #swagger.tags = ['Movies']
 #swagger.summary = 'Get all movies'
 #swagger.description = 'Retrieve a list of all movies'
 #swagger.responses[200] = { 
   description: 'Movies retrieved successfully', 
   schema: { 
     success: true,
     message: 'Movies retrieved successfully',
     data: [
       {
         id: 1,
         title: 'Treasure Planet',
         year: 2002
       },
       {
         id: 2,
         title: 'The Matrix',
         year: 1999
       }
     ]
   } 
 }
 #swagger.responses[500] = { 
   description: 'Error retrieving movies',
   schema: {
     success: false,
     message: 'Error retrieving movies',
     error: 'Internal server error'
   }
 }
 */
const getMovies = async (req, res, next) => {
  logger.info('Incoming request: GET /movies');
  
  try {
    const movies = await moviesService.getMovies();
    logger.info('Movies retrieved successfully');
    
    res.json({
      success: true,
      message: "Movies retrieved successfully",
      data: movies
    });
  } catch (error) {
    logger.error('Error retrieving movies');
    
    res.status(500).json({
      success: false,
      message: "Error retrieving movies",
      error: error.message
    });
  }
};

/*
 #swagger.tags = ['Movies']
 #swagger.summary = 'Get movie by ID'
 #swagger.description = 'Retrieve a specific movie by its ID'
 #swagger.parameters['id'] = {
   in: 'path',
   description: 'Movie ID',
   required: true,
   type: 'integer'
 }
 #swagger.responses[200] = { 
   description: 'Movie retrieved successfully', 
   schema: { 
     success: true,
     message: 'Movie retrieved successfully',
     data: { $ref: '#/definitions/MovieWithReviews' }
   } 
 }
 #swagger.responses[404] = { 
   description: 'Movie not found',
   schema: {
     success: false,
     message: 'Movie not found',
     error: 'Movie not found'
   }
 }
 #swagger.responses[500] = { 
   description: 'Error retrieving movie',
   schema: {
     success: false,
     message: 'Error retrieving movie',
     error: 'Internal server error'
   }
 }
 */
const getMovieById = async (req, res, next) => {
  const movieId = req.params.id;
  logger.info('Incoming request: GET /movies/:id');
  
  try {
    const movie = await moviesService.getMovieById(movieId);
    logger.info('Movie retrieved successfully');
    
    res.json({
      success: true,
      message: "Movie retrieved successfully",
      data: movie
    });
  } catch (error) {
    const statusCode = error.status || 500;
    
    if (statusCode === 404) {
      logger.warn('Movie not found');
    } else {
      logger.error('Error retrieving movie');
    }
    
    res.status(statusCode).json({
      success: false,
      message: error.message || "Error retrieving movie",
      error: error.message
    });
  }
};

/*
 #swagger.tags = ['Movies']
 #swagger.summary = 'Create a new movie'
 #swagger.description = 'Create a new movie with title and year'
 #swagger.parameters['body'] = {
   in: 'body',
   description: 'New movie object',
   required: true,
   schema: { $ref: '#/definitions/CreateMovie' }
 }
 #swagger.responses[201] = { 
   description: 'Movie created successfully', 
   schema: {
     success: true,
     message: 'Movie created successfully',
     data: { $ref: '#/definitions/Movie' }
   } 
 }
 #swagger.responses[400] = { 
   description: 'Validation error - Title and year are required',
   schema: {
     success: false,
     message: 'Validation error',
     error: 'Title and year are required fields'
   }
 }
 #swagger.responses[500] = { 
   description: 'Error creating movie',
   schema: {
     success: false,
     message: 'Error creating movie',
     error: 'Internal server error'
   }
 }
 */
const createMovie = async (req, res, next) => {
  logger.info('Incoming request: POST /movies');
  
  try {
    // Validação: title e year são obrigatórios
    if (!req.body.title || !req.body.year) {
      logger.warn('Validation error: Missing required fields');
      
      return res.status(400).json({
        success: false,
        message: "Validation error",
        error: "Title and year are required fields"
      });
    }

    const createdMovie = await moviesService.createMovie(req.body);
    logger.info('Movie created successfully');
    
    res.status(201).json({
      success: true,
      message: "Movie created successfully",
      data: createdMovie
    });
  } catch (error) {
    logger.error('Error creating movie');
    res.status(500).json({
      success: false,
      message: "Error creating movie",
      error: error.message
    });
  }
};

/*
 #swagger.tags = ['Movies']
 #swagger.summary = 'Update a movie'
 #swagger.description = 'Update an existing movie by ID'
 #swagger.parameters['id'] = {
   in: 'path',
   description: 'Movie ID',
   required: true,
   type: 'integer'
 }
   #swagger.parameters['body'] = {
   in: 'path',
   description: 'Movie ID',
    required: true,
    type: 'integer'
  }
 #swagger.parameters['body'] = {
   in: 'body',
   description: 'Updated movie object',
   required: true,
   schema: { $ref: '#/definitions/UpdateMovie' }
 }
 #swagger.responses[200] = { 
   description: 'Movie updated successfully', 
   schema: {
     success: true,
     message: 'Movie updated successfully',
     data: { $ref: '#/definitions/Movie' }
   } 
 }
 #swagger.responses[404] = { 
   description: 'Movie not found',
   schema: {
     success: false,
     message: 'Movie not found',
     error: 'Movie not found'
   }
 }
 #swagger.responses[500] = { 
   description: 'Error updating movie',
   schema: {
     success: false,
     message: 'Error updating movie',
     error: 'Internal server error'
   }
 }
 */
const updateMovie = async (req, res, next) => {
  const movieId = req.params.id;
  logger.info('Incoming request: PUT /movies/:id');
  
  try {
    const updatedMovie = await moviesService.updateMovie(movieId, req.body);
    logger.info('Movie updated successfully');
    
    res.json({
      success: true,
      message: "Movie updated successfully",
      data: updatedMovie
    });
  } catch (error) {
    const statusCode = error.status || 500;
    
    if (statusCode === 404) {
      logger.warn('Movie not found for update');
    } else {
      logger.error('Error updating movie');
    }
    
    res.status(statusCode).json({
      success: false,
      message: error.message || "Error updating movie",
      error: error.message
    });
  }
};

/*
 #swagger.tags = ['Movies']
 #swagger.summary = 'Delete a movie'
 #swagger.description = 'Delete a movie by ID'
 #swagger.parameters['id'] = {
   in: 'path',
   description: 'Movie ID',
   required: true,
   type: 'integer'
 }
 #swagger.responses[200] = { 
   description: 'Movie deleted successfully',
   schema: {
     success: true,
     message: 'Movie deleted successfully'
   }
 }
 #swagger.responses[404] = { 
   description: 'Movie not found',
   schema: {
     success: false,
     message: 'Movie not found',
     error: 'Movie not found'
   }
 }
 #swagger.responses[500] = { 
   description: 'Error deleting movie',
   schema: {
     success: false,
     message: 'Error deleting movie',
     error: 'Internal server error'
   }
 }
 */
const deleteMovie = async (req, res, next) => {
  const movieId = req.params.id;
  logger.info('Incoming request: DELETE /movies/:id');
  
  try {
    await moviesService.deleteMovie(movieId);
    logger.info('Movie deleted successfully');
    
    res.status(200).json({
      success: true,
      message: "Movie deleted successfully"
    });
  } catch (error) {
    const statusCode = error.status || 500;
    
    if (statusCode === 404) {
      logger.warn('Movie not found for deletion');
    } else {
      logger.error('Error deleting movie');
    }
    
    res.status(statusCode).json({
      success: false,
      message: error.message || "Error deleting movie",
      error: error.message
    });
  }
};

module.exports = { getMovies, getMovieById, createMovie, updateMovie, deleteMovie };
