const express = require("express");

const router = express.Router();

const LogEntry = require("../models/logEntry");

router.get("/", (req, res) => {
  res.json({
    message: "log router"
  });
});

router.post("/", async (req, res, next) => {
  try {
    const logEntry = new LogEntry(req.body);
    const createdEntry = await logEntry.save();
    res.json(createdEntry);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
