const Transaction = require("../models/transaction.model");
const Dealer = require("../models/User.model");
const Customer = require("../models/customer.model");

const postTrans = async (req, res) => {
  try {
    const {
      receiversPhone,
      transactionType,
      cryptoType,
      price,
      costPrice,
      quantity,
      currency,
      isDealer,
    } = req.body;

    let receiverId;

    if (isDealer) {
      const customer = await Customer.findOne({ phone: receiversPhone });
      if (!customer) {
        throw "customer is not registered";
      }
      // find customer by phone and insert id
      receiverId = customer._id;
    } else {
      //when sender is a customer
      const dealer = await Dealer.findOne({ phone: receiversPhone });
      if (!dealer) {
        throw "dealer doesn't exits";
      }
      //get dealer by phone and get id
      receiverId = dealer._id;
    }
    const insertTrans = await new Transaction({
      transactionType,
      cryptoType,
      price,
      costPrice,
      quantity,
      receiver: receiverId,
      currency,
      sender: req.user.id,
    });
    await insertTrans.save();

    return res
      .status(201)
      .json({ message: "Data inserted Successfully", data: insertTrans });
  } catch (error) {
    console.log(error);
    return res.status(400).send(error);
  }
};

const getTrans = async (req, res) => {
  try {
    const _id = req.user.id; //get from frontend

    const fetchTrans = await Transaction.find({ senderId: _id }).populate(
      "receiver"
    );

    return res.status(200).send({ fetchTrans, sender: req.user });
  } catch (error) {
    console.log(error);
    return res.status(400).json({ error });
  }
};

const editTrans = async (req, res) => {
  try {
    const update = req.body;
    const { transactionId } = req.body;
    if (!transactionId) {
      throw "Send transaction ID";
    }
    const trans = await Transaction.findOneAndUpdate(
      { transactionId },
      update,
      { returnOriginal: false }
    );
    return res.send({ updated: trans });
  } catch (e) {
    return res.status(400).send(e);
  }
};

const getAllTransaction = async (req, res) => {
  try {
    const transactions = await Transaction.find({})
      .populate({
        path: "sender",
        select: "firstName MiddleName lastName phone email active referalCode ",
      })
      .populate({
        path: "receiver",
        select: "firstName MiddleName lastName phone email active referalCode ",
      });
    s;

    return res.status(200).send(transactions);
  } catch (e) {
    return res.status(400).send(e);
  }
};

module.exports = { postTrans, getTrans, editTrans, getAllTransaction };
