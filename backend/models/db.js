const mongoose = require("mongoose");
const mongoUrl = process.env.MONGO;

mongoose
  .connect(mongoUrl)
  .then(() => console.log("db connected"))
  .catch((e) => console.log("err with db connection"));
