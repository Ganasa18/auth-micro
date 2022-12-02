import express, { Request, Response, NextFunction } from "express";
import { AppError, globalErrorHandler } from "@mkdglobal/common";
import { Kafka, Partitioners } from "kafkajs";
import cookieSession from "cookie-session";
import { json } from "body-parser";
import { sequelizeConnection } from "../storage";
import { SignUpConsumer } from "./events/signup-listener-event";
// Importing file-store module
const filestore = require("session-file-store")(cookieSession);
import cors from "cors";

const app = express();

// CORS
app.use(cors<Request>({ credentials: true, origin: true }));

// Body parser, reading data from body into req.body
app.use(json());

app.set("trust proxy", true);

app.use(
  express.urlencoded({
    extended: true,
  })
);

app.use(
  cookieSession({
    signed: false,
  })
);

// Check DB connection
sequelizeConnection
  .authenticate()
  .then(async () => {
    console.log("Connection has been established successfully.");
    await sequelizeConnection.sync();
    // await sequelizeConnection.sync({ force: true });
    console.log("successfully sync database");
  })
  .catch((err: Error) => {
    console.error("Unable to connect to the database:", err);
  });

// CHECK ENV variable

if (!process.env.KAFKA_CLIENT_ID) {
  throw new Error("KAFKA_CLIENT_ID must be defined");
}
if (!process.env.KAFKA_URL) {
  throw new Error("KAFKA_URL must be defined");
}

// Kafka Connect
const CLIENT_ID = process.env.KAFKA_CLIENT_ID;
const BROKERS = [`${process.env.KAFKA_URL}`];

export const kafka = new Kafka({
  logLevel: 1,
  brokers: BROKERS,
  clientId: CLIENT_ID,
  requestTimeout: 25000,
});

async function runConsumer() {
  try {
    const admin = kafka.admin();
    await admin.connect();
    console.log("CONNECTED..!");
    await admin.disconnect();
    // Subscriber
    // console.log("CONNECTING CONSUMER..");
    // await new SignUpConsumer("test-topic", "groupId").listen();
    // await consume.listen();
    // console.log(consume.resultMsg(), " FROM APPS");
  } catch (e) {
    console.error(`Something bad happend ${e}`);
    process.exit(1);
  }
}

runConsumer();

//test route
app.get("/api/test", (req, res) => {
  res.status(200).json({
    success: true,
    text: "aman",
  });
});
// Routes
const authRouter = require("./routes/authRoute");

// URL API
app.use("/api/auth", authRouter);

// Handle Not Found
app.all("*", (req: Request, res: Response, next: NextFunction) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server`, 404));
});

// Global Handler
app.use(globalErrorHandler);

export { app, Partitioners };
// export { app };

// new FuncSubscriber("test-topic").initialize();
// const login = new LoginConsumer("test-topic");
// const admin = kafka.admin();
// await admin.connect();
// console.log("CONNECTED..!");
// await admin.disconnect();
