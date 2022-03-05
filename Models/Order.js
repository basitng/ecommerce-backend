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
      type: Number,
      required: true,
    },
    shipping: {
      type: Number,
      required: true,
    },
    status: { type: Boolean, default: false },
    month: { type: String, default: () => moment().format("MMMM") },
    day: { type: String, default: () => moment().isoWeekday() },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Order", OrderSchema);
