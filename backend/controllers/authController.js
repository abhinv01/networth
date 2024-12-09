const User = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

async function signUpHandler(req, res) {
  try {
    const { name, email, password } = req.body;
    const user = await User.findOne({ email });
    if (user) {
      return res
        .status(409)
        .json({ message: "user already exists", success: false });
    }
    const userModel = new User({ name, email, password });
    const saltRounds = 10;
    userModel.password = await bcrypt.hash(password, saltRounds);
    await userModel.save();
    res.status(201).json({ message: "signup success", success: true });
  } catch (error) {
    res.status(500).json({ message: "signup failed", success: false });
  }
}
async function loginHandler(req, res) {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user) {
    return res
      .status(403)
      .json({ message: "Auth failed, email wrong", success: false });
  }
  const isPassword = await bcrypt.compare(password, user.password);
  if (!isPassword) {
    return res
      .status(403)
      .json({ message: "Auth failed, password wrong", success: false });
  }
  const jwtToken = jwt.sign(
    { email: user.email, _id: user._id },
    process.env.JWT_SECRET,
    { expiresIn: "24h" }
  );
  return res.status(200).json({
    message: "login success",
    success: true,
    jwtToken,
    email,
    name: user.name,
  });
}

module.exports = { signUpHandler, loginHandler };
