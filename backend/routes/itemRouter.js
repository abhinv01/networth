const { jwtValidation } = require("../middlewares/auth");
const router = require("express").Router();

router.get("/", jwtValidation, (req, res) => {
  // saving database call by using req.user which was populated in middleware while jwt auth
  res
    .status(200)
    .json([
      { name: "cupboard", price: "200" },
      { name: "chair", price: "70" },
      req.user,
    ]);
});

module.exports = router;
