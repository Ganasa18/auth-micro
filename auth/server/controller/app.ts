import { Request, Response, NextFunction } from "express";
import getCurrentUser, { currentUser } from "./current-user";
import getAllUser from "./getuser";
import LogOutUser from "./logout";
import authSignUp from "./signup";
import userLogin from "./login";

const signup = authSignUp();
const getAll = getAllUser();
const userCurrent = currentUser;
const getUser = getCurrentUser;
const logout = LogOutUser();
const login = userLogin();

export { signup, getAll, getUser, userCurrent, logout, login };
