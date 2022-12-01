import { catchAsync } from "@mkdglobal/common";
import express from "express";
import {
  getAll,
  getUser,
  logout,
  signup,
  userCurrent,
  login
} from "../controller/app";
import { requireAuth } from "../utils/require-auth";
const router = express.Router();

// UNPROTECTED ROUTE
router.post("/signup", catchAsync(signup));
router.get("/currentuser", userCurrent, catchAsync(getUser));

//login user
router.post("/login", catchAsync(login));

// PROTECTED ROUTE
router.use(requireAuth);
// GET ALL USERS
router.get("/", catchAsync(getAll));
// LOGOUT
router.get("/logout", catchAsync(logout));

module.exports = router;
