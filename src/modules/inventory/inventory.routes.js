const { Router } = require("express");
const inventoryController = require("./inventory.controller");
const { validate } = require("../../middleware/validate.middleware");
const {
  createInventorySchema,
  updateInventorySchema,
} = require("./inventory.validation");

const router = Router();

router.get("/", inventoryController.getAllInventory);
router.get("/:productId", inventoryController.getInventoryByProductId);
router.post(
  "/",
  validate(createInventorySchema),
  inventoryController.createInventory
);
router.put(
  "/:productId",
  validate(updateInventorySchema),
  inventoryController.updateInventory
);
router.delete("/:productId", inventoryController.deleteInventory);

module.exports = router;
