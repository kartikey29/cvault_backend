const controller = require("../controller/advertisement.controller");
const route = require("express").Router();

route.post("/link", controller.advertLink);
route.post("/get-link", controller.getAdvert);

module.exports = route;
