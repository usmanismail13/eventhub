require("dotenv").config();

const mongoose = require("mongoose");
const express = require("express");
const cors = require("cors");
const http = require("http");
const { Server } = require("socket.io");

const authRoutes = require("./routes/authRoutes");
const eventRoutes = require("./routes/eventRoutes");
const bookingRoutes = require("./routes/bookingRoutes");
const paymentRoutes = require("./routes/paymentRoutes");
const reviewRoutes = require("./routes/reviewRoutes");
const commentRoutes = require("./routes/commentRoutes");
const adminRoutes = require("./routes/adminRoutes");

const app = express();
const server = http.createServer(app);

// Express CORS
app.use(
  cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "PUT", "DELETE"],
  })
);

app.use(express.json());

const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173",
    methods: ["GET", "POST"],
  },
});

app.use("/api/auth", authRoutes);
app.use("/api/events", eventRoutes);
app.use("/api/bookings", bookingRoutes);
app.use("/payment", paymentRoutes);
app.use("/api/reviews", reviewRoutes);
app.use("/api/comments", commentRoutes);
app.use("/api/admin", adminRoutes);

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("MongoDB connected");
  })
  .catch((error) => {
    console.log(error);
  });

io.on("connection", (socket) => {
  console.log(`User connected: ${socket.id}`);

  socket.on("userJoined", (data) => {
    console.log(data.message);

    socket.emit("welcome", {
      message: "Welcome to EventHub!",
    });
  });

  socket.on("disconnect", () => {
    console.log(`User disconnected: ${socket.id}`);
  });
});

app.get("/", (req, res) => {
  res.send("EventHub API Running");
});

module.exports = { app, server, io };