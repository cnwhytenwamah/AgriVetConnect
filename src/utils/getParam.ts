import { Request } from "express";
import { ApiError } from "./apiError";

export function getParam(req: Request, key: string): string {
  const value = req.params[key];

  if (typeof value !== "string") {
    throw new ApiError(400, `Invalid or missing parameter: ${key}`);
  }

  return value;
}