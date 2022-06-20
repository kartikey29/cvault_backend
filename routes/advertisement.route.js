const {
  getAdvert,
  advertLink,
  deleteAdvert,
} = require("../controller/advertisement.controller");
const advertisementRoute = require("express").Router();

/* GET Advertisement  */
advertisementRoute.get("/get-link", getAdvert);

/* Create advertisement  */
advertisementRoute.post("/post-link", advertLink);

advertisementRoute.delete("/delete-ad", deleteAdvert);

module.exports = advertisementRoute;
