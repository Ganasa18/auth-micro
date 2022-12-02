"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@mkdglobal/common");
const express_1 = __importDefault(require("express"));
const app_1 = require("../controller/app");
const router = express_1.default.Router();
router.post("/", (0, common_1.catchAsync)(app_1.login));
module.exports = router;
