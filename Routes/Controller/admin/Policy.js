const Policy = require("../../../Models/admin/Policy");

module.exports.policy = async (req, res) => {
  try {
    const data = await Policy.find().sort({ _id: -1 }).limit(1);
    res.status(200).json({ data });
  } catch (error) {
    res.status(400).json(error.message);
  }
};

module.exports.createPolicy = async (req, res) => {
  try {
    const data = await Policy.create({
      content: req.body.content,
    });
    res.status(200).json({ data });
  } catch (error) {
    res.status(400).json(error.message);
  }
};
