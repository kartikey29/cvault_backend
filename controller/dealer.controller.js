// Dealer Module
const Dealer = require("../models/dealer.model");

const generateReferalCode = require("../helperFunction/generateReferal");
const { find, findOne } = require("../models/dealer.model");

// Dealer Post Request
exports.createDealer = async (req, res) => {
	try {
		const { dealerId, firstName, middleName, lastName, phone, email } =
			req.body; /// put something later

		const dealer = await Dealer.findOne({ dealerId });
		if (dealer) {
			throw { message: "dealer already exist" };
		}

		const referalCode = generateReferalCode();

		const InsertDealer = await new Dealer({
			dealerId,
			firstName,
			middleName,
			lastName,
			phone,
			email,
			referalCode,
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
		const readData = await Dealer.find({}).populate({
			path: "transactions",
			populate: { path: "customer", select: "firstName middleName lastName" },
		});

		return res.status(200).send(readData);
	} catch (error) {
		return res.status(400).json({
			error,
		});
	}
};

exports.changeActive = async (req, res) => {
	try {
		const { dealerId } = req.body;
		const dealer = await Dealer.findOne({ dealerId });
		if (!dealer) {
			throw "dealer doesnt exist";
		}
		dealer.active = !dealer.active;
		await dealer.save();
		return res.status(200).send(dealer);
	} catch (e) {
		return res.status(400).send(e);
	}
};

exports.findDealer = async (req, res) => {
	try {
		const { dealerId } = req.body;
		const dealerData = await Dealer.findOne({ dealerId }).populate({
			path: "transactions",
			populate: {
				path: "customer",
				select: "firstName middleName lastName",
			},
		});

		if (!dealerData) {
			throw { message: "dealer doesnt exist" };
		}
		return res.status(200).send({ dealerData });
	} catch (e) {
		return res.status(400).send(e);
	}
};
