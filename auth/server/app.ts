import express from "express";
import { globalErrorHandler } from "@mkdglobal/common";
const app = express();

// Body parser, reading data from body into req.body
app.use(express.json());

app.use(
  express.urlencoded({
    extended: true,
  })
);

// Global Handler
app.use(globalErrorHandler);

export { app };
