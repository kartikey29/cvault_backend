const uidRoute = require("express").Router();
const verifyUID = require("../controller/token UID .controller");

// get Token
uidRoute.get("/token", verifyUID);

module.exports = uidRoute;
