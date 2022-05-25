var express = require("express");
var transactionRoute = express.Router();
const { postTrans, getTrans } = require("../controller/transaction.controller");

/* POST Transaction page. */
transactionRoute.post("/transaction", postTrans);

/* GET Transaction page. */
transactionRoute.get("/get-transaction", getTrans);

module.exports = transactionRoute;
