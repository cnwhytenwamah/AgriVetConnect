const { sendSuccess } = require("../../utils/apiResponse");
const { listReviews, createReview, updateReview, deleteReview } = require("./reviews.service");

async function getReviews(req, res, next) {
  try {
    const reviews = await listReviews(req.user);
    return sendSuccess(res, 200, "Reviews retrieved successfully", reviews);
  } catch (error) {
    next(error);
  }
}

async function addReview(req, res, next) {
  try {
    const review = await createReview(req.user.userId, req.body);
    return sendSuccess(res, 201, "Review created successfully", review);
  } catch (error) {
    next(error);
  }
}

async function editReview(req, res, next) {
  try {
    const review = await updateReview(req.user.userId, req.params.id, req.body);
    return sendSuccess(res, 200, "Review updated successfully", review);
  } catch (error) {
    next(error);
  }
}

async function removeReview(req, res, next) {
  try {
    await deleteReview(req.user.userId, req.params.id);
    return sendSuccess(res, 200, "Review deleted successfully");
  } catch (error) {
    next(error);
  }
}

module.exports = { getReviews, addReview, editReview, removeReview };
