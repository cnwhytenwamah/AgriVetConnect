import { Router } from "express";
import categoriesRoutes from "../modules/categories/categories.routes";
import productsRoutes from "../modules/products/products.route";

const router = Router();

router.get("/health", (req, res) => {
  res
    .status(200)
    .json({ status: "ok", message: "AgriVet Connect API is running" });
});

router.use("/categories", categoriesRoutes);
router.use("/products", productsRoutes);
export default router;
