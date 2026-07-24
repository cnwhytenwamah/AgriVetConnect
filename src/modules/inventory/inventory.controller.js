import * as inventoryService from "./inventory.service.js";

export const getAllInventory = async (req, res) => {
  try {
    const inventory = await inventoryService.getAllInventory();
    res.status(200).json({ success: true, data: inventory });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: "Failed to fetch inventory" });
  }
};

export const getInventoryByProductId = async (req, res) => {
  try {
    const productId = String(req.params.productId);
    const inventory = await inventoryService.getInventoryByProductId(productId);
    if (!inventory) {
      return res
        .status(404)
        .json({ success: false, message: "Inventory not found" });
    }
    res.status(200).json({ success: true, data: inventory });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: "Failed to fetch inventory" });
  }
};

export const createInventory = async (req, res) => {
  try {
    const inventory = await inventoryService.createInventory(req.body);
    res.status(201).json({ success: true, data: inventory });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: "Failed to create inventory" });
  }
};

export const updateInventory = async (req, res) => {
  try {
    const productId = String(req.params.productId);
    const inventory = await inventoryService.updateInventory(
      productId,
      req.body
    );
    res.status(200).json({ success: true, data: inventory });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: "Failed to update inventory" });
  }
};

export const deleteInventory = async (req, res) => {
  try {
    const productId = String(req.params.productId);
    await inventoryService.deleteInventory(productId);
    res.status(200).json({ success: true, message: "Inventory deleted" });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: "Failed to delete inventory" });
  }
};
