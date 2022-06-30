const customerRoute = require("express").Router();
const authMiddleware = require("../middleware/middleware").verifyToken;
const {
  getAllCustomer,
  postCustomer,
  findCustomer,
  deleteCustomer,
} = require("../controller/customer.controller");

/* GET Customer  */
customerRoute.get("/getAllCustomer", getAllCustomer);

/* POST Customer  */
customerRoute.post("/create-customer", postCustomer);

customerRoute.get("/getCustomer", authMiddleware, findCustomer);

// customerRoute.delete("/deleteCustomer", deleteCustomer);

module.exports = customerRoute;
