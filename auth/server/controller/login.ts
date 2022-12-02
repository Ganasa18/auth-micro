import { Request, Response, NextFunction } from "express";
import { AuthInput } from "../../storage/models/authModel";
import AuthProvider from "../../storage/models/authModel";
import { AppError } from "@mkdglobal/common";
import { creatSendToken, signToken } from "./token";
const bcrypt = require("bcryptjs");

const userLogin = () => {
  return async (req: Request, res: Response, next: NextFunction) => {
    let { email, password }: AuthInput = req.body;
    const user = await AuthProvider.findOne({
      where: {
        email,
      },
    });

    const salt = await bcrypt.genSaltSync(10);
    const hasedPassword = await bcrypt.hashSync(password, salt);

    if (!user) {
      // return res.status(401).json({ error: "unauthorized" });
      next(new AppError("unauthorized", 401));
    }

    const valid = await bcrypt.compareSync(hasedPassword, user?.password);

    const token = signToken(user!);
    req.session = {
      jwt: token,
    };

    return res.status(200).json({ token, status: "success", data: user });
    // creatSendToken(user!, 200, res, req);

    // if (valid) {

    // }
  };
};

export default userLogin;
