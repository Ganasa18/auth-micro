import { AppError } from "@mkdglobal/common";
import { Request, Response, NextFunction } from "express";

export const requireAuth = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (!req.currentUser) {
    next(new AppError("Not Authorized", 401));
  }
  next();
};
