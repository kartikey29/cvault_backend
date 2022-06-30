const mongoose = require("mongoose");
const mongoosePaginate = require("mongoose-paginate-v2");

// Creating User Schema
const userSchema = new mongoose.Schema({
  UID: {
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
  status: {
    type: Boolean,
    default: true,
  },
  userType: {
    type: String,
    enum: ["dealer", "customer", "admin"],
    required: true,
  },
  token: {
    type: String,
    default: "",
  },
  active: {
    type: Boolean,
  },
  referalCode: {
    type: String,
    // unique: true,
  },
  margin: {
    type: Number,
    default: 0,
  },
  transactions: [
    {
      type: mongoose.Types.ObjectId,
      ref: "Transaction",
    },
  ],
});

userSchema.plugin(mongoosePaginate);

// User Model
const User = mongoose.model("User", userSchema);

module.exports = User;
