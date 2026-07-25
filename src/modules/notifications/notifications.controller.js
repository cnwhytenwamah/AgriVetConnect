const { sendSuccess } = require("../../utils/apiResponse");
const { listNotifications } = require("./notifications.service");

async function getNotifications(req, res, next) {
  try {
    const notifications = await listNotifications(req.user);
    return sendSuccess(res, 200, "Notifications retrieved successfully", notifications);
  } catch (error) {
    next(error);
  }
}

module.exports = { getNotifications };
