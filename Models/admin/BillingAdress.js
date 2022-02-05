const mongoose = require("mongoose");

const BillingAddressSchema = mongoose.Schema(
  {
    address: { type: String },
  },
  { timestamps: true }
);

module.exports = mongoose.model("BillingAddress", BillingAddressSchema);
