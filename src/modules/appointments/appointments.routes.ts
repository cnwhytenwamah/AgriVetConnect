import { Router } from "express";
import * as appointmentsController from "./appointments.controller";

const router = Router();

router.get("/", appointmentsController.getAllAppointments);
router.get("/:id", appointmentsController.getAppointmentById);
router.post("/", appointmentsController.createAppointment);
router.put("/:id", appointmentsController.updateAppointment);
router.delete("/:id", appointmentsController.deleteAppointment);

export default router;
