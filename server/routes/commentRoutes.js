const protect = require("../middleware/authMiddleware");
const express = require("express");
const router = express.Router();

const {
  createComment,
  getComments,
  deleteComment,
} = require("../controllers/commentController");


// Create comment
router.post("/", protect, createComment);

// Get comments for an event
router.get("/:eventId", getComments);

// Delete comment
router.delete("/:id", deleteComment);


module.exports = router;