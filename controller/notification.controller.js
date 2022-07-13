const Notification = require("../models/notification.model");
const User = require("../models/User.model");

const addNotification = async (req, res) => {
  try {
    const { UID, title, body } = req.body;
    if (!UID) {
      throw { message: "UID of notification reciever required" };
    }

    const userData = await User.findOne({ UID });

    if (!userData) {
      throw { message: "User with UID doesn't exist" };
    }

    const newNotification = new Notification({
      title,
      body,
    });

    await newNotification.save();

    userData.notifications.push(newNotification._id);

    userData.save();

    return res.send({
      message: "Notification added successfully",
      newNotification,
    });
  } catch (e) {
    return res.status(504).send(e);
  }
};

module.exports = { addNotification };
