"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const authModel_1 = __importDefault(require("./authModel"));
const bcrypt = require("bcryptjs");
module.exports = authModel_1.default.beforeCreate((User) => __awaiter(void 0, void 0, void 0, function* () {
    const checkUser = yield authModel_1.default.findOne({
        where: {
            email: User.email,
        },
    });
    if (checkUser) {
        throw new Error("User already exists");
    }
    else {
        const salt = bcrypt.genSaltSync(10);
        User.password = yield bcrypt.hashSync(User.password, salt);
    }
}));
