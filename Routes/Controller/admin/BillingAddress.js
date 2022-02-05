const BillingAdress = require("../../../Models/admin/BillingAdress");

module.exports.bill = async (req, res) => {
  try {
    const data = await BillingAdress.find().sort({ _id: -1 }).limit(1);
    res.status(200).json({ data });
  } catch (error) {
    res.status(400).json(error.message);
  }
};

module.exports.createBill = async (req, res) => {
  try {
    const data = await BillingAdress.create({
      address: req.body.address,
    });
    res.status(200).json({ data });
  } catch (error) {
    res.status(400).json(error.message);
  }
};
