const User = require("../models/User");
const Event = require("../models/Event");

const getAllUsers = async (req, res) => {
  try {
    const users = await User.find().select("-password");

    res.status(200).json(users);

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};


const banUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    user.isBanned = true;

    await user.save();

    res.status(200).json({
      message: "User banned successfully",
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        isBanned: user.isBanned,
      },
    });

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};


const deleteUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    await User.findByIdAndDelete(req.params.id);

    res.status(200).json({
      message: "User deleted successfully",
    });

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};
const getAllEvents = async (req, res) => {
  try {
    const events = await Event.find();

    res.status(200).json(events);

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};
const deleteEvent = async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);

    if (!event) {
      return res.status(404).json({
        message: "Event not found",
      });
    }

    await Event.findByIdAndDelete(req.params.id);

    res.status(200).json({
      message: "Event deleted successfully",
    });

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = {
  getAllUsers,
  banUser,
  deleteUser,
  getAllEvents,
  deleteEvent,
};
