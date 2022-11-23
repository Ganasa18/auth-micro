import { app } from "./app";

// Error Exception
process.on("uncaughtException", (err) => {
  console.log("UNCAUGHT EXCEPTION! 💥 Shutting down...");
  console.log(err.name, err.message);
  process.exit(1);
});

require("./app");

// server setting

const server = app.listen(3000, "0.0.0.0", () => {
  console.log(`App running on port ${3000}...`);
});

// Handle rejection error
process.on("unhandledRejection", (err: any) => {
  console.log("UNHANDLED REJECTION! 💥 Shutting down...");
  console.log(err.name, err.message);
  server.close(() => {
    process.exit(1);
  });
});
