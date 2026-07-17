require("dotenv").config();

const mongoose = require("mongoose");
const express = require("express");
const authRoutes = require("./routes/authRoutes");

const app = express();

app.use(express.json());

mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log("MongoDB connected");
  })
  .catch((error) => {
    console.log(error);
  });

app.use("/api/auth", authRoutes);

app.get("/", (req, res) => {
  res.send("EventHub API Running");
});

module.exports = app;