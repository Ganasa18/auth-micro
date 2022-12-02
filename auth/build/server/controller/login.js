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
const base_listener_1 = __importDefault(require("../events/base-listener"));
const base_publisher_1 = __importDefault(require("../events/base-publisher"));
const authLogin = () => {
    return (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        let { email, password } = req.body;
        const data = {
            email,
            password,
        };
        if (email) {
            email = email.toLowerCase();
        }
        // Create User TO Database
        // const auth = await AuthProvider.create(data);
        // Publisher SignUp
        yield (0, base_publisher_1.default)(data, "test-topic");
        // Subscriber
        const subscriber = new base_listener_1.default("test-topic");
        res.status(200).json({
            message: "successfully",
            data,
        });
    });
};
exports.default = authLogin;
