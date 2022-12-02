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
exports.Partitioners = exports.kafka = exports.app = void 0;
const express_1 = __importDefault(require("express"));
const common_1 = require("@mkdglobal/common");
const kafkajs_1 = require("kafkajs");
Object.defineProperty(exports, "Partitioners", { enumerable: true, get: function () { return kafkajs_1.Partitioners; } });
const storage_1 = require("../storage");
const app = (0, express_1.default)();
exports.app = app;
// Body parser, reading data from body into req.body
app.use(express_1.default.json());
app.set("trust proxy", true);
app.use(express_1.default.urlencoded({
    extended: true,
}));
// Check DB connection
storage_1.sequelizeConnection
    .authenticate()
    .then(() => __awaiter(void 0, void 0, void 0, function* () {
    console.log("Connection has been established successfully.");
    yield storage_1.sequelizeConnection.sync();
    console.log("successfully sync database");
}))
    .catch((err) => {
    console.error("Unable to connect to the database:", err);
});
if (!process.env.KAFKA_CLIENT_ID) {
    throw new Error("KAFKA_CLIENT_ID must be defined");
}
if (!process.env.KAFKA_URL) {
    throw new Error("KAFKA_URL must be defined");
}
// Kafka Connect
const CLIENT_ID = process.env.KAFKA_CLIENT_ID;
const BROKERS = [`${process.env.KAFKA_URL}`];
const kafka = new kafkajs_1.Kafka({
    logLevel: 1,
    brokers: BROKERS,
    clientId: CLIENT_ID,
    requestTimeout: 25000,
});
exports.kafka = kafka;
run();
function run() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const admin = kafka.admin();
            console.log("CONNECTING..");
            yield admin.connect();
            console.log("CONNECTED..!");
            yield admin.disconnect();
        }
        catch (e) {
            console.error(`Something bad happend ${e}`);
            process.exit(1);
        }
    });
}
// Routes
const authRouter = require("./routes/authRoute");
// URL API
app.use("/api/auth", authRouter);
// Handle Not Found
app.all("*", (req, res, next) => {
    next(new common_1.AppError(`Can't find ${req.originalUrl} on this server`, 404));
});
// Global Handler
app.use(common_1.globalErrorHandler);
// export { app };
