// import module
import "dotenv/config";
import { app } from "./app";

// Error Exception
process.on("uncaughtException", (err: Error) => {
  console.log("UNCAUGHT EXCEPTION! 💥 Shutting down...");
  console.log(err.name, err.message);
  process.exit(1);
});

require("./app");

// server setting
const port = 3000;

const server = app.listen(port, "0.0.0.0", () => {
  console.log(`App running on port ${port}...`);
});

process.on("ECONNREFUSED", (err: Error) => {
  console.log("ECONNREFUSED 💥 Shutting down...");
  console.log(err.name, err.message);
  server.close(() => {
    process.exit(1);
  });
});

// Handle rejection error
process.on("unhandledRejection", (err: Error) => {
  console.log("UNHANDLED REJECTION! 💥 Shutting down...");
  console.log(err.name, err.message);
  server.close(() => {
    process.exit(1);
  });
});
