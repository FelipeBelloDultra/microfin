import { type NextFunction, type Request, type Response } from "express";

import { Jwt } from "../../../domain/entity/jwt";
import { MissingToken } from "./errors/missing-token";

export function ensureAuthenticatedMiddleware(
  req: Request,
  res: Response,
  next: NextFunction
): void {
  const token = req.headers["x-access-token"] as string | null;

  if (!token) {
    throw new MissingToken();
  }

  const result = Jwt.decodeToken(token);

  req.user = {
    id: result.id,
    email: result.email,
  };

  return next();
}
