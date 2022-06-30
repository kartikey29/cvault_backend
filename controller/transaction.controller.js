const Transaction = require("../models/transaction.model");
const User = require("../models/User.model");

const getPaginationOptions = require("../helperFunction/getTransPaginationOptions");

const postTrans = async (req, res) => {
  try {
    const { _id } = req.body; //sender id
    console.log(_id);
    const {
      receiversPhone,
      transactionType,
      cryptoType,
      price,
      costPrice,
      quantity,
      currency,
    } = req.body;

    const recieverData = await User.findOne({ phone: receiversPhone });
    if (!recieverData) {
      throw { message: "Reciever with this phone doesn't exist" };
    }

    const senderData = await User.findById(_id);
    if (!senderData) {
      throw { message: "Sender with this id doesnt exist" };
    }

    if (recieverData.userType === senderData.userType) {
      throw {
        message:
          "cannot create trans from dealer to dealer OR customer to customer",
      };
    }

    if (senderData.userType === "admin" || recieverData === "admin") {
      throw { message: "sender or reciever is admin" };
    }

    const dealerMargin =
      senderData.userType === "dealer"
        ? senderData.margin
        : recieverData.margin;

    const insertTrans = await new Transaction({
      transactionType,
      cryptoType,
      price,
      costPrice,
      quantity,
      receiver: recieverData._id,
      currency,
      sender: senderData._id,
      senderType: senderData.userType,
      dealerMargin,
    });
    await insertTrans.save();

    recieverData.transactions.push(insertTrans._id);
    senderData.transactions.push(insertTrans._id);

    await recieverData.save();
    await senderData.save();

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
    const { page } = req.query;
    const options = getPaginationOptions(page);

    const fetchTrans = await Transaction.paginate({ senderId: _id }, options);

    return res.status(200).send(fetchTrans);
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
    const { page } = req.query;
    const options = getPaginationOptions(page);
    const transactions = await Transaction.paginate({}, options);

    return res.status(200).send(transactions);
  } catch (e) {
    return res.status(400).send(e);
  }
};

const deleteTrans = async (req, res) => {
  try {
    const { transID } = req.body;

    const deletedTrans = await Transaction.findOneAndDelete({ _id: transID });

    const deletedTransId = deletedTrans._id.toString();

    const senderData = await User.findOne({ _id: deletedTrans.sender });
    const receiverData = await User.findOne({ _id: deletedTrans.receiver });

    senderData.transactions = await senderData.transactions.filter(
      (transID) => {
        return transID != deletedTransId;
      }
    );

    receiverData.transactions = await receiverData.transactions.filter(
      (transID) => {
        return transID != deletedTransId;
      }
    );

    await senderData.save();

    await receiverData.save();

    return res.status(200).send(deletedTrans);
  } catch (e) {
    return res.status(400).send(e);
  }
};

const changeTransactionStatus = async (req, res) => {
  try {
    const { _id, status, transID } = req.body;

    const userData = await User.findById(_id);

    const transData = await Transaction.findById(transID);

    const tranSender = transData.senderType;
    const userType = userData.userType;

    if (userType === "customer") {
      throw { message: "customer cannot change trans status" };
    }

    if (tranSender === "dealer" && userType === "dealer") {
      throw {
        message: "dealer cannot edit transactions with senderType dealer",
      };
    }
    transData.status = status;

    await transData.save();

    return res.status(200).send({ message: "updated status", transData });
  } catch (e) {
    return res.status(400).send(e);
  }
};

module.exports = {
  postTrans,
  getTrans,
  getAllTransaction,
  deleteTrans,
  changeTransactionStatus,
};
