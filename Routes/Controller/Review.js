const Review = require("../../Models/Review");

module.exports.getReview = async (req, res) => {
  try {
    const data = await Review.find();

    res.status(200).json(data);
  } catch (error) {
    res.status(400).json(error);
  }
};
module.exports.review = async (req, res) => {
  const { productId, review, rating, user } = req.body;
  try {
    const data = await Review.create({
      productId,
      review,
      rating,
      user,
    });
    res.status(200).json(data);
  } catch (error) {
    res.status(400).json(error);
  }
};
module.exports.getOneProductReviews = async (req, res) => {
  try {
    const data = await Review.find({
      productId: req.params.id,
    });
    const rating = data
      .map((item) => item.rating)
      .reduce((prev, next) => prev + next);

    res.status(200).json({ data, rating });
  } catch (error) {
    res.status(400).json(error);
  }
};
