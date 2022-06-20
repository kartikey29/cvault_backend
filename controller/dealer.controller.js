// Dealer Module
const User = require("../models/User.model");

const generateReferalCode = require("../helperFunction/generateReferal");

// Dealer Post Request
exports.createDealer = async (req, res) => {
  try {
    const { UID, firstName, middleName, lastName, phone, email } = req.body; /// put something later

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
exports.getDealer = async (req, res) => {
  try {
    const readData = await Dealer.find({}).populate({
      path: "transactions",
      populate: { path: "receiver", select: "firstName middleName lastName" },
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
    const { UID } = req.body;
    const dealerData = await User.findOne({ UID }).populate({
      path: "transactions",
      populate: {
        path: "receiver",
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

exports.getDealerCustomer = async (req, res) => {
  try {
    const { _id } = req.body;
    const dealerData = await User.findById({ _id });
    const referal = dealerData.referalCode;

    const CustomerData = await User.find({
      referalCode: referal,
      userType: "customer",
    });

    return res.status(200).send(CustomerData);
  } catch (e) {
    return res.status(400).send(e);
  }
};
