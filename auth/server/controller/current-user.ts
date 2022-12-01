import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

interface UserPayload {
  id: number;
  email: string;
}

declare global {
  namespace Express {
    interface Request {
      currentUser?: UserPayload;
    }
  }
}

export const currentUser = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (!req.session?.jwt) {
    return next();
  }

  try {
    const payload = jwt.verify(
      req.session.jwt,
      process.env.JWT_SECRET!
    ) as UserPayload;
    req.currentUser = payload;
  } catch (err) {}
  next();
};

const getCurrentUser = () => {
  return async (req: Request, res: Response, next: NextFunction) => {
    res.status(200).json({
      status: "sucess",
      currentUser: req.currentUser || null,
    });
  };
};

export default getCurrentUser;
