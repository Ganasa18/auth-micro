import { kafka } from "../app";
// import { AuthOuput } from "../../storage/models/authModel";

const producer = kafka.producer();
producer.on("producer.connect", () => {
  console.log(`KafkaProvider: connected`);
});
producer.on("producer.disconnect", () => {
  console.log(`KafkaProvider: could not connect`);
});

const errorTypes = ["unhandledRejection", "uncaughtException"];
const signalTraps = ["SIGTERM", "SIGINT", "SIGUSR2"];

errorTypes.forEach((type) => {
  process.on(type, async () => {
    try {
      console.log(`process.on ${type}`);
      await producer.disconnect();
      process.exit(0);
    } catch (_) {
      process.exit(1);
    }
  });
});

signalTraps.forEach((type) => {
  process.once(type, async () => {
    try {
      await producer.disconnect();
    } finally {
      process.kill(process.pid, type);
    }
  });
});

// const FuncPublisher = async <T>(data: T, topic: string) => {
//   await producer.connect();
//   // kafka.producer({ createPartitioner: Partitioners.LegacyPartitioner });
//   // const partition = email[0] < "n" ? 0 : 1;
//   // console.log(email[0], `To partition ${partition}`);
//   await producer
//     .send({
//       topic,
//       messages: [{ value: JSON.stringify(data) }],
//     })
//     .then(() => {
//       console.log("Event Published Login");
//     });
// };

export { producer as Publisher };
