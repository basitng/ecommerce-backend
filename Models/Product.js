const mongoose = require("mongoose");

const ProductSchema = mongoose.Schema(
  {
    name: { type: String, required: true },
    desc: { type: String, required: true },
    quantity: { type: Number, default: 1 },
    price: { type: Number, min: 0 },
    rating: { type: Number, required: true },
    category: [],
    review: [],
    brand: { type: String },
    image: { type: String, required: true },
    other_images: { type: String, required: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Product", ProductSchema);
