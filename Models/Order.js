const mongoose = require("mongoose");

const OrderSchema = mongoose.Schema(
  {
    userID: mongoose.SchemaTypes.ObjectId,
    product_id: [mongoose.SchemaTypes.ObjectId],
    total: { type: Array },
    status: { type: Boolean, default: false },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Order", OrderSchema);
