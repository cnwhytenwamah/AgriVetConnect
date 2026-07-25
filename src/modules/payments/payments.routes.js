const { Router } = require("express");
const { authenticate, authorize } = require("../../middleware/auth.middleware");
const { validate } = require("../../middleware/validate.middleware");
const { initializePaymentSchema, verifyPaymentSchema } = require("./payments.validation");
const { getPayments, startPayment, confirmPayment } = require("./payments.controller");

const router = Router();

router.get("/", authenticate, authorize("ADMIN", "STAFF"), getPayments);
router.post("/", authenticate, validate(initializePaymentSchema), startPayment);
router.patch("/:id/verify", authenticate, validate(verifyPaymentSchema), confirmPayment);

module.exports = router;
