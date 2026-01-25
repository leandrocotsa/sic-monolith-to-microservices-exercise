const express = require("express");
const router = express.Router();
const reviewsController = require("../controllers/reviews.controllers");

router.get("/", reviewsController.getReviews);
router.get("/:id", reviewsController.getReviewById);
router.post("/", reviewsController.createReview);
router.delete("/:id", reviewsController.deleteReview);
router.put("/:id", reviewsController.updateReview);

module.exports = router;

