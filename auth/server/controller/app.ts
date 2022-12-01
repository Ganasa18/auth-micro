import { Request, Response, NextFunction } from "express";
import getCurrentUser, { currentUser } from "./current-user";
import getAllUser from "./getuser";
import authSignUp from "./signup";

const signup = authSignUp();
const getAll = getAllUser();
const userCurrent = currentUser;
const getUser = getCurrentUser();

export { signup, getAll, getUser, userCurrent };
