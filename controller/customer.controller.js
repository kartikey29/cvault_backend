const User = require("../models/User.model");

const Transaction = require("../models/transaction.model");

/*==== Get Customers ====*/

const getCustomer = async (req, res, next) => {
	try {
		const fetchData = await User.find({});
		if (!fetchData) {
			return res.status(404).json({
				success: false,
				error: "User Not Found",
				data: [],
			});
		} else {
			return res.status(200).json({
				success: true,
				message: "User Fetched SuccessFully",
				data: [fetchData],
			});
		}
	} catch (error) {
		return res.status(500).json({ error: "Server is not responding " });
	}
};

/*==== Create Customers ====*/

const postCustomer = async (req, res) => {
	try {
		const dealer = await User.findOne({
			referalCode: req.body.referalCode,
			userType: "dealer",
		});

		if (!dealer) {
			throw { message: "Enter vaild Referal Code" };
		}

		const insertCustomer = await new User({
			UID: req.body.UID,
			firstName: req.body.firstName,
			middleName: req.body.middleName,
			lastName: req.body.lastName,
			email: req.body.email,
			phone: req.body.phone,
			referalCode: req.body.referalCode,
			userType: "customer",
		});
		await insertCustomer.save();
		return res
			.status(200)
			.json({ message: "Data inserted Successfully", data: insertCustomer });
	} catch (error) {
		return res.status(400).json({ error });
	}
};

// exports.findCustomer = async (req, res) => {
//   try {
//     const { customerId } = req.body;
//     const customerData = await Customer.findOne({ customerId }).populate({
//       path: "transactions",
//       populate: { path: "sender", select: "firstName middleName lastName" },
//     });

//     if (!customerData) {
//       throw { message: "customer doesnt exist" };
//     }
//     return res.status(200).send({ customerData });
//   } catch (e) {
//     return res.status(400).send(e);
//   }
// };

// exports.deleteCustomer = async (req, res) => {
//   try {
//     const { customerId } = req.body;
//     const deletedCustomer = await Customer.findOneAndDelete({ customerId });

//     const transactions = await Transaction.find({
//       customer: deletedCustomer._id,
//     });
//     await Transaction.deleteMany({
//       customer: deletedCustomer._id,
//     });

//     transactions.forEach(async (transaction) => {
//       const dealer = await Dealer.findById(transaction.sender);
//       dealer.transactions.filter((transId) => {
//         return transId != transaction._id;
//       });
//       dealer.save();
//     });
//     return res.send(deletedCustomer);
//   } catch (e) {
//     return res.status(400).send(e);
//   }
// };

module.exports = { getCustomer, postCustomer };
