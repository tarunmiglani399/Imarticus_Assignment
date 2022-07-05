require("dotenv").config();
const mongoose = require("mongoose");
const app = require("./app");
const logger = require("./config/logger");
const express = require("express");

let server;
const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

if (
  process.env.NODE_ENV === "production" ||
  process.env.NODE_ENV === "staging"
) {
  app.use(express.static("frontend/build"));
  const path = require("path");
  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname + "/frontend/build/index.html"));
  });
}

mongoose
  .connect(process.env.MONGODB_URL, options)
  .then(() => {
    logger.info(`Connected to DB at ${process.env.MONGODB_URL}`);
    server = app.listen(process.env.PORT, () => {
      logger.info(`Server Listening at port ${process.env.PORT}`);
    });
  })
  .catch((error) => logger.error(`Failed to connect to DB, ${error}`));

const exitHandler = () => {
  if (server) {
    server.close(() => {
      logger.info("Server closed");
      process.exit(1);
    });
  } else {
    process.exit(1);
  }
};

const unexpectedErrorHandler = (error) => {
  logger.error(error);
  exitHandler();
};

process.on("uncaughtException", unexpectedErrorHandler);
process.on("unhandledRejection", unexpectedErrorHandler);

process.on("SIGTERM", () => {
  logger.info("SIGTERM received");
  if (server) {
    server.close();
  }
});
