const { sendSuccess } = require("../../utils/apiResponse");
const {
  getAllUsers,
  getUserById,
  updateUser,
  updateUserStatus,
  updateUserRole,
  deleteUser,
} = require("./users.service");

async function getUsers(req, res, next) {
  try {
    const users = await getAllUsers();
    return sendSuccess(res, 200, "Users retrieved successfully", users);
  } catch (error) {
    next(error);
  }
}

async function getUser(req, res, next) {
  try {
    const user = await getUserById(req.params.id);
    return sendSuccess(res, 200, "User retrieved successfully", user);
  } catch (error) {
    next(error);
  }
}

async function getMe(req, res, next) {
  try {
    const user = await getUserById(req.user.userId);
    return sendSuccess(res, 200, "Profile retrieved successfully", user);
  } catch (error) {
    next(error);
  }
}

async function updateMe(req, res, next) {
  try {
    const user = await updateUser(req.user.userId, req.body);
    return sendSuccess(res, 200, "Profile updated successfully", user);
  } catch (error) {
    next(error);
  }
}

async function updateUserStatusHandler(req, res, next) {
  try {
    const user = await updateUserStatus(req.params.id, req.body);
    return sendSuccess(res, 200, "User status updated successfully", user);
  } catch (error) {
    next(error);
  }
}

async function updateUserRoleHandler(req, res, next) {
  try {
    const user = await updateUserRole(req.params.id, req.body);
    return sendSuccess(res, 200, "User role updated successfully", user);
  } catch (error) {
    next(error);
  }
}

async function removeUser(req, res, next) {
  try {
    await deleteUser(req.params.id);
    return sendSuccess(res, 200, "User deleted successfully");
  } catch (error) {
    next(error);
  }
}

module.exports = { getUsers, getUser, getMe, updateMe, updateUserStatusHandler,  updateUserRoleHandler, removeUser,};