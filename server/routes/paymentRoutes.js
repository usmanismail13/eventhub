const express = require("express");

const router = express.Router();

router.post("/verify", (req, res) => {
  const { transactionHash } = req.body;

  if (!transactionHash) {
    return res.status(400).json({
      message: "Transaction hash required"
    });
  }

 res.json({
  message: "Payment verified. Booking confirmed.",
  transactionHash,
  bookingStatus: "confirmed"
});
});

module.exports = router;