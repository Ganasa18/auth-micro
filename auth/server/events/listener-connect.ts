import { kafka } from "../app";

const consumer = kafka.consumer({ groupId: "consumer" });

consumer.on("consumer.connect", () => {
  console.log(`KafkaProvider: listener connected`);
});

consumer.on("consumer.disconnect", () => {
  console.log(`KafkaProvider: could not connect listener`);
});

const errorTypes = ["unhandledRejection", "uncaughtException"];
const signalTraps = ["SIGTERM", "SIGINT", "SIGUSR2"];

errorTypes.map((type) => {
  process.on(type, async (e) => {
    try {
      console.log(`process.on ${type}`);
      console.error(e);
      await consumer.disconnect();
      process.exit(0);
    } catch (_) {
      process.exit(1);
    }
  });
});

signalTraps.map((type) => {
  process.once(type, async () => {
    try {
      await consumer.disconnect();
    } finally {
      process.kill(process.pid, type);
    }
  });
});

export { consumer as Subscriber };
