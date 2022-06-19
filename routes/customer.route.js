const {
  getCustomer,
  postCustomer,
  findCustomer,
  deleteCustomer,
} = require("../controller/customer.controller");
const customerRoute = require("express").Router();

/* GET Customer  */
customerRoute.get("/getAllCustomer", getCustomer);

/* POST Customer  */
customerRoute.post("/create-customer", postCustomer);

customerRoute.post("/getCustomer", findCustomer);

customerRoute.delete("/deleteCustomer", deleteCustomer);

module.exports = customerRoute;
