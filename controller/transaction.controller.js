const Transaction = require("../models/transaction.model");

const postTrans = async (req, res) => {
  try {
    console.log(req.body);
    const insertTrans = await new Transaction({
      transctionId: req.body.transctionId,
      transactionType: req.body.transactionType,
      cryptoType: req.body.cryptoType,
      price: req.body.price,
      costPrice: req.body.costPrice,
      quantity: req.body.quantity,
      accepted: req.body.accepted,
    });
    await insertTrans.save();
    return res
      .status(201)
      .json({ message: "Data inserted Successfully", data: insertTrans });
  } catch (error) {
    console.log(error);
    res.status(400).json({ error: "Something went wrong" });
  }
};
const getTrans = async (req, res) => {
  try {
    const fetchTrans = await Transaction.find({});
    res.status(200).send(fetchTrans);
  } catch (error) {
    console.log(error);
    res.status(400).json({ error: "Something went wrong" });
  }
};

module.exports = { postTrans, getTrans };
