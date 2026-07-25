const { Router } = require("express");
const { authenticate } = require("../../middleware/auth.middleware");
const { validate } = require("../../middleware/validate.middleware");
const { addCartItemSchema, updateCartItemSchema } = require("./cart.validation");
const { getCart, addItem, updateItem, removeItem, emptyCart } = require("./cart.controller");

const router = Router();

router.get("/", authenticate, getCart);
router.post("/items", authenticate, validate(addCartItemSchema), addItem);
router.patch("/items/:productId", authenticate, validate(updateCartItemSchema), updateItem);
router.delete("/items/:productId", authenticate, removeItem);
router.delete("/", authenticate, emptyCart);

module.exports = router;
