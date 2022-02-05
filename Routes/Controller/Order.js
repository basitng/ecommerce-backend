const Order = require("../../Models/Order");

module.exports.order = async (req, res) => {
  try {
    const data = await Order.find();
    res.status(200).json({ data });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
module.exports.createOrder = async (req, res) => {
  const { userID, product_id, status, total } = req.body;
  try {
    const data = await Order.create({
      userID,
      product_id,
      status,
      total,
    });
    res.status(200).json({ data });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
module.exports.updateOrder = async (req, res) => {
  try {
    const data = await Order.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      { new: true }
    );
    res.status(200).json({ data });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
module.exports.deleteOrder = async (req, res) => {
  try {
    const data = await Order.findByIdAndDelete(req.params.id);
    res.status(200).json({ data: "Order Deleted" });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
