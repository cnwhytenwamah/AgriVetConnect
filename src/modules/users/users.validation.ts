import { z } from "zod";

export const updateUserSchema = z.object({
  firstName: z.string().min(2, "First name must be at least 2 characters").optional(),
  lastName: z.string().min(2, "Last name must be at least 2 characters").optional(),
  phone: z.string().optional(),
  address: z.string().optional(),
});

export const updateUserStatusSchema = z.object({
  isActive: z.boolean(),
});

export const updateUserRoleSchema = z.object({
  roleName: z.enum(["ADMIN", "STAFF", "CUSTOMER"]),
});

export type UpdateUserInput = z.infer<typeof updateUserSchema>;
export type UpdateUserStatusInput = z.infer<typeof updateUserStatusSchema>;
export type UpdateUserRoleInput = z.infer<typeof updateUserRoleSchema>;