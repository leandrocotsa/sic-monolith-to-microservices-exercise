const reviewsService = require("../services/reviews.services");
const logger = require("../logger");

const getReviews = async (req, res, next) => {
  /*
  #swagger.tags = ['Reviews']
  #swagger.description = 'Get all reviews or filter by movieId'
  #swagger.responses[200] = {
    description: 'Reviews retrieved successfully',
    schema: [{ $ref: '#/definitions/GetReview' }]
  }
  */
  try {
    const { movieId } = req.query;
    
    logger.info("Fetching reviews");
    
    if (movieId) {
      const reviews = await reviewsService.getReviewsByMovieId(movieId);
      logger.info("Reviews fetched successfully");
      return res.status(200).json(reviews);
    }
    
    const reviews = await reviewsService.getReviews();
    logger.info("Reviews fetched successfully");
    res.status(200).json(reviews);
  } catch (error) {
    logger.error({ error: error.message }, "Error fetching reviews");
    next(error);
  }
};

const getReviewById = async (req, res, next) => {
  /*
  #swagger.tags = ['Reviews']
  #swagger.description = 'Get a review by ID'
  #swagger.parameters['id'] = {
    in: 'path',
    description: 'Review ID',
    required: true,
    type: 'integer'
  }
  #swagger.responses[200] = {
    description: 'Review retrieved successfully',
    schema: { $ref: '#/definitions/GetReview' }
  }
  #swagger.responses[400] = { description: 'Invalid id format' }
  #swagger.responses[404] = { description: 'Review not found' }
  #swagger.responses[500] = { description: 'Internal Server Error' }
  */
  try {
    const { id } = req.params;
    
    logger.info(`Fetching review by ID ${id}`);
    
    // 400 Bad Request - ID inválido
    if (Number.isNaN(parseInt(id)) || parseInt(id) <= 0) {
      logger.warn("Invalid review ID format");
      return res.status(400).json({ error: "Invalid id format. Must be a positive integer" });
    }
    
    const review = await reviewsService.getReviewById(id);
    logger.info("Review fetched successfully");
    res.status(200).json(review);
  } catch (error) {
    logger.error(`Error fetching review by ID ${id}`);
    next(error);
  }
};

const createReview = async (req, res, next) => {
  /*
  #swagger.tags = ['Reviews']
  #swagger.description = 'Create a new review'
  #swagger.parameters['body'] = {
    in: 'body',
    description: 'New review object',
    required: true,
    schema: { $ref: '#/definitions/CreateReview' }
  }
  #swagger.responses[201] = {
    description: 'Review created successfully',
    schema: { $ref: '#/definitions/GetReview' }
  }
  #swagger.responses[400] = { description: 'Invalid data' }
  */
  try {
    logger.info("Creating new review");

    const userId = req.user.id;

    const newReview = await reviewsService.createReview(req.body, userId);

    logger.info("Review created successfully");
    res.status(201).json(newReview);
  } catch (error) {
    logger.error("Error creating review");
    next(error);
  }
};

const deleteReview = async (req, res, next) => {
  /*
  #swagger.tags = ['Reviews']
  #swagger.description = 'Delete a review by ID'
  #swagger.parameters['id'] = {
    in: 'path',
    description: 'Review ID',
    required: true,
    type: 'integer'
  }
  #swagger.responses[204] = { description: 'Review deleted successfully' }
  #swagger.responses[404] = { description: 'Review not found' }
  */
  try {
    const { id } = req.params;
    
    logger.info("Deleting review");
    
    await reviewsService.deleteReview(id);
    
    logger.info("Review deleted successfully");
    res.status(204).send();
  } catch (error) {
    logger.error("Error deleting review");
    next(error);
  }
};

const updateReview = async (req, res, next) => {
  /*
  #swagger.tags = ['Reviews']
  #swagger.description = 'Update a review by ID'
  #swagger.parameters['id'] = {
    in: 'path',
    description: 'Review ID',
    required: true,
    type: 'integer'
  }
  #swagger.parameters['body'] = {
    in: 'body',
    description: 'Updated review object',
    required: true,
    schema: { $ref: '#/definitions/UpdateReview' }
  }
  #swagger.responses[200] = {
    description: 'Review updated successfully',
    schema: { $ref: '#/definitions/GetReview' }
  }
  #swagger.responses[404] = { description: 'Review not found' }
  #swagger.responses[400] = { description: 'Invalid data' }
  */
  try {
    const { id } = req.params;
    
    logger.info("Updating review");
    
    const updatedReview = await reviewsService.updateReview(id, req.body);
    
    logger.info("Review updated successfully");
    res.status(200).json(updatedReview);
  } catch (error) {
    logger.error("Error updating review");
    next(error);
  }
};

module.exports = { getReviews, getReviewById, createReview, deleteReview, updateReview };