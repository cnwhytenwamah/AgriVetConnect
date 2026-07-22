import { Router } from "express";
import categoriesRoutes from "../modules/categories/categories.routes";

const router = Router();

router.get("/health", (req, res) => {
  res
    .status(200)
    .json({ status: "ok", message: "AgriVet Connect API is running" });
});

router.use("/categories", categoriesRoutes);
export default router;
