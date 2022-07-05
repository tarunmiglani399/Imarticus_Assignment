const express = require("express");
const compression = require("compression");
const cors = require("cors");
const httpStatus = require("http-status");
const morgan = require("./config/morgan");
require("dotenv").config();
const routes = require("./routes/route");
const { errorConverter, errorHandler } = require("./middlewares/error");
const ApiError = require("./utils/ApiError");
const helmet = require("helmet");

const app = express();

if (process.env.NODE_ENV !== "test") {
  app.use(morgan.successHandler);
  app.use(morgan.errorHandler);
}

app.use(helmet());

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

app.use(compression());

app.use(cors());
app.options("*", cors());

app.use("/api", routes);

app.use((req, res, next) => {
  next(new ApiError(httpStatus.NOT_FOUND, "Not found"));
});

app.use(errorConverter);

app.use(errorHandler);

module.exports = app;
