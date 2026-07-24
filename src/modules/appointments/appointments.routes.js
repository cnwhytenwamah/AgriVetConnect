const { Router } = require("express");
const appointmentsController = require("./appointments.controller");
const { validate } = require("../../middleware/validate.middleware");
const {
  createAppointmentSchema,
  updateAppointmentSchema,
} = require("./appointments.validation");

const router = Router();

router.get("/", appointmentsController.getAllAppointments);
router.get("/:id", appointmentsController.getAppointmentById);
router.post(
  "/",
  validate(createAppointmentSchema),
  appointmentsController.createAppointment
);
router.put(
  "/:id",
  validate(updateAppointmentSchema),
  appointmentsController.updateAppointment
);
router.delete("/:id", appointmentsController.deleteAppointment);

module.exports = router;
