// Customer Module
const Customer = require("../models/cutomer.model");

// Get Request
exports.getCustomer = async (req, res) => {
	try {
		const fetchCustomer = await new Customer.find({});
		return res.status(200).json({
			message: "Customer Data ",
			data: fetchCustomer,
		});
	} catch (error) {
		return res.status(400).json({ error: "Something went worng" });
	}
};

// Post Request
exports.postCustomer = async (req, res) => {
	try {
		const insertCustomer = await new Customer({
			customerId: req.body.customerId,
			firstName: req.body.firstName,
			middleName: req.body.middleName,
			lastName: req.body.lastName,
			email: req.body.email,
			phone: req.body.phone,
		});
		await insertCustomer.save();
		return res
			.status(200)
			.json({ message: "Data inserted Successfully", data: insertCustomer });
	} catch (error) {
		return res.status(400).json({ error: "Something went worng" });
	}
};
