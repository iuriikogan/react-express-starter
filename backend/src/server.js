const express = require("express");
const mongoose = require("mongoose");
const morgan = require("morgan");
const helmet = require("helmet");
const cors = require("cors");
const dotenv = require("dotenv");
const middlewares = require("../src/middleware/middlewares");
const logs = require("../src/api/logs");

// ------------------------------ config DOTENV run an instance of express

dotenv.config();

const app = express();

// ------------------------------ Mongoose DB Connection

mongoose.connect(
  process.env.MONGO_URI,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true
  },
  () => {
    console.log("connected to DB");
  }
);

// ------------------------------  logger, header mgmt, CORS, body parser

app.use(morgan("short"));
app.use(helmet());
app.use(
  cors({
    origin: process.env.CORS_ORIGIN
  })
);
app.use(express.json());

// ------------------------------ basic route  GET '/'

app.get("/", (req, res) => {
  res.json({
    message: "Hello World"
  });
});

app.use("/api/logs", logs);

// -------------------------------- MiddleWares

app.use(middlewares.notFound);

app.use(middlewares.errorHandler);

// -------------------------------- Listening on Port

const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(`listening on port ${port}`);
});
