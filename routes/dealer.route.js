const {
  getDealer,
  createDealer,
  changeActive,
  findDealer,
} = require("../controller/dealer.controller");
const dealerRoute = require("express").Router();

/* GET Dealers  */
dealerRoute.get("/getAllDealer", getDealer);

/* Create Dealers  */
dealerRoute.post("/createDealer", createDealer);

dealerRoute.post("/changeActive", changeActive);

dealerRoute.post("/getDealer", findDealer);

module.exports = dealerRoute;
