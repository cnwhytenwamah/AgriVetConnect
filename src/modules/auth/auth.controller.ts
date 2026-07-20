import { Request, Response, NextFunction } from "express";
import { registerUser, loginUser } from "./auth.service";
import { sendSuccess } from "../../utils/apiResponse";

export async function register(req: Request, res: Response, next: NextFunction) {
  try {
    const result = await registerUser(req.body);
    return sendSuccess(res, 201, "User registered successfully", result);
  } catch (error) {
    next(error);
  }
}

export async function login(req: Request, res: Response, next: NextFunction) {
  try {
    const result = await loginUser(req.body);
    return sendSuccess(res, 200, "Login successful", result);
  } catch (error) {
    next(error);
  }
}