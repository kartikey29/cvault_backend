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

<<<<<<< HEAD
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
=======
// Routes
app.use("/dealer", dealerRoute);
app.use("/transaction", transactionRoute);

// lIstening Server
app.listen(port, () => {
	console.log(`Server is starting on port ${port}`);
});
>>>>>>> 782e211 (Jish First Commit)
