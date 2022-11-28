import { Request, Response, NextFunction } from "express";
import { AppError } from "@mkdglobal/common";
import { loginProducer } from "../events/loginPublisher";
import { kafka, Partitioners } from "../app";
// import {partitionMetadata} from 'kafkajs';

const authLogin = () => {
  return async (req: Request, res: Response, next: NextFunction) => {
    let { email, password } = req.body;
    if (email) {
      email = email.toLowerCase();
    }
    const data = { email: email, password: password };
    await loginProducer.connect();
    kafka.producer({ createPartitioner: Partitioners.LegacyPartitioner });
    // const partition = email[0] < "n" ? 0 : 1;
    // console.log(email[0], `To partition ${partition}`);

    await loginProducer
      .send({
        topic: "test-topic",
        messages: [{ value: JSON.stringify(req.body) }],
      })
      .then(() => {
        console.log("Event Published Login");
      });

    res.status(200).json({
      message: "successfully",
      data,
    });
  };
};

export default authLogin;
