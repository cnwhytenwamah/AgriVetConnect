const { Router } = require("express");
const authRoutes = require("../modules/auth/auth.routes");
const userRoutes = require("../modules/users/users.routes");
const categoriesRoutes = require("../modules/categories/categories.routes");
const productsRoutes = require("../modules/products/products.routes");
const inventoryRoutes = require("../modules/inventory/inventory.routes");
const servicesRoutes = require("../modules/services/services.routes");
const appointmentsRoutes = require("../modules/appointments/appointments.routes");

const router = Router();

router.get("/health", (req, res) => {
  res
    .status(200)
    .json({ status: "ok", message: "AgriVet Connect API is running" });
});

router.use("/auth", authRoutes);
router.use("/users", userRoutes);
router.use("/categories", categoriesRoutes);
router.use("/products", productsRoutes);
router.use("/inventory", inventoryRoutes);
router.use("/services", servicesRoutes);
router.use("/appointments", appointmentsRoutes);

module.exports = router;
