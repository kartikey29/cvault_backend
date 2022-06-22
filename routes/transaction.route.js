var express = require("express");
var transactionRoute = express.Router();
const {
  postTrans,
  getTrans,
  // editTrans,
  getAllTransaction,
  deleteTrans,
} = require("../controller/transaction.controller");

/* POST Transaction page. */
transactionRoute.post("/post-transaction", postTrans);

/* GET Transaction page. */
transactionRoute.post("/get-transaction", getTrans);

// transactionRoute.post("/edit-trans", editTrans);

transactionRoute.get("/getAllTransaction", getAllTransaction);

transactionRoute.delete("/deleteTrans", deleteTrans);

module.exports = transactionRoute;
