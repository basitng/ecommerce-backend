const Phone = require("../../../Models/admin/Phone");

module.exports.Phone = async (req, res) => {
  try {
    const data = await Phone.find().sort({ _id: -1 }).limit(1);
    res.status(200).json({ data });
  } catch (error) {
    res.status(400).json(error.message);
  }
};

module.exports.createPhone = async (req, res) => {
  try {
    const data = await Phone.create({
      phone: req.body.phone,
    });
    res.status(200).json({ data });
  } catch (error) {
    res.status(400).json(error.message);
  }
};
