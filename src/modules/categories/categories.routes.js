import { Router } from "express";
import * as categoriesController from "./categories.controller.js";

const router = Router();

router.get("/", categoriesController.getAllCategories);
router.get("/:id", categoriesController.getCategoryById);
router.post("/", categoriesController.createCategory);
router.put("/:id", categoriesController.updateCategory);
router.delete("/:id", categoriesController.deleteCategory);

export default router;
