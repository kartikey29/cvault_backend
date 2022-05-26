const mongoose = require("mongoose");

// Creating Dealer Schema
const dealerSchema = new mongoose.Schema({
  dealerId: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  phone: {
    type: Number,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    unique: true,
    required: true,
  },
  active: {
    type: Boolean,
    required: true,
    default: true,
  },
  transactions: [
    {
      type: mongoose.Types.ObjectId,
      ref: "transaction",
    },
  ],
});

// Dealer Model
const Dealer = mongoose.model("Dealer", dealerSchema);

module.exports = Dealer;
