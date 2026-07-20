import { Router } from "express";
import { authenticate, authorize } from "../../middleware/auth.middleware";
import { validate } from "../../middleware/validate.middleware";
import { updateUserSchema, updateUserStatusSchema, updateUserRoleSchema,} from "./users.validation";
import { getUsers, getUser, getMe, updateMe, updateUserStatusHandler, updateUserRoleHandler, removeUser,} from "./users.controller";

const router = Router();

router.get("/me", authenticate, getMe);
router.patch("/me", authenticate, validate(updateUserSchema), updateMe);


router.get("/", authenticate, authorize("ADMIN"), getUsers);
router.get("/:id", authenticate, authorize("ADMIN"), getUser);
router.patch("/:id/status", authenticate, authorize("ADMIN"), validate(updateUserStatusSchema), updateUserStatusHandler);
router.patch("/:id/role", authenticate, authorize("ADMIN"), validate(updateUserRoleSchema), updateUserRoleHandler);
router.delete("/:id", authenticate, authorize("ADMIN"), removeUser);

export default router;