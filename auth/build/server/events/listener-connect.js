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
exports.Subscriber = void 0;
const app_1 = require("../app");
const consumer = app_1.kafka.consumer({ groupId: "consumer" });
exports.Subscriber = consumer;
consumer.on("consumer.connect", () => {
    console.log(`KafkaProvider: listener connected`);
});
consumer.on("consumer.disconnect", () => {
    console.log(`KafkaProvider: could not connect listener`);
});
const errorTypes = ["unhandledRejection", "uncaughtException"];
const signalTraps = ["SIGTERM", "SIGINT", "SIGUSR2"];
errorTypes.map((type) => {
    process.on(type, (e) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            console.log(`process.on ${type}`);
            console.error(e);
            yield consumer.disconnect();
            process.exit(0);
        }
        catch (_) {
            process.exit(1);
        }
    }));
});
signalTraps.map((type) => {
    process.once(type, () => __awaiter(void 0, void 0, void 0, function* () {
        try {
            yield consumer.disconnect();
        }
        finally {
            process.kill(process.pid, type);
        }
    }));
});
