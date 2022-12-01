import { Request, Response, NextFunction } from "express";
import { AuthInput } from "../../storage/models/authModel";
import AuthProvider from "../../storage/models/authModel";
import { AppError } from "@mkdglobal/common";
const bcrypt = require("bcryptjs");

const userLogin = () => {
  return async (req: Request, res: Response, next: NextFunction) => {
    let { email, password }: AuthInput = req.body;
    const user = await AuthProvider.findOne({
      where: {
        email,
      },
    });

    // console.log(user);

    const salt = await bcrypt.genSaltSync(10);
    const hasedPassword = await bcrypt.hashSync(password, salt);

    if (!user) {
      // return res.status(401).json({ error: "unauthorized" });
      next(new AppError("unauthorized", 401));
    }

    const valid = await bcrypt.compareSync(hasedPassword, user?.password);
    return res.status(200).json({ status: "success", data: user });
    if (valid) {
    }

    // if (valid) {

    // }
  };
};

export default userLogin;
