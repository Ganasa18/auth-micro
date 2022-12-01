import { Request, Response, NextFunction } from "express";
import AuthProvider, { AuthInput } from "../../storage/models/authModel";
import FuncPublisher from "../events/base-publisher";
import { signToken } from "./token";

const authSignUp = () => {
  return async (req: Request, res: Response, next: NextFunction) => {
    let {
      nik,
      email,
      password,
      fullname,
      employments,
      area,
      departement,
      subdepartement,
      userActive,
    }: AuthInput = req.body;

    const data: AuthInput = {
      nik,
      email,
      password,
      fullname,
      employments,
      area,
      departement,
      subdepartement,
      userActive,
    };

    if (email) {
      email = email.toLowerCase();
    }
    // Create User TO Database
    const auth = await AuthProvider.create(data);
    await FuncPublisher(auth, "test-topic");
    // Publisher SignUp
    auth.password = undefined;
    // Sign Token
    const token = signToken(auth);
    // Set Header Session
    req.session = {
      jwt: token,
    };

    return res.status(200).json({
      status: "success",
      token,
      data: auth,
    });
  };
};

export default authSignUp;
