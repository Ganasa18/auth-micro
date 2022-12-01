"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// import module
require("dotenv/config");
const app_1 = require("./app");
// Error Exception
process.on("uncaughtException", (err) => {
    console.log("UNCAUGHT EXCEPTION! 💥 Shutting down...");
    console.log(err.name, err.message);
    process.exit(1);
});
require("./app");
// server setting
const port = 3000;
const server = app_1.app.listen(port, "0.0.0.0", () => {
    console.log(`App running on port ${port}...`);
});
process.on("ECONNREFUSED", (err) => {
    console.log("ECONNREFUSED 💥 Shutting down...");
    console.log(err.name, err.message);
    server.close(() => {
        process.exit(1);
    });
});
// Handle rejection error
process.on("unhandledRejection", (err) => {
    console.log("UNHANDLED REJECTION! 💥 Shutting down...");
    console.log(err.name, err.message);
    server.close(() => {
        process.exit(1);
    });
});
