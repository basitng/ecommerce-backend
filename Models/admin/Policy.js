const mongoose = require("mongoose");

const PolicySchema = mongoose.Schema(
  {
    content: { type: String },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Policy", PolicySchema);
