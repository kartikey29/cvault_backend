const advertise = require("../models/advertisement.model");

// Get Request
const getAdvert = async (req, res) => {
	try {
		const fetchedData = await advertise.find({});
		res.status(200).res.send(fetchedData);
	} catch (error) {
		console.log(error);
		res.status(500).json({ message: "Server Error " });
	}
};

// Post Request
const advertLink = async (req, res) => {
	try {
		const bodyData = req.body.link; // put anything here later
		const findLink = await advertise.find({ link });
		// If found Deleting The link data
		if (findLink == bodyData) {
			await advertise.deleteMany({});
		} else {
			// if Not Found inserting the link Data
			const insertLink = await advertise({
				link: bodyData.link,
			});
			await insertLink.save();
			res.status(201).json({
				message: "Link Inserted Successfully",
			});
		}
	} catch (error) {
		console.log(error);
		res.status(500).json({ message: "Server Error " });
	}
};

module.exports = { advertLink, getAdvert };
