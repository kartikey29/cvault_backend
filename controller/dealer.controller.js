// Dealer Module
const Dealer = require("../models/dealer.model");

// Dealer Post Request
exports.createDealer = async (req, res) => {
  try {
    const data = req.body; /// put something later
    const InsertDealer = await new Dealer({
      dealerId: data.dealerId,
      name: data.name,
      phone: data.phone,
      email: data.email,
    });
    await InsertDealer.save();
    return res
      .status(200)
      .json({ message: "Data Inserted Successfully", InsertDealer });
  } catch (error) {
    console.log(error);
    return res.status(400).send({
      error,
    });
  }
};

//Dealer Get Request
exports.getDealer = async (req, res) => {
  try {
    const readData = await Dealer.find({}).populate("transactions");
    return res.status(200).send(readData);
  } catch (error) {
    return res.status(400).json({
      error,
    });
  }
};

exports.changeActive = async (req, res) => {
  try {
    const { dealerId } = req.body;
    const dealer = await Dealer.findOne({ dealerId });
    if (!dealer) {
      throw "dealer doesnt exist";
    }
    dealer.active = !dealer.active;
    await dealer.save();
    return res.status(200).send(dealer);
  } catch (e) {
    return res.status(400).send(e);
  }
};
