import { catchAsync } from "@mkdglobal/common";
import express from "express";
import { getAll, getUser, signup, userCurrent } from "../controller/app";
import { requireAuth } from "../utils/require-auth";
const router = express.Router();

router.post("/", catchAsync(signup));
router.get("/currentuser", userCurrent, catchAsync(getUser));
router.use(requireAuth);
router.get("/", catchAsync(getAll));

module.exports = router;
