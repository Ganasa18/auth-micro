import setExpired from "../utils/expired-token";
import { Response, Request } from "express";
import { AuthAttribute } from "../../storage/models/interface";
const jwt = require("jsonwebtoken");

export const creatSendToken = async (
  userData: AuthAttribute,
  statusCode: number,
  res: Response,
  req: Request
) => {
  const token = signToken(userData);
  // Option Token
  //   const cookieOptions = {
  //     expires: setExpired(),
  //     httpOnly: true,
  //   };
  //   res.cookie("jwt", token, cookieOptions);
  // Store json
  req.session = {
    jwt: token,
  };

  return res.status(statusCode).json({
    status: "success",
    token: token,
    data: userData,
  });
};

export const signToken = (userData: AuthAttribute) => {
  return jwt.sign(
    {
      id: userData.id,
      email: userData.email,
    },
    process.env.JWT_SECRET,
    {
      expiresIn: process.env.JWT_EXPIRES_IN,
    }
  );
};
