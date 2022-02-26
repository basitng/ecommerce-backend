const mongoose = require("mongoose");
const moment = require("moment");

const OrderSchema = mongoose.Schema(
  {
    userID: mongoose.SchemaTypes.ObjectId,
    productId: [mongoose.SchemaTypes.ObjectId],
    junction: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      required: true,
    },
    amt: {
      type: String,
      required: true,
    },
    status: { type: Boolean, default: false },
    date: { type: String, default: () => moment().format("dddd") },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Order", OrderSchema);
