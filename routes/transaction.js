var express = require("express");
var router = express.Router();
const transaction = require("../controller/transaction");

/* GET home page. */
router.get("/test", transaction.test);
module.exports = router;
