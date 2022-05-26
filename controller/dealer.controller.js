// Dealer Module
const Dealer = require("../models/dealer.model");

// Dealer Post Request
exports.createDealer = async (req, res) => {
	try {
		const data = req.body; /// put something later
		const InsertDealer = await new Dealer({
			name: data.name,
			phone: data.phone,
			email: data.email,
		});
		await InsertDealer.save();
		return res
			.status(200)
			.json({ message: "Data Inserted Successfully", InsertDealer });
	} catch (error) {
		console.log(error);
		return res.status(400).send({
			error,
		});
	}
};

//Dealer Get Request
exports.getDealer = async (req, res) => {
	try {
		const readData = await Dealer.find({}).populate("Transaction");
		return res.send(readData).status(200);
	} catch (error) {
		console.log(error);
		return res.status(400).json({
			message: "something went wrong",
		});
	}
};
