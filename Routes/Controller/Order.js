const Order = require("../../Models/Order");

module.exports.order = async (req, res) => {
  try {
    const data = await Order.find().sort("date");
    res.status(200).json(data);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports.findOrder = async (req, res) => {
  try {
    const orders = await Order.find({ userID: req.params.id });
    const pending = await Order.find({ userID: req.params.id, status: false });
    const delivered = await Order.find({ userID: req.params.id, status: true });

    res.status(200).json({
      orders: orders.length,
      ordersRaw: orders,
      pending: pending.length,
      delivered: delivered.length,
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
module.exports.findOneOnly = async (req, res) => {
  try {
    const data = await Order.findOne({ _id: req.params.id });
    res.status(200).json(data);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
module.exports.createOrder = async (req, res) => {
  const { userID, productId, shipping, address, junction, phone, amt, status } =
    req.body;
  try {
    const data = await Order.create({
      userID,
      productId,
      amt,
      address,
      junction,
      phone,
      status,
      shipping,
    });
    res.status(200).json(data);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
module.exports.updateOrder = async (req, res) => {
  try {
    const data = await Order.findByIdAndUpdate(
      req.params.id,
      {
        status: req.body.status,
      },
      { new: true }
    );
    res.status(200).json(data);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
module.exports.deleteOrder = async (req, res) => {
  try {
    const data = await Order.findByIdAndDelete(req.params.id);
    res.status(200).json("Order Deleted");
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
