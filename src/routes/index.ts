import { Router } from "express";
import categoriesRoutes from "../modules/categories/categories.routes";
import productsRoutes from "../modules/products/products.routes";
import inventoryRoutes from "../modules/inventory/inventory.routes";
import servicesRoutes from "../modules/services/services.routes";

const router = Router();

router.get("/health", (req, res) => {
  res
    .status(200)
    .json({ status: "ok", message: "AgriVet Connect API is running" });
});

router.use("/categories", categoriesRoutes);
router.use("/products", productsRoutes);
router.use("/inventory", inventoryRoutes);
router.use("/services", servicesRoutes);
export default router;
