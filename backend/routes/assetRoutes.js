const express = require("express");
const router = express.Router();
const { jwtValidation } = require("../middlewares/auth");
const Asset = require("../models/Asset");

// Get assets
router.get("/", jwtValidation, async (req, res) => {
  try {
    const assets = await Asset.find({ userId: req.user._id });
    res.json(assets);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
