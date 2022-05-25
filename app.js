const app = require("express")();
const logger = require("morgan");
// Environment Path
require("dotenv").config({ path: "./config.env" });
require("./db/connection");
port = process.env.PORT;

// importing Routes
const dealerRoute = require("./routes/dealer.route");
const transactionRoute = require("./routes/transaction.route");
const advertisementRoute = require("./routes/advertisement.route");

// Middleware
const bodyParser = require("body-parser");
app.use(bodyParser.json());
app.use(logger("dev"));
app.use(bodyParser.urlencoded({ extended: false }));

//

app.use("/api", advertisementRoute, transactionRoute, dealerRoute);

//handle incorrect req

app.use((req, res) => {
  return res.status(500).send({ message: "incorrect API route hit" });
});

module.exports = app;
