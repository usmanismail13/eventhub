const express = require("express");

const {
  createEvent,
  getEvents,
  getEvent,
  updateEvent,
  deleteEvent
} = require("../controllers/eventController");
const upload = require("../config/multer");

const router = express.Router();

router.get("/", getEvents);
router.get("/:id", getEvent);

router.post("/", upload.single("image"), createEvent);

router.put("/:id", updateEvent);

router.delete("/:id", deleteEvent);

module.exports = router;