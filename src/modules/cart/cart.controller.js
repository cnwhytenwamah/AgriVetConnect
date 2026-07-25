const { sendSuccess } = require("../../utils/apiResponse");
const { getCartSummary, addCartItem, updateCartItem, removeCartItem, clearCart } = require("./cart.service");

async function getCart(req, res, next) {
  try {
    const cart = await getCartSummary(req.user.userId);
    return sendSuccess(res, 200, "Cart retrieved successfully", cart);
  } catch (error) {
    next(error);
  }
}

async function addItem(req, res, next) {
  try {
    const cart = await addCartItem(req.user.userId, req.body);
    return sendSuccess(res, 201, "Item added to cart", cart);
  } catch (error) {
    next(error);
  }
}

async function updateItem(req, res, next) {
  try {
    const cart = await updateCartItem(req.user.userId, req.params.productId, req.body);
    return sendSuccess(res, 200, "Cart item updated successfully", cart);
  } catch (error) {
    next(error);
  }
}

async function removeItem(req, res, next) {
  try {
    const cart = await removeCartItem(req.user.userId, req.params.productId);
    return sendSuccess(res, 200, "Cart item removed successfully", cart);
  } catch (error) {
    next(error);
  }
}

async function emptyCart(req, res, next) {
  try {
    const cart = await clearCart(req.user.userId);
    return sendSuccess(res, 200, "Cart cleared successfully", cart);
  } catch (error) {
    next(error);
  }
}

module.exports = { getCart, addItem, updateItem, removeItem, emptyCart };
