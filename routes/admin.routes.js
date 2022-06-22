const adminRoute = require("express").Router();

const {
  setAdminMargin,
  getAdminData,
  getAdminMargin,
} = require("../controller/admin.controller");

adminRoute.post("/setMargin", setAdminMargin);

adminRoute.post("/getAdminData", getAdminData);

adminRoute.get("/getMargin", getAdminMargin);
module.exports = adminRoute;
