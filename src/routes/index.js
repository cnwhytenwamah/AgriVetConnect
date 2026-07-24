const { Router } = require("express");
const authRoutes = require("../modules/auth/auth.routes");

const router = Router();

router.get("/health", (req, res) => {
  res.status(200).json({ status: "ok", message: "AgriVet Connect API is running" });
});

router.use("/auth", authRoutes);

module.exports = router;