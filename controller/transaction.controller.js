const Transaction = require("../models/transaction.model");
const Dealer = require("../models/dealer.model");

const postTrans = async (req, res) => {
  try {
    const {
      receiversPhone,
      sendersID,
      transactionId,
      transactionType,
      cryptoType,
      price,
      costPrice,
      quantity,
      currency,
    } = req.body;

    const dealer = await Dealer.findOne({ sendersID });
    if (!dealer) {
      throw "dealer doesn't exits";
    }

    const insertTrans = await new Transaction({
      transactionId,
      transactionType,
      cryptoType,
      price,
      costPrice,
      quantity,
      receiversPhone,
      currency,
      sendersID: dealer._id,
    });
    await insertTrans.save();

    dealer.transactions.push(insertTrans._id);

    await dealer.save();

    return res
      .status(201)
      .json({ message: "Data inserted Successfully", data: insertTrans });
  } catch (error) {
    console.log(error);
    return res.status(400).json({ error });
  }
};
const getTrans = async (req, res) => {
  try {
    const { dealerId } = req.body;
    const fetchTrans = await Transaction.find({ dealerId });
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

module.exports = { postTrans, getTrans, editTrans };
