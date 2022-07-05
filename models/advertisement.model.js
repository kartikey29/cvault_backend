const mongoose = require("mongoose");

const advertSchema = new mongoose.Schema(
  {
    imageLink: {
      type: String,
      required: true,
      unique: true,
    },
    redirectLink: {
      type: String,
      unique: true,
    },
  },
  { timestamps: true }
);

const advertise = mongoose.model("advertise", advertSchema);

module.exports = advertise;
