const Product = require("../../Models/Product");

module.exports.findProduct = async (req, res) => {
  try {
    const data = await Product.findById(req.params.id);

    res.status(200).json(data);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
