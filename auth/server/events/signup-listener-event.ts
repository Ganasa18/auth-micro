import { Consumer, EachMessagePayload } from "kafkajs";
import { kafka } from "../app";
import FuncSubscriber from "./base-listener";

export class SignUpConsumer {
  private _result: any | void;
  subscribe: Consumer = kafka.consumer({ groupId: this.groupId });
  constructor(public topic: string, public groupId: string) {
    topic = this.topic;
    this.initialice();
  }
  public async initialice() {
    try {
      await this.subscribe.connect();
      console.log("CONSUMER CONNECTED");
    } catch (err) {
      console.log("Something went happend", err);
    }
  }

  async listen() {
    try {
      await this.subscribe.subscribe({
        topic: this.topic,
        fromBeginning: true,
      });
      console.log("SUBSCRIBED CONNECTED");
      await this.subscribe.run({
        eachMessage: async (messagePayload: EachMessagePayload) => {
          const { topic, partition, message } = messagePayload;
          console.log("Event Received");
          let value: Buffer | null = message.value;
          if (message) {
            const msg: string = JSON.parse(value!.toString());
            console.log(msg);
            this._result = msg;
          }
        },
      });
    } catch (err) {
      console.log("Something went happend", err);
    }
  }

  get resultMsg() {
    if (this._result) {
      return this._result;
    }
  }
}
