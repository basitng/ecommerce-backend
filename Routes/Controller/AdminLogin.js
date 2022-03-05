const jwt = require("jsonwebtoken");
const User = require("../../Models/User");
const dotenv = require("dotenv");
dotenv.config();
const maxAge = 24 * 60 * 60;

function handleErrors(err) {
  const errors = { email: "", password: "" };
  if (err.code == 11000) {
    errors.email = "Email aready exists";
  }
  if (err.message.includes("User validation failed")) {
    Object.values(err.errors).forEach(({ properties }) => {
      errors[properties.path] = properties.message;
    });
  }

  return errors;
}

const handleAdminLogin = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.loginUser(email, password);
    console.log(user.isAdmin);
    if (user.isAdmin) {
      const accessToken = jwt.sign(
        { id: user._id, isAdmin: user.isAdmin },
        process.env.SECRET_KEY,
        {
          expiresIn: "3d",
        }
      );

      res.status(200).send({ user, accessToken });
    }
    res.status(401).json("Unauthorized request");
  } catch (error) {
    const message = handleErrors(error);
    res.status(400).send({ message });
  }
};
module.exports = handleAdminLogin;
