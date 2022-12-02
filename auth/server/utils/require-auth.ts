import { AppError } from "@mkdglobal/common";
import { Request, Response, NextFunction } from "express";
const { promisify } = require("util");
import jwt from "jsonwebtoken";
import AuthProvider from "../../storage/models/authModel";

export const requireAuth = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1];
    console.log(token, "from header token");
  }
  // else if (req.cookies.jwt) {
  //   token = req.cookies.jwt;
  // }
  if (!token) {
    return next(
      new AppError("You are need token, please give us a token", 401)
    );
  }

  // 2) Verification token
  const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);

  // 3) Check if user still exists
  const currentUser = await AuthProvider.findByPk(decoded.id);

  console.log(currentUser);

  // 4) Set Refresh Token

  next();
};
