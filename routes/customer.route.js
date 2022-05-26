const {
	getCustomer,
	postCustomer,
} = require("../controller/customer.controller");
const customerRoute = require("express").Router();

/* GET Customer  */
customerRoute.get("/get-customer", getCustomer);

/* POST Customer  */
customerRoute.post("/create-customer", postCustomer);

module.exports = customerRoute;
