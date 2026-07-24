import { z } from "zod";

export const createServiceSchema = z.object({
  name: z.string().min(1, "Name is required"),
  description: z.string().optional(),
  price: z.number().positive("Price must be a positive number"),
  durationMins: z
    .number()
    .int()
    .positive("Duration must be a positive whole number"),
});

export const updateServiceSchema = z.object({
  name: z.string().min(1).optional(),
  description: z.string().optional(),
  price: z.number().positive().optional(),
  durationMins: z.number().int().optional(),
});
