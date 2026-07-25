const { z } = require("zod");

const createServiceSchema = z.object({
  name: z.string().min(1, "Name is required"),
  description: z.string().optional(),
  price: z.number().positive("Price must be a positive number"),
  durationMinutes: z
    .number()
    .int()
    .positive("Duration must be a positive whole number"),
});

const updateServiceSchema = z.object({
  name: z.string().min(1).optional(),
  description: z.string().optional(),
  price: z.number().positive().optional(),
  durationMinutes: z.number().int().optional(),
});

module.exports = {
  createServiceSchema,
  updateServiceSchema,
};
