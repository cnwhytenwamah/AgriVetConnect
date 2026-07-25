const { Router } = require("express");
const { authenticate, authorize } = require("../../middleware/auth.middleware");
const { validate } = require("../../middleware/validate.middleware");
const { createOrderSchema, updateOrderStatusSchema } = require("./orders.validation");
const { getOrders, getOrder, placeOrder, changeOrderStatus } = require("./orders.controller");

const router = Router();

router.get("/", authenticate, getOrders);
router.get("/:id", authenticate, getOrder);
router.post("/", authenticate, validate(createOrderSchema), placeOrder);
router.patch("/:id/status", authenticate, authorize("ADMIN", "STAFF"), validate(updateOrderStatusSchema), changeOrderStatus);

module.exports = router;
