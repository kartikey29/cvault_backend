const mongoose = require("mongoose");

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
	isUser: {
		type: Boolean,
		// default: true,
		required: true,
	},
	status: {
		type: Boolean,
		// required: true,
		// default: null,s
	},
	referalCode: {
		type: String,
		unique: true,
	},
	transactions: [
		{
			type: mongoose.Types.ObjectId,
			ref: "Transaction",
		},
	],
});

// User Model
const User = mongoose.model("User", userSchema);

module.exports = User;
