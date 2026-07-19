const Comment = require("../models/Comment");

// Create comment
const createComment = async (req, res) => {
  try {
    const comment = await Comment.create(req.body);

    res.status(201).json(comment);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// Get comments
const getComments = async (req, res) => {
  try {
    const comments = await Comment.find({
      event: req.params.eventId,
    })
      .populate("user", "name")
      .populate("event", "title");

    res.json(comments);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// Delete comment
const deleteComment = async (req, res) => {
  try {
    await Comment.findByIdAndDelete(req.params.id);

    res.json({
      message: "Comment deleted",
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = {
  createComment,
  getComments,
  deleteComment,
};