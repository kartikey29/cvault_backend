const {
	getCustomer,
	postCustomer,
} = require("../controller/customer.controller");
const customerRoute = require("express").Router();

/* GET Customer  */
customerRoute = ("/", getCustomer);

/* POST Customer  */
customerRoute = ("/", postCustomer);

module.exports = customerRoute;
