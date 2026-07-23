import { Router } from "express";
import * as servicesController from "./services.controller";
import { validate } from "../../middleware/validate.middleware";
import {
  createServiceSchema,
  updateServiceSchema,
} from "./services.validation";

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
