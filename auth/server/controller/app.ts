import { Request, Response, NextFunction } from "express";
import authLogin from "./login";
//test branch
const login = authLogin();

export { login };
