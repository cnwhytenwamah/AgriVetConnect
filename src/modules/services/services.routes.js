const { Router } = require("express");
const servicesController = require("./services.controller");
const { validate } = require("../../middleware/validate.middleware");
const {
  createServiceSchema,
  updateServiceSchema,
} = require("./services.validation");

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

module.exports = router;
