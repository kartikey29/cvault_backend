const mongoose = require("mongoose");
const mongoosePaginate = require("mongoose-paginate-v2");

Schema = mongoose.Schema;

const transSchema = new mongoose.Schema(
  {
    sender: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    receiver: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "User",
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
      enum: ["accepted", "rejected", "expired", "sent"],
      required: true,
      default: "sent",
    },
    senderType: {
      type: String,
      enum: ["dealer", "customer"],
      required: true,
    },
    dealerMargin: {
      type: Number,
      required: true
    }
  },
  { timestamps: true }
);

transSchema.plugin(mongoosePaginate);

module.exports = mongoose.model("Transaction", transSchema);
