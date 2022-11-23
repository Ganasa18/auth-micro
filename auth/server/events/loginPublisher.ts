import { kafka } from "../app";

const producer = kafka.producer();
producer.on("producer.connect", () => {
  console.log(`KafkaProvider: connected`);
});
producer.on("producer.disconnect", () => {
  console.log(`KafkaProvider: could not connect`);
});

const signalTraps = ["SIGTERM", "SIGINT", "SIGUSR2"];

signalTraps.forEach((type) => {
  process.once(type, async () => {
    try {
      await producer.disconnect();
    } finally {
      process.kill(process.pid, type);
    }
  });
});

export { producer as loginProducer };
