const { transaction } = require("../models/transaction.model");

const postTrans = async (req, res) => {
	try {
		const insertTrans = await transaction({
			transctionId: req.body.transctionId,
			transactionType: req.body.transactionType,
			cryptoType: req.body.cryptoType,
			price: req.body.price,
			costPrice: req.body.costPrice,
			quantity: req.body.quantity,
			accepted: req.body.accepted,
		});
		await insertTrans.save();
		return res.status(201).json({ message: "Data inserted Successfully " });
	} catch (error) {
		console.log(error);
		res.status(400).json({ error: "Something went wrong" });
	}
};
const getTrans = async (req, res) => {
	try {
		const fetchTrans = await transaction.find({});
		res.status(200).send(fetchTrans);
	} catch (error) {
		console.log(error);
		res.status(400).json({ error: "Something went wrong" });
	}
};

module.exports = { postTrans, getTrans };
