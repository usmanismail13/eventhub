const Booking = require("../models/Booking");
const Event = require("../models/Event");
const Review = require("../models/Review");

const getDashboardStats = async (req, res) => {
  try {
    const totalEvents = await Event.countDocuments();

    const totalBookings = await Booking.countDocuments();

    const totalReviews = await Review.countDocuments();

    const revenueBookings = await Booking.find()
      .populate("event", "price");

    const totalRevenue = revenueBookings.reduce((total, booking) => {
      return total + (booking.event.price * booking.seats);
    }, 0);

    res.json({
      totalEvents,
      totalBookings,
      totalRevenue,
      totalReviews,
    });

  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Server Error",
    });
  }
};

module.exports = {
  getDashboardStats,
};