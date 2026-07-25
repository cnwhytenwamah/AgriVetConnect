const { Router } = require("express");
const { authenticate } = require("../../middleware/auth.middleware");
const { getNotifications } = require("./notifications.controller");

const router = Router();

router.get("/", authenticate, getNotifications);

module.exports = router;
