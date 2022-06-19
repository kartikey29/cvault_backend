const Transaction = require("../models/transaction.model");
const Dealer = require("../models/dealer.model");
const Customer = require("../models/customer.model");

const postTrans = async (req, res) => {
  try {
    const {
      receiversPhone,
      sendersID,
      transactionType,
      cryptoType,
      price,
      costPrice,
      quantity,
      currency,
      isDealer,
    } = req.body;

    let receiverId;
    let senderId;

    if (isDealer) {
      //when sender is a dealer
      const dealer = await Dealer.findOne({ dealerId: sendersID });
      if (!dealer) {
        throw "dealer doesn't exits";
      }
      //finder dealer by id and get id
      senderId = dealer._id;
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
      const customer = await Customer.findOne({ customerId: sendersID });
      if (!customer) {
        throw "customer is not registered";
      }
      //get customer by id and get id
      senderId = customer._id;
    }
    const insertTrans = await new Transaction({
      transactionType,
      cryptoType,
      price,
      costPrice,
      quantity,
      receiver: receiverId,
      currency,
      sender: senderId,
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
    const { dealerId } = req.body;
    const fetchTrans = await Transaction.find({ dealerId })
      .populate("sender")
      .populate("customer");
    return res.status(200).send(fetchTrans);
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
        select: "firstName MiddleName lastName phone email active referalCode",
      })
      .populate({
        path: "customer",
        select: "firstName MiddleName lastName phone email ",
      });

    return res.status(200).send(transactions);
  } catch (e) {
    return res.status(400).send(e);
  }
};

module.exports = { postTrans, getTrans, editTrans, getAllTransaction };
