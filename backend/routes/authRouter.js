const {
  signUpHandler,
  loginHandler,
} = require("../controllers/authController");
const {
  signupValidation,
  loginValidation,
} = require("../middlewares/authValidation");

const router = require("express").Router();

router.post("/login", loginValidation, loginHandler);
router.post("/signup", signupValidation, signUpHandler);

module.exports = router;
