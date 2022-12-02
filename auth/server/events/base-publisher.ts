import { Publisher as producer } from "./producer-connect";
const FuncPublisher = async <T>(data: T, topic: string) => {
  await producer.connect();
  // kafka.producer({ createPartitioner: Partitioners.LegacyPartitioner });
  // const partition = email[0] < "n" ? 0 : 1;
  // console.log(email[0], `To partition ${partition}`);
  await producer
    .send({
      topic,
      messages: [{ value: JSON.stringify(data) }],
    })
    .then(() => {
      console.log("Event Published Login");
    });
};

export default FuncPublisher;
