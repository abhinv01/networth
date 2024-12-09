const mongoose = require("mongoose");

const transactionSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "users",
    required: true,
  }, // Referencing to the 'users' collection
  amount: { type: Number, required: true },
  type: { type: String, enum: ["income", "expense"], required: true },
  date: { type: Date, default: Date.now },
});

const Transaction = mongoose.model("transactions", transactionSchema);

module.exports = Transaction;
