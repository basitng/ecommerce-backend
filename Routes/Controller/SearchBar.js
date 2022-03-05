const Product = require("../../Models/Product");

module.exports.queryDB = async (req, res) => {
  const query = req.params.id;
  try {
    const docs = await Product.find();
    const data = docs.filter((x) => x.name.toLowerCase().includes(query));
    res.status(200).json(data);
  } catch (error) {
    res.status(400).json(error);
  }
};
