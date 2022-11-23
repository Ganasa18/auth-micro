import { Request, Response, NextFunction } from "express";
import { AppError } from "@mkdglobal/common";
import { loginProducer } from "../events/loginPublisher";
import { kafka, Partitioners } from "../app";

const authLogin = () => {
  return async (req: Request, res: Response, next: NextFunction) => {
    let { email, password } = req.body;
    if (email) {
      email = email.toLowerCase();
    }
    const data = { email: email, password: password };

    await loginProducer.connect();
    kafka.producer({ createPartitioner: Partitioners.LegacyPartitioner });
    const partition = email[0] < "n" ? 0 : 1;
    console.log(email[0], `To partition ${partition}`);

    await loginProducer
      .send({
        topic: "test-topic-3",
        messages: [{ value: JSON.stringify(req.body) }],
        // messages: [{ value: JSON.stringify(req.body), partition: partition }],
      })
      .then(() => {
        console.log("Event Published Login");
      });
    await loginProducer.disconnect();

    res.status(200).json({
      message: "successfully",
      data,
    });
  };
};

export default authLogin;
