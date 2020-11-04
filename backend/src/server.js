const express = require("express");
const mongoose = require("mongoose");
const morgan = require("morgan");
const helmet = require("helmet");
const cors = require("cors");
const middlewares = require("../src/middleware/middlewares");

const app = express();

// ------------------------------ Mongoose DB Connection

const URI = process.env.MONGO_URI || "mongodb://localhost/27017/local";

mongoose.connect(
  URI,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true
  },
  () => {
    console.log("connected to DB");
  }
);
// ------------------------------  logger, header mgmt, CORS

app.use(morgan("short"));
app.use(helmet());
app.use(
  cors({
    origin: "http://localhost:3000"
  })
);

// ------------------------------ basic route  GET '/'

app.get("/", (req, res) => {
  res.json({
    message: "Hello World"
  });
});

// -------------------------------- MiddleWares

app.use(middlewares.notFound);

app.use(middlewares.errorHandler);

// -------------------------------- Listening on Port

const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(`listening on port ${port}`);
});
