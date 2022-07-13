// Dealer Module
const User = require("../models/User.model");

const generateReferalCode = require("../helperFunction/generateReferal");

const dealerPaginateOptions = require("../helperFunction/dealerCustomerPaginateOptions");

const _ = require("lodash");

// Dealer Post Request
exports.createDealer = async (req, res) => {
  try {
    const { UID, firstName, middleName, lastName, phone, email } = req.body;

    const dealer = await User.findOne({ UID });
    if (dealer) {
      throw { message: "dealer already exist" };
    }

    const referalCode = generateReferalCode();

    const InsertDealer = await new User({
      UID,
      firstName,
      middleName,
      lastName,
      phone,
      email,
      referalCode,
      active: true,
      userType: "dealer",
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
exports.getAllDealer = async (req, res) => {
  try {
    const { page } = req.query;
    const options = dealerPaginateOptions(page);

    const dealerData = await User.paginate({ userType: "dealer" }, options);

    return res.status(200).send(dealerData);
  } catch (error) {
    return res.status(400).json({
      error,
    });
  }
};

exports.changeActive = async (req, res) => {
  try {
    const { UID } = req.body;
    const dealer = await User.findOne({ UID });
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
    const { _id } = req.body;
    const dealerData = await User.findOne({ _id, userType: "dealer" })
      .populate([
        {
          path: "transactions",
          populate: [
            { path: "receiver", select: "firstName middleName lastName" },
            { path: "sender", select: "firstName middleName lastName" },
          ],
        },
        {
          path: "notifications",
          options: { sort: { created_at: -1 } },
        },
      ])
      .select("-token -status");

    if (!dealerData) {
      throw { message: "dealer doesnt exist" };
    }
    return res.status(200).send({ dealerData });
  } catch (e) {
    return res.status(400).send(e);
  }
};

exports.getDealerCustomer = async (req, res) => {
  try {
    const { _id } = req.body;
    const dealerData = await User.findById({ _id });
    const referal = dealerData.referalCode;

    const CustomerData = await User.find({
      referalCode: referal,
      userType: "customer",
    })
      .select("-token -status")
      .sort({ createdAt: -1 });

    return res.status(200).send(CustomerData);
  } catch (e) {
    return res.status(400).send(e);
  }
};

exports.setDealerMargin = async (req, res) => {
  try {
    const { _id, margin } = req.body;

    const dealerData = await User.findOne({ _id, userType: "dealer" });

    if (!dealerData) {
      throw { message: "dealer doesnt exist" };
    }

    dealerData.margin = margin;

    await dealerData.save();

    return res.send(dealerData);
  } catch (e) {
    return res.status(400).send(e);
  }
};

exports.getDealerMargin = async (req, res) => {
  try {
    const { referal } = req.body;
    const dealerData = await User.findOne({
      referalCode: referal,
      userType: "dealer",
    });
    if (!dealerData) {
      throw { message: "dealer doesnt exist" };
    }
    return res.send({ margin: dealerData.margin });
  } catch (e) {
    return res.status(400).send(e);
  }
};

exports.patchEditDealer = async (req, res) => {
  try {
    const { _id } = req.body;

    const fieldsToDelete = [
      "_id",
      "userType",
      "token",
      "referalCode",
      "margin",
      "status",
      "UID",
    ];
    const updateFields = _.omit(req.body, fieldsToDelete);

    const dealer = await User.findByIdAndUpdate(_id, updateFields, {
      returnOriginal: false,
    }).select("-token -margin -transactions -status");
    if (!dealer) {
      throw { message: "customer or dealer doesnt exist" };
    }

    return res.status(200).send(dealer);
  } catch (e) {
    return res.status(400).send(e);
  }
};
