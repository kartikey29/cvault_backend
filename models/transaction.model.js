const mongoose = require("mongoose");
Schema = mongoose.Schema;

module.exports = mongoose.model(
  "Transaction",
  new mongoose.Schema(
    {
      sender: {
        type: Schema.Types.ObjectId,
        required: true,
      },
      receiver: {
        type: Schema.Types.ObjectId,
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
      isDealer: {
        type: Boolean,
        required: true,
        // default: false,
      },
    },
    { timestamps: true }
  )
);
