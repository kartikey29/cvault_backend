const customerRoute = require("express").Router();
const {
	getCustomer,
	postCustomer,
	findCustomer,
	deleteCustomer,
} = require("../controller/customer.controller");

/* GET Customer  */
customerRoute.get("/getAllCustomer", getCustomer);

/* POST Customer  */
customerRoute.post("/create-customer", postCustomer);

// customerRoute.post("/getCustomer", findCustomer);

// customerRoute.delete("/deleteCustomer", deleteCustomer);

module.exports = customerRoute;
