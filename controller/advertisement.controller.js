const advertise = require("../models/advertisement.model");

// Get Request
exports.getAdvert = async (req, res) => {
  try {
    const fetchedData = await advertise.find({});
    if (fetchedData.length == 0 || fetchedData == null) {
      return res.status(404).send({ message: "No Data Found" });
    } else {
      return res.status(200).send(fetchedData);
    }
  } catch (error) {
    return res.status(500).json({
      success: false,
      error: error.message,
      message: "Server is not Responding"
    });
  }
};

// Post Request
exports.advertLink = async (req, res) => {
  try {
    const bodyData = req.body.link; // put anything here later
    if (!bodyData) {
      return res.status(400).send({ message: "Link is required" });
    }

    const findLink = await advertise.find({});

    // If found Deleting The link data
    // console.log(findLink.length);
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
    return res.status(500).json({ success: false, error: error.message, message: "Server is not Responding" });
  }
};

exports.deleteAdvert = async (req, res) => {
  try {
    await advertise.deleteMany({});
    return res.status(200).send({ message: "Ad removed Successfully" });
  } catch (e) {
    return res.status(500).send(e);
  }
};
