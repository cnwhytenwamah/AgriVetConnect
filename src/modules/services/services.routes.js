import { Router } from "express";
import * as servicesController from "./services.controller.js";
import { validate } from "../../middleware/validate.middleware.js";
import {
  createServiceSchema,
  updateServiceSchema,
} from "./services.validation.js";

const router = Router();

router.get("/", servicesController.getAllServices);
router.get("/:id", servicesController.getServiceById);
router.post(
  "/",
  validate(createServiceSchema),
  servicesController.createService
);
router.put(
  "/:id",
  validate(updateServiceSchema),
  servicesController.updateService
);
router.delete("/:id", servicesController.deleteService);

export default router;
