const { z } = require("zod");

const createProductSchema = z.object({
  name: z.string().min(1, "Name is required"),
  description: z.string().optional(),
  price: z.coerce.number().positive("Price must be a positive number"),
  imageUrl: z.string().url("Must be a valid URL").optional(),
  categoryId: z.string().uuid("Invalid category ID"),
});

const updateProductSchema = z.object({
  name: z.string().min(1).optional(),
  description: z.string().optional(),
  price: z.coerce.number().positive().optional(),
  imageUrl: z.string().url().optional(),
  categoryId: z.string().uuid().optional(),
});

module.exports = {
  createProductSchema,
  updateProductSchema,
};
