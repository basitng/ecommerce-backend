const dotenv = require("dotenv");
const { OAuth2Client } = require("google-auth-library");

dotenv.config();
const client = new OAuth2Client(
  "780011623530-fmi7vidcfepaa24lji0883na8vqjmn86.apps.googleusercontent.com"
);
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
  const { googleId } = req.body;
  try {
    const ticket = await client.verifyIdToken({
      idToken: googleId,
      audience:
        "780011623530-fmi7vidcfepaa24lji0883na8vqjmn86.apps.googleusercontent.com",
    });
    console.log(
      ">---------------------------------------------------------------------------------------------------------",
      googleId
    );
    const { name, email } = ticket.getPayload();
    console.log(
      ">---------------------------------------------------------------------------------------------------------",
      email
    );
    const user = await User.create({
      email: email,
      password: name + email,
      username: name,
    });
    const accessToken = jwt.sign(
      { id: user._id, isAdmin: user.isAdmin },
      process.env.SECRET_KEY,
      {
        expiresIn: "3d",
      }
    );
    res.status(201).json({ user, accessToken });
  } catch (error) {
    console.log(error);
    res.status(400).json(error);
  }
};
