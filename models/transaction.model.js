const mongoose = require("mongoose");

module.exports = mongoose.model(
  "Transaction",
  new mongoose.Schema({
    transactionId: {
      type: String,
      required: true,
    },
    sendersID: {
      type: mongoose.Types.ObjectId,
      required: true,
      ref: "Dealer",
    },
    receiversPhone: {
      type: String,
      required: true,
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
