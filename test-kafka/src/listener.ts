console.log("listener..");
import { Kafka, EachMessagePayload, Consumer } from "kafkajs";

if (!process.env.KAFKA_CLIENT_ID) {
  throw new Error("KAFKA_CLIENT_ID must be defined");
}
if (!process.env.KAFKA_URL) {
  throw new Error("KAFKA_URL must be defined");
}

// Kafka Connect
const CLIENT_ID = process.env.KAFKA_CLIENT_ID;
const BROKERS = [`${process.env.KAFKA_URL}`];

const kafka = new Kafka({
  clientId: CLIENT_ID,
  brokers: [`${BROKERS}`],
  logLevel: 2,
});

const consumer = kafka.consumer({ groupId: "test-group-1" });

const start = async () => {
  try {
    await consumer.connect();
    await consumer.subscribe({
      topic: "test-topic",
      fromBeginning: true,
    });
    await consumer.run({
      eachMessage: async (messagePayload: EachMessagePayload) => {
        const { topic, partition, message } = messagePayload;
        console.log("EVENT RECEIVED");
        let value: any = null;
        const prefix = `${topic} [ partititon: ${partition} | offset: ${message.offset}]`;
        if (message) {
          value = message.value;
          console.log(JSON.parse(value));
          console.log(prefix);
        }
      },
    });
  } catch (e) {
    console.log("Something when happend", e);
  }
};

start();
