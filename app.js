var express = require("express");
const connect = require("./config/dbConfig");
var cookieParser = require("cookie-parser");
var logger = require("morgan");

const transactionRoutes = require("./routes/transaction");
const usersRouter = require("./routes/users");

var app = express();

connect();

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

/////  Routes   ///////

app.use("/transaction", transactionRoutes);
app.use("/users", usersRouter);

app.use((req, res) => {
  return res.status(500).send({ message: "Incorret API route hit" });
});

module.exports = app;
