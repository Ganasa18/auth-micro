import express from "express";
import { AppError, globalErrorHandler } from "@mkdglobal/common";
import { Kafka, Partitioners } from "kafkajs";

const app = express();

// Body parser, reading data from body into req.body
app.use(express.json());

app.set("trust proxy", true);

app.use(
  express.urlencoded({
    extended: true,
  })
);

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
  logLevel: 1,
  brokers: BROKERS,
  clientId: CLIENT_ID,
});

run();

async function run() {
  try {
    const admin = kafka.admin();
    console.log("CONNECTING..");
    await admin.connect();
    console.log("CONNECTED..!");
    await admin.disconnect();
  } catch (e) {
    console.error(`Something bad happend ${e}`);
  }
}

// Routes
const authRouter = require("./routes/authRoute");

// URL API
app.use("/api/auth", authRouter);

// Handle Not Found
app.all("*", (req: any, res: any, next: any) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server`, 404));
});

// Global Handler
app.use(globalErrorHandler);

export { app, kafka, Partitioners };
// export { app };
