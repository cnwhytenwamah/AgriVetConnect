const { Router } = require("express");
const authRoutes = require("../modules/auth/auth.routes");
const userRoutes = require("../modules/users/users.routes");
const cartRoutes = require("../modules/cart/cart.routes");
const orderRoutes = require("../modules/orders/orders.routes");
const paymentRoutes = require("../modules/payments/payments.routes");
const reviewRoutes = require("../modules/reviews/reviews.routes");
const reportRoutes = require("../modules/reports/reports.routes");
const notificationRoutes = require("../modules/notifications/notifications.routes");

const router = Router();

router.get("/health", (req, res) => {
  res.status(200).json({ status: "ok", message: "AgriVet Connect API is running" });
});

router.use("/auth", authRoutes);
router.use("/users", userRoutes);
router.use("/cart", cartRoutes);
router.use("/orders", orderRoutes);
router.use("/payments", paymentRoutes);
router.use("/reviews", reviewRoutes);
router.use("/reports", reportRoutes);
router.use("/notifications", notificationRoutes);

module.exports = router;
