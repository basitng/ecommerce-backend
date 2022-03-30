const { cloudinary } = require("../../cloud");
const Product = require("../../Models/Product");

module.exports.product = async (req, res) => {
  const { name, desc, price, category, brand, discount } = req.body;

  try {
    res.setHeader("Content-Type", "multipart/form-data");
    const files = req.files;
    const frontPic = files[0].path;
    const backPic = files[1].path;
    const otherPic = files[2].path;

    const data = await Product.create({
      name,
      desc,
      category,
      price,
      brand,
      discount,
      frontPic,
      backPic,
      otherPic,
    });

    res.status(200).json(data);
  } catch (error) {
    console.log(error);
    res.status(400).json("SERVER ERROR GUY. THIS IS FROM DB", error);
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
    res.status(200).json(data);
  } catch (error) {
    res.status(400).json(error);
  }
};
module.exports.getProduct = async (req, res) => {
  try {
    const data = await Product.find();
    res.status(200).json(data);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
module.exports.getProductForMe = async (req, res) => {
  const { ids } = req.body;
  try {
    const Data = await Product.find().where("_id").in(ids).exec();

    res.status(200).json(Data);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
module.exports.deleteProduct = async (req, res) => {
  try {
    const data = await Product.findByIdAndDelete(req.params.id);
    res.status(200).json(data);
  } catch (error) {
    res.status(400).json("Product not deleted");
  }
};
