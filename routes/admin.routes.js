const adminRoute = require("express").Router();
const authMiddleWare = require("../middleware/middleware").verifyToken;

const {
  setAdminMargin,
  getAdminData,
  getAdminMargin,
} = require("../controller/admin.controller");

adminRoute.post("/setMargin", authMiddleWare, setAdminMargin);

adminRoute.get("/getAdminData", authMiddleWare, getAdminData);

adminRoute.get("/getMargin", getAdminMargin);
module.exports = adminRoute;
