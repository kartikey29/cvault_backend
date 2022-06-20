const advertise = require("../models/advertisement.model");

// Get Request
exports.getAdvert = async (req, res) => {
	try {
		const fetchedData = await advertise.find({});
		return res.status(200).send(fetchedData);
	} catch (error) {
		console.log(error);
		return res.status(500).json({ message: "Server Error " });
	}
};

// Post Request
exports.advertLink = async (req, res) => {
	try {
		const bodyData = req.body.link; // put anything here later
		const findLink = await advertise.find({});

		// If found Deleting The link data
		console.log(findLink.length);
		if (findLink.length != 0) {
			await advertise.deleteMany({});
		}
		// if Not Found inserting the link Data
		const insertLink = await advertise({
			link: bodyData,
		});
		await insertLink.save();
		return res.status(201).json({
			message: "Link Inserted Successfully",
			insertLink,
		});
	} catch (error) {
		return res.status(500).json({ error });
	}
};
