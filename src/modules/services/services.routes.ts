import { Router } from "express";
import * as servicesController from "./services.controller";

const router = Router();

router.get("/", servicesController.getAllServices);
router.get("/:id", servicesController.getServiceById);
router.post("/", servicesController.createService);
router.put("/:id", servicesController.updateService);
router.delete("/:id", servicesController.deleteService);

export default router;
