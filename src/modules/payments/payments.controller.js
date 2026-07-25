const { sendSuccess } = require("../../utils/apiResponse");
const { initializePayment, verifyPayment, listPayments } = require("./payments.service");

async function getPayments(req, res, next) {
  try {
    const payments = await listPayments(req.user);
    return sendSuccess(res, 200, "Payments retrieved successfully", payments);
  } catch (error) {
    next(error);
  }
}

async function startPayment(req, res, next) {
  try {
    const payment = await initializePayment(req.user.userId, req.body);
    return sendSuccess(res, 201, "Payment initialized successfully", payment);
  } catch (error) {
    next(error);
  }
}

async function confirmPayment(req, res, next) {
  try {
    const payment = await verifyPayment(req.user, req.params.id, req.body);
    return sendSuccess(res, 200, "Payment verified successfully", payment);
  } catch (error) {
    next(error);
  }
}

module.exports = { getPayments, startPayment, confirmPayment };
