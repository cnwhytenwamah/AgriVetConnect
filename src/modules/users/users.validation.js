const { z } = require("zod");

const updateUserSchema = z.object({
  firstName: z.string().min(2, "First name must be at least 2 characters").optional(),
  lastName: z.string().min(2, "Last name must be at least 2 characters").optional(),
  phone: z.string().optional(),
  address: z.string().optional(),
});

const updateUserStatusSchema = z.object({
  isActive: z.boolean(),
});

const updateUserRoleSchema = z.object({
  roleName: z.enum(["ADMIN", "STAFF", "CUSTOMER"]),
});

module.exports = { updateUserSchema, updateUserStatusSchema, updateUserRoleSchema };