const User = require("../../../Models/User");

module.exports.adminProfile = async (req, res) => {
  try {
    const data = await User.findById(req.params.id);

    if (data.isAdmin) {
      res.status(200).json({ data });
    }
    // else {
    //   res.status(401).json("Request denied");
    // }
  } catch (error) {
    res.status(400).json(error.message);
  }
};

module.exports.adminUpdateProfile = async (req, res) => {
  try {
    const data = await User.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );
    if (data.isAdmin) {
      res.status(200).json({ data });
    } else {
      res.status(401).json("Denied");
    }
  } catch (error) {
    res.status(400).json(error.message);
  }
};
