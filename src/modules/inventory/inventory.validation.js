const { z } = require("zod");

const createInventorySchema = z.object({
  productId: z.string().uuid("Invalid product ID"),
  quantity: z.number().int().nonnegative().optional(),
  reorderLevel: z.number().int().nonnegative().optional(),
});

const updateInventorySchema = z.object({
  quantity: z.number().int().nonnegative().optional(),
  reorderLevel: z.number().int().nonnegative().optional(),
});

module.exports = {
  createInventorySchema,
  updateInventorySchema,
};
