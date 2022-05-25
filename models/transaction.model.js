const mongoose = require("mongoose");

module.exports = mongoose.model(
	"transaction",
	new mongoose.Schema({
		transctionId: {
			type: String,
			required: true,
		},
		transactionType: {
			type: String,
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
		accepted: {
			type: Boolean,
			default: false,
		},
	}),
);
