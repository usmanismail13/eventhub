const Review = require("../models/Review");

const createReview = async (req, res) => {
  try {
    const { event, rating, comment } = req.body;

    const review = new Review({
      event,
      user: req.user.id,
      rating,
      comment,
    });

    await review.save();

    res.status(201).json(review);

  } catch (error) {
    res.status(500).json({
      message: "Server error",
    });
  }
};

const getReviews = async (req, res) => {
  try {
    const reviews = await Review.find();

    res.status(200).json(reviews);

  } catch (error) {
    res.status(500).json({
      message: "Server error",
    });
  }
};

module.exports = {
  createReview,
  getReviews,
};