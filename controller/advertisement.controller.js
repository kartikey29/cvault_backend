const advertise = require("../models/advertisement.model");

// Get Request
exports.getAdvert = async (req, res) => {
  try {
    const fetchedData = await advertise.find({});
    return res.status(200).res.send(fetchedData);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Server Error " });
  }
};

// Post Request
exports.advertLink = async (req, res) => {
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
      return res.status(201).json({
        message: "Link Inserted Successfully",
        insertLink,
      });
    }
  } catch (error) {
    return res.status(500).json({ error });
  }
};
