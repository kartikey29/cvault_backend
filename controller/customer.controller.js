const User = require("../models/User.model");
const Transaction = require("../models/transaction.model");
const CustomerPaginateOptions = require("../helperFunction/dealerCustomerPaginateOptions");

/*==== Get Customers ====*/

const getAllCustomer = async (req, res, next) => {
  try {
    // const fetchData = await User.find({ userType: "customer" }).select(
    //   "-token -status"
    // );
    const { page } = req.query;

    const options = CustomerPaginateOptions(page);

    const customerData = await User.paginate({ userType: "customer" }, options);
    if (!customerData) {
      throw { message: "no customer" };
    }

    return res.send(customerData);
  } catch (error) {
    return res.status(500).json(error);
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

const findCustomer = async (req, res) => {
  try {
    const { _id } = req.body;
    const customerData = await User.findOne({
      _id,
      userType: "customer",
    })
      .populate({
        path: "transactions",
        populate: [
          { path: "receiver", select: "firstName middleName lastName" },
          { path: "sender", select: "firstName middleName lastName" },
        ],
      })
      .select("-token -status");

    if (!customerData) {
      throw { message: "customer doesnt exist" };
    }
    return res.status(200).send({ customerData });
  } catch (e) {
    return res.status(400).send(e);
  }
};

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
//   }
// };
//     });
//     return res.send(deletedCustomer);
//   } catch (e) {
//     return res.status(400).send(e);
//   }
// };

module.exports = { getAllCustomer, postCustomer, findCustomer };
