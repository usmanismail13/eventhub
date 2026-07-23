const Booking = require("../models/Booking");
const Event = require("../models/Event");

const createBooking = async (req, res) => {
  try {
    
    console.log(req.body);
    const { eventId, tickets } = req.body;

    const existingBooking = await Booking.findOne({
      user: req.user.id,
      event: eventId,
    });

    if (existingBooking) {
      return res.status(400).json({
        message: "You already booked this event",
      });
    }

    const selectedEvent = await Event.findById(eventId);

    if (!selectedEvent) {
      return res.status(404).json({
        message: "Event not found",
      });
    }

    if (selectedEvent.availableSeats < tickets) {
      return res.status(400).json({
        message: "Not enough seats available",
      });
    }

    selectedEvent.availableSeats -= tickets;

    await selectedEvent.save();

    const booking = await Booking.create({
      user: req.user.id,
      event: eventId,
      seats: tickets,
    });

    res.status(201).json({
      message: "Booking created successfully",
      booking,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = {
  createBooking,
};