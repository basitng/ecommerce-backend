const moment = require("moment");
const mongoose = require("mongoose");

const SaleSchema = mongoose.Schema(
  {
    total_sold_today: Number,
    total_sold_this_month: Number,
    date: { type: String, default: () => moment().format("dddd") },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Sale", SaleSchema);
