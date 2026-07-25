const { z } = require("zod");

const createOrderSchema = z.object({
  shippingAddress: z.string().min(5, "Shipping address is required"),
  paymentMethod: z.enum(["CARD", "BANK_TRANSFER", "CASH"]).optional(),
});

const updateOrderStatusSchema = z.object({
  status: z.enum(["PENDING", "PROCESSING", "SHIPPED", "DELIVERED", "CANCELLED"]),
});

module.exports = { createOrderSchema, updateOrderStatusSchema };
