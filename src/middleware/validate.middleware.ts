import { Request, Response, NextFunction } from "express";
import { ZodSchema } from "zod";
import { ApiError } from "../utils/apiError";

export function validate(schema: ZodSchema) {
  return (req: Request, res: Response, next: NextFunction) => {
    const result = schema.safeParse(req.body);

    if (!result.success) {
      const message = result.error.issues
        .map((issue) => issue.message)
        .join(", ");
      return next(new ApiError(400, message));
    }

    req.body = result.data;
    next();
  };
}