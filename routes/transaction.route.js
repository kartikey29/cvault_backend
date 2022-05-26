var express = require("express");
var transactionRoute = express.Router();
const {
  postTrans,
  getTrans,
  editTrans,
} = require("../controller/transaction.controller");

/* POST Transaction page. */
transactionRoute.post("/post-transaction", postTrans);

/* GET Transaction page. */
transactionRoute.get("/get-transaction", getTrans);

transactionRoute.post("edit-trans", editTrans);

module.exports = transactionRoute;
