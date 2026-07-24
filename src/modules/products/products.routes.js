const { Router } = require("express");
const productsController = require("./products.controller");
const { validate } = require("../../middleware/validate.middleware");
const {
  createProductSchema,
  updateProductSchema,
} = require("./products.validation");

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

module.exports = router;
