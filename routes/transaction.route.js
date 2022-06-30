var express = require("express");
const authMiddleware = require("../middleware/middleware").verifyToken;

var transactionRoute = express.Router();
const {
  postTrans,
  getTrans,
  // editTrans,
  getAllTransaction,
  deleteTrans,
  changeTransactionStatus,
} = require("../controller/transaction.controller");

/* POST Transaction page. */
transactionRoute.post("/post-transaction", authMiddleware, postTrans);

/* GET Transaction page. */
transactionRoute.get("/get-transaction", authMiddleware, getTrans);

// transactionRoute.post("/edit-trans", editTrans);

transactionRoute.get("/getAllTransaction", getAllTransaction);

transactionRoute.delete("/deleteTrans", deleteTrans);

transactionRoute.patch(
  "/changeStatus",
  authMiddleware,
  changeTransactionStatus
);

module.exports = transactionRoute;
