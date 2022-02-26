const mongoose = require("mongoose");
const moment = require("moment");
const ProductSchema = mongoose.Schema(
  {
    name: { type: String, required: true },
    desc: { type: String, required: true },
    frontPic: { type: String, require: true },
    backPic: { type: String, require: true },
    otherPic: { type: String },
    price: { type: Number, min: 0, require: true },
    discount: { type: Number, default: 0 },
    quantity: { type: Number, default: 1 },
    rating: { type: Number, default: 0 },
    review: [],
    brand: { type: String },
    date: { type: String, default: () => moment().format("dddd") },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Product", ProductSchema);
