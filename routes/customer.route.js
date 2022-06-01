const {
  getCustomer,
  postCustomer,
  findCustomer,
} = require("../controller/customer.controller");
const customerRoute = require("express").Router();

/* GET Customer  */
customerRoute.get("/getAllCustomer", getCustomer);

/* POST Customer  */
customerRoute.post("/create-customer", postCustomer);

customerRoute.post("/getCustomer", findCustomer);

module.exports = customerRoute;
