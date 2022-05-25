const { getDealer, createDealer } = require("../controller/dealer.controller");
const dealerRoute = require("express").Router();

/* GET Dealers  */
dealerRoute.get("/get-dealer", getDealer);

/* Create Dealers  */
dealerRoute.post("/create-dealer", createDealer);

module.exports = dealerRoute;
