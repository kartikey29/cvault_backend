const route = require("express").Router();

/* GET home page. */
route.get("/", function (req, res) {
	res.send("roinfo");
});

module.exports = route;
