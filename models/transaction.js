const mongoose = require("mongoose");

const transactionSchema = new mongoose.Schema({
  transctionId: {
    type: String,
    required: true,
  },
  amount: {
    type: Number,
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
  },
  accepted: {
    type: Boolean,
    default: false,
  },
});

module.exports = mongoose.model("transaction", transactionSchema);
