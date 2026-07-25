const { z } = require("zod");

const initializePaymentSchema = z.object({
  orderId: z.string().min(1, "Order ID is required"),
  method: z.enum(["CARD", "BANK_TRANSFER", "CASH"]),
});

const verifyPaymentSchema = z.object({
  transactionRef: z.string().min(1, "Transaction reference is required"),
});

module.exports = { initializePaymentSchema, verifyPaymentSchema };
