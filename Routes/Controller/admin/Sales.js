const Sales = require("../../../Models/admin/Sales");

module.exports.sales = async (req, res) => {
  try {
    const data = await Sales.find();
    res.status(200).json({ data });
  } catch (error) {
    res.status(400).json(error.message);
  }
};

module.exports.createSale = async (req, res) => {
  const { total_sold_today, total_sold_this_month } = req.body;

  try {
    const data = await Sales.create({
      total_sold_today,
      total_sold_this_month,
    });
    res.status(200).json({ data });
  } catch (error) {
    res.status(400).json(error.message);
  }
};

module.exports.updateSale = async (req, res) => {
  try {
    const data = await Sales.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      { new: true }
    );
    res.status(200).json({ data });
  } catch (error) {
    res.status(400).json(error.message);
  }
};
