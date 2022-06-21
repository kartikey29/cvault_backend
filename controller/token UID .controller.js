const User = require("../models/User.model");
const { JWTKEY } = process.env;
const jwt = require("jsonwebtoken");

/*==== Get Token  ====*/

const verifyUID = async (req, res, next) => {
	try {
		const UID = req.body; // frontEnd
		const check = await User.findOne({ UID: UID });
		if (!check) {
			return res.status(404).json({
				success: false,
				error: "User Not Found",
				data: [],
			});
		} else {
			const _id = check._id;
			const token = jwt.sign({ _id: _id }, JWTKEY, { expiresIn: "1h" });
			return res.status(200).json({
				success: true,
				message: "Generated Token",
				data: [token],
			});
		}
	} catch (error) {
		return res.status(504).json({ error: "Server is not responding " });
	}
};

module.exports = verifyUID;
