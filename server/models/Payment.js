const mongoose = require("mongoose");

const paymentSchema = new mongoose.Schema({
  paymentIntentId: String,
  status: String,
  amount: Number,
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Payment", paymentSchema);
