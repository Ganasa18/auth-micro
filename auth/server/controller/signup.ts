import { Request, Response, NextFunction } from "express";
const jwt = require("jsonwebtoken");
// import { AppError } from "@mkdglobal/common";
// import { kafka, Partitioners } from "../app";
import AuthProvider, { AuthInput } from "../../storage/models/authModel";
import FuncPublisher from "../events/base-publisher";
import { creatSendToken } from "./token";

const authSignUp = () => {
  return async (req: Request, res: Response, next: NextFunction) => {
    let { nik, email, password, fullname }: AuthInput = req.body;
    const data: AuthInput = {
      nik,
      email,
      password,
      fullname,
    };

    if (email) {
      email = email.toLowerCase();
    }
    // Create User TO Database
    const auth = await AuthProvider.create(data);
    await FuncPublisher(auth, "test-topic");
    // Publisher SignUp
    auth.password = undefined;

    creatSendToken(auth, 200, res, req);
  };
};

export default authSignUp;
