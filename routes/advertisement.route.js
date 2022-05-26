const {
	getAdvert,
	advertLink,
} = require("../controller/advertisement.controller");
const advertisementRoute = require("express").Router();

/* GET Advertisement  */
advertisementRoute.get("/get-link", getAdvert);

/* Create advertisement  */
advertisementRoute.post("/link", advertLink);

module.exports = advertisementRoute;
