const mongoose = require("mongoose");

// creating Database Connection
mongoose.connect(process.env.DATABASE, async () => {
	try {
		console.log("Database is Connected succesfully");
	} catch (error) {
		console.log(error);
	}
});
