// import { Subscriber as consumer } from "./listener-connect";
import { EachMessagePayload, Consumer, Kafka } from "kafkajs";
import { kafka } from "../app";

class FuncSubscriber {
  constructor(public topic: string) {}
}

// return new Promise<void>((resolve, reject) => {
//   this.subscribe.on("consumer.connect", async () => {
//     console.log(`KafkaProvider: listener connected`);
//     await this.subscribe.subscribe({
//       topic: this.topic,
//       fromBeginning: true,
//     });
//     console.log("CREATE GROUP SUBSCRIBE");
//     await this.subscribe.run({
//       eachMessage: async (messagePayload: EachMessagePayload) => {
//         const { topic, partition, message } = messagePayload;
//         console.log("Event Received");
//       },
//     });
//     resolve();
//   });
//   this.subscribe.on("consumer.crash", (err) => {
//     reject(err);
//   });
// });

//   async createConsumerGroup() {
//     const group = await consumer.subscribe({
//       topic: this.topic,
//       fromBeginning: true,
//     });
//   }

//   consumeMessage() {
//     return new Promise((resolve, reject) => {
//       consumer.run({
//         eachMessage: async (messagePayload: EachMessagePayload) => {
//           const { topic, partition, message } = messagePayload;
//           console.log(message.value?.toString());
//         },
//       });
//     });
//   }
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

export default FuncSubscriber;
