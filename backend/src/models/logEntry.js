const mongoose = require("mongoose");

const { Schema } = mongoose;

const LogEntry = new Schema(
  {
    Title: {
      type: String,
      required: true,
      minLength: 3
    },
    Description: {
      type: String,

      minLength: 3
    },
    Comments: {
      type: String,

      minLength: 3
    },
    Rating: {
      type: Number,
      default: 0,
      minLength: 1,
      maxLength: 10
    },
    Image: {
      type: String,

      minLength: 3
    },
    visitDate: {
      type: Date,
      required: true
    },
    Latitude: {
      type: Number,
      required: true,
      min: -89.9999999,
      max: 89.9999999
    },
    Longitude: {
      type: Number,
      required: true,
      min: -179.9999999,
      max: 179.9999999
    },
    createdAt: {
      type: Date,
      default: Date.now()
    }
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model("LogEntry", LogEntry);
