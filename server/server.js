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
const dashboardRoutes = require("./routes/dashboardRoutes");

const app = express();
const server = http.createServer(app);

const allowedOrigins = [
  "http://localhost:5173",
  "https://eventhub-ecru-psi.vercel.app",
  "https://eventhub-kkgq-liard.vercel.app",
];

// Express CORS
app.use(
  cors({
    origin: allowedOrigins,
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);

app.use(express.json());

// Socket.IO
const io = new Server(server, {
  cors: {
    origin: allowedOrigins,
    methods: ["GET", "POST"],
    credentials: true,
  },
});

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/events", eventRoutes);
app.use("/api/bookings", bookingRoutes);
app.use("/payment", paymentRoutes);
app.use("/api/reviews", reviewRoutes);
app.use("/api/comments", commentRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/dashboard", dashboardRoutes);

// MongoDB Connection
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("MongoDB connected");
  })
  .catch((error) => {
    console.log(error);
  });

// Socket.IO Events
io.on("connection", (socket) => {
  console.log(`User connected: ${socket.id}`);

  socket.on("userJoined", (data) => {
    console.log(data.message);

    // Welcome message for current user
    socket.emit("welcome", {
      message: "Welcome to EventHub!",
    });

    // Notification for other connected users
    socket.broadcast.emit("notification", {
      message: "A new user joined EventHub!",
    });
  });

  socket.on("disconnect", () => {
    console.log(`User disconnected: ${socket.id}`);

    // Notify other users when someone leaves
    socket.broadcast.emit("notification", {
      message: "A user left EventHub!",
    });
  });
});

// Test Route
app.get("/", (req, res) => {
  res.send("EventHub API Running");
});

module.exports = { app, server, io };