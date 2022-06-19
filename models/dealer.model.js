const mongoose = require("mongoose");

// Creating Dealer Schema
const dealerSchema = new mongoose.Schema({
  dealerId: {
    type: String,
    required: true,
    unique: true,
  },
  firstName: {
    type: String,
    required: true,
  },
  middleName: {
    type: String,
  },
  lastName: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
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
  referalCode: {
    type: String,
    maxlength: 4,
    required: true,
    unique: true,
  },
  transactions: [
    {
      type: mongoose.Types.ObjectId,
      ref: "Transaction",
    },
  ],
});

// Dealer Model
const Dealer = mongoose.model("Dealer", dealerSchema);

module.exports = Dealer;
