import { Router } from "express";
import * as inventoryController from "./inventory.controller";

const router = Router();

router.get("/", inventoryController.getAllInventory);
router.get("/:productId", inventoryController.getInventoryByProductId);
router.post("/", inventoryController.createInventory);
router.put("/:productId", inventoryController.updateInventory);
router.delete("/:productId", inventoryController.deleteInventory);

export default router;
