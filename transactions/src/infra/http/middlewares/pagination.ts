import { type NextFunction, type Request, type Response } from "express";

export function pagination(
  req: Request,
  res: Response,
  next: NextFunction
): void {
  const limit = Number(req.query.limit || "10");
  const page = Number(req.query.page || "1");
  const type = String(req.query.type || "sent");

  if (
    isNaN(limit) ||
    isNaN(page) ||
    limit <= 0 ||
    page <= 0 ||
    (type !== "sent" && type !== "received")
  ) {
    throw new Error("Invalid pagination parameters");
  }

  const skip = (page - 1) * limit;
  const take = limit;

  req.query.limit = undefined;
  req.query.page = undefined;

  req.query.skip = String(skip);
  req.query.take = String(take);
  req.query.type = type;

  return next();
}
