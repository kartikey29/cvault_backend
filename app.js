const app = require("express")();

// Environment Path
require("dotenv").config({ path: "./config.env" });
require("./db/connection");
port = process.env.PORT;

// importing Routes
const dealerRoute = require("./routes/dealer.route");
const transactionRoute = require("./routes/transaction.route");
const advertisementRoute = require("./routes/advertisement.route");
const customerRoute = require("./routes/customer.route");
const uidRoute = require("./routes/tokenUID.route");
const adminRoute = require("./routes/admin.routes");

// Middleware
const bodyParser = require("body-parser");
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

//routes

app.use("/transaction", transactionRoute);
app.use("/advertisment", advertisementRoute);
app.use("/dealer", dealerRoute);
app.use("/customer", customerRoute);
app.use("/token", uidRoute);
app.use("/admin", adminRoute);

//handle incorrect req

app.use((req, res) => {
  return res.status(500).send({ message: "incorrect API route hit" });
});

module.exports = app;
