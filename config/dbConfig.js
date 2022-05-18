const mongoose = require("mongoose");

const connect = () => {
  mongoose
    .connect(
      "mongodb+srv://kartikey-admin:kartikey@blog.dbo4a.mongodb.net/Cvault?retryWrites=true&w=majority",
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      }
    )
    .then(() => {
      console.log("Database Connected :)");
    })
    .catch((err) => {
      console.log(err);
    });
};

module.exports = connect;
