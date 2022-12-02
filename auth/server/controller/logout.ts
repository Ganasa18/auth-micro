import { Request, Response, NextFunction } from "express";

const LogOutUser = () => {
  return (req: Request, res: Response, next: NextFunction) => {
    req.session = null;
    res.status(200).json({
      status: "logout successfully",
    });
  };
};

export default LogOutUser;
