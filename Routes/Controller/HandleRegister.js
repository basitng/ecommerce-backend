const User = require("../../Models/User");
const dotenv = require("dotenv");
const jwt = require("jsonwebtoken");

dotenv.config();

const maxAge = 3 * 24 * 60 * 60;

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
function createToken(id) {
  jwt.sign({ id }, process.env.SECRET_KEY, {
    expiresIn: maxAge,
  });
}

const handlerRegister = async (req, res) => {
  const { username, email, password } = req.body;

  try {
    const user = await User.create({
      username,
      email,
      password: password,
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
    const respones = handleErrors(error);
    res.status(400).send({ respones });
  }
};
module.exports = handlerRegister;
