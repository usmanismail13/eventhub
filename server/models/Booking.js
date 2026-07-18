const mongoose = require("mongoose");

const bookingSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    event: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Event",
      required: true,
    },
    seats: {
      type: Number,
      required: true,
      min: 1,
    },
    status: {
      type: String,
      enum: ["confirmed", "cancelled"],
      default: "confirmed",
    },
    transactionHash: {
  type: String,
},
paymentMethod: {
  type: String,
  default: "Trust Wallet",
},

paymentStatus: {
  type: String,
  default: "completed",
},
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Booking", bookingSchema);