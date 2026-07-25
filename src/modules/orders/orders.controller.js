const { sendSuccess } = require("../../utils/apiResponse");
const { listOrders, getOrderById, createOrder, updateOrderStatus } = require("./orders.service");

async function getOrders(req, res, next) {
  try {
    const orders = await listOrders(req.user);
    return sendSuccess(res, 200, "Orders retrieved successfully", orders);
  } catch (error) {
    next(error);
  }
}

async function getOrder(req, res, next) {
  try {
    const order = await getOrderById(req.user, req.params.id);
    return sendSuccess(res, 200, "Order retrieved successfully", order);
  } catch (error) {
    next(error);
  }
}

async function placeOrder(req, res, next) {
  try {
    const order = await createOrder(req.user.userId, req.body);
    return sendSuccess(res, 201, "Order created successfully", order);
  } catch (error) {
    next(error);
  }
}

async function changeOrderStatus(req, res, next) {
  try {
    const order = await updateOrderStatus(req.user, req.params.id, req.body);
    return sendSuccess(res, 200, "Order status updated successfully", order);
  } catch (error) {
    next(error);
  }
}

module.exports = { getOrders, getOrder, placeOrder, changeOrderStatus };
