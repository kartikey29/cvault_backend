const User = require("../models/User.model");
const { JWTKEY } = process.env;
const jwt = require("jsonwebtoken");

/*==== Get Token  ====*/

const verifyUID = async (req, res, next) => {
  try {
    const { UID } = req.body; // frontEnd
    const check = await User.findOne({ UID: UID });
    if (!check) {
      return res.status(404).json({
        success: false,
        error: "User Not Found",
        data: [],
      });
    } else {
      const _id = check._id;
      const token = jwt.sign({ _id: _id }, JWTKEY);
      await User.findOneAndUpdate({ _id }, { $set: { token } });
      return res.status(200).json({
        success: true,
        message: "Generated Token",
        data: [{ UserId: _id, token: token, userName: check.email }],
      });
    }
  } catch (error) {
    return res.status(504).json(error);
  }
};

/*==== Delete token when Logout  ====*/

const deleteToken = async (req, res, next) => {
  try {
    const { UID } = req.body; // from Frontend
    const check = await User.findOne({ UID });
    if (!check) {
      return res.status(404).json({
        success: false,
        error: "User not Found",
        data: [],
      });
    } else {
      await User.findOne(
        { _id: check._id },
        {
          $set: {
            token: "",
          },
        }
      );
      return res.status(200).json({
        success: true,
        message: "User Successfully Logout",
        data: null,
      });
    }
  } catch (error) {
    return res.status(500).json({ error: "Server is not responding " });
  }
};

module.exports = { deleteToken, verifyUID };
