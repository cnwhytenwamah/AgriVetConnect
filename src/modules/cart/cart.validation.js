const { z } = require("zod");

const addCartItemSchema = z.object({
  productId: z.string().min(1, "Product ID is required"),
  quantity: z.number().int().positive().default(1),
});

const updateCartItemSchema = z.object({
  quantity: z.number().int().positive(),
});

module.exports = { addCartItemSchema, updateCartItemSchema };
