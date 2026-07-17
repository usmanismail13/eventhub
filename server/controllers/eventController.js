const Event = require("../models/Event");

const createEvent = async (req, res) => {

  const {
    title,
    description,
    date,
    location,
    category,
    price,
    availableSeats
  } = req.body;

  const event = await Event.create({
    title,
    description,
    date,
    location,
    category,
    price,
    availableSeats
  });

  res.status(201).json(event);
};

const getEvents = async (req, res) => {
  const events = await Event.find();

  res.json(events);
};

const getEvent = async (req, res) => {
  const event = await Event.findById(req.params.id);

  res.json(event);
};

const updateEvent = async (req, res) => {
  const event = await Event.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  );

  res.json(event);
};

const deleteEvent = async (req, res) => {
  const event = await Event.findByIdAndDelete(req.params.id);

  res.json(event);
};

module.exports = {
  createEvent,
  getEvents,
  getEvent,
  updateEvent,
  deleteEvent
};