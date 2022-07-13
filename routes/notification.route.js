const notificationRoute = require("express").Router();
const { addNotification } = require("../controller/notification.controller");

notificationRoute.post("/addNotification", addNotification);

module.exports = notificationRoute;
