const mongoose = require("mongoose");

module.exports = mongoose.model(
	"Customer",
	new mongoose.Schema({
		customerId: {
			type: String,
			required: true,
		},
		firstName: {
			type: String,
			required: true,
		},
		middleName: {
			type: String,
			required: true,
		},
		lastName: {
			type: String,
			required: true,
		},
		email: {
			type: String,
			required: true,
		},
		phone: {
			type: Number,
			required: true,
			max: 10,
		},
	}),
);
