const app = require("express")();

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

// Routes
app.use("/", route);
app.use("/get-dealer", dealerRoute);
app.use("/create-dealer", dealerRoute);

// lIstening Server
app.listen(port, () => {
  console.log(`Server is starting on port ${port}`);
});
