// Dealer Module
const Dealer = require("../models/dealer.model");

// Dealer Post Request
const createDealer = async (req, res) => {
	try {
		const data = req.body; /// put something later
		const InsertDealer = await new Dealer({
			name: data.name,
			phone: data.phone,
			email: data.email,
			status: data.status,
		});
		await InsertDealer.save();
		res.status(200).json({
			success: true,
			message: "Data Inserted Successfully",
		});
	} catch (error) {
		console.log(error);
		res.status(400).json({
			message: "Something Went Wrong ",
		});
	}
};

//Dealer Get Request
const getDealer = async (req, res) => {
	try {
		const readData = await Dealer.find({});
		res.send(readData).status(200);
	} catch (error) {
		console.log(error);
		res.status(400).json({
			message: "something went wrong",
		});
	}
};

module.exports = {
	createDealer,
	getDealer,
};
