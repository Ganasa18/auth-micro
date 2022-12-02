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
const listener_connect_1 = require("./listener-connect");
class FuncSubscriber {
    constructor(topic) {
        this.topic = topic;
    }
    initialize() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield listener_connect_1.Subscriber.subscribe({
                    topic: this.topic,
                    fromBeginning: true,
                });
                console.log(`Consumer subscribed to ${this.topic}`);
            }
            catch (err) {
                console.log(err);
            }
        });
    }
}
// const FuncSubscriber = async (topic: string) => {
//   let value: any = [];
//   await consumer.subscribe({
//     topic: topic,
//     fromBeginning: true,
//   });
//   await consumer.run({
//     eachMessage: async (messagePayload: EachMessagePayload) => {
//       const { topic, partition, message } = messagePayload;
//       console.log("Event Received");
//       const prefix = `${topic} [ partititon: ${partition} | offset: ${message.offset}] / ${message.timestamp}`;
//       console.log(prefix);
//       if (message) {
//         value.push(message.value?.toString());
//       }
//       return value;
//     },
//   });
// };
exports.default = FuncSubscriber;
