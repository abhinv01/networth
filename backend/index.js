const express = require("express");
const app = express();
require("dotenv").config();
require("./models/db");
const bodyParser = require("body-parser");
const cors = require("cors");
const authRouter = require("./routes/authRouter");
const itemRouter = require("./routes/itemRouter");
const { jwtValidation } = require("./middlewares/auth");
const rateLimit = require("express-rate-limit");

const transactionRoutes = require("./routes/transactionRoutes");
const assetRoutes = require("./routes/assetRoutes");

// Apply rate limiting middleware
const limiter = rateLimit({
  windowMs: 1 * 60 * 1000,
  max: 100,
  message: {
    error: "Too many requests. Please try again later.",
  },
  headers: true, // Include rate limit info in the response headers
});

//middleware
app.use(bodyParser.json());
app.use(cors());
app.use(limiter);

//port
const PORT = process.env.PORT || 5000;

//routes
//cheking auth works properly
app.use("/items", itemRouter);
//login and signup
app.use("/auth", authRouter);

//transaction and assets
app.use("/api/transactions", transactionRoutes);
app.use("/api/assets", assetRoutes);

app.listen(PORT, () => console.log(`listening at port ${PORT}`));
