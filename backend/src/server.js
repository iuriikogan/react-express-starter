const express = require("express");
const mongoose = require("mongoose");
const morgan = require("morgan");
const helmet = require("helmet");
const cors = require("cors");
const dotenv = require("dotenv");
const middlewares = require("../src/middleware/middlewares");
const logs = require("../src/api/logs");
const { auth, requiresAuth } = require("express-openid-connect");
const session = require("express-session");

// ------------------------------ config DOTENV run an instance of express

const app = express();

dotenv.config();

// ------------------------------ Mongoose DB Connection

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

// --------------------------------------------Get the default connection

const db = mongoose.connection;

db.on("open", () => {
  console.log("connected to db");
});

//---------------------Bind connection to error event (to get notification of connection errors)

db.on("error", console.error.bind(console, "MongoDB connection error:"));

// ------------------------------  logger, header mgmt, CORS, body parser

app.use(morgan("short"));
app.use(helmet());
app.use(
  cors({
    origin: process.env.CORS_ORIGIN
  })
);
app.use(express.json());

app.use(
  express.urlencoded({
    extended: false
  })
);

// ------------------------------ config express session

app.use(
  session({
    secret: process.env.APP_SECRET || "keyboard cat",
    resave: false,
    saveUninitialized: true,
    cookie: {
      secure: process.env.NODE_ENV === "production",
      httpOnly: true
    }
  })
);

// ------------------------------ config auth

const config = {
  authRequired: false,
  auth0Logout: true,
  secret: "shadjfoeRJEDLKJFHASfa34",
  baseURL: "http://localhost:5000",
  clientID: "ZO08C3IZuxKFrm1ztsKkme1dOj84kdfC",
  issuerBaseURL: "https://iuriikogan.eu.auth0.com"
};

// auth router attaches /login, /logout, and /callback routes to the baseURL

app.use(auth(config));

// req.isAuthenticated is provided from the auth router

app.get("/", (req, res) => {
  res.redirect("http://localhost:3000");
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
