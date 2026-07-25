const { sendSuccess } = require("../../utils/apiResponse");
const { getDashboardReports } = require("./reports.service");

async function getReports(req, res, next) {
  try {
    const reports = await getDashboardReports(req.user);
    return sendSuccess(res, 200, "Reports retrieved successfully", reports);
  } catch (error) {
    next(error);
  }
}

module.exports = { getReports };
