const { Router } = require("express");
const productsController = require("./products.controller");
const { validate } = require("../../middleware/validate.middleware");
const upload = require("../../middleware/upload.middleware");
const {
  createProductSchema,
  updateProductSchema,
} = require("./products.validation");

const router = Router();

router.get("/", productsController.getAllProducts);
router.get("/:id", productsController.getProductById);
router.post(
  "/",
  upload.single("image"),
  validate(createProductSchema),
  productsController.createProduct
);
router.put(
  "/:id",
  upload.single("image"),
  validate(updateProductSchema),
  productsController.updateProduct
);

router.delete("/:id", productsController.deleteProduct);

module.exports = router;
