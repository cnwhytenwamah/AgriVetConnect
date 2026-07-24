const { Router } = require("express");
const { authenticate, authorize } = require("../../middleware/auth.middleware");
const { validate } = require("../../middleware/validate.middleware");
const { updateUserSchema, updateUserStatusSchema, updateUserRoleSchema,} = require("./users.validation");
const { getUsers, getUser, getMe, updateMe, updateUserStatusHandler, updateUserRoleHandler, removeUser,} = require("./users.controller");

const router = Router();

router.get("/me", authenticate, getMe);
router.patch("/me", authenticate, validate(updateUserSchema), updateMe);

router.get("/", authenticate, authorize("ADMIN"), getUsers);
router.get("/:id", authenticate, authorize("ADMIN"), getUser);
router.patch("/:id/status", authenticate, authorize("ADMIN"), validate(updateUserStatusSchema), updateUserStatusHandler);
router.patch("/:id/role", authenticate, authorize("ADMIN"), validate(updateUserRoleSchema), updateUserRoleHandler);
router.delete("/:id", authenticate, authorize("ADMIN"), removeUser);

module.exports = router;