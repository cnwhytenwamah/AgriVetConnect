import { Router } from "express";
import * as productsController from "./products.controller.js";
import { validate } from "../../middleware/validate.middleware.js";
import {
  createProductSchema,
  updateProductSchema,
} from "./products.validation.js";

const router = Router();

router.get("/", productsController.getAllProducts);
router.get("/:id", productsController.getProductById);
router.post(
  "/",
  validate(createProductSchema),
  productsController.createProduct
);
router.put(
  "/:id",
  validate(updateProductSchema),
  productsController.updateProduct
);

router.delete("/:id", productsController.deleteProduct);

export default router;
