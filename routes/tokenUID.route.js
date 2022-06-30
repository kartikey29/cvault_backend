const uidRoute = require("express").Router();
const {
  verifyUID,
  deleteToken,
} = require("../controller/token UID .controller");

//  Token when SiognIN
uidRoute.post("/token-login", verifyUID);

// Remove token when LOGout
uidRoute.post("/token-logout", deleteToken);

module.exports = uidRoute;
