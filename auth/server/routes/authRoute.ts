import { catchAsync } from "@mkdglobal/common";
import express from "express";
import { login } from "../controller/app";
const router = express.Router();

router.post("/", catchAsync(login));

module.exports = router;
