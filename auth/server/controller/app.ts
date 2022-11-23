import { Request, Response, NextFunction } from "express";
import authLogin from "./login";

const login = authLogin();

export { login };
