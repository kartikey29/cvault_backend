const authMiddleware = require("../middleware/middleware").verifyToken;

const {
  getAllDealer,
  createDealer,
  changeActive,
  findDealer,
  getDealerCustomer,
  setDealerMargin,
  getDealerMargin,
} = require("../controller/dealer.controller");
const dealerRoute = require("express").Router();

/* GET Dealers  */
dealerRoute.get("/getAllDealer", getAllDealer);

/* Create Dealers  */
dealerRoute.post("/createDealer", createDealer);

dealerRoute.post("/changeActive", changeActive);

dealerRoute.get("/getDealer", authMiddleware, findDealer);

dealerRoute.get("/getDealerCustomer", authMiddleware, getDealerCustomer);

dealerRoute.post("/setDealerMargin", authMiddleware, setDealerMargin);

dealerRoute.post("/getDealerMargin", getDealerMargin);
module.exports = dealerRoute;
