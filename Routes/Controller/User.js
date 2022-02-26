const User = require("../../Models/User");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config();

module.exports.userProfile = async (req, res) => {
  try {
    const data = await User.findById(req.params.id);

    if (!data.isAdmin) {
      res.status(200).json({ data });
    }
    // else {
    //   res.status(401).json("Request denied");
    // }
  } catch (error) {
    res.status(400).json(error.message);
  }
};

module.exports.userUpdateProfile = async (req, res) => {
  const { username, address, phone, postal_code, location } = req.body;
  try {
    const data = await User.findById({ _id: req.params.id });
    const personUsername = username === "" ? data.username : username;
    const personAddress = address === "" ? data.address : address;
    const personLocation = location === "" ? data.location : location;
    const personPostalCode =
      postal_code === "" ? data.postal_code : postal_code;
    const personPhone = phone === "" ? data.phone_number : phone;

    const user = await User.findByIdAndUpdate(
      req.params.id,
      {
        username: personUsername,
        address: personAddress,
        phone_number: personPhone,
        postal_code: personPostalCode,
        location: personLocation,
      },
      { new: true }
    );
    if (!user.isAdmin || user.isAdmin) {
      const accessToken = jwt.sign(
        { id: user._id, isAdmin: user.isAdmin },
        process.env.SECRET_KEY,
        {
          expiresIn: "3d",
        }
      );
      res.status(200).json({ user, accessToken });
    }
    // else {
    //   res.status(401).json("Denied");
    // }
  } catch (error) {
    res.status(400).json(error.message);
  }
};
