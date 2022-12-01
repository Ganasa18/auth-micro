import { Request, Response, NextFunction } from "express";
import AuthProvider from "../../storage/models/authModel";

const getAllUser = () => {
  return async (req: Request, res: Response, next: NextFunction) => {
    const users = await AuthProvider.findAll();
    return res.status(200).json({
      message: "Success",
      data: users,
    });
  };
};

export default getAllUser;
