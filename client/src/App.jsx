import { useEffect, useState } from "react";
import socket from "./services/socket";
import { Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import ConnectWallet from "./components/ConnectWallet";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Events from "./pages/Events";
import EventDetails from "./pages/EventDetails";
import Profile from "./pages/Profile";
import Dashboard from "./pages/Dashboard";
import AdminUsers from "./pages/AdminUsers";
import NotFound from "./pages/NotFound";
import CreateEvent from "./pages/CreateEvent";
import EditEvent from "./pages/EditEvent";

function App() {
  const [notification, setNotification] = useState("");

  useEffect(() => {
    const handleConnect = () => {
      console.log("Connected to Socket.IO server:", socket.id);

      socket.emit("userJoined", {
        message: "A user has joined EventHub",
      });
    };

    const handleWelcome = (data) => {
      console.log(data.message);
      setNotification(data.message);
    };

    if (socket.connected) {
      handleConnect();
    }

    socket.on("connect", handleConnect);
    socket.on("welcome", handleWelcome);

    return () => {
      socket.off("connect", handleConnect);
      socket.off("welcome", handleWelcome);
    };
  }, []);

  return (
    <>
      <Navbar />

      {notification && (
        <div
          style={{
            background: "#d1fae5",
            color: "#065f46",
            padding: "10px",
            margin: "10px 0",
            borderRadius: "6px",
            fontWeight: "bold",
          }}
        >
          {notification}
        </div>
      )}

      <ConnectWallet />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/events" element={<Events />} />
        <Route path="/events/:id" element={<EventDetails />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/admin/users" element={<AdminUsers />} />
        <Route path="*" element={<NotFound />} />
        <Route path="/create-event" element={<CreateEvent />} />
        <Route path="/edit-event/:id" element={<EditEvent />} />
      </Routes>
    </>
  );
}

export default App;