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

// Routes
app.use("/dealer", dealerRoute);
app.use("/transaction", transactionRoute);

// lIstening Server
app.listen(port, () => {
  console.log(`Server is starting on port ${port}`);
});
