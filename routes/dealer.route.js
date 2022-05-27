const {
  getDealer,
  createDealer,
  changeActive,
} = require("../controller/dealer.controller");
const dealerRoute = require("express").Router();

/* GET Dealers  */
dealerRoute.get("/getAllDealer", getDealer);

/* Create Dealers  */
dealerRoute.post("/createDealer", createDealer);

dealerRoute.post("/changeActive", changeActive);

module.exports = dealerRoute;
