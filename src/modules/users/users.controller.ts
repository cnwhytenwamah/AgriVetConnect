import { Response, NextFunction } from "express";
import { AuthRequest } from "../../middleware/auth.middleware";
import { sendSuccess } from "../../utils/apiResponse";
import {
  getAllUsers,
  getUserById,
  updateUser,
  updateUserStatus,
  updateUserRole,
  deleteUser,
} from "./users.service";
import { getParam } from "../../utils/getParam";

export async function getUsers(req: AuthRequest, res: Response, next: NextFunction) {
  try {
    const users = await getAllUsers();
    return sendSuccess(res, 200, "Users retrieved successfully", users);
  } catch (error) {
    next(error);
  }
}

export async function getUser(req: AuthRequest, res: Response, next: NextFunction) {
  try {
    const user = await getUserById(getParam(req, "id"));
    return sendSuccess(res, 200, "User retrieved successfully", user);
  } catch (error) {
    next(error);
  }
}

export async function getMe(req: AuthRequest, res: Response, next: NextFunction) {
  try {
    const user = await getUserById(req.user!.userId);
    return sendSuccess(res, 200, "Profile retrieved successfully", user);
  } catch (error) {
    next(error);
  }
}

export async function updateMe(req: AuthRequest, res: Response, next: NextFunction) {
  try {
    const user = await updateUser(req.user!.userId, req.body);
    return sendSuccess(res, 200, "Profile updated successfully", user);
  } catch (error) {
    next(error);
  }
}

export async function updateUserStatusHandler(req: AuthRequest, res: Response, next: NextFunction) {
  try {
    const user = await updateUserStatus(getParam(req, "id"), req.body);
    return sendSuccess(res, 200, "User status updated successfully", user);
  } catch (error) {
    next(error);
  }
}

export async function updateUserRoleHandler(req: AuthRequest, res: Response, next: NextFunction) {
  try {
    const user = await updateUserRole(getParam(req, "id"), req.body);
    return sendSuccess(res, 200, "User role updated successfully", user);
  } catch (error) {
    next(error);
  }
}

export async function removeUser(req: AuthRequest, res: Response, next: NextFunction) {
  try {
    await deleteUser(getParam(req, "id"));
    return sendSuccess(res, 200, "User deleted successfully");
  } catch (error) {
    next(error);
  }
}