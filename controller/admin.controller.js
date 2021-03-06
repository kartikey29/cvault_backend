const User = require("../models/User.model");

exports.getAdminData = async (req, res) => {
  try {
    const { _id } = req.body;
    const adminData = await User.findOne({ _id, userType: "admin" }).populate([
      {
        path: "transactions",
        populate: [
          { path: "receiver", select: "firstName middleName lastName" },
          { path: "sender", select: "firstName middleName lastName" },
        ],
      },
      { path: "notifications", options: { sort: { createdAt: -1 } } },
    ]);

    if (!adminData) {
      throw { message: "admin doesnt exist" };
    }
    return res.status(200).send({ adminData });
  } catch (e) {
    return res.status(400).send(e);
  }
};

exports.setAdminMargin = async (req, res) => {
  try {
    const { _id, margin } = req.body;

    const adminData = await User.findOne({ _id, userType: "admin" });

    if (!adminData) {
      throw { message: "admin doesnt exist" };
    }

    adminData.margin = margin;

    await adminData.save();

    return res.send(adminData);
  } catch (e) {
    return res.status(400).send(e);
  }
};

exports.getAdminMargin = async (req, res) => {
  try {
    const adminData = await User.findOne({ userType: "admin" });
    if (!adminData) {
      throw { message: "admin doesnt exist" };
    }
    return res.send({ margin: adminData.margin });
  } catch (e) {
    return res.status(400).send(e);
  }
};
