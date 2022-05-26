const Transaction = require("../models/transaction.model");

const postTrans = async (req, res) => {
  try {
    const { customerId, dealerId } = req.body;
    const insertTrans = await new Transaction({
      transctionId: req.body.transctionId,
      transactionType: req.body.transactionType,
      cryptoType: req.body.cryptoType,
      price: req.body.price,
      costPrice: req.body.costPrice,
      quantity: req.body.quantity,
      accepted: req.body.accepted,
      customerId,
      dealerId,
    });
    await insertTrans.save();
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
    const trans = await Transaction.findOneAndUpdate({ transactionId }, update);
    return res.send({ updated: trans });
  } catch (e) {
    return res.status(400).send(e);
  }
};

module.exports = { postTrans, getTrans, editTrans };
