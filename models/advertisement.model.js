const mongoose = require("mongoose");

const advertSchema = new mongoose.Schema({
  link: {
    type: String,
    required: true,
    unique: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

const advertise = mongoose.model("advertise", advertSchema);

module.exports = advertise;
