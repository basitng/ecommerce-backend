const User = require("../../../Models/User");

module.exports.adminUpdatePassword = async (req, res) => {
  try {
    const { id, newPassword, oldPassword } = req.body;
    const user = await User.findById(id);
    console.log(newPassword, oldPassword, id);
    if (user.isAdmin) {
      const data = await User.changePassword(id, oldPassword, newPassword);
      res.status(200).json({ data });
    }
    // else {
    //   res.status(401).json("Denied");
    // }
  } catch (error) {
    res.status(400).json(error.message);
  }
};
