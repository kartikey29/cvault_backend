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
const route = require("./routes/home.route");
const dealerRoute = require("./routes/dealer.route");

// Middleware
const bodyParser = require("body-parser");
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

<<<<<<< HEAD
>>>>>>> 8a4c061 (Jish First Commit)
app.use(logger("dev"));
app.use(bodyParser.urlencoded({ extended: false }));

// Routes
app.use("/dealer", dealerRoute);
app.use("/transaction", transactionRoute);
app.use("/advertisement", advertisementRoute);

//handle incorrect req

app.use((req, res) => {
	return res.status(500).send({ message: "incorrect API route hit" });
});

module.exports = app;
=======
// Routes
app.use("/", route);
app.use("/get-dealer", dealerRoute);
app.use("/create-dealer", dealerRoute);

// lIstening Server
app.listen(port, () => {
	console.log(`Server is starting on port ${port}`);
});
>>>>>>> 782e211 (Jish First Commit)
