const express = require("express");
const morgan = require("morgan");
const helmet = require("helmet");
const cors = require("cors");

const app = express();

//middleware

app.use(morgan("short"));
app.use(helmet());
app.use(
  cors({
    origin: "http://localhost:3000"
  })
);

app.get("/", (req, res) => {
  res.json({
    message: "Hello World"
  });
});

// not found

app.use((req, res, next) => {
  const error = new Error("Not Found - " + req.originalUrl);
  res.status(404);
  next(error);
});

// error handling

app.use((error, req, res, next) => {
  const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
  res.status(statusCode);
  res.json({
    message: error.message,
    stack: process.env.NODE_ENV === "production" ? null : error.stack
  });
});

const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(`listening on port ${port}`);
});
