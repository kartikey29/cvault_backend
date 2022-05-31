const mongoose = require("mongoose");

module.exports = mongoose.model(
  "Transaction",
  new mongoose.Schema({
    sender: {
      type: mongoose.Types.ObjectId,
      required: true,
      ref: "Dealer",
    },
    customer: {
      type: mongoose.Types.ObjectId,
      required: true,
      ref: "Customer",
    },
    transactionType: {
      type: String,
      required: true,
    },
    currency: {
      type: String,
      enum: ["usdt", "inr"],
      required: true,
    },
    cryptoType: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    costPrice: {
      type: Number,
      required: true,
    },
    quantity: {
      type: Number,
      required: true,
    },
    status: {
      type: String,
      enum: ["accepted", "cancelled", "expired", "sent"],
      required: true,
      default: "sent",
    },
  })
);
