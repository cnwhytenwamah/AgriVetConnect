import { Request, Response, NextFunction } from "express";
import { verifyToken, JwtPayload } from "../utils/jwt.util";
import { ApiError } from "../utils/apiError";

export interface AuthRequest extends Request {
  user?: JwtPayload;
}

export function authenticate( req: AuthRequest, res: Response, next: NextFunction) {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return next(new ApiError(401, "No token provided"));
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = verifyToken(token);
    req.user = decoded;
    next();
  } catch {
    return next(new ApiError(401, "Invalid or expired token"));
  }
}

export function authorize(...allowedRoles: string[]) {
  return (req: AuthRequest, res: Response, next: NextFunction) => {
    if (!req.user || !allowedRoles.includes(req.user.roleName)) {
      return next(new ApiError(403, "You do not have permission to perform this action"));
    }
    next();
  };
}