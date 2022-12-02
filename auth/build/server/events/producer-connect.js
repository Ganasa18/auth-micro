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
Object.defineProperty(exports, "__esModule", { value: true });
exports.Publisher = void 0;
const app_1 = require("../app");
// import { AuthOuput } from "../../storage/models/authModel";
const producer = app_1.kafka.producer();
exports.Publisher = producer;
producer.on("producer.connect", () => {
    console.log(`KafkaProvider: connected`);
});
producer.on("producer.disconnect", () => {
    console.log(`KafkaProvider: could not connect`);
});
const errorTypes = ["unhandledRejection", "uncaughtException"];
const signalTraps = ["SIGTERM", "SIGINT", "SIGUSR2"];
errorTypes.forEach((type) => {
    process.on(type, () => __awaiter(void 0, void 0, void 0, function* () {
        try {
            console.log(`process.on ${type}`);
            yield producer.disconnect();
            process.exit(0);
        }
        catch (_) {
            process.exit(1);
        }
    }));
});
signalTraps.forEach((type) => {
    process.once(type, () => __awaiter(void 0, void 0, void 0, function* () {
        try {
            yield producer.disconnect();
        }
        finally {
            process.kill(process.pid, type);
        }
    }));
});
