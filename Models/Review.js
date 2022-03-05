const mongoose = require("mongoose");
const moment = require("moment");

const ReviewSchema = mongoose.Schema({
  productId: mongoose.SchemaTypes.ObjectId,
  user: {
    type: String,
    required: true,
  },
  rating: {
    max: 5,
    min: 0,
    type: Number,
  },
  review: {
    type: String,
    required: true,
  },
  date: {
    type: String,
    default: moment(),
  },
});

module.exports = mongoose.model("Review", ReviewSchema);
