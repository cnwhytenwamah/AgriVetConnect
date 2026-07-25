const { Router } = require("express");
const { authenticate, authorize } = require("../../middleware/auth.middleware");
const { getReports } = require("./reports.controller");

const router = Router();

router.get("/", authenticate, authorize("ADMIN", "STAFF"), getReports);

module.exports = router;
