const Transaction = require("../models/transaction.model");
const User = require("../models/User.model");

const postTrans = async (req, res) => {
  try {
    const { _id } = req.body;
    const {
      receiversPhone,
      transactionType,
      cryptoType,
      price,
      costPrice,
      quantity,
      currency,
      senderType,
    } = req.body;

    let receiverId;
    let customer;
    let dealer;

    if (senderType === "dealer") {
      customer = await User.findOne({ phone: receiversPhone });
      if (!customer) {
        throw "customer is not registered";
      }
      // find customer by phone and insert id
      receiverId = customer._id;
      dealer = await User.findById({ _id });
    } else {
      //when sender is a customer
      dealer = await User.findOne({ phone: receiversPhone });
      if (!dealer) {
        throw "dealer doesn't exits";
      }
      //get dealer by phone and get id
      receiverId = dealer._id;
      customer = await User.findById({ _id });
    }
    const insertTrans = await new Transaction({
      transactionType,
      cryptoType,
      price,
      costPrice,
      quantity,
      receiver: receiverId,
      currency,
      sender: _id,
      senderType,
    });
    await insertTrans.save();

    dealer.transactions.push(insertTrans._id);
    customer.transactions.push(insertTrans._id);

    await dealer.save();
    await customer.save();

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
    const _id = req.body._id; //get from frontend

    const fetchTrans = await Transaction.find({ senderId: _id })
      .populate("sender")
      .populate("receiver");

    return res.status(200).send({ fetchTrans });
  } catch (error) {
    console.log(error);
    return res.status(400).json({ error });
  }
};

// const editTrans = async (req, res) => {
//   try {
//     const update = req.body;
//     const { transactionId } = req.body;
//     if (!transactionId) {
//       throw "Send transaction ID";
//     }
//     const trans = await Transaction.findOneAndUpdate(
//       { transactionId },
//       update,
//       { returnOriginal: false }
//     );
//     return res.send({ updated: trans });
//   } catch (e) {
//     return res.status(400).send(e);
//   }
// };

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

const deleteTrans = async (req, res) => {
  try {
    const { transID } = req.body;

    const deletedTrans = await Transaction.findOneAndDelete({ _id: transID });

    const senderData = await User.findOne({ _id: deletedTrans.sender });
    const receiverData = await User.findOne({ _id: deletedTrans.receiver });

    senderData.transactions.filter((transId) => {
      return transId != deletedTrans._id;
    });
    receiverData.transactions.filter((transId) => {
      return transId != deletedTrans._id;
    });

    await senderData.save();
    await receiverData.save();

    return res.status(200).send(deleteTrans);
  } catch (e) {
    return res.status(400).send(e);
  }
};

module.exports = { postTrans, getTrans, getAllTransaction, deleteTrans };
