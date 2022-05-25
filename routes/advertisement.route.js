const {
	getAdvert,
	advertLink,
} = require("../controller/advertisement.controller");
const advertisementRoute = require("express").Router();

advertisementRoute.get("/get-link", getAdvert);
advertisementRoute.post("/link", advertLink);

module.exports = advertisementRoute;
