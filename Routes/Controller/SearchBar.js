const Product = require("../../Models/Product");

module.exports.queryDB = async (req, res) => {
  const query = req.params.id;
  try {
    const data = await Product.find();
    data.forEach((docs) => {
      if (docs.name.indexOf(query, -1)) {
        res.status(200).json(data);
      } else {
        res.status(201).json({ message: "OOPS NO SUCH DATA" });
      }
    });
  } catch (error) {
    res.status(400).json(error);
  }
};
