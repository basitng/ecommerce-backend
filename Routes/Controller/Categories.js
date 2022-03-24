const Product = require("../../Models/Product");

module.exports.categories = async (req, res) => {
  const allProduct = await Product.find();
  const screen_cover = await Product.find({ category: "screen_cover" });
  const screen_guard = await Product.find({ category: "screen_guard" });
  const laptops = await Product.find({ category: "laptops" });
  const apple_watch = await Product.find({ category: "apple_watch" });
  const air_pods = await Product.find({ category: "air_pods" });
  const power_bank = await Product.find({ category: "power_bank" });
  const chargers = await Product.find({ category: "chargers" });
  const Accessories = await Product.find({ category: "Accessories" });
  const MobilePhone = await Product.find({ category: "MobilePhone" });

  res.status(200).json({
    allProduct,
    screen_cover,
    screen_guard,
    laptops,
    apple_watch,
    air_pods,
    power_bank,
    chargers,
    Accessories,
    MobilePhone,
  });
};
