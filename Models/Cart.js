const mongoose = require("mongoose");

const CartSchema = mongoose.Schema(
  {
    productId: { type: mongoose.SchemaTypes.ObjectId, required: true },
    quantity: Number,
  },
  { timestamps: true }
);

module.exports = mongoose.model("Cart", CartSchema);
