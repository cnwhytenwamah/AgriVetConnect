const { Router } = require("express");
const authRoutes = require("../modules/auth/auth.routes");
const userRoutes = require("../modules/users/users.routes");

const router = Router();

router.get("/health", (req, res) => {
  res.status(200).json({ status: "ok", message: "AgriVet Connect API is running" });
});

router.use("/auth", authRoutes);
router.use("/users", userRoutes);

module.exports = router;