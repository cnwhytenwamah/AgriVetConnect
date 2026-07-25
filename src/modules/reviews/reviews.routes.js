const { Router } = require("express");
const { authenticate } = require("../../middleware/auth.middleware");
const { validate } = require("../../middleware/validate.middleware");
const { createReviewSchema, updateReviewSchema } = require("./reviews.validation");
const { getReviews, addReview, editReview, removeReview } = require("./reviews.controller");

const router = Router();

router.get("/", authenticate, getReviews);
router.post("/", authenticate, validate(createReviewSchema), addReview);
router.patch("/:id", authenticate, validate(updateReviewSchema), editReview);
router.delete("/:id", authenticate, removeReview);

module.exports = router;
