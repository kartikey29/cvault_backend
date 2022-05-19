const app = require("express")();

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
