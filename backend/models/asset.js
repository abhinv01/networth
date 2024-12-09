const mongoose = require("mongoose");

const assetSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "users",
    required: true,
  },
  assetType: { type: String, required: true },
  value: { type: Number, required: true },
  date: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Asset", assetSchema);
