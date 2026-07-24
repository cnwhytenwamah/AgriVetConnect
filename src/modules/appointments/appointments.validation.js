const { z } = require("zod");

const createAppointmentSchema = z.object({
  userId: z.string().min(1, "User ID is required"),
  serviceId: z.string().uuid("Invalid service ID"),
  appointmentDate: z.string().datetime("Invalid date format"),
  notes: z.string().optional(),
});

const updateAppointmentSchema = z.object({
  appointmentDate: z.string().datetime("Invalid date format").optional(),
  notes: z.string().optional(),
  status: z.enum(["PENDING", "CONFIRMED", "CANCELLED", "COMPLETED"]).optional(),
});

module.exports = {
  createAppointmentSchema,
  updateAppointmentSchema,
};
