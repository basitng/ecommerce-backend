const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const { isEmail } = require("validator");

const UserSchema = mongoose.Schema(
  {
    username: { type: String, unique: true, required: true },
    email: {
      type: String,
      unique: true,
      required: true,
      validate: [isEmail, "Please Enter A Valid Email Address"],
    },
    password: { type: String, required: true, minlength: 6 },
    img: { type: String },
    pending: { type: [] },
    totalOrder: { type: [] },
    isAdmin: { type: Boolean, default: false },
    location: { type: String },
    address: { type: String },
    postal_code: { type: Number },
    phone_number: { type: Number },
  },
  { timestamps: true }
);

UserSchema.pre("save", async function (next) {
  const salt = await bcrypt.genSalt();
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

UserSchema.statics.loginUser = async function (email, password) {
  const user = await this.findOne({ email });
  if (user) {
    const auth = await bcrypt.compare(password, user.password);
    if (auth) {
      return user;
    }
  }
  throw Error("Incorrect password or email");
};

UserSchema.statics.changePassword = async function (
  id,
  oldPassword,
  newPassword
) {
  const user = await this.findById(id);
  const salt = await bcrypt.genSalt();
  if (user) {
    const isPassword = await bcrypt.compare(oldPassword, user.password);
    if (isPassword) {
      const updatedPassword = await bcrypt.hash(newPassword, salt);
      const updatedUser = await this.findByIdAndUpdate(
        id,
        { password: updatedPassword },
        { new: true }
      );
      console.log("> ============= Password changed :) < ==============");
      return updatedUser;
    }
  }
  throw Error("Ooops! access denied");
};

module.exports = mongoose.model("User", UserSchema);
