const controller = require("../controller/dealer.controller");
const route = require("express").Router();

/* GET Dealers  */
route.get("/get-dealer", controller.getDealer);

/* Create Dealers  */
route.post("/create-dealer", controller.createDealer);

module.exports = route;
