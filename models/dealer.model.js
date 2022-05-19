const mongoose = require("mongoose");

// Creating Dealer Schema
const dealerSchema = new mongoose.Schema({
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
	status: {
		type: Boolean,
		required: true,
	},
});

// Dealer Model
const Dealer = mongoose.model("Dealer", dealerSchema);

module.exports = Dealer;
