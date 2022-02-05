const Product = require("../../Models/Product");

module.exports.product = async (req, res) => {
  const {
    name,
    desc,
    quantity,
    price,
    rating,
    category,
    review,
    brand,
    image,
    other_images,
  } = req.body;

  try {
    const data = await Product.create({
      name,
      desc,
      quantity,
      price,
      rating,
      category,
      review,
      brand,
      image,
      other_images,
    });
    res.status(200).json({ data });
  } catch (error) {
    res.status(400).json(error);
  }
};

module.exports.updateProduct = async (req, res) => {
  try {
    const id = req.params.id;

    const data = await Product.findByIdAndUpdate(
      id,
      { $set: req.body },
      { new: true }
    );
    res.status(200).json({ data });
  } catch (error) {
    res.status(400).json(error);
  }
};
module.exports.getProduct = async (req, res) => {
  try {
    const data = await Product.find();

    res.status(200).json({ data });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
module.exports.deleteProduct = async (req, res) => {
  try {
    const data = await Product.findByIdAndDelete(req.params.id);
    res.status(200).json({ data });
  } catch (error) {
    res.status(400).json("Product not deleted");
  }
};
