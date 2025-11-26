const express = require("express");
const router = express.Router();
const reviewsController = require("../controllers/reviews.controllers");
const { authenticateToken, checkAdminRole, checkUserId } = require("../middleware/jwAuth");

router.get("/",  reviewsController.getReviews);
router.get("/:id", reviewsController.getReviewById);
router.post("/", authenticateToken, reviewsController.createReview);
router.delete("/:id", authenticateToken, checkUserId, reviewsController.deleteReview);
router.put("/:id",authenticateToken, reviewsController.updateReview);

module.exports = router;

