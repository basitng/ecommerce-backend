const dotenv = require("dotenv");
dotenv.config();
const jwt = require("jsonwebtoken");
const User = require("../../../Models/User");

module.exports.googleLogin = async (req, res) => {
  const { email } = req.body;
  try {
    const user = await User.findOne({ email });
    if (user) {
      const accessToken = jwt.sign(
        { id: user._id, isAdmin: user.isAdmin },
        process.env.SECRET_KEY,
        {
          expiresIn: "3d",
        }
      );
      console.log(user);
      res.status(200).json({ user, accessToken });
    } else {
      console.log("--------- Email doesn't exists ---------");
      res.status(400).json("Email doesn't exists");
    }
  } catch (error) {
    res.status(400).json(error);
  }
};

module.exports.googleRegister = async (req, res) => {
  const { email, username, password } = req.body;
  try {
    const data = await User.findOne({ email });
    console.log(`---- ${(email, password, username)}`);
    if (data == null) {
      const user = await User.create({ email, password, username });
      const accessToken = jwt.sign(
        { id: user._id, isAdmin: user.isAdmin },
        process.env.SECRET_KEY,
        {
          expiresIn: "3d",
        }
      );
      console.log("User created ---------- 👌👌 ---------------......", user);
      res.status(200).json({ user, accessToken });
    } else {
      console.log("User already exists ......--------------------------", user);
      res.status(201).json("User already exists");
    }
  } catch (error) {
    res.status(400).json(error);
  }
};
