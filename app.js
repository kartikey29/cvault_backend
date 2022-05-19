const app = require("express")();
<<<<<<< HEAD
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
=======

// Environment Path
require("dotenv").config({ path: "./config.env" });
require("./db/connection");
port = process.env.PORT;

// importing Routes
const dealerRoute = require("./routes/dealer.route");
const transactionRoute = require("./routes/transaction.route");

// Middleware
const bodyParser = require("body-parser");
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

<<<<<<< HEAD
<<<<<<< HEAD
>>>>>>> 8a4c061 (Jish First Commit)
=======
>>>>>>> 15c5032 (fixed server)
app.use(logger("dev"));
app.use(bodyParser.urlencoded({ extended: false }));

// Routes
app.use("/dealer", dealerRoute);
app.use("/transaction", transactionRoute);
app.use("/advertisement", advertisementRoute);

//handle incorrect req

app.use((req, res) => {
<<<<<<< HEAD
	return res.status(500).send({ message: "incorrect API route hit" });
=======
	return res.status(500).send({ message: "Incorret API route hit" });
>>>>>>> 15c5032 (fixed server)
});

module.exports = app;
