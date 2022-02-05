const mongoose = require("mongoose");

const PhoneSchema = mongoose.Schema(
  {
    phone: { type: String },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Phone", PhoneSchema);
