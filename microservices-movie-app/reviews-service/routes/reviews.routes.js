const express = require("express");
const router = express.Router();
const reviewsController = require("../controllers/reviews.controllers");

router.get("/", reviewsController.getReviews);
router.get("/:id", reviewsController.getReviewById);
module.exports = router;
