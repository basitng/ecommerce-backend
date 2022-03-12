const Order = require("../../../Models/Order");
const Product = require("../../../Models/Product");
const User = require("../../../Models/User");
module.exports.all = async (req, res) => {
  try {
    const users = await User.find();
    const orders = await Order.find();
    const products = await Product.find();
    const sales = orders ? orders.reduce((a, b) => a.amt + b.amt) : "";
    res.status(200).json({
      sales: sales,
      usersRaw: users,
      totalUsers: users.length,
      ordersRaw: orders,
      totalOrders: orders.length,
      productsRaw: products,
      totalProducts: products.length,
    });
  } catch (error) {
    res.status(400).json(error);
  }
};
